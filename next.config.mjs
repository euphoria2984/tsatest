/** @type {import('next').NextConfig} */

// Web TĨNH: `npm run build` xuất toàn bộ trang ra thư mục `out/` (HTML + CSS + JS + ảnh).
// Chép thư mục `out/` lên bất kỳ hosting tĩnh nào (Vercel, Netlify, Cloudflare Pages, GitHub Pages ở tên miền gốc, hosting thường...).
const nextConfig = {
  output: "export",
  trailingSlash: true, // /ky-thi -> /ky-thi/index.html, chạy được trên mọi hosting tĩnh
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
