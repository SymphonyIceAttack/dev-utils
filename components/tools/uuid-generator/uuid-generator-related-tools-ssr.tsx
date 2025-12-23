import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface UuidGeneratorRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function UuidGeneratorRelatedTools({
  lang,
  currentTool,
}: UuidGeneratorRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
