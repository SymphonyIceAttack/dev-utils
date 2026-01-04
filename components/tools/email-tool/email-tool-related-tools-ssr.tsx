import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface EmailToolRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function EmailToolRelatedTools({
  lang,
  currentTool,
}: EmailToolRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
