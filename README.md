# Web giới thiệu (một trang, tĩnh)

Một trang giới thiệu web luyện thi HSA · TSA · THPTQG, có nút dẫn sang web chính. Next.js + Tailwind, xuất ra HTML tĩnh.

## 1. Đổi địa chỉ web chính
Mở `lib/site.ts`, sửa `SITE_URL` (mọi nút và link sang web chính đều lấy từ đây),
hoặc đặt biến khi build: `NEXT_PUBLIC_MAIN_SITE_URL=https://ten-mien.vn npm run build`.

## 2. Chạy và build
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất web tĩnh vào thư mục out/ rồi chép lên hosting tĩnh
```

## 3. Đổi nền khối đỏ ở đầu trang
- Mở trang với đuôi `?doi-nen` (ví dụ `http://localhost:3000/?doi-nen`) sẽ hiện nút **Đổi nền** ở góc phải khối đỏ.
  Chọn màu hoặc bấm dấu + để tải ảnh. Nền được lưu trong trình duyệt của bạn; người xem bình thường không thấy nút này.
- Muốn đổi nền cho **mọi người xem**: sửa `HERO_DEFAULT` trong `lib/site.ts`.
  - Màu có sẵn: `{ kind: "preset", id: "navy" }` (red, navy, green, teal, purple, sunset, dark)
  - Ảnh của bạn: bỏ file (nên là .webp) vào `public/`, rồi `{ kind: "image", url: "/hero-bg.webp" }`

## 4. Thông tin liên hệ admin
Mở `lib/site.ts`, sửa khối `ADMIN` (tên, Facebook, số điện thoại, lời nhắn). Mục nào để trống thì không hiện trên trang.

## Sửa nội dung
Kỳ thi, tính năng, menu: `lib/site.ts` · các phần của trang: `app/page.tsx` · màu và kiểu box: `app/globals.css`
