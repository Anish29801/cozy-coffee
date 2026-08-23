import type { Metadata } from "next";
import { Fraunces, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cozy Coffee Café — Neighborhood living room",
    template: "%s — Cozy Coffee Café",
  },
  description:
    "Friendly, welcoming, warmth, togetherness. A $10k handcrafted café experience — come sit, stay awhile.",
  metadataBase: new URL("https://cozy-coffee.example.com"),
  openGraph: {
    title: "Cozy Coffee Café — Neighborhood living room",
    description: "Warmth, togetherness, and a perfect pour. Your usual table is waiting.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        {children}
      </body>
    </html>
  );
}
