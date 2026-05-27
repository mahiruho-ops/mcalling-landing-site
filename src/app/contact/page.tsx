import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { legalMeta } from "@/content/mkcalling/legal/meta";
import { Button } from "@/components/ui/button";

const m = legalMeta;

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact mKcalling for sales, billing, and support.",
};

function mailto(email: string, subject?: string) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${q}`;
}

export default function ContactPage() {
  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-12 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {m.brandLine}. We typically respond {m.responseTime} during {m.businessHours}.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 rounded-xl border border-border/50 bg-card p-6 md:p-8">
              <h2 className="text-lg font-semibold">Get in touch</h2>

              <ul className="space-y-5 text-sm">
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Support</p>
                    <a href={mailto(m.emails.support)} className="text-primary hover:underline">
                      {m.emails.support}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Sales</p>
                    <a href={mailto(m.emails.sales)} className="text-primary hover:underline">
                      {m.emails.sales}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Billing & refunds</p>
                    <a href={mailto(m.emails.billing)} className="text-primary hover:underline">
                      {m.emails.billing}
                    </a>
                    <span className="text-muted-foreground"> · </span>
                    <a href={mailto(m.emails.refunds)} className="text-primary hover:underline">
                      {m.emails.refunds}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                      {m.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Registered office</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {m.registeredAddress.lines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Business hours</p>
                    <p className="text-muted-foreground">{m.businessHours}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Linkedin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={m.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mahiruho on LinkedIn
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/schedule-demo">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Schedule a demo
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
