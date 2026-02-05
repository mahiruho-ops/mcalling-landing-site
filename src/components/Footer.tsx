import { Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} mKcalling - All Rights Reserved | a solution by <a href="https://mahiruho.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mahiruho</a>
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="/trust-compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trust & Compliance</Link>
            <a
              href="https://www.linkedin.com/company/mahiruho-consulting-services"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
