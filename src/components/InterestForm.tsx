"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
}

export const InterestForm = () => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Detect country on mount
  const [detectedCountry, setDetectedCountry] = useState<CountryCode>(defaultCountry);
  
  useEffect(() => {
    setDetectedCountry(detectCountryFromBrowser());
  }, []);

  const [formData, setFormData] = useState<InterestFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    interestType: null,
    countryCode: detectedCountry.dialCode,
    phone: "",
    industry: "",
  });

  // Update country code when detected country changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, countryCode: detectedCountry.dialCode }));
  }, [detectedCountry]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const selectedCountry = countryCodes.find(c => c.dialCode === formData.countryCode) || defaultCountry;

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
          title: "Thank you for your interest!",
          description: "Our team will contact you soon to schedule a demo.",
        });
        setFormData({ 
          name: "", 
          email: "", 
          company: "", 
          message: "", 
          interestType: null,
          countryCode: detectedCountry.dialCode,
          phone: "",
          industry: "",
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
              Be the First to Experience{" "}
              <br />
              <span className="gradient-text-primary">
                The Future
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our waitlist and get early access to the platform
            </p>
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
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                  >
                    <SelectTrigger className="w-[140px] bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.dialCode}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.dialCode}</span>
                            <span className="text-xs text-muted-foreground">({country.code})</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Select
                  value={formData.industry}
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
                Our AI Agent will call you to schedule demo for you. No spam, ever.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
