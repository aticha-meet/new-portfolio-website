# คู่มือจัดการรูป Portfolio

รูปทั้งหมดเก็บใน `assets/images/` และเรียกจาก `config/images.ts` จุดเดียว
ไม่ต้องใส่ path รูปตรงใน component และไม่ต้องย้ายไป `public/`

## โครงสร้างที่ใช้

```text
assets/images/
  profile/aticha.webp
  education/                         # โลโก้มหาวิทยาลัย / โรงเรียน
  companies/adapter/
    logo.png
    cms-dashboard.jpg
  projects/
    edu-flow/dashboard-score.png
    grocery-store/point-of-sale.png
    classroom-automation/apps-script.png
    <project-name>/                   # ผลงานอื่น
  activities/
    teaching-academy-12/award-poster.jpg
    asefa/robot-demo.jpg
    gnss-low-cost/team.jpg
    gosoft/design-thinking-certificate.jpg
  experience/placeholders/            # ภาพจำลองเท่านั้น ไม่ใส่รูปจริงที่นี่
```

ตั้งชื่อไฟล์ภาษาอังกฤษตัวเล็ก คั่นคำด้วยขีด เช่น `team-photo.jpg` หรือ `dashboard.png`
แยกโฟลเดอร์ตามงานแทนการต่อท้ายชื่อด้วย `renew`, `new` หรือ `final2`

## วิธีที่ 1: เปลี่ยนรูปเดิม

1. วางไฟล์ใหม่ไว้ในโฟลเดอร์ของงานนั้น หากใช้ชื่อไฟล์เดิมก็แทนไฟล์เดิมได้เลย
2. เปิด `config/images.ts` ถ้าชื่อหรือชนิดไฟล์เปลี่ยน ให้แก้ import ด้านบน
3. ใช้ image key เดิม เช่น `eduFlow` แล้วแก้ `alt`, `kind` และ `placeholder` ให้ตรงกับรูป
4. ตรวจหน้า Experience, Projects และ Beyond ที่ใช้ key นั้น รูปจะเปลี่ยนพร้อมกัน

ตัวอย่างเปลี่ยนภาพ Edu Flow:

```tsx
import eduFlowScreenshot from "@/assets/images/projects/edu-flow/dashboard-score.png";

// ภายใน export const images = { ... }
eduFlow: {
  src: eduFlowScreenshot,
  alt: "Edu Flow exam score dashboard",
  kind: "screenshot",
  placeholder: false,
},
```

- `src`: ตัวแปรที่ import ไฟล์รูปไว้ ไม่ใช่ชื่อไฟล์แบบ string
- `alt`: คำบรรยายสิ่งที่อยู่ในภาพ สำหรับผู้ใช้โปรแกรมอ่านหน้าจอ
- `kind`: ชนิดรูป กำหนดวิธีโหลดและแสดงผล
- `placeholder: false`: ใช้กับรูปจริง เพื่อเอาป้ายภาพจำลองออก
- `fit: "contain"`: ใช้เมื่อรูปกิจกรรมแนวตั้งต้องเห็นครบภาพ เช่น `gnssRobotic` อาจมีพื้นที่ว่างรอบภาพ

## เลือก kind อย่างไร

- `photo`: ภาพถ่ายกิจกรรมหรือรูปคน ใช้การปรับขนาดและ quality 90
- `screenshot`: ภาพหน้าจอโปรแกรม ใช้ไฟล์ต้นฉบับและมีปุ่ม View full-size image
- `certificate`: ใบรับรอง แสดงครบโดยไม่ครอป พร้อมปุ่มเปิดภาพเต็ม
- `poster`: โปสเตอร์หรือประกาศรางวัล แสดงครบโดยไม่ครอป พร้อมปุ่มเปิดภาพเต็ม
- `logo`: โลโก้ ใช้ไฟล์ต้นฉบับ ไม่บีบอัดซ้ำ
- ภาพจำลอง: ตั้ง `placeholder: true` และไม่ต้องกำหนด `kind`

ตัวอย่างใบเซอร์:

