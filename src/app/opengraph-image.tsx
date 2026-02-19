import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "車検費用チェッカー｜車検の見積もりを相場と比較して無料診断";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: "24px",
            padding: "48px 64px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "56px" }}>🔍</span>
            車検費用チェッカー
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#64748b",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            見積もりを相場データと比較して無料診断
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "20px",
              color: "#94a3b8",
            }}
          >
            <span>25項目対応</span>
            <span>|</span>
            <span>完全無料</span>
            <span>|</span>
            <span>登録不要</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
