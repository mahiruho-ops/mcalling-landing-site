import { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { cancellationRefundsDocument } from "@/content/mkcalling/legal/cancellation-refunds";

export const metadata: Metadata = {
  title: "Cancellation & Refunds",
  description: cancellationRefundsDocument.description,
};

export default function CancellationRefundsPage() {
  return <LegalDocumentPage document={cancellationRefundsDocument} />;
}
