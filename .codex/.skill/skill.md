---
name: portfolio-website-build
description: Build a personal resume/portfolio website with Next.js — minimal, light, warm palette with a bold contrasting accent, glassmorphism ("glass box") UI, and soft blurred background shapes. Use this whenever building or editing this portfolio project.
---

# Portfolio Website Build Spec

## Goal

สร้างเว็บไซต์ portfolio ส่วนตัวสำหรับสมัครงาน (resume site) ด้วย Next.js เดี่ยว (ไม่ใช่ monorepo) ดีไซน์แบบ minimal อ่านง่าย โทนสว่าง อบอุ่น มี glass box UI และ blurred background object ประกอบฉาก **ไม่มี 3D**

---

## Tech Stack

- **Framework:** Next.js 15, App Router, standalone repo
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility-first, ใช้ CSS variables สำหรับ design tokens)
- **Animation:** Framer Motion (fade/slide-in on scroll, hover micro-interactions) — เบา ๆ พอ ไม่ต้อง GSAP
- **Icons:** lucide-react
- **Fonts:** Google Fonts — Prompt หรือ IBM Plex Sans Thai (ภาษาไทย) + Inter (ภาษาอังกฤษ/ตัวเลข)
- **Contact form:** Resend API route (`/app/api/contact/route.ts`) หรือ EmailJS ถ้าไม่อยากมี backend เลย
- **Responsive:** mobile-first,pc-secondary Tailwind responsive utilities
- **Deploy target:** Vercel , Netlify

**ห้ามใช้:** three.js, @react-three/fiber, WebGL, canvas 3D ใด ๆ — โปรเจกต์นี้ตัด 3D ออกทั้งหมด

---

## Design System

### Color Palette (Light, Warm, High-Contrast Accent)

กำหนดเป็น CSS variables ใน `globals.css`:

```css
:root {
  /* base — warm off-white, ไม่ใช่ขาวจัด */
  --bg-base: #faf6f0;
  --bg-elevated: #ffffff;

  /* warm neutrals สำหรับ text/border */
  --text-primary: #2b2621;
  --text-secondary: #6b6156;
  --border-soft: #e8dfd4;

  /* accent — เลือก 1 สีที่ตัดกับโทนอุ่นแบบชัดเจน (ตัวอย่าง: เขียวเข้ม/ครามเข้ม/ส้มไหม้) */
  --accent: #1f5c4d; /* deep emerald — ตัดกับพื้นหลัง cream ได้ชัด */
  --accent-soft: #1f5c4d1a; /* accent ที่ opacity ต่ำ ใช้กับ glass tint */

  /* glass box */
  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-border: rgba(255, 255, 255, 0.6);

  /* blurred background shapes */
  --blob-1: #f4c9a0; /* peach */
  --blob-2: #bfd8c7; /* sage */
}
```

- โทนหลัก: cream/off-white + warm gray text
- Accent เลือกสีเข้ม-อิ่มตัวสีเดียว ใช้กับ CTA button, active state, link hover, ไม่ใช้เกิน 1 accent hue เพื่อไม่ให้ลายตา
- ห้ามใช้ dark mode เป็น default (ธีมนี้ต้อง "สว่าง" เท่านั้น — ถ้าจะทำ dark mode toggle ทำเป็น optional ภายหลัง)

### Typography

- Heading: Prompt/IBM Plex Sans Thai, weight 600–700
- Body: weight 400, line-height 1.6–1.7 (เน้นอ่านง่าย)
- Scale: h1 `clamp(2.25rem, 4vw, 3.5rem)`, h2 `clamp(1.5rem, 3vw, 2.25rem)`, body `1rem`
- Max line length ของ paragraph: ~65–75 ตัวอักษร (ใช้ `max-w-prose`)

### Glass Box Component

Component กลางที่ใช้ห่อ card/section content เกือบทุกจุด:

