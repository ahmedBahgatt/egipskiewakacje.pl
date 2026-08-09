import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { TourDetail } from "@/components/tour/TourDetail";
import { tourRelations } from "@/lib/related";

export const dynamicParams = false;

export async function generateStaticParams() {
  const tours = await content.getToursByDestination("sharm-el-sheikh");
  return tours.map((t) => ({ tour: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tour: string }>;
}): Promise<Metadata> {
  const { tour } = await params;
  const t = (await content.getToursByDestination("sharm-el-sheikh")).find((x) => x.slug === tour);
  return t ? buildMetadata({ ...t.seo, type: "article" }) : {};
}

export default async function Page({ params }: { params: Promise<{ tour: string }> }) {
  const { tour } = await params;
  const t = (await content.getToursByDestination("sharm-el-sheikh")).find((x) => x.slug === tour);
  if (!t) notFound();
  const destination = await content.getDestination(t.destination);
  const relatedPost = t.relatedPostSlug ? await content.getPost(t.relatedPostSlug) : undefined;
  if (!destination) notFound();
  const rel = await tourRelations(t);
  return <TourDetail tour={t} destination={destination} relatedPost={relatedPost} {...rel} />;
}
