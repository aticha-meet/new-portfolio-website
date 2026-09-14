import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt =
  "Jaosou — Aticha Meetunyakron. Engineering curiosity meets software development.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 80px",
        background: "#faf6f0",
        color: "#2b2621",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 700 }}>jaosou.</span>
        <span style={{ fontSize: 18, color: "#1f5c4d" }}>
          DEVELOPER PORTFOLIO
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 80, fontWeight: 700 }}>I build things</span>
        <span style={{ fontSize: 80, fontWeight: 700, color: "#1f5c4d" }}>
          that connect.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span>{site.name}</span>
        <span>Backend · Data · Connected devices</span>
      </div>
    </div>,
    size,
  );
}
