import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import type { FaqItem } from "@/lib/supabase";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Law Office of Troy M. Moore, PLLC",
  description:
    "Answers to common questions about probate, estate planning, and personal injury law in Texas from Houston attorney Troy M. Moore.",
  alternates: { canonical: "https://troymoorelaw.com/faq" },
};

export default async function FaqPage() {
  const { data } = await supabase.from("faq").select("*").order("sort_order");
  const faqData: FaqItem[] = data ?? [];

  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ])} />
      <Navbar />
      <main>
        <FaqClient faqData={faqData} />
      </main>
      <Footer />
    </>
  );
}
