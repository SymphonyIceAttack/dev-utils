import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface UrlEncoderRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function UrlEncoderRelatedTools({
  lang,
  currentTool,
}: UrlEncoderRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
