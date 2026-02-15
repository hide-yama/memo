import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "memo";
  const category = searchParams.get("category") ?? "";

  const fontData = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@600&display=swap"
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src: url\((.+?)\) format/);
      return match ? fetch(match[1]).then((res) => res.arrayBuffer()) : null;
    });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#ffffff",
          fontFamily: '"Noto Sans JP"',
        }}
      >
        {category && (
          <div
            style={{
              fontSize: 24,
              color: "#1e7b65",
              marginBottom: 16,
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 30 ? 40 : 52,
            fontWeight: 600,
            color: "#08131a",
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 28,
            color: "rgba(8,19,26,0.4)",
          }}
        >
          memo
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Noto Sans JP",
                data: fontData,
                style: "normal",
                weight: 600,
              },
            ],
          }
        : {}),
    }
  );
}
