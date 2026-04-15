"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { industriesData } from "@/content/mkcalling/industries";
import { countryCodes, defaultCountry, detectCountryFromBrowser, validatePhoneNumber, type CountryCode } from "@/lib/countryCodes";
import { INTEREST_MESSAGE_MAX_LENGTH } from "@/lib/interest-form-limits";
import {
  clearPricingContextFromStorage,
  readPricingContextFromStorage,
  type PricingContextV1,
} from "@/lib/pricing-context";
import { cn } from "@/lib/utils";

const INTEREST_PRIMARY_USE_CASES = [
  "Sales & Lead Qualification",
  "Appointment Booking & Reminders",
  "Payment Reminders & Collections",
  "Customer Support & Follow-ups",
  "Verification & Onboarding",
  "Feedback & NPS",
  "Other/Not in this List",
] as const;

const INTEREST_LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Others",
] as const;

const interestFormCheckboxClassName =
  "shrink-0 rounded-[3px] border-2 border-primary/50 data-[state=checked]:border-primary";

function interestSelectableRowClass(selected: boolean) {
  return cn(
    "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
    selected && "border-primary/50 bg-primary/5",
  );
}

export enum InterestType {
  IMPLEMENTATION_PARTNER = "Implementation Partner",
  BUSINESS_HOUSE = "Business House",
  BOTH = "Both",
}

interface InterestFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  interestType: InterestType | null;
  countryCode: string;
  phone: string;
  industry: string;
  primaryUseCase: string[];
  callingDirection: string;
  monthlyCallingMinutes: string;
  preferredLanguages: string[];
  goLiveTimeline: string;
  currentCallingSetup: string;
  crmTools: string;
}

interface SchedulerSlotOption {
  startIso: string;
  endIso: string;
  label: string;
}

interface SchedulerHoldState {
  holdToken: string;
  expiresAt: string;
  slot: SchedulerSlotOption;
}

