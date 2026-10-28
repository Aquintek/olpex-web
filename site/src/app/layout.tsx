import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { asset } from "@/lib/asset";
import { EMAILS, PHONES } from "@/lib/content";
import "./globals.css";

// Archivo: a grotesque with 19th-century industrial roots and real width/weight
// range, so headings and labels carry an engineering voice. Geist Mono stays for
// data and measurements only (phones, drawing dimensions, nav).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
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
    <html
      lang="es"
      className={`${archivo.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Marks JS as available before first paint, so scroll reveals can hide content
         * without a flash. If the app never boots (bundle blocked or failed), the mark is
         * removed after 3s and every section shows as plain static content.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.dataset.js='';setTimeout(function(){if(!('revealReady' in d.dataset))delete d.dataset.js},3000)",
          }}
        />
      </head>
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
