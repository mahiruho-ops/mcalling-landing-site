import { Linkedin } from "lucide-react";
import Link from "next/link";
import { legalFooterLinks } from "@/content/mkcalling/legal/meta";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-6 space-y-6">
        <nav
          aria-label="Legal and compliance"
          className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2"
        >
          {legalFooterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} mKcalling - All Rights Reserved | a solution by{" "}
            <a
              href="https://mahiruho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Mahiruho
            </a>
          </p>

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
    </footer>
  );
};
