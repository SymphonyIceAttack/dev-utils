export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  formatted?: string;
  parsed?: unknown;
}

export function validateJson(jsonString: string): ValidationResult {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      valid: true,
      formatted: JSON.stringify(parsed, null, 2),
      parsed,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : "Invalid JSON"],
    };
  }
}

export function formatValidationErrors(errors: string[]): string {
  return errors.map((error) => `• ${error}`).join("\n");
}

export function analyzeJsonIssues(jsonString: string): {
  syntax: boolean;
  structure: boolean;
  suggestions: string[];
} {
  const issues = {
    syntax: true,
    structure: true,
    suggestions: [] as string[],
  };

  try {
    const parsed = JSON.parse(jsonString);
    issues.syntax = true;

    // Basic structure analysis
    if (typeof parsed === "object" && parsed !== null) {
      issues.structure = true;

      // Add suggestions based on content
      if (Array.isArray(parsed) && parsed.length === 0) {
        issues.suggestions.push("Consider adding items to this empty array");
      }

      if (typeof parsed === "object" && Object.keys(parsed).length === 0) {
        issues.suggestions.push(
          "Consider adding properties to this empty object",
        );
      }
    }
  } catch {
    issues.syntax = false;
    issues.suggestions.push("Fix JSON syntax errors");
  }

  return issues;
}
