import { notFound } from "next/navigation";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  return children;
}
