import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { asset } from "@/lib/asset";
import { EMAILS, PHONES } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://olpex.net";
const DESCRIPTION =
  "OLPEX Engineering Solutions: servicios eléctricos, mecánicos, neumáticos y de automatización industrial en Guatemala. Mantenimiento, termografía, PLC y SCADA, fabricación de transportadores y suministro de equipos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OLPEX Engineering Solutions | Ingenieros de servicios industriales en Guatemala",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: SITE_URL,
    siteName: "OLPEX Engineering Solutions",
    title: "OLPEX Engineering Solutions",
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OLPEX Engineering Solutions" }],
  },
  icons: { icon: asset("/icon.svg"), apple: asset("/apple-touch-icon.png") },
};

export const viewport: Viewport = {
  themeColor: "#061a33",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OLPEX Engineering Solutions",
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: EMAILS.map((e) => e.address),
  telephone: PHONES.map((p) => p.tel),
  address: { "@type": "PostalAddress", addressCountry: "GT" },
  areaServed: ["Guatemala", "Estados Unidos", "México", "Caribe"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-full">
        {children}
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
