import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type UseCase = {
  slug: string;
  title: string;
  description?: string;
  contentHtml: string;
};

const useCasesDir = path.join(process.cwd(), "industry-usecases");

// SEO slugs mapping (file base name -> SEO-friendly slug)
const fileToSeoSlug: Record<string, string> = {
  bfsi: "banking-financial-services",
  retail: "retail",
  technology: "technology-software",
  manufacturing: "manufacturing",
  hospitality: "hospitality-travel",
  government: "egov-citizen-services",
  healthcare: "healthcare",
  ecommerce: "ecommerce",
  education: "education",
};

const seoToFileSlug: Record<string, string> = Object.fromEntries(
  Object.entries(fileToSeoSlug).map(([file, seo]) => [seo, file])
);

export function getUseCaseSlugs(): string[] {
  if (!fs.existsSync(useCasesDir)) return [];
  return fs
    .readdirSync(useCasesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .map((file) => fileToSeoSlug[file] || file);
}

export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  const fileSlug = seoToFileSlug[slug] || slug;
  const filePath = path.join(useCasesDir, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const sanitized = sanitizeMarkdown(content);
  const processed = await remark().use(html).process(sanitized);
  return {
    slug,
    title: (data.title as string) || toTitle(fileSlug),
    description: (data.description as string) || undefined,
    contentHtml: processed.toString(),
  };
}

export async function getAllUseCases(): Promise<UseCase[]> {
  const slugs = getUseCaseSlugs();
  const entries = await Promise.all(slugs.map((s) => getUseCaseBySlug(s)));
  return entries.filter(Boolean) as UseCase[];
}

function toTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/Bfsi/i, "BFSI");
}

// Remove private/marketing-only sections and keep web-safe content
function sanitizeMarkdown(input: string): string {
  let out = input;

  // Prefer explicit public window if present
  const publicStart = out.indexOf("<!-- web:start -->");
  const publicEnd = out.indexOf("<!-- web:end -->");
  if (publicStart !== -1 && publicEnd !== -1 && publicEnd > publicStart) {
    out = out.slice(publicStart + "<!-- web:start -->".length, publicEnd);
  }

  // Remove explicit private blocks
  out = out.replace(/<!--\s*private:start\s*-->[\s\S]*?<!--\s*private:end\s*-->/gi, "");

  // Drop common marketing/internal sections by heading
  const forbidden = [
    "Internal",
    "Positioning",
    "Messaging",
    "Objections",
    "Battlecard",
    "Sales",
    "Roadmap",
    "Appendix",
    "Notes",
  ];
  for (const h of forbidden) {
    const re = new RegExp(`\n##\\s*${h}[\n\r]+[\\s\\S]*?(?=\n##\\s|$)`, "gi");
    out = out.replace(re, "\n");
  }

  // Remove lines tagged as internal
  out = out
    .split(/\r?\n/)
    .filter((line) => !/^\s*(?:>\s*)?\[(?:internal|draft)\]/i.test(line))
    .join("\n");

  // Hard cap overly long pages (safety)
  const words = out.split(/\s+/);
  if (words.length > 2500) {
    out = words.slice(0, 2500).join(" ") + "\n";
  }

  return out.trim();
}


