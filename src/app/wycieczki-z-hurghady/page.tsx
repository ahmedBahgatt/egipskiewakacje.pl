import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { DestinationPage } from "@/components/destination/DestinationPage";

const SLUG = "hurghada";

export async function generateMetadata(): Promise<Metadata> {
  const d = await content.getDestination(SLUG);
  return d ? buildMetadata(d.seo) : {};
}

export default async function Page() {
  const destination = await content.getDestination(SLUG);
  if (!destination) notFound();
  const tours = await content.getToursByDestination(SLUG);
  const relatedPost = await content.getPost("co-zabrac-na-wycieczke-do-kairu");
  return <DestinationPage destination={destination} tours={tours} relatedPost={relatedPost} />;
}
