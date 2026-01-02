import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface BinaryCodeTranslatorRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function BinaryCodeTranslatorRelatedTools({
  lang,
  currentTool,
}: BinaryCodeTranslatorRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
