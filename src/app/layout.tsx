import type { Metadata } from "next";
import "./globals.css";

import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "AXION | Premium Sportswear",
    template: "%s | AXION",
  },

  description:
    "Shop premium sportswear, gym apparel and fitness equipment built for performance.",

  keywords: [
    "sportswear",
    "gym clothing",
    "fitness apparel",
    "workout clothes",
    "training gear",
    "AXION",
  ],

  authors: [
    {
      name: "Ahmed El Hadidy",
    },
  ],

  creator: "Ahmed El Hadidy",

  openGraph: {
    title: "AXION | Premium Sportswear",

    description:
      "Premium sportswear and fitness equipment for athletes and everyday training.",

    url: "https://your-domain.com",

    siteName: "AXION",

    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "AXION Sportswear",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "AXION | Premium Sportswear",

    description: "Premium sportswear and fitness equipment.",

    images: ["/logo1.png"],
  },

  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
    ${inter.variable}
    ${montserrat.variable}
  `}
    >
      <body className="min-h-full flex flex-col dialog-scroll">
        <Navbar />
        {children}
        <ScrollToTopButton />
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