```tsx
import gosoftCertificate from "@/assets/images/activities/gosoft/design-thinking-certificate.jpg";

gosoftWorkshop: {
  src: gosoftCertificate,
  alt: "Certificate of participation in the Gosoft Design Thinking workshop",
  kind: "certificate",
  placeholder: false,
},
```

ภาพจำลองสำหรับ Robotics ครั้งที่ 11 ยังคงอยู่ที่ `images.robotics11`
เมื่อได้รูปที่ตรงงาน ให้เปลี่ยน import/src ของ key นี้ แล้วตั้ง `placeholder: false`
ภาพรับรางวัล Silver ปี 2024 เป็นคนละกิจกรรมและยังใช้ในหมวดงานสอนเท่านั้น

## วิธีที่ 2: เพิ่มรูปให้รายการใหม่

1. สร้างโฟลเดอร์งานและวางรูป เช่น `assets/images/activities/my-event/team.jpg`
2. เพิ่ม import และ key ใหม่ใน `config/images.ts`
3. ใน `lib/data.ts` หรือ `lib/activities.ts` ตั้ง `image: "myEvent"` ให้ตรงกับ key
4. ถ้าเป็นรายการที่ดึงข้อมูลร่วมจาก Experience รูปใน Projects/Beyond จะใช้ key เดียวกัน

อย่าใช้รูปเดียวกันแทนคนละกิจกรรมเพียงเพราะชื่อคล้ายกัน ตรวจปีและประเภทการแข่งขันด้วย

## รูปใหม่ที่จัดไว้แล้ว

- `adapterCms` → `companies/adapter/cms-dashboard.jpg`
- `eduFlow` → `projects/edu-flow/dashboard-score.png`
- `groceryStore` → `projects/grocery-store/point-of-sale.png`
- `classroomAutomation` → `projects/classroom-automation/apps-script.png`
- `robotics12` → `activities/teaching-academy-12/award-poster.jpg`
- `asefaDemo` → `activities/asefa/robot-demo.jpg`
- `gnssRobotic` → `activities/gnss-low-cost/team.jpg`
- `gosoftWorkshop` → `activities/gosoft/design-thinking-certificate.jpg`

## ดูผลและตรวจงาน

ระหว่างแก้รูป ใช้ development server เพื่อให้เห็นการเปลี่ยนแปลงโดยไม่ต้อง build ทุกครั้ง:

```powershell
pnpm dev --port 4444
```

หากพอร์ต 4444 กำลังใช้อยู่ ให้หยุด server เดิมใน terminal นั้นด้วย Ctrl+C ก่อน
อย่าเปิด dev และ production server บนพอร์ตเดียวกันพร้อมกัน

ก่อนส่งงาน:

```powershell
pnpm lint
pnpm build
```

ถ้าใช้ production preview แบบที่เปิดอยู่ตอนนี้ ต้อง build ใหม่และ restart server จึงจะเห็นไฟล์ใหม่:

```powershell
pnpm start --port 4444
```

ตรวจว่ารูปไม่หาย คำบรรยายตรง ป้ายภาพจำลองหายเมื่อใช้รูปจริง และใบเซอร์อ่านครบทั้งภาพ
หากจำเป็นให้ refresh หน้าเว็บหลังเปลี่ยนไฟล์

## รักษาความคมชัด

ใช้ไฟล์ต้นฉบับสำหรับ screenshot และเอกสาร อย่าแปลง PNG เป็น JPG เพียงเพื่อเปลี่ยนนามสกุล
ระบบรักษาไฟล์ screenshot/ใบเซอร์/โปสเตอร์/โลโก้โดยไม่บีบอัดซ้ำ แต่ไฟล์ต้นฉบับที่เล็กหรือแตกอยู่แล้วจะไม่คมขึ้นเอง
รูปโปรไฟล์เดิมมี 360 × 480px หากต้องการขยายให้ชัด ต้องใช้ต้นฉบับที่ละเอียดกว่า
ภาพถ่ายใช้ quality 90 ผ่าน `getImageOptions` และ allowlist ใน `next.config.ts`


## แหล่งที่มาของรูปเดิมและโลโก้

