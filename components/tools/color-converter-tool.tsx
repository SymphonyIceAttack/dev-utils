"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, Palette, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCat } from "@/context/cat-context";
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

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
}

export function ColorConverterTool({ lang = "en" as LanguageType }) {
  const [selectedColor, setSelectedColor] = useState("#3498db");
  const [colorFormats, setColorFormats] = useState<ColorFormats>({
    hex: "#3498db",
    rgb: "rgb(52, 152, 219)",
    hsl: "hsl(204, 70%, 53%)",
  });
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);

  const toolSectionRef = useRef<HTMLDivElement>(null);
  const { spawnItem } = useCat();

  // Track last item spawn time for performance optimization
  const lastItemSpawnRef = useRef<number>(0);
  const previousColorRef = useRef<string>("#3498db");

  // Color conversion utilities
  const hexToRgb = useCallback(
    (hex: string): { r: number; g: number; b: number } | null => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
    [],
  );

  const rgbToHex = useCallback((r: number, g: number, b: number): string => {
    return `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join("")}`;
  }, []);

  const rgbToHsl = useCallback(
    (r: number, g: number, b: number): { h: number; s: number; l: number } => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      };
    },
    [],
  );

  // Calculate color difference for performance optimization
  const getColorDifference = useCallback(
    (color1: string, color2: string): number => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      if (!rgb1 || !rgb2) return 0;

      // Calculate Euclidean distance in RGB space
      const diff = Math.sqrt(
        (rgb1.r - rgb2.r) ** 2 +
          (rgb1.g - rgb2.g) ** 2 +
          (rgb1.b - rgb2.b) ** 2,
      );
      return diff;
    },
    [hexToRgb],
  );

  // Update color formats when selected color changes
  const updateColorFormats = useCallback(
    (color: string) => {
      const rgb = hexToRgb(color);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setColorFormats({
          hex: color.toUpperCase(),
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        });
      }
    },
    [hexToRgb, rgbToHsl],
  );

  // Handle color change from picker with performance optimization
  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color);
      updateColorFormats(color);

      // Performance optimization: Only spawn item under specific conditions
      const now = Date.now();
      const timeSinceLastSpawn = now - lastItemSpawnRef.current;
      const colorDifference = getColorDifference(
        color,
        previousColorRef.current,
      );

      // Only spawn item if:
      // 1. Enough time has passed (500ms cooldown)
      // 2. Color change is significant (threshold of 30 in RGB space)
      // 3. This prevents excessive item generation during drag operations
      if (timeSinceLastSpawn > 500 && colorDifference > 30) {
        lastItemSpawnRef.current = now;
        previousColorRef.current = color;
      }
    },
    [updateColorFormats, getColorDifference],
  );

  // Handle HEX input change
  const handleHexChange = useCallback(
    (value: string) => {
      if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        setSelectedColor(value);
        updateColorFormats(value);
      }
    },
    [updateColorFormats],
  );

  // Handle RGB input change
  const handleRgbChange = useCallback(
    (value: string) => {
      const rgbMatch = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);

        if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
          const hex = rgbToHex(r, g, b);
          setSelectedColor(hex);
          updateColorFormats(hex);
        }
      }
    },
    [rgbToHex, updateColorFormats],
  );

  // Copy to clipboard
  const copyToClipboard = useCallback(
    async (text: string, format: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedFormat(format);
        // Generate item for successful copy action
        spawnItem("cookie");
        setTimeout(() => setCopiedFormat(null), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
    [spawnItem],
  );

  // Generate random color
  const generateRandomColor = useCallback(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    // Force spawn item for user-initiated actions
    spawnItem("cookie");
    handleColorChange(randomColor);
  }, [handleColorChange]);

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
          <Palette className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Color Converter
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Convert between HEX, RGB, and HSL color formats with real-time
          preview.
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
          <CardContent className="p-6 space-y-8">
            {/* Color Picker Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-6">Color Picker</h3>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-lg overflow-hidden">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-48 h-48 cursor-pointer block"
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Click and drag to select colors
              </p>
            </div>

            {/* Color Format Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">
                Color Formats
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {/* HEX Input */}
                <div className="space-y-2">
                  <label htmlFor="hex-input" className="text-sm font-medium">
                    HEX
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="hex-input"
                      value={colorFormats.hex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="#3498db"
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(colorFormats.hex, "hex")}
                    >
                      {copiedFormat === "hex" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* RGB Input */}
                <div className="space-y-2">
                  <label htmlFor="rgb-input" className="text-sm font-medium">
                    RGB
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="rgb-input"
                      value={colorFormats.rgb}
                      onChange={(e) => handleRgbChange(e.target.value)}
                      placeholder="rgb(52, 152, 219)"
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(colorFormats.rgb, "rgb")}
                    >
                      {copiedFormat === "rgb" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* HSL Input */}
                <div className="space-y-2">
                  <label htmlFor="hsl-input" className="text-sm font-medium">
                    HSL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="hsl-input"
                      value={colorFormats.hsl}
                      readOnly
                      placeholder="hsl(204, 70%, 53%)"
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(colorFormats.hsl, "hsl")}
                    >
                      {copiedFormat === "hsl" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Random Color Button */}
            <div className="flex justify-center">
              <Button
                onClick={generateRandomColor}
                className="gap-2 rounded-xl h-11 px-6"
              >
                <Sparkles className="h-4 w-4" />
                Generate Random Color
              </Button>
            </div>
          </CardContent>
        </Card>
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
                  q: "What color formats are supported?",
                  a: "This tool supports HEX, RGB, and HSL color formats commonly used in web development.",
                },
                {
                  q: "How do I copy a color value?",
                  a: "Click the copy button next to any color format to copy it to your clipboard.",
                },
                {
                  q: "Is the color picker accurate?",
                  a: "Yes, the color picker provides accurate color selection and real-time conversion between formats.",
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
            <h2 className="text-xl font-semibold">What is a Color Converter?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A color converter is a fundamental tool for web developers, designers, and digital artists
                who work with different color representation formats. It allows seamless conversion between
                HEX, RGB, and HSL color values while maintaining visual accuracy.
              </p>
              <p>
                This tool is essential for ensuring color consistency across different platforms,
                design tools, and coding environments where color formats may vary.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Real-time conversion between HEX, RGB, and HSL formats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Interactive color picker with drag-and-drop functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>One-click copying of color values to clipboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Random color generation for inspiration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Visual color preview with large display area</span>
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Common Use Cases</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Converting design mockup colors to CSS-compatible formats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Matching brand colors across different platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Creating color palettes for design systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Debugging color issues in web development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Preparing colors for print and digital media</span>
              </li>
            </ul>
          </div>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Real-World Scenarios</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Web Development:</strong>
                <p>Converting Figma design colors to CSS HEX values for styling components and ensuring consistent branding.</p>
              </div>
              <div>
                <strong className="text-foreground">Mobile App Design:</strong>
                <p>Converting RGB values from design tools to HEX for cross-platform color consistency in React Native apps.</p>
              </div>
              <div>
                <strong className="text-foreground">Digital Marketing:</strong>
                <p>Matching brand colors across different marketing materials and ensuring accessibility compliance.</p>
              </div>
              <div>
                <strong className="text-foreground">Data Visualization:</strong>
                <p>Creating consistent color schemes for charts and dashboards using HSL for better control over lightness and saturation.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
