import { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { shippingDocument } from "@/content/mkcalling/legal/shipping";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: shippingDocument.description,
};

export default function ShippingPage() {
  return <LegalDocumentPage document={shippingDocument} />;
}
