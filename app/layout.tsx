import type { Metadata } from "next";
import { Fraunces, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

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

const cafeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Cozy Coffee Café",
  description: "Friendly, welcoming neighborhood living room — warmth and togetherness in every pour.",
  url: "https://cozy-coffee.example.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Warmth Lane",
    addressLocality: "Neighborhood",
    addressRegion: "City",
    postalCode: "00000",
    addressCountry: "US",
  },
  openingHours: ["Mo-Fr 07:00-19:00", "Sa-Su 08:00-18:00"],
  servesCuisine: "Coffee, Pastries",
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
