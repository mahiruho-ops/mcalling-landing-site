import { Card } from "./ui/card";
import { Globe2, Mic, Languages, Check, Globe } from "lucide-react";

export const Multilingual = () => {
  return (
    <section className="py-24 px-6 relative bg-card/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center ">
            <div>
              <Globe className="w-16 h-16 text-primary mb-6" />
              <h2 className="text-5xl font-bold mb-6">Converse in Any Language -{" "}
              <span className="gradient-text-primary">
              Text or Voice
            </span>
                </h2>
              <p className="text-muted-foreground mb-4">Reduce per‑locale maintenance with translation memory and locale routing.</p>
              <div className="space-y-4">
                {[
                  'Instant translation and detection reduce agent handoffs',
                  'Serve voice and IVR with consistent NLU',
                  'Compliant tone and terminology per locale',
                  'Support for 100+ languages without per-language builds'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">Enterprise glossary and tone guides supported during beta.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'French', 'German', 'Japanese'].map((lang, i) => (
                <div key={i} className="p-4 bg-card rounded-lg border border-border text-center hover:border-primary/50 transition-all">
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
  return (
    <section className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Converse in Any Language -{" "}
              <span className="gradient-text-primary">
                Text or Voice
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Break language barriers with intelligent translation and voice capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 bg-card border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up">
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Globe2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Auto Translation</h3>
                <p className="text-muted-foreground">
                  Instant translation and language detection
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Voice-to-Text</h3>
                <p className="text-muted-foreground">
                  IVR integration with natural voice recognition
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Languages className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Localization</h3>
                <p className="text-muted-foreground">
                  Regional optimization for global markets
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
