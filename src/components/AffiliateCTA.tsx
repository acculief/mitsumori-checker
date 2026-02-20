import { affiliateServices } from "@/data/affiliate-links";
import { dataLastUpdated } from "@/data/market-rates";
import { formatYen } from "@/lib/formatters";

interface Props {
  hasExpensiveItems: boolean;
  potentialSaving: number;
  expensiveCount: number;
}

export default function AffiliateCTA({
  hasExpensiveItems,
  potentialSaving,
  expensiveCount,
}: Props) {
  return (
    <section
      className="animate-fade-in-up-delay-1"
      aria-label="次のステップ"
    >
      <div className="border-l-4 border-primary pl-4 mb-3">
        <h3 className="font-bold text-slate-900 text-sm">
          {hasExpensiveItems
            ? "次のステップ：相見積もりで確認する"
            : "次のステップ：安心して車検を進める"}
        </h3>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-5">
        <p className="text-xs text-slate-600 leading-relaxed">
          {hasExpensiveItems
            ? `この診断は全国の整備工場の公開価格（${dataLastUpdated}時点・25項目）をもとにした目安です。正確な費用は、実際の工場から見積もりを取ることで確認できます。`
            : "この見積もりは相場範囲内です。口コミや実績で工場を選ぶと、より安心して車検を進められます。"}
        </p>

        {hasExpensiveItems && potentialSaving > 0 && (
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
            <p className="text-xs font-medium text-amber-800">
              相場より高い項目が
              <span className="font-bold">{expensiveCount}件</span>
              。相見積もりで最大{" "}
              <span className="font-bold">{formatYen(potentialSaving)}</span>{" "}
              の節約が見込めます。
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
          {affiliateServices.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-slate-200 p-3 flex flex-col"
            >
              <div className="font-bold text-xs text-slate-900 mb-0.5">
                {service.name}
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5 flex-1">
                {service.description}
              </p>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                aria-label={`${service.name}で${service.ctaLabel}`}
                className="block w-full text-center py-2 rounded-md text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                {service.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          見積もり依頼は無料です · 外部サイトへ遷移します
        </p>
      </div>
    </section>
  );
}
