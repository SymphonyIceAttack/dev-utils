import type { LanguageType } from "@/lib/translations";
import { RelatedTools } from "../related-tools";

interface Md5GeneratorRelatedToolsProps {
  lang: LanguageType;
  currentTool: string;
}

export function Md5GeneratorRelatedTools({
  lang,
  currentTool,
}: Md5GeneratorRelatedToolsProps) {
  return <RelatedTools lang={lang} currentTool={currentTool} />;
}
