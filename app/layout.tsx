import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} – Giới thiệu`, template: `%s · ${SITE_NAME}` },
  description: "Làm đề mô phỏng có bấm giờ, chấm điểm ngay khi nộp bài, theo dõi tiến độ và học cùng cộng đồng. Miễn phí.",
  openGraph: { title: SITE_NAME, description: "Luyện thi đúng cấu trúc, vào phòng thi tự tin hơn.", type: "website", locale: "vi_VN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Anton&family=Playfair+Display:wght@400;500&display=swap" />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
