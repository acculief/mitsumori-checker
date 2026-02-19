import { affiliateServices } from "@/data/affiliate-links";

interface Props {
  hasExpensiveItems: boolean;
}

export default function AffiliateCTA({ hasExpensiveItems }: Props) {
  return (
    <section
      className="rounded-xl bg-gradient-to-br from-teal-50 via-white to-orange-50 border border-slate-200 p-5 shadow-sm animate-fade-in-up-delay-1"
      aria-label="車検予約サービスの紹介"
    >
      {/* ヘッダー */}
      <div className="mb-4">
        <h3 className="font-bold text-[#1a2332] text-base mb-1">
          {hasExpensiveItems
            ? "この見積もり、他店と比べてみませんか？"
            : "適正価格でも相見積もりは安心材料になります"}
        </h3>
        <p className="text-sm text-[#64748b]">
          {hasExpensiveItems
            ? "複数の店舗で見積もりを取ることで、交渉材料が増えます。"
            : "他店の価格を知っておくと、次回の車検でも安心です。"}
        </p>
      </div>

      {/* サービスカード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {affiliateServices.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col"
          >
            <div className="font-bold text-sm text-[#1a2332] mb-1">
              {service.name}
            </div>
            <p className="text-xs text-[#64748b] mb-3 flex-1">
              {service.description}
            </p>
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${service.name}で詳しく見る`}
              className="block w-full text-center py-2 rounded-lg text-sm font-bold border-2 border-[#0d7377] text-[#0d7377] hover:bg-[#0d7377] hover:text-white transition-all"
            >
              詳しく見る
            </a>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#94a3b8] mt-3">
        ※ 外部サイトへ遷移します。当サイトは各サービスの運営元とは独立しています。
      </p>
    </section>
  );
}
