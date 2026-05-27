export type LegalSection = {
  id?: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  effectiveDate: string;
  lastUpdated: string;
  intro?: string[];
  sections: LegalSection[];
};