const SCHEDULER_ENABLED = process.env.NEXT_PUBLIC_SCHEDULER_ENABLED !== "false";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatHoldExpiry(expiresAtIso: string): string {
  const dt = new Date(expiresAtIso);
  if (Number.isNaN(dt.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dt);
}

/** Single source of truth for empty form state; used for initial state and reset on success. */
function getInitialFormState(country: CountryCode): InterestFormData {
  return {
    name: "",
    email: "",
    company: "",
    message: "",
    interestType: null,
    countryCode: `${country.dialCode}-${country.code}`,
    phone: "",
    industry: "",
    primaryUseCase: [],
    callingDirection: "",
    monthlyCallingMinutes: "",
    preferredLanguages: [],
    goLiveTimeline: "",
    currentCallingSetup: "",
    crmTools: "",
  };
}

export const InterestForm = () => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Detect country on mount
  const [detectedCountry, setDetectedCountry] = useState<CountryCode>(defaultCountry);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize formData with defaultCountry to avoid hydration mismatch
  const [formData, setFormData] = useState<InterestFormData>(() => getInitialFormState(defaultCountry));
  const [formResetKey, setFormResetKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayIsoDate());
  const [earliestSelectableDate, setEarliestSelectableDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SchedulerSlotOption[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [holdState, setHoldState] = useState<SchedulerHoldState | null>(null);
  const [holdBusy, setHoldBusy] = useState(false);
  const [pricingContext, setPricingContext] = useState<PricingContextV1 | null>(null);
  const [pricingContextReady, setPricingContextReady] = useState(false);
  const fromEstimator = pricingContext !== null;
  /** SMB estimator already maps connected minutes into an interest-form bucket — hide duplicate question. */
  const smbMonthlyMinutesFromContext =
    pricingContext?.source === "smb" &&
    Boolean(pricingContext.interestFormPrefill.monthlyCallingMinutes?.trim());
  /** SMB prefill or enterprise discovery — volume band is not collected again here. */
  const requireMonthlyCallingMinutesField =
    !smbMonthlyMinutesFromContext && pricingContext?.source !== "enterprise";

  // Detect country on mount: prefer IP-based (via API), else browser locale/timezone, else India
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    let cancelled = false;

    const applyCountry = (country: CountryCode) => {
      if (cancelled) return;
      setDetectedCountry(country);
      setFormData((prev) => ({ ...prev, countryCode: `${country.dialCode}-${country.code}` }));
    };

    (async () => {
      try {
        const res = await fetch("/api/geo");
        if (!res.ok) throw new Error("Geo API error");
        const data = await res.json();
        const code = data?.countryCode?.toUpperCase?.();
        if (code) {
          const fromApi = countryCodes.find((c) => c.code === code);
          if (fromApi) {
            applyCountry(fromApi);
            return;
          }
        }
      } catch (e) {
        // Fall through to browser-based detection
      }

      try {
        const fromBrowser = detectCountryFromBrowser();
        applyCountry(fromBrowser);
      } catch (error) {
        console.error("Error detecting country:", error);
        applyCountry(defaultCountry);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const stored = readPricingContextFromStorage();
    if (stored) {
      setPricingContext(stored);
      setFormData((prev) => ({
        ...prev,
        primaryUseCase:
          stored.interestFormPrefill.primaryUseCase.length > 0
            ? stored.interestFormPrefill.primaryUseCase
            : prev.primaryUseCase,
        monthlyCallingMinutes:
          stored.interestFormPrefill.monthlyCallingMinutes ?? prev.monthlyCallingMinutes,
        callingDirection: stored.interestFormPrefill.callingDirection ?? prev.callingDirection,
        currentCallingSetup:
          stored.interestFormPrefill.currentCallingSetup ?? prev.currentCallingSetup,
      }));
    }
    setPricingContextReady(true);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !SCHEDULER_ENABLED) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/scheduler/bounds");
        const data = await res.json();
        if (cancelled || !data.success || !data.earliestSelectableDate) return;
        setEarliestSelectableDate(data.earliestSelectableDate);
        setSelectedDate((prev) => (prev < data.earliestSelectableDate ? data.earliestSelectableDate : prev));
      } catch {
        // ignore; date min falls back to today until bounds load
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isMounted]);

  // Parse country code from formData (handles both old format "dialCode" and new format "dialCode-countryCode")
  const parseCountryCode = (code: string): { dialCode: string; countryCode: string } => {
    if (code.includes('-')) {
      const [dialCode, countryCode] = code.split('-');
      return { dialCode, countryCode };
    }
    // Legacy format: just dial code, find first matching country
    const country = countryCodes.find(c => c.dialCode === code) || defaultCountry;
    return { dialCode: country.dialCode, countryCode: country.code };
  };

  const parsedCountry = parseCountryCode(formData.countryCode);
  const selectedCountry = countryCodes.find(c => c.code === parsedCountry.countryCode) || defaultCountry;
  const isValidEmail = EMAIL_REGEX.test(formData.email.trim());
  const isValidPhone = validatePhoneNumber(formData.phone, selectedCountry);
  const schedulerReadyForHold = Boolean(formData.name.trim() && isValidEmail && isValidPhone && formData.company.trim());
  const validCountryCode = countryCodes.some(c => c.code === parsedCountry.countryCode)
    ? `${selectedCountry.dialCode}-${selectedCountry.code}`
    : `${defaultCountry.dialCode}-${defaultCountry.code}`;
  const holdExpiryLabel = holdState ? formatHoldExpiry(holdState.expiresAt) : "";

  const resetSchedulerHold = (changedField: string) => {
    if (!holdState) return;
    setHoldState(null);
    toast({
      title: "Time slot cleared",
      description: `You updated ${changedField}. Please select a fresh consultation slot before submitting.`,
      variant: "destructive",
    });
  };

  useEffect(() => {
    if (!SCHEDULER_ENABLED || !schedulerReadyForHold) {
      setAvailableSlots([]);
      setSlotsError(null);
      return;
    }

    let cancelled = false;
    const fetchSlots = async () => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const res = await fetch(`/api/scheduler/slots?date=${encodeURIComponent(selectedDate)}`);
        const payload = await res.json();
        if (!res.ok || !payload.success) {
          throw new Error(payload.message || "Unable to load slots");
        }
        if (!cancelled) setAvailableSlots(payload.slots || []);
      } catch (error) {
        if (!cancelled) {
          setAvailableSlots([]);
          setSlotsError(error instanceof Error ? error.message : "Unable to load slots");
        }
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    };

    void fetchSlots();
    return () => {
      cancelled = true;
    };
  }, [schedulerReadyForHold, selectedDate]);

  useEffect(() => {
    if (!holdState) return;
    const timer = window.setInterval(() => {
      if (new Date(holdState.expiresAt).getTime() <= Date.now()) {
        setHoldState(null);
        toast({
          title: "Slot hold expired",
          description: "Your selected slot hold expired. Please pick another available slot.",
          variant: "destructive",
        });
      }
    }, 10000);
    return () => window.clearInterval(timer);
  }, [holdState, toast]);

  useEffect(() => {
    if (!holdState || !schedulerReadyForHold) return;
    const refresh = window.setInterval(async () => {
      try {
        await fetch("/api/scheduler/hold", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotStartIso: holdState.slot.startIso,
            slotEndIso: holdState.slot.endIso,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
            holdToken: holdState.holdToken,
          }),
        });
      } catch {
        // Best-effort refresh; explicit failure is surfaced when submit is attempted.
      }
    }, 60000);
    return () => window.clearInterval(refresh);
  }, [formData.company, formData.email, formData.name, formData.phone, holdState, schedulerReadyForHold]);

  const requestSlotHold = async (slot: SchedulerSlotOption) => {
    if (!schedulerReadyForHold) {
      toast({
        title: "Complete contact details first",
        description: "Add name, valid email, valid phone, and company before selecting a slot.",
        variant: "destructive",
      });
      return;
    }
    setHoldBusy(true);
    try {
      const res = await fetch("/api/scheduler/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotStartIso: slot.startIso,
          slotEndIso: slot.endIso,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          holdToken: holdState?.holdToken,
        }),
      });
      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload.message || "Unable to hold selected slot");
      }
      setHoldState({
        holdToken: payload.holdToken,
        expiresAt: payload.expiresAt,
        slot,
      });
      toast({
        title: "Consultation slot selected",
        description: "Your selected slot is now held. Complete CAPTCHA and submit.",
      });
    } catch (error) {
      toast({
        title: "Slot unavailable",
        description: error instanceof Error ? error.message : "Please select another slot.",
        variant: "destructive",
      });
      setHoldState(null);
    } finally {
      setHoldBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields with custom messages
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "We'd love to know who we're talking to! Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "We need your email to keep you in the loop. Drop it in there!",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    if (!EMAIL_REGEX.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "That email doesn't look quite right. Double-check and try again!",
        variant: "destructive",
      });
      return;
    }

    if (!formData.interestType) {
      toast({
        title: "Interest Type Required",
        description: "Help us understand your role! Are you an Implementation Partner, Business House, or Both?",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number
    if (!formData.phone.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your primary contact mobile number.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(formData.phone, selectedCountry)) {
      toast({
        title: "Invalid Phone Number",
        description: `Please enter a valid ${selectedCountry.name} phone number. ${selectedCountry.phonePlaceholder ? `Example: ${selectedCountry.phonePlaceholder}` : ''}`,
        variant: "destructive",
      });
      return;
    }

    if (!formData.company.trim()) {
      toast({
        title: "Company required",
        description: "Please enter your company name.",
        variant: "destructive",
      });
      return;
    }

    if (!fromEstimator) {
      if (!formData.industry.trim()) {
        toast({
          title: "Industry Required",
          description: "Please select your industry.",
          variant: "destructive",
        });
        return;
      }

      if (!formData.primaryUseCase.length) {
        toast({
          title: "Primary use case required",
          description: "Select at least one primary use case.",
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.preferredLanguages.length) {
      toast({
        title: "Preferred languages required",
        description: "Select at least one language — use checkboxes for all that apply.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.goLiveTimeline.trim()) {
      toast({
        title: "Go-live timeline required",
        description: "Please select your target timeline.",
        variant: "destructive",
      });
      return;
    }

    if (!fromEstimator) {
      if (!formData.callingDirection.trim()) {
        toast({
          title: "Calling direction required",
          description: "Please select inbound, outbound, or both.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.currentCallingSetup.trim()) {
        toast({
          title: "Current setup required",
          description: "Please tell us how you handle calls today.",
          variant: "destructive",
        });
        return;
      }
    }

    if (requireMonthlyCallingMinutesField && !formData.monthlyCallingMinutes.trim()) {
      toast({
        title: "Estimated minutes required",
        description: "Please select an estimated monthly calling minutes range.",
        variant: "destructive",
      });
      return;
    }

    if (SCHEDULER_ENABLED && !holdState?.holdToken) {
      toast({
        title: "Consultation slot required",
        description: "Please select and hold an available consultation slot before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (formData.message.length > INTEREST_MESSAGE_MAX_LENGTH) {
      toast({
        title: "Message too long",
        description: `Please keep your message to ${INTEREST_MESSAGE_MAX_LENGTH} characters or fewer.`,
        variant: "destructive",
      });
      return;
    }

    // Check if CAPTCHA is completed
    if (!captchaToken) {
      toast({
        title: "Security Check Required",
        description: "Just one quick security check to keep the bots away. Complete the CAPTCHA below!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const monthlyCallingMinutesPayload =
      smbMonthlyMinutesFromContext && pricingContext?.interestFormPrefill.monthlyCallingMinutes
        ? pricingContext.interestFormPrefill.monthlyCallingMinutes.trim()
        : formData.monthlyCallingMinutes.trim();

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          monthlyCallingMinutes: monthlyCallingMinutesPayload,
          schedulerHoldToken: holdState?.holdToken || "",
          captchaToken,
          ...(pricingContext ? { pricingContext } : {}),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Demo request received",
          description: "Your request and selected consultation slot have been received. Watch for your invite details shortly.",
        });
        clearPricingContextFromStorage();
        setPricingContext(null);
        setFormData(getInitialFormState(detectedCountry));
        setFormResetKey((k) => k + 1);
        setAvailableSlots([]);
        setHoldState(null);
        try {
          const bRes = await fetch("/api/scheduler/bounds");
          const bJson = await bRes.json();
          if (bJson.success && bJson.earliestSelectableDate) {
            setEarliestSelectableDate(bJson.earliestSelectableDate);
            setSelectedDate(bJson.earliestSelectableDate);
          } else {
            setSelectedDate(getTodayIsoDate());
          }
        } catch {
          setSelectedDate(getTodayIsoDate());
        }
        setCaptchaToken(null);
        // Reset CAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <section id="interest" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold normal-case">
              See mKcalling in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us your use case and calling volume — we'll show a live workflow and recommend the right setup.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              mKcalling is live and used for real business calling workflows in India.
            </p>
          </div>

          <Card className="p-8 bg-card border-primary/30 shadow-card animate-fade-in-up">
            <form key={formResetKey} onSubmit={handleSubmit} className="space-y-6">
              {pricingContextReady && !fromEstimator ? (
                <div className="rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tip:</span> Running the{" "}
                  <Link href="/pricing" className="text-primary underline-offset-4 hover:underline font-medium">
                    pricing estimator
                  </Link>{" "}
                  first gives you indicative numbers and makes your consultation more productive — you can still submit this
                  form without it.
                </div>
              ) : null}
              {fromEstimator ? (
                <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Pricing session attached ({pricingContext?.source === "enterprise" ? "Enterprise discovery" : "SMB estimate"}
                    )
                  </p>
                  <p className="text-xs text-muted-foreground">
                    The details below will be sent with your request. You can still adjust use case or volume fields if you
                    like.
                  </p>
                  {smbMonthlyMinutesFromContext && pricingContext?.interestFormPrefill.monthlyCallingMinutes ? (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Interest form — minutes band:</span>{" "}
                      {pricingContext.interestFormPrefill.monthlyCallingMinutes} (from your SMB estimate; no need to pick
                      again below).
                    </p>
                  ) : null}
                  {pricingContext?.source === "enterprise" ? (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Estimated monthly calling minutes:</span> not collected
                      again here for enterprise discovery — your session summary above is what we use.
                    </p>
                  ) : null}
                  <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                    {pricingContext?.summaryLines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    resetSchedulerHold("name");
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  className="bg-background/50 border-border focus:border-primary"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    resetSchedulerHold("email");
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="bg-background/50 border-border focus:border-primary"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Primary Contact Mobile <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {isMounted ? (
                    <Select
                      value={validCountryCode}
                      onValueChange={(value) => {
                        // Store the composite value (dialCode-countryCode)
                        setFormData({ ...formData, countryCode: value });
                      }}
                    >
                      <SelectTrigger className="w-[140px] bg-background/50 border-border focus:border-primary">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={`${country.dialCode}-${country.code}`}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.dialCode}</span>
                              <span className="text-xs text-muted-foreground">({country.code})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-[140px] h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Code</span>
                    </div>
                  )}
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, '');
                      resetSchedulerHold("phone number");
                      setFormData({ ...formData, phone: value });
                    }}
                    className="flex-1 bg-background/50 border-border focus:border-primary"
                    placeholder={selectedCountry.phonePlaceholder || "Phone number"}
                  />
                </div>
                {formData.phone && !validatePhoneNumber(formData.phone, selectedCountry) && (
                  <p className="text-xs text-muted-foreground">
                    {selectedCountry.phonePlaceholder ? `Example: ${selectedCountry.phonePlaceholder}` : 'Please enter a valid phone number'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company <span className="text-red-500">*</span>
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => {
                    resetSchedulerHold("company");
                    setFormData({ ...formData, company: e.target.value });
                  }}
                  className="bg-background/50 border-border focus:border-primary"
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry {!fromEstimator ? <span className="text-red-500">*</span> : null}
                  {fromEstimator ? (
                    <span className="text-muted-foreground font-normal"> (optional)</span>
                  ) : null}
                </label>
                {isMounted ? (
                  <Select
                    value={formData.industry || undefined}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {industriesData.map((industry) => (
                        <SelectItem key={industry.slug} value={industry.name}>
                          {industry.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center">
                    <span className="text-sm text-muted-foreground">Select your industry</span>
                  </div>
                )}
              </div>

              <div className="space-y-3" role="group" aria-labelledby="interest-primary-use-heading">
                <div>
                  <label id="interest-primary-use-heading" className="text-sm font-medium">
                    Primary Use Case {!fromEstimator ? <span className="text-red-500">*</span> : null}
                    {fromEstimator ? (
                      <span className="text-muted-foreground font-normal"> (optional — pre-filled from estimator)</span>
                    ) : null}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">Select all that apply.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_PRIMARY_USE_CASES.map((useCase, index) => {
                    const inputId = `interest-puc-${index}`;
                    const checked = formData.primaryUseCase.includes(useCase);
                    return (
                      <label key={useCase} htmlFor={inputId} className={cn(interestSelectableRowClass(checked), "min-h-[2.75rem]")}>
                        <Checkbox
                          id={inputId}
                          className={interestFormCheckboxClassName}
                          checked={checked}
                          onCheckedChange={(isChecked) => {
                            if (isChecked === true) {
                              setFormData({ ...formData, primaryUseCase: [...formData.primaryUseCase, useCase] });
                            } else {
                              setFormData({
                                ...formData,
                                primaryUseCase: formData.primaryUseCase.filter((uc) => uc !== useCase),
                              });
                            }
                          }}
                        />
                        <span className="text-sm">{useCase}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="callingDirection" className="text-sm font-medium">
                  Calling Direction {!fromEstimator ? <span className="text-red-500">*</span> : null}
                  {fromEstimator ? (
                    <span className="text-muted-foreground font-normal"> (optional — pre-filled where applicable)</span>
                  ) : null}
                </label>
                {isMounted ? (
                  <Select
                    value={formData.callingDirection || undefined}
                    onValueChange={(value) => setFormData({ ...formData, callingDirection: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select calling direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inbound">Inbound</SelectItem>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center">
                    <span className="text-sm text-muted-foreground">Select calling direction</span>
                  </div>
                )}
              </div>

              {requireMonthlyCallingMinutesField ? (
                <div className="space-y-2">
                  <label htmlFor="monthlyCallingMinutes" className="text-sm font-medium">
                    Estimated Monthly Calling Minutes <span className="text-red-500">*</span>
                  </label>
                  {isMounted ? (
                    <Select
                      value={formData.monthlyCallingMinutes || undefined}
                      onValueChange={(value) => setFormData({ ...formData, monthlyCallingMinutes: value })}
                    >
                      <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                        <SelectValue placeholder="Select estimated minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0–1,500">0–1,500</SelectItem>
                        <SelectItem value="1,501–3,000">1,501–3,000</SelectItem>
                        <SelectItem value="3,001–5,000">3,001–5,000</SelectItem>
                        <SelectItem value="5,001–10,000">5,001–10,000</SelectItem>
                        <SelectItem value="10,001–20,000">10,001–20,000</SelectItem>
                        <SelectItem value="20,001+">20,001+</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center">
                      <span className="text-sm text-muted-foreground">Select estimated minutes</span>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="space-y-3" role="group" aria-labelledby="interest-preferred-languages-heading">
                <div>
                  <label id="interest-preferred-languages-heading" className="text-sm font-medium">
                    Preferred Languages <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">Select all that apply.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTEREST_LANGUAGES.map((lang) => {
                    const inputId = `interest-lang-${lang.replace(/\s+/g, "-").toLowerCase()}`;
                    const checked = formData.preferredLanguages.includes(lang);
                    return (
                      <label
                        key={lang}
                        htmlFor={inputId}
                        className={cn(interestSelectableRowClass(checked), "min-h-[2.75rem]")}
                      >
                        <Checkbox
                          id={inputId}
                          className={interestFormCheckboxClassName}
                          checked={checked}
                          onCheckedChange={(isChecked) => {
                            if (isChecked === true) {
                              setFormData({ ...formData, preferredLanguages: [...formData.preferredLanguages, lang] });
                            } else {
                              setFormData({
                                ...formData,
                                preferredLanguages: formData.preferredLanguages.filter((l) => l !== lang),
                              });
                            }
                          }}
                        />
                        <span className="text-sm">{lang}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="goLiveTimeline" className="text-sm font-medium">
                  Go-live Timeline <span className="text-red-500">*</span>
                </label>
                {isMounted ? (
                  <Select
                    value={formData.goLiveTimeline || undefined}
                    onValueChange={(value) => setFormData({ ...formData, goLiveTimeline: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediately (0–2 weeks)">Immediately (0–2 weeks)</SelectItem>
                      <SelectItem value="2–4 weeks">2–4 weeks</SelectItem>
                      <SelectItem value="1–2 months">1–2 months</SelectItem>
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center">
                    <span className="text-sm text-muted-foreground">Select timeline</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="currentCallingSetup" className="text-sm font-medium">
                  Current Calling Setup {!fromEstimator ? <span className="text-red-500">*</span> : null}
                  {fromEstimator ? (
                    <span className="text-muted-foreground font-normal"> (optional — pre-filled where applicable)</span>
                  ) : null}
                </label>
                {isMounted ? (
                  <Select
                    value={formData.currentCallingSetup || undefined}
                    onValueChange={(value) => setFormData({ ...formData, currentCallingSetup: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select current setup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In-house calling team">In-house calling team</SelectItem>
                      <SelectItem value="Outsourced / BPO">Outsourced / BPO</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                      <SelectItem value="Not doing calls currently">Not doing calls currently</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="h-10 rounded-md border border-input bg-background/50 px-3 py-2 flex items-center">
                    <span className="text-sm text-muted-foreground">Select current setup</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="crmTools" className="text-sm font-medium">
                  CRM / Tools (Optional)
                </label>
                <Input
                  id="crmTools"
                  value={formData.crmTools}
                  onChange={(e) => setFormData({ ...formData, crmTools: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary"
                  placeholder="e.g., Zoho, Freshsales, LeadSquared, HubSpot, Others"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  maxLength={INTEREST_MESSAGE_MAX_LENGTH}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary min-h-[120px]"
                  placeholder="Tell us about your use case..."
                />
                <p className="text-xs text-muted-foreground">
                  Optional. Up to {INTEREST_MESSAGE_MAX_LENGTH.toLocaleString("en-IN")} characters.
                </p>
              </div>
              <div className="space-y-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-4">
                <div>
                  <p className="text-sm font-medium">
                    Select your consultation slot <span className="text-red-500">*</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pick an available slot from our live availability (earliest date respects a one business day lead
                    time). Your selected slot is held for 15 minutes.
                  </p>
                  {!schedulerReadyForHold && SCHEDULER_ENABLED ? (
                    <p className="text-xs text-amber-600 mt-1">
                      Unlock the date picker after Name, Email, Company, and a valid phone for the selected country
                      code are filled.
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-3 sm:grid-cols-[220px,1fr]">
                  <div className="space-y-2">
                    <Label htmlFor="scheduler-date" className="text-xs text-muted-foreground">
                      Date
                    </Label>
                    <Input
                      id="scheduler-date"
                      type="date"
                      value={selectedDate}
                      min={earliestSelectableDate ?? getTodayIsoDate()}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setHoldState(null);
                      }}
                      className="bg-background/50 border-border focus:border-primary"
                      disabled={!SCHEDULER_ENABLED || !schedulerReadyForHold}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Available time slots</Label>
                    <div className="rounded-md border border-border/60 bg-background p-3 min-h-[120px]">
                      {!schedulerReadyForHold ? (
                        <p className="text-sm text-muted-foreground">
                          Complete Name, valid Email, valid Phone, and Company first to view available slots.
                        </p>
                      ) : slotsLoading ? (
                        <p className="text-sm text-muted-foreground">Loading available slots...</p>
                      ) : slotsError ? (
                        <p className="text-sm text-destructive">{slotsError}</p>
                      ) : availableSlots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No open slots for this date. Choose another date.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {availableSlots.map((slot) => {
                            const selected = holdState?.slot.startIso === slot.startIso;
                            return (
                              <Button
                                key={slot.startIso}
                                type="button"
                                size="sm"
                                variant={selected ? "default" : "outline"}
                                className="h-8"
                                disabled={holdBusy}
                                onClick={() => void requestSlotHold(slot)}
                              >
                                {slot.label}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {holdState ? (
                  <p className="text-xs text-emerald-600">
                    Held slot: {holdState.slot.label} on {selectedDate}. Hold valid until {holdExpiryLabel}.
                  </p>
                ) : (
                  <p className="text-xs text-amber-600">
                    Select a slot to hold it before final submit.
                  </p>
                )}
                {!SCHEDULER_ENABLED ? (
                  <p className="text-xs text-muted-foreground">
                    Scheduler feature is currently disabled for this environment.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestType" className="text-sm font-medium">
                  Interest Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.interestType || ""}
                  onValueChange={(value) => setFormData({ ...formData, interestType: value as InterestType })}
                  className="flex flex-row space-x-6"
                  
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={InterestType.IMPLEMENTATION_PARTNER} id="implementation-partner" />
                    <Label htmlFor="implementation-partner" className="text-sm font-normal cursor-pointer">
                      Implementation Partner
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={InterestType.BUSINESS_HOUSE} id="business-house" />
                    <Label htmlFor="business-house" className="text-sm font-normal cursor-pointer">
                      Business House
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={InterestType.BOTH} id="both" />
                    <Label htmlFor="both" className="text-sm font-normal cursor-pointer">
                      Both
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={handleCaptchaChange}
                  theme="dark"
                  size="normal"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !captchaToken || (SCHEDULER_ENABLED && !holdState)}
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Schedule a Demo"}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By booking and submitting, you agree to receive scheduling and follow-up communications from Mahiruho
                about this request and related products/services via call, email, SMS, or WhatsApp. You can opt out
                anytime.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
