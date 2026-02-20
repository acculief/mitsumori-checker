import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://mitsumori-checker.vercel.app";
const siteName = "車検費用チェッカー";
const siteDescription =
  "車検・自動車修理の見積もりを相場データと比較して「適正/高い」を無料判定。登録不要・個人情報不要。ぼったくり防止に。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName}｜車検の見積もりを相場と比較して無料診断`,
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
    "車検費用チェッカー",
  ],
  authors: [{ name: siteName }],
  openGraph: {
    title: `${siteName}｜車検の見積もりを相場と比較して無料診断`,
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
  verification: {
    google: "0uJTSoLifNf9F30GBAdAstHG5n6Ci6kGC29csJZbdRM",
  },
  other: {
    "theme-color": "#c2410c",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "車検の費用相場はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "車検費用は車両サイズにより異なります。軽自動車で約4〜7万円、小型車で約5〜9万円、中型車で約7〜12万円、大型車で約9〜15万円が一般的な相場です（法定費用＋基本料＋整備費用の合計）。当サイトでは25項目の見積もりを相場データと比較し、適正価格かどうかを無料で診断できます。",
      },
    },
    {
      "@type": "Question",
      name: "車検の見積もりが高いかどうかはどう判断すればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "見積もり項目ごとに全国の整備工場の相場データと比較するのが最も確実です。車検費用チェッカーでは、各項目を「割安・適正・やや高い・高い・非常に高い」の5段階で判定します。相場中央値の1.1倍以内であれば適正、1.3倍を超えると割高と判断できます。",
      },
    },
    {
      "@type": "Question",
      name: "車検費用を安くする方法はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "複数の整備工場から相見積もりを取ることが最も効果的です。ディーラー・カー用品店・整備工場で価格差が大きい項目（ブレーキパッド、タイヤ交換など）は、比較するだけで数千〜数万円の節約が可能です。当サイトで見積もりの適正度を確認した上で、相見積もりサービスを活用することをおすすめします。",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>{children}</body>
    </html>
  );
}
