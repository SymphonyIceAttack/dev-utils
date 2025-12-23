import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface PasswordGeneratorRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function PasswordGeneratorRelatedTools({
  lang,
  currentTool,
}: PasswordGeneratorRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
