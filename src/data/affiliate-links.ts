export interface AffiliateService {
  id: string;
  name: string;
  description: string;
  url: string; // 後でアフィリエイトURLに差し替え
  ctaLabel: string;
}

export const affiliateServices: AffiliateService[] = [
  {
    id: "rakuten-car",
    name: "楽天Car車検",
    description: "楽天ポイントが貯まる。全国5,600店舗以上から比較・予約。",
    url: "https://car.rakuten.co.jp/shaken/",
    ctaLabel: "楽天ポイントで探す",
  },
  {
    id: "epark",
    name: "EPARK車検",
    description: "整備工場の口コミ・ランキングで選べる。最大割引あり。",
    url: "https://shaken.epark.jp/",
    ctaLabel: "口コミで探す",
  },
  {
    id: "goo-pit",
    name: "グーネットピット",
    description: "近くの整備工場を検索。作業実績・レビューが豊富。",
    url: "https://www.goo-net.com/pit/",
    ctaLabel: "近くの工場を探す",
  },
];
