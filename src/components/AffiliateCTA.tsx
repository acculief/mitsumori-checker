import { affiliateServices } from "@/data/affiliate-links";

interface Props {
  hasExpensiveItems: boolean;
}

export default function AffiliateCTA({ hasExpensiveItems }: Props) {
  return (
    <section
      className="rounded-xl bg-white border border-slate-200 p-5 animate-fade-in-up-delay-1"
      aria-label="車検予約サービスの紹介"
    >
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 text-sm mb-0.5">
          {hasExpensiveItems
            ? "この見積もり、他店と比べてみませんか？"
            : "適正価格でも相見積もりは安心材料になります"}
        </h3>
        <p className="text-xs text-slate-500">
          {hasExpensiveItems
            ? "複数の店舗で見積もりを取ることで、交渉材料が増えます。"
            : "他店の価格を知っておくと、次回の車検でも安心です。"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
              aria-label={`${service.name}で詳しく見る`}
              className="block w-full text-center py-2 rounded-md text-xs font-bold bg-[#c2410c] text-white hover:bg-[#9a3412] transition-colors"
            >
              詳しく見る
            </a>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-400 mt-3">
        ※ 外部サイトへ遷移します。当サイトは各サービスの運営元とは独立しています。
      </p>
    </section>
  );
}
