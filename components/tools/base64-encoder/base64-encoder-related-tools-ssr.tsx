import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface Base64EncoderRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function Base64EncoderRelatedTools({
  lang,
  currentTool,
}: Base64EncoderRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
