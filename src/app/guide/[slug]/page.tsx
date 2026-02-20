import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketRates } from "@/data/market-rates";
import { guideContents } from "@/data/guide-content";
import { formatYen } from "@/lib/formatters";
import { siteName, siteUrl } from "@/lib/constants";
import type { VehicleSize } from "@/lib/types";

const vehicleLabels: Record<VehicleSize, string> = {
  kei: "軽自動車",
  small: "小型車",
  medium: "中型車",
  large: "大型車",
};

const sizes: VehicleSize[] = ["kei", "small", "medium", "large"];

function getGuide(slug: string) {
  return guideContents.find((g) => g.slug === slug) ?? null;
}

export function generateStaticParams() {
  return guideContents.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const title = `${guide.title}｜${siteName}`;
  return {
    title: guide.title,
    description: guide.metaDescription,
    openGraph: {
      title,
      description: guide.metaDescription,
      url: `${siteUrl}/guide/${slug}/`,
      siteName,
      locale: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description: guide.metaDescription,
    },
    alternates: {
      canonical: `${siteUrl}/guide/${slug}/`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const rateItem = marketRates.find((r) => r.id === guide.itemId);
  const relatedGuides = guide.relatedSlugs
    .map((s) => guideContents.find((g) => g.slug === s))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity w-fit"
          >
            <div className="shrink-0" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#c2410c" />
                <path d="M8 20h20v3a2 2 0 01-2 2H10a2 2 0 01-2-2v-3z" fill="rgba(255,255,255,0.25)" />
                <path d="M10.5 20l2.5-5h10l2.5 5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="17" y1="15.5" x2="17" y2="20" stroke="white" strokeWidth="1" opacity="0.5" />
                <circle cx="13" cy="24" r="1.5" fill="white" />
                <circle cx="23" cy="24" r="1.5" fill="white" />
                <circle cx="27" cy="11" r="6" fill="white" />
                <path d="M24 11l2 2 4-4" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 leading-tight">
                車検費用チェッカー
              </div>
              <div className="text-xs text-slate-500">
                車検費用を相場データで無料診断
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-4" aria-label="パンくずリスト">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary transition-colors">トップ</Link></li>
            <li aria-hidden="true">/</li>
            <li><span className="text-slate-600">{guide.title}</span></li>
          </ol>
        </nav>

        <article>
          <h1 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
            {guide.title}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {guide.intro}
          </p>

          {/* Cost table */}
          {rateItem && (
            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-900 mb-3">
                車両サイズ別の費用相場
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-2.5 px-3 font-bold text-slate-700 border-b border-slate-200">
                        車両サイズ
                      </th>
                      <th className="text-right py-2.5 px-3 font-bold text-slate-700 border-b border-slate-200">
                        安値
                      </th>
                      <th className="text-right py-2.5 px-3 font-bold text-slate-700 border-b border-slate-200">
                        中央値
                      </th>
                      <th className="text-right py-2.5 px-3 font-bold text-slate-700 border-b border-slate-200">
                        高値
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => {
                      const range = rateItem.rates[size];
                      return (
                        <tr key={size} className="border-b border-slate-100">
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {vehicleLabels[size]}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-600 tabular-nums">
                            {formatYen(range.low)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900 tabular-nums">
                            {formatYen(range.median)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-600 tabular-nums">
                            {formatYen(range.high)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                ※ 工賃込みの金額です。地域・車種・年式により異なります。
              </p>
            </section>
          )}

          {/* Details */}
          <section className="mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              詳しい解説
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {guide.details}
            </p>
          </section>

          {/* Tips */}
          <section className="mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              知っておきたいポイント
            </h2>
            <ul className="space-y-2">
              {guide.tips.map((tip) => (
                <li key={tip} className="flex gap-2 text-sm text-slate-600">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-primary/20 bg-primary-light p-5 mb-6">
            <h2 className="text-sm font-bold text-slate-900 mb-2">
              この項目の見積もりを無料診断
            </h2>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              車検費用チェッカーで「{rateItem?.label ?? guide.title}」の見積もり金額が適正かどうか、相場データと比較して無料で診断できます。
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              無料で診断する
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </section>

          {/* Related */}
          {relatedGuides.length > 0 && (
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-3">
                関連する整備項目
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedGuides.map((related) =>
                  related ? (
                    <Link
                      key={related.slug}
                      href={`/guide/${related.slug}/`}
                      className="rounded-lg border border-slate-200 bg-white p-3 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="text-sm font-bold text-slate-900 mb-0.5">
                        {related.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {related.metaDescription}
                      </p>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}
        </article>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 mt-auto">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-1.5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ※ 相場データは全国の車検・整備工場の一般的な価格帯をもとに作成しています。
            地域・車種・年式により実際の費用は異なります。
          </p>
          <p className="text-[11px] text-slate-500 pt-1">
            &copy; 2026 車検費用チェッカー
          </p>
        </div>
      </footer>
    </div>
  );
}
