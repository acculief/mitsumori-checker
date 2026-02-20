import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { siteUrl, siteName } from "@/lib/constants";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
  },
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
    canonical: `${siteUrl}/`,
  },
  verification: {
    google: "0uJTSoLifNf9F30GBAdAstHG5n6Ci6kGC29csJZbdRM",
  },
  other: {
    "theme-color": "#c2410c",
  },
  manifest: "/manifest.json",
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
  featureList: [
    "車検費用の相場比較",
    "25項目対応",
    "4車両サイズ対応",
    "5段階判定",
    "完全無料・登録不要",
  ],
  image: `${siteUrl}/opengraph-image`,
  screenshot: `${siteUrl}/opengraph-image`,
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
        text: "法定費用＋車検基本料の合計で、軽自動車で約4〜7万円、小型車で約5〜9万円、中型車で約6〜11万円、大型車で約7〜13万円が一般的な相場です。追加のメンテナンス・部品交換が発生すると、さらに費用がかかります。",
      },
    },
    {
      "@type": "Question",
      name: "車検の見積もりが高いかどうかはどう判断すればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "見積もり項目ごとに相場データと比較するのが最も確実です。車検費用チェッカーでは、各項目を「割安・適正・やや高い・高い・非常に高い」の5段階で判定します。相場中央値の1.1倍以内であれば適正と判断できます。",
      },
    },
    {
      "@type": "Question",
      name: "車検費用を安くする方法はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "複数の整備工場から相見積もりを取ることが最も効果的です。ディーラー・カー用品店・整備工場で価格差が大きい項目は、比較するだけで数千〜数万円の節約が可能です。",
      },
    },
    {
      "@type": "Question",
      name: "軽自動車の車検はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "軽自動車の車検費用は、法定費用（自賠責保険17,540円＋重量税6,600円＋印紙代1,400円）の約25,500円に加え、車検基本料10,000〜25,000円が必要です。合計で約36,000〜66,000円が目安ですが、部品交換が必要な場合はさらに費用がかかります。",
      },
    },
    {
      "@type": "Question",
      name: "ディーラー車検はなぜ高いのですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ディーラーは純正部品を使用し、メーカー基準の点検を行うため、整備工場やカー用品店と比べて車検基本料が高くなる傾向があります。ただし品質や保証面で安心感があるため、価格だけでなく総合的に判断することが大切です。",
      },
    },
    {
      "@type": "Question",
      name: "車検はどこが一番安いですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "一般的に、ユーザー車検（自分で陸運局に持ち込み）が最安ですが手間がかかります。店舗型では車検専門チェーン（車検のコバック等）やカー用品店（オートバックス等）が比較的安く、ディーラーが最も高い傾向です。ただし安さだけで選ぶと必要な整備が省かれるリスクもあります。",
      },
    },
    {
      "@type": "Question",
      name: "ブレーキパッド交換の費用はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ブレーキパッド交換（フロント片側）の費用は、軽自動車で8,000〜18,000円、小型車で10,000〜25,000円、中型車で12,000〜30,000円が相場です。工賃込みの価格で、純正品かアフターパーツかでも金額が変わります。",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "車検の見積もりが適正価格か確認する方法",
  description:
    "車検費用チェッカーを使って、車検の見積もりが相場と比べて適正かどうかを無料で診断する方法を解説します。",
  step: [
    {
      "@type": "HowToStep",
      name: "車両サイズを選択",
      text: "軽自動車・小型車・中型車・大型車の4つから、あなたの車のサイズを選択します。",
    },
    {
      "@type": "HowToStep",
      name: "見積もり項目と金額を入力",
      text: "車検の見積もり書に記載された項目と金額を入力します。25項目に対応しており、複数項目をまとめて診断できます。",
    },
    {
      "@type": "HowToStep",
      name: "診断結果を確認",
      text: "各項目が「割安・適正・やや高い・高い・非常に高い」の5段階で判定されます。相場レンジバーで視覚的に確認でき、必要に応じて相見積もりサービスへの案内も表示されます。",
    },
  ],
  tool: {
    "@type": "HowToTool",
    name: "車検費用チェッカー",
  },
  totalTime: "PT2M",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: siteName,
      item: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>{children}</body>
    </html>
  );
}
