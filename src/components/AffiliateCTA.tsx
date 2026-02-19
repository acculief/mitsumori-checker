import { affiliateServices } from "@/data/affiliate-links";
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
      <div className="border-l-4 border-[#c2410c] pl-4 mb-3">
        <h3 className="font-bold text-slate-900 text-sm">
          {hasExpensiveItems
            ? "次のステップ：相見積もりで確認する"
            : "次のステップ"}
        </h3>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-5">
        <p className="text-xs text-slate-600 leading-relaxed">
          {hasExpensiveItems
            ? "この診断は全国の整備工場の公開価格をもとにした目安です。正確な費用は、実際の工場から見積もりを取ることで確認できます。"
            : "この見積もりは適正価格です。念のため他の工場の価格も確認しておくと、より安心して車検に臨めます。"}
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
                rel="noopener noreferrer"
                aria-label={`${service.name}で${service.ctaLabel}`}
                className="block w-full text-center py-2 rounded-md text-xs font-bold bg-[#c2410c] text-white hover:bg-[#9a3412] transition-colors"
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
