"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";
import { PasswordGeneratorFaq } from "./password-generator-faq-ssr";
import { PasswordGeneratorHero } from "./password-generator-hero-ssr";
import { PasswordGeneratorRelatedTools } from "./password-generator-related-tools-ssr";
import { PasswordGeneratorSeoContent } from "./password-generator-seo-content-ssr";

interface PasswordGeneratorToolProps {
  lang?: LanguageType;
}

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  mode: "random" | "passphrase";
  passphraseWords?: number;
  passphraseSeparator?: string;
}

const presets = [
  {
    key: "pin",
    length: 4,
    uppercase: false,
    lowercase: false,
    numbers: true,
    symbols: false,
    excludeAmbiguous: false,
  },
  {
    key: "simple",
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeAmbiguous: false,
  },
  {
    key: "secure",
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  },
  {
    key: "apiKey",
    length: 32,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeAmbiguous: true,
  },
];

const WORDS = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "house",
  "island",
  "jungle",
  "kitten",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "piano",
  "queen",
  "rainbow",
  "sunset",
  "tree",
  "umbrella",
  "violin",
  "window",
  "xylophone",
  "yacht",
  "zebra",
  "castle",
  "dragon",
  "forest",
  "castle",
  "garden",
  "bridge",
  "castle",
  "palace",
  "temple",
  "garden",
  "meadow",
  "valley",
  "canyon",
  "river",
  "ocean",
  "beach",
  "island",
  "desert",
  "tundra",
  "volcano",
  "crystal",
  "diamond",
  "emerald",
  "ruby",
  "sapphire",
  "pearl",
  "golden",
  "silver",
  "bronze",
  "iron",
  "copper",
  "steel",
  "metal",
  "stone",
  "rock",
  "marble",
  "granite",
  "sand",
  "dust",
  "cloud",
  "storm",
  "thunder",
  "lightning",
  "rain",
  "snow",
  "hail",
  "wind",
  "breeze",
  "tempest",
  "hurricane",
  "tornado",
  "cyclone",
  "whirlwind",
  "gust",
];

function generatePassphrase(options: PasswordOptions): string {
  const wordCount = options.passphraseWords || 4;
  const separator = options.passphraseSeparator || "-";
  const words: string[] = [];

  const array = new Uint32Array(wordCount);
  crypto.getRandomValues(array);

  for (let i = 0; i < wordCount; i++) {
    const wordIndex = array[i] % WORDS.length;
    let word = WORDS[wordIndex];

    if (options.uppercase) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    words.push(word);
  }

  let passphrase = words.join(separator);

  if (options.numbers) {
    const numberArray = new Uint32Array(1);
    crypto.getRandomValues(numberArray);
    const number = (numberArray[0] % 999) + 1;
    passphrase += separator + number.toString().padStart(3, "0");
  }

  if (options.symbols) {
    const symbolArray = new Uint32Array(1);
    crypto.getRandomValues(symbolArray);
    const symbols = "!@#$%^&*";
    const symbolIndex = symbolArray[0] % symbols.length;
    passphrase += symbols[symbolIndex];
  }

  return passphrase;
}

function generatePassword(options: PasswordOptions): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const ambiguousChars = "0O1lI";

  let chars = "";
  if (options.uppercase) chars += uppercaseChars;
  if (options.lowercase) chars += lowercaseChars;
  if (options.numbers) chars += numberChars;
  if (options.symbols) chars += symbolChars;

  if (options.excludeAmbiguous) {
    chars = chars
      .split("")
      .filter((c) => !ambiguousChars.includes(c))
      .join("");
  }

  if (chars.length === 0) {
    chars = lowercaseChars + numberChars;
  }

  let password = "";
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
}

function calculateStrength(password: string, options: PasswordOptions): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (options.uppercase && options.lowercase) score += 1;
  if (options.numbers) score += 1;
  if (options.symbols) score += 1;
  return Math.min(score, 5);
}

function getStrengthLabel(
  strength: number,
  t: (key: string) => string,
): string {
  const labels = [
    "passwordGenerator.strength.weak",
    "passwordGenerator.strength.weak",
    "passwordGenerator.strength.fair",
    "passwordGenerator.strength.good",
    "passwordGenerator.strength.strong",
    "passwordGenerator.strength.veryStrong",
  ];
  return t(labels[strength]);
}