รูปโปรไฟล์ โปรเจกต์ และกิจกรรมย้ายมาจากเว็บไซต์เดิมของเจ้าของ: https://portfolio-aticha.netlify.app/ และแปลงเป็น WebP โดยไม่เปลี่ยนเนื้อหาภาพ

- `profile/aticha.webp`: `image/self2.jpg`
- `projects/eye-detection/cover.webp`: `image/_38286f2d-51fa-4a8f-858e-54f1a81d5864.jpg`
- `projects/smart-cane/cover.webp`: `image/_6eb07e48-562c-4365-bf5f-dd0df521c451.jpg`
- `projects/api-lab/cover.webp`: `image/OIG3.jpg`
- `projects/currency-app/cover.webp`: `image/OIG3 (2).jpg`
- `projects/sme-database/cover.webp`: `image/OIG3 (1).jpg`
- `activities/teaching.webp`: `image/TA11/1E0A0325.jpg`
- `activities/research-to-market.webp`: `image/R2M/1723055522299.jpg`
- `activities/university-games.webp`: `image/sport/50/FB_IMG_1730725047117.jpg`

ภาพปกโปรเจกต์จากเว็บเดิมเป็นภาพประกอบแนวคิด จึงแสดงป้าย PROJECT CONCEPT และ alt ที่ไม่อ้างว่าเป็น screenshot ของโปรแกรมจริง เปลี่ยนเป็น screenshot ได้ในภายหลัง พร้อมแก้ label/alt ให้ตรงชนิดรูป

## รูปเพิ่มเติมสำหรับหน้าภาคผนวก

รูปจากเว็บไซต์เดิม แปลงเป็น WebP และลดความกว้างสูงสุด 1400px:

- `activities/teaching-assistant.webp`: `image/TA/DSC07967.jpg`
- `activities/teaching-assistant-class.webp`: `image/TA/DSC07518.jpg`
- `activities/teaching-academy-session.webp`: `image/TA11/528A9715.jpg`
- `activities/four-tien-games.webp`: `image/sport/setien/_DSC1530.jpg`
- `activities/world-scout-jamboree.webp`: `image/USA/haveme.jpg`

## โลโก้บริษัท

- `companies/adapter/logo.png`: โลโก้ Adapter Digital Group จาก [เว็บไซต์ทางการ](https://www.adapterdigital.com/) ต้นทาง [adapter_logo.png](https://www.adapterdigital.com/images/interface/adapter_logo.png), 356 × 111px ดาวน์โหลดวันที่ 14 กันยายน 2026
- เรียกผ่าน `images.adapterLogo` ใน `config/images.ts` เท่านั้น ใช้รูปโปร่งใสต้นฉบับบนพื้นเขียวเข้มของการ์ด Internship

## ภาพประกอบ Experience

`experience/placeholders/*.svg` เป็นภาพ vector ที่สร้างขึ้นสำหรับจัดวางหน้า ไม่ใช่รูปผลงานจริง เรียกผ่าน image keys ใน `config/images.ts` โดยมี `placeholder: true` เมื่อแทนด้วยรูปจริงให้แก้ src, alt และลบ placeholder flag รายละเอียด key และขั้นตอนอยู่ใน README หลัก

## โลโก้สถานศึกษา

- `education/kmutt.png`: [ตราสัญลักษณ์ทางการ มจธ.](https://www.kmutt.ac.th/corporate_identity/kmutt-logo/) ใช้ไฟล์ `KMUTT_CI_Primary_Logo-Full-300x300.png` จากเว็บไซต์มหาวิทยาลัย
- `education/pcshs-chonburi.png`: [เว็บไซต์โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ชลบุรี](https://www.pccchon.ac.th/www/) ใช้ไฟล์ `https://www.pccchon.ac.th/imgNew/logoNew.png`
- ดาวน์โหลดต้นฉบับวันที่ 14 กันยายน 2026 ไม่ปรับสีหรือสัดส่วน เรียกผ่าน `images.kmuttLogo` และ `images.pcshsChonburiLogo` ใน `config/images.ts`
- รายการ `education` ใน `lib/data.ts` เลือก image key ด้วย `logo`; ตั้ง `logo: null` เพื่อแสดงตัวอักษร `mark` เป็น placeholder
