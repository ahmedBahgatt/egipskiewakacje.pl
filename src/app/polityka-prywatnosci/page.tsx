import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/content/LegalPageView";

const SLUG = "polityka-prywatnosci";

export async function generateMetadata(): Promise<Metadata> {
  const page = await content.getLegalPage(SLUG);
  return page ? buildMetadata(page.seo) : {};
}

export default async function Page() {
  const page = await content.getLegalPage(SLUG);
  if (!page) notFound();
  return <LegalPageView page={page} />;
}
