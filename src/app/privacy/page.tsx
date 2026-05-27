import { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { privacyDocument } from "@/content/mkcalling/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDocument.description,
};

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyDocument} />;
}
