"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  KeyRound,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface PasswordGeneratorToolProps {
  lang: LanguageType;
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

// Common English words for passphrase generation (a subset for demo purposes)
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

    // Optionally capitalize first letter
    if (options.uppercase) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    words.push(word);
  }

  let passphrase = words.join(separator);

  // Add numbers if requested
  if (options.numbers) {
    const numberArray = new Uint32Array(1);
    crypto.getRandomValues(numberArray);
    const number = (numberArray[0] % 999) + 1; // 1-999
    passphrase += separator + number.toString().padStart(3, "0");
  }

  // Add symbols if requested
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

export function PasswordGeneratorTool({ lang }: PasswordGeneratorToolProps) {
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
  const [showFaq, setShowFaq] = useState(true); // 默认展开FAQ
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

    // Update statistics
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
      const password =
        options.mode === "passphrase"
          ? generatePassphrase(options)
          : generatePassword(options);
      passwords.push(password);
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

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="mb-10 text-center" variants={itemVariants}>
        <motion.div
          className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          whileHover={{
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <KeyRound className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("passwordGenerator.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("passwordGenerator.pageSubtitle")}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
        >
          {[
            t("badge.cryptographicallySecure"),
            t("badge.multipleModes"),
            t("badge.passphraseSupport"),
            t("badge.bulkGeneration"),
          ].map((tag) => (
            <motion.span
              key={tag}
              className="pixel-badge"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Output */}
            <div className="mb-6">
              <div className="flex items-center justify-between h-8 mb-2">
                <span className="text-sm font-medium">
                  {t("passwordGenerator.outputLabel")}
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                          <Check className="h-4 w-4 mr-1" />{" "}
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
                </motion.div>
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
                    <motion.button
                      onClick={() => {
                        setOptions({ ...options, mode: "random" });
                        setPassword(""); // Clear password when options change
                        setBulkPasswords([]); // Clear bulk passwords when options change
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                        options.mode === "random"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("passwordGenerator.mode.random")}
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setOptions({ ...options, mode: "passphrase" });
                        setPassword(""); // Clear password when options change
                        setBulkPasswords([]); // Clear bulk passwords when options change
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                        options.mode === "passphrase"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("passwordGenerator.mode.passphrase")}
                    </motion.button>
                  </div>
                </div>

                {/* Passphrase options */}
                {options.mode === "passphrase" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{t("passwordGenerator.passphrase.words")}</span>
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
                          setPassword(""); // Clear password when options change
                          setBulkPasswords([]); // Clear bulk passwords when options change
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
                          setPassword(""); // Clear password when options change
                          setBulkPasswords([]); // Clear bulk passwords when options change
                        }}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                      >
                        <option value="-">{t("passwordGenerator.passphrase.separator.hyphen")}</option>
                        <option value="_">{t("passwordGenerator.passphrase.separator.underscore")}</option>
                        <option value=" ">{t("passwordGenerator.passphrase.separator.space")}</option>
                        <option value=".">{t("passwordGenerator.passphrase.separator.period")}</option>
                        <option value="">{t("passwordGenerator.passphrase.separator.none")}</option>
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
                        setPassword(""); // Clear password when options change
                        setBulkPasswords([]); // Clear bulk passwords when options change
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
                            setPassword(""); // Clear password when options change
                            setBulkPasswords([]); // Clear bulk passwords when options change
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
                      <motion.button
                        key={preset.key}
                        onClick={() => applyPreset(preset)}
                        className="px-3 py-2 text-sm font-medium rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t(`passwordGenerator.preset.${preset.key}`)}
                      </motion.button>
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
                    {t("passwordGenerator.output.generated")} ({bulkPasswords.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bulkPasswords.join("\n"))}
                    className="rounded-lg"
                  >
                    <Copy className="h-4 w-4 mr-1" /> {t("passwordGenerator.output.copyAll")}
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
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generate button */}
            <motion.div
              className="flex items-center justify-between gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    onClick={handleGenerate}
                    className="gap-2 rounded-xl h-11"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                    {t("passwordGenerator.generate")}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={!password}
                    className="gap-2 rounded-xl h-11"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t("passwordGenerator.regenerate")}
                  </Button>
                </motion.div>
              </div>

              {/* Usage Analysis Tags - 右侧 */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {generationStats.totalGenerations} Generated
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {generationStats.randomCount} Random
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {generationStats.passphraseCount} Words
                </motion.div>
                {generationStats.lastUsed && (
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                    title={`Last used: ${generationStats.lastUsed.toLocaleString()}`}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    {generationStats.lastUsed.toLocaleTimeString()}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Presets Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="h-5 w-5" />
              {t("passwordGenerator.presetsTitle")}
            </motion.h3>
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
                        {preset.symbols && ` • ${t("passwordGenerator.preset.symbols")}`}
                        {preset.numbers && ` • ${t("passwordGenerator.preset.numbers")}`}
                        {preset.uppercase && ` • ${t("passwordGenerator.preset.upper")}`}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <motion.button
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
                          setPassword(""); // Clear password when preset changes
                          setBulkPasswords([]); // Clear bulk passwords when preset changes
                          // Note: Do NOT auto-generate, let user manually click generate button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={t("passwordGenerator.preset.loadOnly")}
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {t("passwordGenerator.length")}: {preset.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* SEO Content Section */}
      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-xl font-bold mb-4" variants={itemVariants}>
          {t("passwordGenerator.seo.title")}
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: t("passwordGenerator.seo.desc") }}
        />

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("passwordGenerator.tech.title")}
        </motion.h3>
        <motion.div
          className="bg-muted/30 rounded-xl p-4 mb-6"
          variants={itemVariants}
        >
          <div className="grid gap-4 text-sm">
            <div>
              <strong>{t("passwordGenerator.tech.randomTitle")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>
                  {t("passwordGenerator.tech.randomList1")}
                </li>
                <li>
                  {t("passwordGenerator.tech.randomList2")}
                </li>
                <li>
                  {t("passwordGenerator.tech.randomList3")}
                </li>
                <li>
                  {t("passwordGenerator.tech.randomList4")}
                </li>
                <li>
                  {t("passwordGenerator.tech.randomList5")}
                </li>
              </ul>
            </div>
            <div>
              <strong>{t("passwordGenerator.tech.passphraseTitle")}</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>
                  {t("passwordGenerator.tech.passphraseList1")}
                </li>
                <li>{t("passwordGenerator.tech.passphraseList2")}</li>
                <li>{t("passwordGenerator.tech.passphraseList3")}</li>
                <li>
                  {t("passwordGenerator.tech.passphraseList4")}
                </li>
                <li>
                  {t("passwordGenerator.tech.passphraseList5")}
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("passwordGenerator.features.title")}
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: t("passwordGenerator.feature.secure.title"),
              desc: t("passwordGenerator.feature.secure.desc"),
            },
            {
              title: t("passwordGenerator.feature.modes.title"),
              desc: t("passwordGenerator.feature.modes.desc"),
            },
            {
              title: t("passwordGenerator.feature.passphrase.title"),
              desc: t("passwordGenerator.feature.passphrase.desc"),
            },
            {
              title: t("passwordGenerator.feature.bulk.title"),
              desc: t("passwordGenerator.feature.bulk.desc"),
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="pixel-card p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          {t("passwordGenerator.bestPractices.title")}
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            {
              case: t("passwordGenerator.bestPractices.item1"),
              boundary:
                t("passwordGenerator.bestPractices.boundary1"),
            },
            {
              case: t("passwordGenerator.bestPractices.item2"),
              boundary:
                t("passwordGenerator.bestPractices.boundary2"),
            },
            {
              case: t("passwordGenerator.bestPractices.item3"),
              boundary:
                t("passwordGenerator.bestPractices.boundary3"),
            },
            {
              case: t("passwordGenerator.bestPractices.item4"),
              boundary:
                t("passwordGenerator.bestPractices.boundary4"),
            },
            {
              case: t("passwordGenerator.bestPractices.item5"),
              boundary:
                t("passwordGenerator.bestPractices.boundary5"),
            },
          ].map((item, index) => (
            <motion.li
              key={item.case}
              className="flex items-start gap-3 text-sm"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              <div>
                <div className="font-medium">{item.case}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.boundary}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">{t("passwordGenerator.faq.title")}</h2>
          <motion.div
            animate={{ rotate: showFaq ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showFaq && (
            <motion.div
              className="space-y-4 pt-6 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                {
                  q: t("passwordGenerator.faq.q1"),
                  a: t("passwordGenerator.faq.a1"),
                },
                {
                  q: t("passwordGenerator.faq.q2"),
                  a: t("passwordGenerator.faq.a2"),
                },
                {
                  q: t("passwordGenerator.faq.q3"),
                  a: t("passwordGenerator.faq.a3"),
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  className="pixel-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
