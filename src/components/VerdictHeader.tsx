import { SummaryResult } from "@/lib/types";
import { formatYen } from "@/lib/formatters";

interface Props {
  summary: SummaryResult;
}

function getOverallMessage(summary: SummaryResult): {
  message: string;
  sub: string;
  bgClass: string;
  textClass: string;
  icon: string;
} {
  const ratio = summary.totalAmount / summary.totalMedian;

  if (ratio <= 0.9) {
    return {
      message: "この見積もりは相場より割安です",
      sub: `相場中央値より ${Math.round((1 - ratio) * 100)}% 安い見積もりです。`,
      bgClass: "from-sky-500 to-cyan-500",
      textClass: "text-white",
      icon: "✨",
    };
  }
  if (ratio <= 1.1) {
    return {
      message: "この見積もりは適正価格です",
      sub: "相場の範囲内に収まっています。安心してお任せできそうです。",
      bgClass: "from-emerald-500 to-teal-500",
      textClass: "text-white",
      icon: "✅",
    };
  }
  if (ratio <= 1.3) {
    return {
      message: "この見積もりはやや高めです",
      sub: `相場中央値より ${Math.round((ratio - 1) * 100)}% 高い見積もりです。他社との比較をおすすめします。`,
      bgClass: "from-amber-400 to-orange-400",
      textClass: "text-white",
      icon: "⚠️",
    };
  }
  return {
    message: "この見積もりは相場より割高です",
    sub: `相場中央値より ${Math.round((ratio - 1) * 100)}% 高い見積もりです。他のお店に相見積もりを取りましょう。`,
    bgClass: "from-rose-500 to-red-500",
    textClass: "text-white",
    icon: "🚨",
  };
}

export default function VerdictHeader({ summary }: Props) {
  const v = getOverallMessage(summary);

  return (
    <div
      className={`rounded-2xl bg-gradient-to-r ${v.bgClass} p-6 shadow-lg animate-scale-in`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{v.icon}</div>
        <h3 className={`text-xl font-bold ${v.textClass} mb-1`}>
          {v.message}
        </h3>
        <p className={`text-sm ${v.textClass} opacity-85`}>{v.sub}</p>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className={`${v.textClass} opacity-90`}>
            <div className="text-xs opacity-75">見積もり合計</div>
            <div className="text-2xl font-bold">
              {formatYen(summary.totalAmount)}
            </div>
          </div>
          <div className={`w-px h-10 ${v.textClass} opacity-30`} />
          <div className={`${v.textClass} opacity-90`}>
            <div className="text-xs opacity-75">相場中央値</div>
            <div className="text-2xl font-bold">
              {formatYen(summary.totalMedian)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
