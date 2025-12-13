"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  QrCode,
  Settings,
  Sparkles,
} from "lucide-react";
import QRCode from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  }),
};

interface QrGeneratorToolProps {
  lang: LanguageType;
}

interface ExampleData {
  titleKey: string;
  data: string;
  type: string;
}

const exampleData: ExampleData[] = [
  {
    titleKey: "qrGenerator.examples.website",
    data: "https://example.com",
    type: "url",
  },
  {
    titleKey: "qrGenerator.examples.email",
    data: "mailto:john@example.com",
    type: "email",
  },
  {
    titleKey: "qrGenerator.examples.phone",
    data: "tel:+1234567890",
    type: "phone",
  },
  {
    titleKey: "qrGenerator.examples.wifi",
    data: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;",
    type: "wifi",
  },
  {
    titleKey: "qrGenerator.examples.sms",
    data: "sms:+1234567890?body=Hello World",
    type: "sms",
  },
  {
    titleKey: "qrGenerator.examples.text",
    data: "Hello World! This is a test QR code.",
    type: "text",
  },
];

interface QrSettings {
  size: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  margin: number;
  colorDark: string;
  colorLight: string;
}

export function QrGeneratorTool({ lang }: QrGeneratorToolProps) {
  const { t } = useTranslation(lang);
  const [input, setInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrSettings, setQrSettings] = useState<QrSettings>({
    size: 256,
    errorCorrectionLevel: "M",
    margin: 4,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const badges = [
    t("badge.free"),
    t("badge.noSignup"),
    t("badge.offline"),
    t("badge.privacy"),
  ];

  const features = [
    {
      titleKey: "qrGenerator.seo.feature1.title",
      descKey: "qrGenerator.seo.feature1.desc",
    },
    {
      titleKey: "qrGenerator.seo.feature2.title",
      descKey: "qrGenerator.seo.feature2.desc",
    },
    {
      titleKey: "qrGenerator.seo.feature3.title",
      descKey: "qrGenerator.seo.feature3.desc",
    },
    {
      titleKey: "qrGenerator.seo.feature4.title",
      descKey: "qrGenerator.seo.feature4.desc",
    },
  ];

  const faqs = [
    { qKey: "qrGenerator.faq.q1", aKey: "qrGenerator.faq.a1" },
    { qKey: "qrGenerator.faq.q2", aKey: "qrGenerator.faq.a2" },
    { qKey: "qrGenerator.faq.q3", aKey: "qrGenerator.faq.a3" },
    { qKey: "qrGenerator.faq.q4", aKey: "qrGenerator.faq.a4" },
  ];

  const generateQrCode = useCallback(async () => {
    if (!input.trim()) {
      setQrCodeUrl("");
      setError(null);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const options = {
        errorCorrectionLevel: qrSettings.errorCorrectionLevel,
        type: "image/png" as const,
        quality: 0.92,
        margin: qrSettings.margin,
        color: {
          dark: qrSettings.colorDark,
          light: qrSettings.colorLight,
        },
        width: qrSettings.size,
      };

      const url = await QRCode.toDataURL(input, options);
      setQrCodeUrl(url);
    } catch (_err) {
      setError(t("qrGenerator.error.generation"));
      setQrCodeUrl("");
    } finally {
      setIsGenerating(false);
    }
  }, [input, qrSettings, t]);

  useEffect(() => {
    if (input.trim()) {
      const timer = setTimeout(() => {
        generateQrCode();
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setQrCodeUrl("");
    }
  }, [input, generateQrCode]);

  const downloadQrCode = useCallback(() => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrCodeUrl;
    link.click();
  }, [qrCodeUrl]);

  const loadExample = useCallback((data: string, _type: string) => {
    setInput(data);
    setError(null);
    setActiveTab("create");
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof QrSettings>(key: K, value: QrSettings[K]) => {
      setQrSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-500"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <QrCode className="h-6 w-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("qrGenerator.pageTitle")}
            </h1>
            <p className="text-muted-foreground">
              {t("qrGenerator.pageSubtitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <Badge variant="secondary" className="rounded-full">
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-12"
        variants={itemVariants}
        ref={toolSectionRef}
      >
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="create" className="rounded-lg">
                  {t("qrGenerator.create")}
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("qrGenerator.examples")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <motion.div
                  className="grid gap-6 lg:grid-cols-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="qr-input"
                        className="text-sm font-medium mb-2 block"
                      >
                        {t("qrGenerator.inputLabel")}
                      </label>
                      <Textarea
                        placeholder={t("qrGenerator.inputPlaceholder")}
                        className="min-h-[200px] rounded-xl"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="text-xs text-muted-foreground mt-2">
                        {input.length} {t("qrGenerator.characters")}
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {t("qrGenerator.preview")}
                      </h3>
                      {qrCodeUrl && (
                        <Button
                          onClick={downloadQrCode}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          {t("qrGenerator.download")}
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-xl border-2 border-dashed border-border">
                      {isGenerating ? (
                        <motion.div
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="h-6 w-6 text-pink-500" />
                          </motion.div>
                          <span className="text-sm text-muted-foreground">
                            {t("qrGenerator.generating")}
                          </span>
                        </motion.div>
                      ) : qrCodeUrl ? (
                        <motion.div
                          className="p-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          }}
                        >
                          <img
                            src={qrCodeUrl}
                            alt="Generated QR Code"
                            className="max-w-full h-auto"
                            style={{
                              maxWidth: `${Math.min(qrSettings.size, 256)}px`,
                              maxHeight: `${Math.min(qrSettings.size, 256)}px`,
                            }}
                          />
                        </motion.div>
                      ) : (
                        <div className="text-sm text-muted-foreground text-center">
                          {t("qrGenerator.previewPlaceholder")}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="border-t pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                      {t("qrGenerator.settings")}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label>{t("qrGenerator.size")}</Label>
                      <Select
                        value={qrSettings.size.toString()}
                        onValueChange={(value) =>
                          updateSetting("size", parseInt(value, 10))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128">128px</SelectItem>
                          <SelectItem value="256">256px</SelectItem>
                          <SelectItem value="512">512px</SelectItem>
                          <SelectItem value="1024">1024px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("qrGenerator.errorCorrection")}</Label>
                      <Select
                        value={qrSettings.errorCorrectionLevel}
                        onValueChange={(value) =>
                          updateSetting(
                            "errorCorrectionLevel",
                            value as "L" | "M" | "Q" | "H",
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">
                            {t("qrGenerator.errorLevels.L")}
                          </SelectItem>
                          <SelectItem value="M">
                            {t("qrGenerator.errorLevels.M")}
                          </SelectItem>
                          <SelectItem value="Q">
                            {t("qrGenerator.errorLevels.Q")}
                          </SelectItem>
                          <SelectItem value="H">
                            {t("qrGenerator.errorLevels.H")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("qrGenerator.foregroundColor")}</Label>
                      <div className="flex gap-2 items-center">
                        <ColorPicker
                          value={qrSettings.colorDark}
                          onChange={(color) =>
                            updateSetting("colorDark", color)
                          }
                        />
                        <span className="text-sm text-muted-foreground font-mono">
                          {qrSettings.colorDark}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("qrGenerator.backgroundColor")}</Label>
                      <div className="flex gap-2 items-center">
                        <ColorPicker
                          value={qrSettings.colorLight}
                          onChange={(color) =>
                            updateSetting("colorLight", color)
                          }
                        />
                        <span className="text-sm text-muted-foreground font-mono">
                          {qrSettings.colorLight}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("qrGenerator.examplesHint")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {exampleData.map((example, index) => (
                    <motion.div
                      key={example.titleKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer hover:border-accent transition-colors rounded-xl"
                        onClick={() => loadExample(example.data, example.type)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <QrCode className="h-4 w-4 text-pink-500" />
                            {t(example.titleKey)}
                          </CardTitle>
                          <CardDescription className="text-xs font-mono break-all">
                            {example.data}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        className="mb-12 prose prose-neutral dark:prose-invert max-w-none"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4">
          {t("qrGenerator.seo.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("qrGenerator.seo.description")}
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">
          {t("qrGenerator.seo.featuresTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-prose">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-muted/30 rounded-xl h-full">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm">{t(feature.titleKey)}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">
          {t("qrGenerator.seo.howToUseTitle")}
        </h3>
        <ol className="text-muted-foreground space-y-2">
          <li>
            <strong>1.</strong> {t("qrGenerator.seo.howToUse1")}
          </li>
          <li>
            <strong>2.</strong> {t("qrGenerator.seo.howToUse2")}
          </li>
          <li>
            <strong>3.</strong> {t("qrGenerator.seo.howToUse3")}
          </li>
        </ol>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t rounded-xl px-2 hover:bg-muted/30 transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
        >
          <h2 className="text-xl font-semibold">{t("common.faq")}</h2>
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
              className="space-y-4 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.qKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <Card className="bg-muted/30 rounded-xl">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{t(faq.qKey)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t(faq.aKey)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
