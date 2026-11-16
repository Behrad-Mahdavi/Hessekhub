// apps/web/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hessekhub.ir"),
  title: {
    default: "حس خوب | پلتفرم سبک زندگی سالم و کافه‌بوتیک سلامت در مشهد",
    template: "%s | حس خوب (مشهد)",
  },
  description:
    "ارسال روزانه پکیج‌های غذای رژیمی تازه در مشهد تحت نظارت کارشناس تغذیه (اشرف رهبری) و کافه‌بوتیک سلامتی سجاد مشهد. محاسبه دقیق کالری و فعال‌سازی آنی اشتراک.",
  icons: {
    icon: "/assets/Brand-Glyphs/glyph-08-brand-hourglass-n.png",
  },
  openGraph: {
    title: "حس خوب — پلتفرم سبک زندگی سالم و غذای رژیمی در مشهد",
    description: "غذاهای ارگانیک و رژیمی، ارسال روزانه در مشهد با نظارت کارشناس تغذیه و کافه‌بوتیک سلامت سجاد.",
    url: "https://hessekhub.ir",
    siteName: "حس خوب",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" data-theme="light" data-density="comfortable">
      <head>
        <JsonLdGraph />
      </head>
      <body className="min-h-screen flex flex-col bg-canvas text-strong antialiased selection:bg-primary-subtle selection:text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