```tsx
// components/GlassBox.tsx
export function GlassBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-md shadow-sm ${className}`}
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--glass-border)",
      }}
    >
      {children}
    </div>
  );
}
```

- ใช้ `backdrop-blur-md` หรือ `backdrop-blur-lg` เสมอ ต้องมี background ที่ semi-transparent อยู่ด้านหลัง (blob) ถึงจะเห็นเอฟเฟกต์กระจกชัดเจน
- border บาง ๆ สีขาวโปร่ง + shadow เบา ๆ ให้ดูลอยขึ้นจากพื้น
- radius ใหญ่หน่อย (`rounded-2xl`/`rounded-3xl`) ให้ดู soft/minimal

### Blurred Background Objects

- ใส่ `<div>` วงกลม/blob 2–3 ชิ้น ตำแหน่ง `absolute`, สี soft (peach, sage) จาก palette, ขนาดใหญ่ (300–500px), `filter: blur(80px)`, `opacity: 0.5–0.7`
- วางไว้หลัง content ทั้งหมด (`z-index: -1` หรือ `absolute inset-0` ใน wrapper ที่มี `overflow-hidden`)
- ตัวอย่าง:

```tsx
// components/BackgroundBlobs.tsx
export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full opacity-60"
        style={{ background: "var(--blob-1)", filter: "blur(90px)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full opacity-50"
        style={{ background: "var(--blob-2)", filter: "blur(100px)" }}
      />
    </div>
  );
}
```

- แต่ละ section วาง blob วนสีสลับกันเพื่อไม่ให้หน้าเดียวกันดูซ้ำ
- Mobile: ลดขนาด blob ลง ~40% และลด blur radius เล็กน้อยเพื่อ performance

---

## Page Structure (เรียงตามเดิม)

### 1. Hero — แนะนำตัว

- ชื่อ, role/สายที่สนใจ, one-line pitch
- Glass box ครอบ intro text + CTA buttons ("ดู Resume", "ติดต่อ")
- Blob พื้นหลัง 2 ชิ้นวางเยื้องซ้าย-ขวา

### 2. About Me

- จบจากไหน, สาขา, ข้อมูลย่อ
- Layout 2 คอลัมน์: รูปโปรไฟล์ (glass frame) + ข้อความ

### 3. Experience — Internship / Work

- Timeline แนวตั้ง แต่ละ item เป็น GlassBox: บริษัท, ตำแหน่ง, ช่วงเวลา, bullet ผลงาน

### 4. Tech Stack & Projects

- Grid การ์ดโปรเจกต์ (GlassBox แต่ละใบ): ชื่อ, screenshot, tag เทคโนโลยี, ลิงก์
- Skill icons จัดกลุ่ม Frontend/Backend/Tools

### 5. Contact / Footer

- ฟอร์มติดต่อใน GlassBox กลางจอ หรือปุ่มลิงก์ social
- ปุ่ม download resume PDF (accent color เต็ม ไม่ใช่ glass)

---

## Interaction & Motion

- Section เข้า viewport → fade + slide-up เบา ๆ ด้วย Framer Motion (`opacity 0→1`, `y: 16→0`, duration ~0.4s)
- Hover บนการ์ด: ยกเงาเล็กน้อย (`translateY(-2px)`) ไม่ scale เกินจริง
- ปุ่ม CTA หลัก: solid accent background, ปุ่มรอง: outline/ghost

## Accessibility & Performance

- คอนทราสต์ข้อความต่อพื้นหลัง glass ต้องผ่าน WCAG AA (เช็ค `--text-primary` บน `--glass-bg`)
- `backdrop-blur` หนักบน mobile บางรุ่น — ทดสอบจริงบนมือถือ, ลด blur ถ้ากระตุก
- ใช้ `next/image` สำหรับรูปทั้งหมด, lazy-load รูป section ที่ไม่ใช่ hero

## Folder Structure

```
/app
  /page.tsx
  /api/contact/route.ts
  /globals.css
/components
  GlassBox.tsx
  BackgroundBlobs.tsx
  Hero.tsx
  About.tsx
  Experience.tsx
  Projects.tsx
  Contact.tsx
/lib
  data.ts        // เก็บ content: experience, projects, skills เป็น array/object
```

## Next Steps

1. Setup Next.js + Tailwind, ใส่ CSS variables ตาม palette ข้างบน
2. สร้าง `GlassBox` และ `BackgroundBlobs` เป็น component กลางก่อน
3. Build section ทีละอัน ตามลำดับ 1→5 ด้วย static content ก่อน
4. ใส่ Framer Motion scroll animation ทีหลังสุด
5. เทส contrast/performance บนมือถือ ก่อน deploy Vercel
