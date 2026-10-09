import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { GoButton, PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Hướng dẫn" };

const STEPS = [
  { t: "Chọn kỳ thi", d: "HSA, TSA hoặc THPTQG, tùy kỳ thi bạn đang ôn." },
  { t: "Vào phòng thi", d: "Chọn một đề, kiểm tra thông tin dự thi rồi bắt đầu làm bài. Phòng thi sẽ chạy toàn màn hình và bấm giờ cho bạn." },
  { t: "Nộp bài, xem điểm", d: "Điểm và đáp án có ngay sau khi nộp." },
  { t: "Xem đánh giá học tập", d: "Biết phần nào còn yếu và luyện thêm đúng chỗ đó." },
];

const FAQ = [
  { q: "Dùng web có mất phí không?", a: "Không. Làm đề, xem điểm và dùng cộng đồng đều miễn phí." },
  { q: "Tôi có cần tài khoản không?", a: "Bạn cần đăng nhập để điểm các bài được lưu lại và để xem mục Đánh giá học tập." },
  { q: "Thoát toàn màn hình giữa chừng thì sao?", a: "Phòng thi sẽ hiện cảnh báo để bạn quay lại làm bài, giống như trong phòng thi thật." },
  { q: "Dùng trên điện thoại được không?", a: "Được. Xoay ngang điện thoại để có giao diện đầy đủ như trên máy tính." },
  { q: "Xem rõ hình trong đề bằng cách nào?", a: "Bấm vào biểu tượng kính lúp ở góc dưới bên phải hình để phóng to giữa màn hình." },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHead title="Bắt đầu trong bốn bước" desc="Từ lúc mở web đến lúc biết mình cần luyện thêm gì." />

      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.t} className="group glass-box examcard-glow relative overflow-hidden rounded-lg p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg text-lg font-extrabold" style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}>{i + 1}</span>
            <h3 className="mt-4 text-[17px] font-extrabold text-gray-800">{s.t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{s.d}</p>
          </li>
        ))}
      </ol>

      <section>
        <h2 className="mb-3 text-lg font-extrabold" style={{ color: "var(--heading)" }}>Câu hỏi thường gặp</h2>
        <div className="glass-box examcard-glow divide-y divide-gray-100 overflow-hidden rounded-lg">
          {FAQ.map((f) => (
            <details key={f.q} className="group/faq px-5 py-4">
              <summary className="flex list-none items-center justify-between gap-4 text-[15px] font-bold text-gray-800 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown size={18} className="shrink-0 text-gray-400 transition-transform duration-200 group-open/faq:rotate-180" />
              </summary>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <GoButton>Vào web luyện thi</GoButton>
    </div>
  );
}
