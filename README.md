# Jaosou / Aticha — Portfolio 2026

เว็บ portfolio หน้าเดียวที่ปรับจาก [เว็บเดิม](https://portfolio-aticha.netlify.app/) ตาม skill ใน `.codex/.skill/skill.md` ใช้ Next.js 16.3.5, React 19, TypeScript, Tailwind 4, Framer Motion และ lucide-react

## เปิดเว็บไซต์บนเครื่อง

```bash
pnpm install
pnpm dev
```

เปิด http://localhost:3000 หรือทดสอบ production ด้วย `pnpm build` แล้ว `pnpm start`

## แก้ข้อมูลและรูป

- `config/site.ts`: ชื่อ ช่องทางติดต่อ Resume URL และ URL เว็บไซต์
- `lib/data.ts`: ประวัติการศึกษา ประสบการณ์ ทักษะ และโปรเจกต์
- `config/images.ts`: จุดรวม static imports ของรูป พร้อม alt และ type ของ key
- `assets/images/profile/`: รูปโปรไฟล์
- `assets/images/projects/<project-slug>/`: รูปโปรเจกต์
- `assets/images/activities/`: รูปกิจกรรม
- `app/globals.css`: design tokens สี ระยะ typography และ responsive styles

วางรูปใหม่ใน `assets/images/` แล้วเปลี่ยน import ใน `config/images.ts` โดยใช้ key เดิม Components จะใช้รูปใหม่ทุกจุด อย่าเขียน path รูปลงใน component โดยตรง รายละเอียดแหล่งรูปอยู่ใน `assets/images/README.md`

รูปปกโปรเจกต์ที่ย้ายจากเว็บเดิมเป็นภาพประกอบแนวคิด จึงระบุว่า PROJECT CONCEPT ไม่อ้างว่าเป็นภาพหน้าจอโปรแกรม รูปทั้งหมด 9 ไฟล์ถูกแปลงเป็น WebP รวมประมาณ 1.26 MB

## Resume

ปุ่ม View resume ใช้ Canva URL เดิมที่เจ้าของเผยแพร่ไว้ หากต้องการดาวน์โหลด PDF ให้วางไฟล์จริงที่ `public/assets/documents/resume.pdf` แล้วตั้ง `site.resume.downloadUrl` เป็น `/assets/documents/resume.pdf` ปุ่มในส่วน Contact จะเปลี่ยนเป็น Download resume

## ฟอร์มติดต่อ

ค่าเริ่มต้น: ตรวจข้อมูลและสร้าง draft ที่เปิดในแอปอีเมลของผู้เข้าชม ผู้เข้าชมต้องกดส่งในแอปนั้นเอง เว็บไซต์ไม่แสดงสถานะว่าส่งแล้วก่อนเกิดการส่งจริง และมี direct email link อยู่เสมอ

หากต้องการส่งผ่านหน้าเว็บ:

1. สร้าง `.env.local` จาก `.env.example` หรือกำหนด environment บน hosting
2. ตั้ง `RESEND_API_KEY` และ `CONTACT_FROM_EMAIL` โดยใช้ sender/domain ที่ตรวจสอบแล้วใน Resend
3. ตั้ง `CONTACT_TO_EMAIL` ถ้าต้องการผู้รับต่างจาก email ใน config
4. Build ใหม่ เพราะโหมดฟอร์มเลือกตอนสร้างหน้า static
5. ทดสอบการส่งกับผู้รับที่อนุญาต และตั้ง rate limit ที่ hosting เมื่อเปิดรับสาธารณะ

`app/api/contact/route.ts` ตรวจ origin, content type, body size, fields และ honeypot มี timeout และ throttle แบบจำกัดหน่วยความจำต่อ server instance (ไม่ใช่ distributed rate limit) ใช้ Resend REST API โดยเก็บ secret ฝั่ง server เท่านั้น ฟอร์มป้องกันการ submit ซ้ำระหว่างรอ มีสถานะสำเร็จ/ล้มเหลว และไม่โชว์รายละเอียด error ของ provider

เมื่อปิด JavaScript ฟอร์มจะถูกซ่อนเพื่อไม่ส่งข้อมูลผ่าน query string; ใช้ direct email link ได้

## ตรวจสอบ

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
pnpm format:check
```

E2E ใช้ production server port 3010 และ Microsoft Edge ที่มีในเครื่องนี้ ถ้าใช้ Chromium ที่ Playwright จัดการเอง ให้ติดตั้งด้วย `pnpm exec playwright install chromium` แล้วตั้ง `PLAYWRIGHT_CHROMIUM_CHANNEL=chromium` หรือปรับ channel ใน `playwright.config.ts`

Tests ครอบคลุม responsive 360/390/768/1024/1440px, keyboard/mobile navigation, project filters, draft form, invalid API requests, images, internal anchors, reduced motion, no-JavaScript rendering และ axe WCAG A/AA (desktop/mobile) โดยไม่ส่งอีเมลจริง

`node scripts/measure-performance.mjs` วัด LCP/CLS/FCP ของ local production server แบบไม่มี CPU/network throttling ผลอยู่ใน `artifacts/performance.json` ไม่ใช่คะแนน Lighthouse หรือผลจากมือถือจริง

## เผยแพร่

เตรียม `netlify.toml` แล้ว ใช้ `pnpm build` และ publish directory `.next`; Netlify จัดการ Next.js adapter อัตโนมัติ ไม่ใช้ static export เพราะมี contact Route Handler

สถานะตอนส่งมอบ: ยังไม่เผยแพร่ เนื่องจาก Netlify CLI ยังไม่ล็อกอินและยังไม่ได้เลือกปลายทางใหม่/เดิม การอนุมัติ implementation และ deploy ได้รับแล้ว เหลือการเชื่อมบัญชีและกำหนดปลายทาง

เริ่มเชื่อมบัญชีได้ด้วย:

```bash
pnpm --package=netlify-cli dlx netlify login
```

หลังล็อกอิน เลือกหรือสร้าง site แล้วใช้ `netlify deploy --build` สำหรับ draft preview ตรวจ preview ก่อนเผยแพร่ production ด้วย `--prod` อย่าสลับไปอัปเดตเว็บไซต์เดิมโดยไม่ตรวจ site ID

ตั้ง `NEXT_PUBLIC_SITE_URL` เป็น URL ของเว็บไซต์ใหม่เมื่อทราบ URL แล้ว ระบบรองรับ fallback จาก `DEPLOY_PRIME_URL`, `URL` ของ Netlify หรือ `VERCEL_URL` และสร้าง canonical, Open Graph, robots และ sitemap ตาม URL นั้น Local preview ไม่ใช้ canonical ของเว็บเดิม

## เนื้อหาที่รอยืนยัน

- สถานะการศึกษา/งานปัจจุบันและตำแหน่งที่สนใจ: ยังไม่ถือว่าข้อมูล “นักศึกษาปี 3 / มองหาฝึกงาน” จากเว็บเก่าเป็นข้อมูลปัจจุบัน
- ไฟล์ Resume PDF และรูปโปรไฟล์ที่ละเอียดขึ้น หากต้องการแทนต้นฉบับเดิม
- บัญชี Netlify/ปลายทาง deploy และข้อมูล Resend หากต้องการส่งอีเมลตรงจากเว็บไซต์

## แหล่งอ้างอิง

- [Portfolio เดิมของเจ้าของ](https://portfolio-aticha.netlify.app/): ชื่อ ประวัติ ทักษะ กิจกรรม รูปภาพ และลิงก์ผลงาน
- คู่มือเวอร์ชันติดตั้งใน `node_modules/next/dist/docs/`
- [Motion accessibility](https://motion.dev/docs/react-accessibility)
- [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
