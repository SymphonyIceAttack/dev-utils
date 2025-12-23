import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface EncodingConverterRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function EncodingConverterRelatedTools({
  lang,
  currentTool,
}: EncodingConverterRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
