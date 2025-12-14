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
  const { spawnItem } = useCat();
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
  const [lastGeneratedInput, setLastGeneratedInput] = useState("");
  const [isInputChanged, setIsInputChanged] = useState(false);

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
      // 成功生成QR码时生成星星物品
      if (url) {
        spawnItem("qr");
        setLastGeneratedInput(input);
        setIsInputChanged(false);
      }
    } catch (_err) {
      setError(t("qrGenerator.error.generation"));
      setQrCodeUrl("");
    } finally {
      setIsGenerating(false);
    }
  }, [input, qrSettings, t, spawnItem, setIsInputChanged]);

  // 监听输入变化，设置按钮状态
  useEffect(() => {
    if (input.trim() && input !== lastGeneratedInput) {
      setIsInputChanged(true);
    } else if (input.trim() === lastGeneratedInput) {
      setIsInputChanged(false);
    }
  }, [input, lastGeneratedInput]);

  const handleBuildClick = useCallback(() => {
    if (input.trim()) {
      generateQrCode();
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
          <QrCode className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("qrGenerator.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("qrGenerator.pageSubtitle")}
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
          {["Free", "No Signup", "Works Offline", "Privacy First"].map(
            (tag) => (
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
            ),
          )}
        </motion.div>
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

                    <div className="flex justify-center">
                      <Button
                        onClick={handleBuildClick}
                        disabled={!isInputChanged || !input.trim()}
                        className="gap-2 rounded-xl h-11 px-6"
                      >
                        <motion.div
                          animate={isGenerating ? { rotate: [0, 360] } : {}}
                          transition={
                            isGenerating
                              ? {
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }
                              : {}
                          }
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        {isGenerating
                          ? t("qrGenerator.generating")
                          : t("qrGenerator.generate")}
                      </Button>
                    </div>
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

      {/* SEO Content Section */}
      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-xl font-bold mb-4" variants={itemVariants}>
          What is QR Code Generation?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">QR code generation</strong> is the
          process of creating two-dimensional barcodes that can be scanned by
          smartphones and other devices to quickly access information. Our free
          online QR code generator allows you to create custom QR codes for
          URLs, text, phone numbers, WiFi credentials, and more without any
          registration or software installation.
        </motion.p>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          Key Features
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Multiple Data Types",
              desc: "Generate QR codes for URLs, text, phone numbers, and WiFi",
            },
            {
              title: "Custom Colors",
              desc: "Personalize QR codes with custom foreground and background colors",
            },
            {
              title: "High Resolution",
              desc: "Download high-quality QR codes in PNG format",
            },
            {
              title: "100% Free",
              desc: "No watermarks, registration, or usage limits",
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
          Common Use Cases
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            "Sharing website URLs and social media profiles",
            "Displaying contact information and business cards",
            "Setting up WiFi access for guests",
            "Creating digital menus and product information",
            "Marketing campaigns and promotional materials",
          ].map((item, index) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 text-sm"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Real-World Scenarios */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            Real-World Scenarios
          </motion.h3>

          {/* Scenario 1 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Restaurant Digital Menu
            </h4>
            <p className="text-muted-foreground mb-4">
              A restaurant wants to replace physical menus with contactless
              digital versions during the pandemic.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  🎯 Business Challenge:
                </div>
                <div className="mb-3">
                  Customers need access to menus without touching physical
                  objects
                </div>
                <div className="text-muted-foreground mb-2">
                  📱 QR Code Solution:
                </div>
                <div className="mb-3">
                  Generate QR code linking to online menu URL
                </div>
                <div className="text-green-600 text-xs">
                  QR Content: https://restaurant.com/menu-digital
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Customers scan QR code with their phones
              to instantly access the digital menu.
            </p>
          </motion.div>

          {/* Scenario 2 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              WiFi Access for Guests
            </h4>
            <p className="text-muted-foreground mb-4">
              Hotel or coffee shop needs to share WiFi credentials with guests
              easily and securely.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  🔐 Traditional Method:
                </div>
                <div className="mb-3">
                  Writing WiFi password on a chalkboard (insecure)
                </div>
                <div className="text-muted-foreground mb-2">
                  📱 QR Code Solution:
                </div>
                <div className="mb-3">
                  Generate WiFi QR code with credentials
                </div>
                <div className="text-green-600 text-xs">
                  QR Content: WIFI:T:WPA;S:Guest_WiFi;P:password123;H:false;
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Guests scan QR code and automatically
              connect to WiFi without typing credentials.
            </p>
          </motion.div>

          {/* Scenario 3 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              Business Card Digital Integration
            </h4>
            <p className="text-muted-foreground mb-4">
              Sales professional wants to make networking more efficient by
              adding QR codes to business cards.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  👤 Static Information:
                </div>
                <div className="mb-3">
                  Name, phone, email printed on card (limited contact info)
                </div>
                <div className="text-muted-foreground mb-2">
                  📱 QR Code Enhancement:
                </div>
                <div className="mb-3">
                  QR code linking to vCard or LinkedIn profile
                </div>
                <div className="text-green-600 text-xs">
                  QR Content: https://linkedin.com/in/john-doe
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Prospects scan QR code to access complete
              digital profile and connect instantly.
            </p>
          </motion.div>
        </motion.section>

        {/* Step-by-Step Guide */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            How to Generate QR Codes
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: "Enter Your Data",
                desc: "Type the URL, text, phone number, or WiFi credentials you want to encode in the QR code.",
              },
              {
                step: "2",
                title: "Customize Appearance",
                desc: "Choose colors, error correction level, and size to match your brand and scanning environment.",
              },
              {
                step: "3",
                title: "Generate & Preview",
                desc: "Click generate to create your QR code and preview it in real-time.",
              },
              {
                step: "4",
                title: "Download & Use",
                desc: "Download the high-quality PNG file and use it in print materials, websites, or digital displays.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
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
                  q: "What is a QR code?",
                  a: "A QR (Quick Response) code is a two-dimensional barcode that can store various types of data including URLs, text, phone numbers, and more. It's designed to be quickly read by digital devices.",
                },
                {
                  q: "What information can I encode in a QR code?",
                  a: "You can encode various types of information including website URLs, contact information (vCard), email addresses, phone numbers, SMS messages, Wi-Fi credentials, and plain text.",
                },
                {
                  q: "Are QR codes secure?",
                  a: "QR codes themselves are secure, but always verify the source before scanning. Only scan QR codes from trusted sources as malicious codes can lead to harmful websites.",
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

      {/* Information Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* What is */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is a QR Code Generator?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A QR code generator is a tool that creates Quick Response (QR) codes -
                two-dimensional barcodes that can store various types of data including
                URLs, text, contact information, and more. QR codes are widely used for
                marketing, payments, and information sharing.
              </p>
              <p>
                QR codes can be scanned by smartphones and other devices with cameras,
                making them perfect for connecting physical and digital experiences.
                They support various data types and can be customized with different colors and styles.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Generate QR codes for URLs, text, and contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Customizable size and error correction levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Color customization for brand consistency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Multiple export formats (PNG, SVG, PDF)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Real-time preview and instant generation</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Marketing materials and business cards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Website URLs and social media links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Contact information and vCard sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Event tickets and digital passes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Product information and tracking codes</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Restaurant Menus:</strong>
                <p>Creating contactless menus that customers can scan with their phones to view digital menus and place orders.</p>
              </div>
              <div>
                <strong className="text-foreground">Event Management:</strong>
                <p>Generating QR codes for event tickets that can be quickly scanned at entrance points for seamless check-in.</p>
              </div>
              <div>
                <strong className="text-foreground">Retail and E-commerce:</strong>
                <p>Creating QR codes for product information, reviews, and direct purchase links to enhance the shopping experience.</p>
              </div>
              <div>
                <strong className="text-foreground">Healthcare:</strong>
                <p>Using QR codes for patient information, appointment scheduling, and medical record access while maintaining privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
