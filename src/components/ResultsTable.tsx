import { CompareResult } from "@/lib/types";
import ResultBadge from "./ResultBadge";

function formatYen(n: number) {
  return `¥${n.toLocaleString()}`;
}

interface Props {
  items: CompareResult[];
}

export default function ResultsTable({ items }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2 pr-2 font-medium">項目</th>
            <th className="py-2 px-2 font-medium text-right">見積もり額</th>
            <th className="py-2 px-2 font-medium text-right">相場（中央値）</th>
            <th className="py-2 px-2 font-medium text-right">差額</th>
            <th className="py-2 pl-2 font-medium text-center">判定</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.itemId}
              className="border-b border-slate-100 last:border-b-0"
            >
              <td className="py-3 pr-2 text-slate-800">{item.label}</td>
              <td className="py-3 px-2 text-right font-medium text-slate-800">
                {formatYen(item.amount)}
              </td>
              <td className="py-3 px-2 text-right text-slate-500">
                {formatYen(item.range.median)}
              </td>
              <td
                className={`py-3 px-2 text-right font-medium ${
                  item.diffFromMedian > 0
                    ? "text-red-600"
                    : item.diffFromMedian < 0
                      ? "text-blue-600"
                      : "text-slate-500"
                }`}
              >
                {item.diffFromMedian > 0 ? "+" : ""}
                {formatYen(item.diffFromMedian)}
              </td>
              <td className="py-3 pl-2 text-center">
                <ResultBadge verdict={item.verdict} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
