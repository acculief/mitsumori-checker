import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = "https://mitsumori-checker.vercel.app";
const siteName = "見積もりチェッカー";
const siteDescription =
  "車検・自動車修理の見積もりを相場データと比較して「適正/高い」を無料判定。登録不要・個人情報不要。ぼったくり防止に。";

export const metadata: Metadata = {
  title: {
    default: `${siteName}｜車検・自動車修理の費用を無料診断`,
    template: `%s｜${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "車検",
    "見積もり",
    "相場",
    "車検費用",
    "車検 高い",
    "車検 ぼったくり",
    "自動車修理",
    "ブレーキパッド 交換 費用",
    "車検 比較",
  ],
  authors: [{ name: siteName }],
  openGraph: {
    title: `${siteName}｜車検・自動車修理の費用を無料診断`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName}｜車検費用を無料診断`,
    description:
      "車検の見積もり、高くない？相場データと比較して適正価格かすぐわかる無料ツール。",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>{children}</body>
    </html>
  );
}
