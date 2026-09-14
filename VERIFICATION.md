# Verification — 14 September 2026

## ผลล่าสุด

- Baseline starter: lint และ build ผ่านก่อนเริ่มงาน
- เว็บใหม่: production build, ESLint และ TypeScript ผ่าน
- Unit tests: 4 ผ่าน — validation, honeypot, Unicode, mailto encoding
- E2E: 6 ผ่าน — responsive/images/anchors/axe, mobile navigation, project filters, draft form, API rejection paths, no-JavaScript/reduced motion
- axe: ไม่พบ violation ของ rules ที่เลือก WCAG 2 A/AA และ 2.1 AA บน 390px และ 1440px; ไม่ใช่การรับรอง accessibility ครบทุกข้อ
- Responsive: ตรวจความกว้าง 360, 390, 768, 1024, 1440px ไม่มี horizontal overflow
- ไม่พบ page error หรือ console error ระหว่าง responsive test
- ลิงก์ GitHub ของโปรเจกต์ทั้ง 5 รายการตอบ HTTP 200
- รูปทั้ง 9 ไฟล์อ้างผ่าน config และถูกแปลง WebP รวม 1,261,754 bytes

## สิ่งที่แก้จากผลทดสอบ

- lucide-react รุ่นที่ติดตั้งไม่มี brand icons จึงแยก Github/Linkedin เป็น SVG components
- ปรับ alt ให้ระบุชัดจาก registry เพื่อให้ lint ตรวจได้
- เพิ่มขนาดข้อความสำหรับการอ่านจริง
- เพิ่ม contrast ตัวเลข section และลดความจางระหว่าง reveal
- แก้ test assertion ของ native validity ให้ตรวจ valueMissing โดยตรง
- ซ่อนฟอร์มเมื่อปิด JavaScript เพื่อไม่ให้เกิดการส่งข้อมูลแบบ GET
- ใช้ next/image API ปัจจุบัน ไม่ใช้ priority ที่ deprecated
- เพิ่ม metadataBase และ host URL fallback สำหรับ Open Graph/sitemap

## Performance sample

วัดจาก local production server, Microsoft Edge Chromium, browser context ใหม่, viewport 390/1440px, ไม่จำลอง CPU/network slowdown:

- 390px: LCP/FCP 444 ms, CLS 0, resource transfer ประมาณ 226 KB
- 1440px: LCP/FCP 176 ms, CLS 0, resource transfer ประมาณ 226 KB

เป็นตัวอย่างการวัดบนเครื่องนี้ ไม่ใช่ real-user Core Web Vitals, Lighthouse หรือผลบนมือถือจริง ตัวเลขอาจเปลี่ยนเมื่อเผยแพร่และใช้เน็ตจริง

## ขอบเขตที่ยังไม่ได้ตรวจ

- การส่ง Resend จริง: ยังไม่มี credentials และไม่มีการส่งอีเมลทดสอบไปหาผู้อื่น
- Netlify deployment และ hosted image optimization: ยังไม่ล็อกอิน/เลือก site; OAuth ที่เปิดหมดเวลารอ authorization
- มือถือจริง, Safari และ Firefox
- สถานะการศึกษา/งานปัจจุบันของเจ้าของ และไฟล์ PDF ใหม่

Screenshots และ trace สำหรับตรวจภายในอยู่ใน artifacts/ และ test-results/ ซึ่งไม่รวมใน Git

## การเพิ่มหน้าภาคผนวก /beyond

- เพิ่มงานสอน 2 รายการ กิจกรรมอื่น 4 รายการ และรูปเพิ่มเติม 5 รูปผ่าน config กลาง
- เมนู Beyond, ลิงก์จาก Experience และ navigation กลับไปหน้า portfolio ทำงาน
- More moments เปิด/ปิดได้ด้วย mouse และ keyboard
- ตรวจหน้าจอ 360/390/768/1440px รูปโหลดครบ ไม่มี horizontal overflow
- axe WCAG A/AA ไม่พบ violation ในหน้าภาคผนวกบน 390px และ 1440px
- E2E รวม 8 ชุดผ่าน รวม regression ของหน้าหลัก
- lint, typecheck, formatting และ production build ผ่าน
- ตรวจ screenshot desktop/mobile แล้ว ปรับ alt ของภาพมอบรางวัลให้ตรงกับภาพจริง
- ยังเป็น local preview ไม่มีการ deploy ในงานเพิ่มหน้านี้