function getStrengthColor(strength: number): string {
  const colors = [
    "bg-red-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];
  return colors[strength];
}

export function PasswordGeneratorTool({
  lang = "en" as LanguageType,
}: PasswordGeneratorToolProps) {
  const { t } = useTranslation(lang);
  const { spawnItem } = useCat();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const COOLDOWN_DURATION = 3000;

  const shouldSpawnItem = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTime >= COOLDOWN_DURATION) {
      setLastSpawnTime(now);
      return true;
    }
    return false;
  }, [lastSpawnTime]);

  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    mode: "random",
    passphraseWords: 4,
    passphraseSeparator: "-",
  });

  const [password, setPassword] = useState("");
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(5);
  const [copied, setCopied] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [generationStats, setGenerationStats] = useState({
    totalGenerations: 0,
    randomCount: 0,
    passphraseCount: 0,
    bulkCount: 0,
    lastUsed: null as Date | null,
  });

  const strength = password ? calculateStrength(password, options) : 0;

  const handleGenerate = useCallback(() => {
    const newPassword =
      options.mode === "passphrase"
        ? generatePassphrase(options)
        : generatePassword(options);
    setPassword(newPassword);
    setBulkPasswords([]);

    if (shouldSpawnItem()) {
      spawnItem("sparkles");
    }

    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + 1,
      randomCount:
        options.mode === "random" ? prev.randomCount + 1 : prev.randomCount,
      passphraseCount:
        options.mode === "passphrase"
          ? prev.passphraseCount + 1
          : prev.passphraseCount,
      bulkCount: prev.bulkCount,
      lastUsed: new Date(),
    }));
  }, [options, spawnItem, shouldSpawnItem]);

  const handleBulkGenerate = useCallback(() => {
    const passwords: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      const pwd =
        options.mode === "passphrase"
          ? generatePassphrase(options)
          : generatePassword(options);
      passwords.push(pwd);
    }
    setBulkPasswords(passwords);
    setPassword("");

    if (shouldSpawnItem()) {
      spawnItem("sparkles");
    }
  }, [options, bulkCount, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const applyPreset = useCallback((preset: (typeof presets)[0]) => {
    setOptions({
      length: preset.length,
      uppercase: preset.uppercase,
      lowercase: preset.lowercase,
      numbers: preset.numbers,
      symbols: preset.symbols,
      excludeAmbiguous: preset.excludeAmbiguous,
      mode: "random",
      passphraseWords: 4,
      passphraseSeparator: "-",
    });
  }, []);

  const clearPassword = useCallback(() => {
    setPassword("");
    setBulkPasswords([]);
  }, []);

  return (
    <main
      className="container mx-auto max-w-6xl px-4 py-8"
      aria-labelledby="page-title"
    >
      {/* Hero Section - SSR */}
      <PasswordGeneratorHero lang={lang} />

      {/* Tool Section */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Output */}
            <div className="mb-6">
              <div className="flex items-center justify-between h-8 mb-2">
                <span className="text-sm font-medium">
                  {t("passwordGenerator.outputLabel")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(password)}
                  disabled={!password}
                  className="rounded-lg"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        className="flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        {t("common.copied")}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        className="flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Copy className="h-4 w-4 mr-1" /> {t("common.copy")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
              <div className="min-h-[80px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                {password ? (
                  <CodeHighlighter
                    code={password}
                    language="javascript"
                    className="min-h-[80px]"
                  />
                ) : (
                  <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                    {t("passwordGenerator.outputPlaceholder")}
                  </div>
                )}
              </div>

              {/* Strength indicator */}
              {password && (
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      {t("passwordGenerator.strength")}
                    </span>
                    <span className="text-xs font-medium">
                      {getStrengthLabel(strength, t)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getStrengthColor(strength)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength / 5) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Options */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                {/* Mode selector */}
                <div>
                  <span className="text-sm font-medium block mb-2">
                    {t("passwordGenerator.mode.label")}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOptions({ ...options, mode: "random" });
                        clearPassword();
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                        options.mode === "random"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {t("passwordGenerator.mode.random")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOptions({ ...options, mode: "passphrase" });
                        clearPassword();
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                        options.mode === "passphrase"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {t("passwordGenerator.mode.passphrase")}
                    </button>
                  </div>
                </div>

                {/* Passphrase options */}
                {options.mode === "passphrase" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {t("passwordGenerator.passphrase.words")}
                        </span>
                        <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {options.passphraseWords}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="8"
                        value={options.passphraseWords}
                        onChange={(e) => {
                          setOptions({
                            ...options,
                            passphraseWords: parseInt(e.target.value, 10),
                          });
                          clearPassword();
                        }}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>3</span>
                        <span>8</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium block mb-2">
                        {t("passwordGenerator.passphrase.separator")}
                      </span>
                      <select
                        value={options.passphraseSeparator}
                        onChange={(e) => {
                          setOptions({
                            ...options,
                            passphraseSeparator: e.target.value,
                          });
                          clearPassword();
                        }}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                      >
                        <option value="-">
                          {t("passwordGenerator.passphrase.separator.hyphen")}
                        </option>
                        <option value="_">
                          {t(
                            "passwordGenerator.passphrase.separator.underscore",
                          )}
                        </option>
                        <option value=" ">
                          {t("passwordGenerator.passphrase.separator.space")}
                        </option>
                        <option value=".">
                          {t("passwordGenerator.passphrase.separator.period")}
                        </option>
                        <option value="">
                          {t("passwordGenerator.passphrase.separator.none")}
                        </option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Length slider - only for random mode */}
                {options.mode === "random" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {t("passwordGenerator.length")}
                      </span>
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {options.length}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="64"
                      value={options.length}
                      onChange={(e) => {
                        setOptions({
                          ...options,
                          length: parseInt(e.target.value, 10),
                        });
                        clearPassword();
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>4</span>
                      <span>64</span>
                    </div>
                  </div>
                )}

                {/* Character options */}
                <div className="space-y-2">
                  <span className="text-sm font-medium">
                    {options.mode === "passphrase"
                      ? t("passwordGenerator.option.additional")
                      : t("passwordGenerator.options")}
                  </span>
                  {[
                    {
                      key: "uppercase",
                      label: t("passwordGenerator.option.capitalize"),
                      mode: "both",
                    },
                    {
                      key: "numbers",
                      label: t("passwordGenerator.numbers"),
                      mode: "both",
                    },
                    {
                      key: "symbols",
                      label: t("passwordGenerator.symbols"),
                      mode: "both",
                    },
                    {
                      key: "excludeAmbiguous",
                      label: t("passwordGenerator.excludeAmbiguous"),
                      mode: "random",
                    },
                  ]
                    .filter(
                      (opt) => opt.mode === "both" || opt.mode === options.mode,
                    )
                    .map((opt) => (
                      <label
                        key={opt.key}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            options[opt.key as keyof PasswordOptions] as boolean
                          }
                          onChange={(e) => {
                            setOptions({
                              ...options,
                              [opt.key]: e.target.checked,
                            });
                            clearPassword();
                          }}
                          className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Presets */}
                <div>
                  <span className="text-sm font-medium block mb-2">
                    {t("passwordGenerator.presets")}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <button
                        type="button"
                        key={preset.key}
                        onClick={() => applyPreset(preset)}
                        className="px-3 py-2 text-sm font-medium rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-colors"
                      >
                        {t(`passwordGenerator.preset.${preset.key}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bulk generate toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowBulk(!showBulk)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    {t("passwordGenerator.bulk")}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showBulk ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {showBulk && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-sm">
                            {t("passwordGenerator.bulkCount")}:
                          </span>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={bulkCount}
                            onChange={(e) =>
                              setBulkCount(
                                Math.min(
                                  100,
                                  Math.max(
                                    1,
                                    parseInt(e.target.value, 10) || 1,
                                  ),
                                ),
                              )
                            }
                            className="w-20 px-2 py-1 text-sm border border-border rounded-lg bg-background"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBulkGenerate}
                            className="rounded-lg"
                          >
                            {t("passwordGenerator.generate")}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bulk passwords output */}
            {bulkPasswords.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {t("passwordGenerator.output.generated")} (
                    {bulkPasswords.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bulkPasswords.join("\n"))}
                    className="rounded-lg"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {t("passwordGenerator.output.copyAll")}
                  </Button>
                </div>
                <div className="max-h-[200px] overflow-auto rounded-xl border-2 border-border bg-muted/30 p-4">
                  {bulkPasswords.map((pwd, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 font-mono text-sm"
                    >
                      <span>{pwd}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(pwd)}
                        className="h-6 w-6 p-0"
                        aria-label={t("common.copy")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generate button */}
            <div className="flex items-center justify-between gap-3 mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleGenerate}
                  className="gap-2 rounded-xl h-11"
                >
                  <Sparkles className="h-4 w-4" />
                  {t("passwordGenerator.generate")}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  disabled={!password}
                  className="gap-2 rounded-xl h-11"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t("passwordGenerator.regenerate")}
                </Button>
              </div>

              {/* Usage Analysis Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {generationStats.totalGenerations} Generated
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {generationStats.randomCount} Random
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {generationStats.passphraseCount} Words
                </div>
                {generationStats.lastUsed && (
                  <div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium"
                    title={`Last used: ${generationStats.lastUsed.toLocaleString()}`}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    {generationStats.lastUsed.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Presets Section */}
      <section className="mb-12">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t("passwordGenerator.presetsTitle")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("passwordGenerator.presetsDesc")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {presets.map((preset, index) => (
                <motion.div
                  key={preset.key}
                  className="pixel-card p-4 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold capitalize">
                        {preset.key}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {preset.length} {t("passwordGenerator.preset.chars")}
                        {preset.symbols &&
                          ` • ${t("passwordGenerator.preset.symbols")}`}
                        {preset.numbers &&
                          ` • ${t("passwordGenerator.preset.numbers")}`}
                        {preset.uppercase &&
                          ` • ${t("passwordGenerator.preset.upper")}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOptions({
                          ...options,
                          length: preset.length,
                          uppercase: preset.uppercase,
                          lowercase: true,
                          numbers: preset.numbers,
                          symbols: preset.symbols,
                          excludeAmbiguous: preset.excludeAmbiguous,
                        });
                        clearPassword();
                      }}
                      className="pixel-btn px-3 py-1 text-xs h-7"
                      title={t("passwordGenerator.preset.loadOnly")}
                    >
                      <Sparkles className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {t("passwordGenerator.length")}: {preset.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Content Section - SSR */}
      <PasswordGeneratorSeoContent lang={lang} />

      {/* FAQ Section - SSR */}
      <PasswordGeneratorFaq lang={lang} />

      {/* Related Tools - SSR */}
      <PasswordGeneratorRelatedTools
        lang={lang}
        currentTool="password-generator"
      />
    </main>
  );
}
