import { getHomepageFaqs } from "@/lib/content/faqs";
import { FAQList } from "./FAQList";

export async function FAQ() {
  const faqs = await getHomepageFaqs();
  return <FAQList faqs={faqs} />;
}
