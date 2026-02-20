# 車検費用チェッカー — プロジェクトコンテキスト

## 概要
車検・自動車修理の見積もり項目を相場データと比較し「適正/高い」を判定するWebアプリ。AIは使わず、ルールベースの価格比較で原価ほぼゼロのサービスを目指す。人生で数回しか経験しない車検で「言い値で払う」を防ぐ。

## 技術スタック
- **Next.js 15** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS** (カスタムカラー: primary=オレンジ #c2410c, accent=アンバー #f28c28)
- **Vercel** デプロイ
- 外部DB不要（相場データはTSファイルで管理）
- 追加ライブラリなし（React useStateで状態管理）

## サイト構成
| パス | 内容 |
|------|------|
| `/` | シングルページ（3ステップフォーム: 車両選択→見積入力→診断結果） |
| `/guide/[slug]/` | 項目別ガイドページ（25項目 × 相場テーブル＋解説＋Tips＋CTA） |

## データ構成
- `src/data/market-rates.ts` — 相場データベース（25項目 × 4車両サイズ × low/median/high）
- `src/lib/types.ts` — 全TypeScript型定義
- `src/lib/compare.ts` — 価格比較ロジック（5段階判定）
- `src/lib/constants.ts` — ラベル・色・アイコン定数
- `src/data/affiliate-links.ts` — アフィリエイト送客先データ（UTMパラメータ付き）
- `src/data/guide-content.ts` — ガイドページコンテンツ（25項目の解説・Tips・関連リンク・ビルド時slug検証付き）

## コンポーネント構成
- `HomeClient.tsx` — トップページの対話ロジック（Client Component）
- `SeoContent.tsx` — SEO用静的コンテンツ（相場テーブル＋使い方＋FAQ 7問）※Server Component
- `Header.tsx` — グラデーションヘッダー
- `VehicleSelector.tsx` — 車両サイズ4択カード
- `EstimateForm.tsx` — 見積もり項目入力（動的行追加/削除）
- `EstimateItemRow.tsx` — 1行（ドロップダウン＋金額＋参考相場プレビュー）
- `VerdictHeader.tsx` — 一言診断（グラデーション背景）
- `SavingsSummary.tsx` — 合計サマリーカード
- `ResultsTable.tsx` — 項目別カード（レンジバー付き）
- `ResultBadge.tsx` — 判定バッジ（割安/適正/やや高い/高い/非常に高い）
- `PriceRangeBar.tsx` — 相場レンジバー
- `AffiliateCTA.tsx` — 車検予約サービスへの送客CTA
- `ShareButtons.tsx` — SNS共有ボタン（X共有 + URLコピー）

## 判定ロジック
| 条件 | 判定 | 色 |
|---|---|---|
| ≤ 相場下限 | 割安 | スカイブルー |
| ≤ 中央値×1.1 | 適正 | エメラルド |
| ≤ 相場上限 | やや高い | アンバー |
| ≤ 相場上限×1.3 | 高い | オレンジ |
| > 相場上限×1.3 | 非常に高い | ローズ |

## 本番URL
https://mitsumori-checker.vercel.app

## 品質基準
- `npm run build` が通ること（必須）
- SEO: metadata / openGraph の設定
- アクセシビリティ: ARIAラベル、キーボード操作
- パフォーマンス: 静的エクスポート、Client Component最小限
- モバイルファースト: レスポンシブ対応

## コミット規約
- 日本語OK
- Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> を末尾に付与
- 改善は論理的なまとまりでコミットを分ける

## 改善時の注意
- 相場データ（market-rates.ts）の数値は根拠なく変えない
- 判定ロジック（compare.ts）の閾値は根拠なく変えない
- 既存のURLパス構造は変更しない

---

## 事業戦略

### ビジョン
「車のことで損する人をゼロにする」— 情報の非対称性を解消し、すべてのドライバーが適正価格でサービスを受けられる世界を作る。

### ターゲットユーザー
1. **プライマリ**: 初めて車検を受ける20〜30代（相場感がまったくない）
2. **セカンダリ**: 車検のたびに「高いかも」と不安を感じる40〜50代
3. **ターシャリ**: 家族の車の車検を代行する主婦/主夫層

### 競合との差別化
- 楽天Car車検/EPARK車検 = 「店を探すサービス」→ うちは「見積もりを判定するサービス」
- 既存サービスは予約導線がゴール → うちは「交渉材料を提供」がゴール
- 完全無料・会員登録不要・個人情報不要 = 圧倒的に低い利用ハードル

### 収益化ロードマップ
| フェーズ | 時期 | 施策 | 収益モデル |
|---------|------|------|-----------|
| Phase 1 | 今 | MVP完成・SEO集客開始 | なし（トラフィック獲得優先） |
| Phase 2 | MAU 1,000〜 | 車検予約サービスへの送客導線 | アフィリエイト（CPA） |
| Phase 3 | MAU 5,000〜 | 整備工場の掲載・広告枠 | 月額掲載料 / CPM広告 |
| Phase 4 | MAU 10,000〜 | 相見積もり一括依頼機能 | 送客手数料 |

### SEO戦略
- 主要KW: 「車検 見積もり 相場」「車検 高い」「車検 ぼったくり」「ブレーキパッド 交換 費用」
- コンテンツSEO: 項目別の相場解説ページ（/guide/[item-slug]/）を将来追加
- ツールSEO: 「車検費用チェッカー」としてツール系KWを狙う

### KPI
- **North Star Metric**: 月間診断実行回数
- Phase 1: 月100回診断
- Phase 2: 月1,000回診断
- Phase 3: 月5,000回診断

### 直近のアクションプラン（優先順）
1. ✅ MVP完成（3ステップフォーム + 診断結果）
2. ✅ リッチUI化（競合ベンチマーク反映）
3. ✅ SEO基盤整備（metadata/openGraph/twitter/JSON-LD/動的サイトマップ/robots.txt/OGP画像）
4. ✅ SEOコンテンツ追加（相場テーブル+FAQ7問+HowTo+BreadcrumbList+ガイドFAQ自動生成）
5. ✅ SNS共有機能（X共有 + LINE共有 + URLコピー）
6. ✅ GA4計測基盤（GoogleAnalyticsコンポーネント + 4ファネルイベント / Search Console verification✅ / GA4有効化はNEXT_PUBLIC_GA_MEASUREMENT_ID設定後）
7. ✅ アフィリエイト導線（楽天Car車検/EPARK車検/グーネットピットへのCTA + UTMトラッキング）
8. 🔲 PWA対応（manifest.json✅ / Service Worker未 / オフライン未）
9. 🔲 相見積もり機能（複数店舗の見積もりを並列比較）
10. ✅ 項目別ガイドページ（25ページ /guide/[slug]/ 静的生成 + カテゴリ別ナビ + 内部リンクメッシュ）
11. ✅ サンプル見積もり体験（手ぶらでツールの価値を即体験 → 初回離脱防止）
