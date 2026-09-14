# Image assets

ไฟล์รูปทั้งหมดของ portfolio เก็บที่นี่ และ import ผ่าน `config/images.ts` เท่านั้น

## เปลี่ยนรูป

1. วางรูปใน `profile/`, `projects/<project-slug>/` หรือ `activities/`
2. แก้ import และ alt ใน `config/images.ts` โดยใช้ key เดิมถ้าต้องการเปลี่ยนรูปทุกจุดพร้อมกัน
3. ถ้าเป็นโปรเจกต์ใหม่ เพิ่ม key ใน registry แล้วใช้ key นั้นใน `lib/data.ts`
4. รัน `pnpm build` เพื่อตรวจ import และขนาดภาพ

ใช้ WebP/AVIF/JPEG/PNG ที่มีความกว้างเหมาะกับงาน (ประมาณ 1200–1600px สำหรับภาพปก) และบีบอัดก่อนเพิ่ม รูปโปรไฟล์เดิมมีความละเอียดจำกัด; เปลี่ยนด้วยต้นฉบับที่คมชัดกว่าได้จาก config เดียว

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
