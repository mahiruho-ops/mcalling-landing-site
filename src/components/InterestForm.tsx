"use client";
import { useState, useRef, useEffect } from "react";
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

export const InterestForm = () => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Detect country on mount
  const [detectedCountry, setDetectedCountry] = useState<CountryCode>(defaultCountry);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize formData with defaultCountry to avoid hydration mismatch
  const [formData, setFormData] = useState<InterestFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    interestType: null,
    countryCode: `${defaultCountry.dialCode}-${defaultCountry.code}`,
    phone: "",
    industry: "",
    primaryUseCase: [],
    callingDirection: "",
    monthlyCallingMinutes: "",
    preferredLanguages: [],
    goLiveTimeline: "",
    currentCallingSetup: "",
    crmTools: "",
  });

  // Detect country and update form data on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;
    
    try {
      const detected = detectCountryFromBrowser();
      setDetectedCountry(detected);
      // Store as composite value (dialCode-countryCode) to ensure uniqueness
      setFormData(prev => ({ ...prev, countryCode: `${detected.dialCode}-${detected.code}` }));
    } catch (error) {
      console.error('Error detecting country:', error);
      // Keep default country code on error
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
  const validCountryCode = countryCodes.some(c => c.code === parsedCountry.countryCode)
    ? `${selectedCountry.dialCode}-${selectedCountry.code}`
    : `${defaultCountry.dialCode}-${defaultCountry.code}`;

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
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

    // Validate industry
    if (!formData.industry.trim()) {
      toast({
        title: "Industry Required",
        description: "Please select your industry.",
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

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Demo request received",
          description: "We'll contact you shortly to confirm a demo slot. Typical response time: within business hours.",
        });
        setFormData({ 
          name: "", 
          email: "", 
          company: "", 
          message: "", 
          interestType: null,
          countryCode: `${detectedCountry.dialCode}-${detectedCountry.code}` || `${defaultCountry.dialCode}-${defaultCountry.code}`,
          phone: "",
          industry: "",
          primaryUseCase: [],
          callingDirection: "",
          monthlyCallingMinutes: "",
          preferredLanguages: [],
          goLiveTimeline: "",
          currentCallingSetup: "",
          crmTools: "",
        });
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
            <h2 className="text-4xl md:text-5xl font-bold">
              See mKcalling in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us your use case and calling volume — we'll show a live workflow and recommend the right setup.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              mKcalling is live and used for real business calling workflows in India.
            </p>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Live product. Real workflows. Indian numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Transparent pricing and managed setup.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>No AI prompting or training required from your team.</span>
              </li>
            </ul>
          </div>

          <Card className="p-8 bg-card border-primary/30 shadow-card animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  Company
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary"
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry <span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <label htmlFor="primaryUseCase" className="text-sm font-medium">
                  Primary Use Case <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-background/50 border border-border">
                  {["Sales & Lead Qualification", "Appointment Booking & Reminders", "Payment Reminders & Collections", "Customer Support & Follow-ups", "Verification & Onboarding", "Feedback & NPS", "Other/Not in this List"].map((useCase) => (
                    <div key={useCase} className="flex items-center space-x-2">
                      <Checkbox
                        id={`usecase-${useCase}`}
                        checked={formData.primaryUseCase.includes(useCase)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, primaryUseCase: [...formData.primaryUseCase, useCase] });
                          } else {
                            setFormData({ ...formData, primaryUseCase: formData.primaryUseCase.filter(uc => uc !== useCase) });
                          }
                        }}
                      />
                      <Label htmlFor={`usecase-${useCase}`} className="text-sm font-normal cursor-pointer">
                        {useCase}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="callingDirection" className="text-sm font-medium">
                  Calling Direction <span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Preferred Languages <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-lg bg-background/50 border border-border">
                  {["English", "Hindi", "Hinglish", "Marathi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Gujarati", "Punjabi", "Others"].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${lang}`}
                        checked={formData.preferredLanguages.includes(lang)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, preferredLanguages: [...formData.preferredLanguages, lang] });
                          } else {
                            setFormData({ ...formData, preferredLanguages: formData.preferredLanguages.filter(l => l !== lang) });
                          }
                        }}
                      />
                      <Label htmlFor={`lang-${lang}`} className="text-sm font-normal cursor-pointer">
                        {lang}
                      </Label>
                    </div>
                  ))}
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
                  Current Calling Setup <span className="text-red-500">*</span>
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary min-h-[120px]"
                  placeholder="Tell us about your use case..."
                />
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
                disabled={isSubmitting || !captchaToken}
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Schedule a Demo"}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                After you submit, our scheduling assistant will call you to confirm a demo slot. By submitting, you agree to receive a scheduling call related to your request.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
