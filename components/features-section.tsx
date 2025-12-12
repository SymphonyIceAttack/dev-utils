import { Globe, Lock, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "All tools run locally in your browser with zero latency. No waiting for server responses.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data never leaves your device. No tracking, no analytics, no third-party services.",
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description:
      "Open source code you can audit. No hidden data collection or backdoors.",
  },
  {
    icon: Globe,
    title: "Works Offline",
    description:
      "Once loaded, all tools work without an internet connection. Perfect for sensitive data.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why DevTools?</h2>
          <p className="mt-2 text-muted-foreground">
            Built for developers who value speed, privacy, and simplicity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
