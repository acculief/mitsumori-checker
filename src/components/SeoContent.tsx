import { dataLastUpdated } from "@/data/market-rates";

const costTable = [
  { size: "軽自動車", examples: "N-BOX, ワゴンR, タント", legal: "約25,500円", total: "約36,000〜66,000円" },
  { size: "小型車", examples: "ヤリス, フィット, ノート", legal: "約35,800円", total: "約49,000〜91,000円" },
  { size: "中型車", examples: "プリウス, カローラ, CX-5", legal: "約44,100円", total: "約59,000〜109,000円" },
  { size: "大型車", examples: "アルファード, ランクル, エルグランド", legal: "約52,300円", total: "約70,000〜132,000円" },
];

const faqItems = [
  {
    q: "車検の費用相場はいくらですか？",
    a: "法定費用＋車検基本料の合計で、軽自動車で約4〜7万円、小型車で約5〜9万円、中型車で約6〜11万円、大型車で約7〜13万円が一般的な相場です。追加のメンテナンス・部品交換が発生すると、さらに費用がかかります。",
  },
  {
    q: "車検の見積もりが高いかどうかはどう判断すればいいですか？",
    a: "見積もり項目ごとに相場データと比較するのが最も確実です。車検費用チェッカーでは、各項目を「割安・適正・やや高い・高い・非常に高い」の5段階で判定します。相場中央値の1.1倍以内であれば適正と判断できます。",
  },
  {
    q: "車検費用を安くする方法はありますか？",
    a: "複数の整備工場から相見積もりを取ることが最も効果的です。ディーラー・カー用品店・整備工場で価格差が大きい項目は、比較するだけで数千〜数万円の節約が可能です。",
  },
  {
    q: "軽自動車の車検はいくらですか？",
    a: "軽自動車の車検費用は、法定費用（自賠責保険17,540円＋重量税6,600円＋印紙代1,400円）の約25,500円に加え、車検基本料10,000〜25,000円が必要です。合計で約36,000〜66,000円が目安ですが、部品交換が必要な場合はさらに費用がかかります。",
  },
  {
    q: "ディーラー車検はなぜ高いのですか？",
    a: "ディーラーは純正部品を使用し、メーカー基準の点検を行うため、整備工場やカー用品店と比べて車検基本料が高くなる傾向があります。ただし品質や保証面で安心感があるため、価格だけでなく総合的に判断することが大切です。",
  },
  {
    q: "車検はどこが一番安いですか？",
    a: "一般的に、ユーザー車検（自分で陸運局に持ち込み）が最安ですが手間がかかります。店舗型では車検専門チェーン（車検のコバック等）やカー用品店（オートバックス等）が比較的安く、ディーラーが最も高い傾向です。ただし安さだけで選ぶと必要な整備が省かれるリスクもあります。",
  },
  {
    q: "ブレーキパッド交換の費用はいくらですか？",
    a: "ブレーキパッド交換（フロント片側）の費用は、軽自動車で8,000〜18,000円、小型車で10,000〜25,000円、中型車で12,000〜30,000円が相場です。工賃込みの価格で、純正品かアフターパーツかでも金額が変わります。",
  },
];

export default function SeoContent() {
  return (
    <section className="mt-10 pt-8 border-t border-slate-200 space-y-8">
      {/* 相場テーブル */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">
          車検費用の相場一覧（{dataLastUpdated}時点）
        </h2>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">
          法定費用（自賠責保険＋重量税＋印紙代）と車検基本料を合わせた金額の目安です。
          メンテナンスや部品交換が必要な場合は追加費用が発生します。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left py-2 px-3 font-bold text-slate-700 border-b border-slate-200">車両サイズ</th>
                <th className="text-left py-2 px-3 font-bold text-slate-700 border-b border-slate-200">車種の例</th>
                <th className="text-right py-2 px-3 font-bold text-slate-700 border-b border-slate-200">法定費用</th>
                <th className="text-right py-2 px-3 font-bold text-slate-700 border-b border-slate-200">合計目安</th>
              </tr>
            </thead>
            <tbody>
              {costTable.map((row) => (
                <tr key={row.size} className="border-b border-slate-100">
                  <td className="py-2 px-3 font-medium text-slate-900">{row.size}</td>
                  <td className="py-2 px-3 text-slate-500">{row.examples}</td>
                  <td className="py-2 px-3 text-right text-slate-700 tabular-nums">{row.legal}</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900 tabular-nums">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 使い方 */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">
          車検費用チェッカーの使い方
        </h2>
        <div className="space-y-2">
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <div>
              <div className="text-sm font-medium text-slate-900">車両サイズを選ぶ</div>
              <p className="text-xs text-slate-500">軽自動車・小型車・中型車・大型車から選択してください。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
            <div>
              <div className="text-sm font-medium text-slate-900">見積もり項目と金額を入力</div>
              <p className="text-xs text-slate-500">車検の見積もり書に記載された項目名と金額をそのまま入力。25項目に対応しています。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
            <div>
              <div className="text-sm font-medium text-slate-900">診断結果を確認</div>
              <p className="text-xs text-slate-500">各項目が「割安・適正・やや高い・高い・非常に高い」の5段階で判定されます。相場レンジバーで視覚的に確認できます。</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">
          車検費用のよくある質問
        </h2>
        <div className="space-y-0 divide-y divide-slate-100">
          {faqItems.map((item) => (
            <details key={item.q} className="group">
              <summary className="py-3 text-sm font-medium text-slate-900 cursor-pointer list-none flex items-center justify-between gap-2 hover:text-primary transition-colors">
                <span>{item.q}</span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="pb-3 text-xs text-slate-500 leading-relaxed pr-6">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
