import { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { termsDocument } from "@/content/mkcalling/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: termsDocument.description,
};

export default function TermsPage() {
  return <LegalDocumentPage document={termsDocument} />;
}
