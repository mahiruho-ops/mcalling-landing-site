import { Linkedin } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/content/mkcalling/nav";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
        <p className="max-w-xl text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} mKcalling - All Rights Reserved | a solution by{" "}
          <a href="https://mahiruho.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Mahiruho
          </a>
        </p>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Footer">
            {navItems.filter((item) => !item.cta).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://www.linkedin.com/company/mahiruho-consulting-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
