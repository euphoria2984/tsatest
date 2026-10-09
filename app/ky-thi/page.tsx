import type { Metadata } from "next";
import Image from "next/image";
import { GoButton, PageHead } from "@/components/ui";
import { EXAM_ORDER, EXAMS, type ExamKey } from "@/lib/site";

export const metadata: Metadata = { title: "Kỳ thi" };

const TSA_PARTS = [
  { name: "Tư duy Toán học", time: "60 phút", count: "~40 câu", note: "Kiến thức Toán THPT, đánh giá tư duy định lượng và vận dụng toán vào thực tiễn." },
  { name: "Tư duy Đọc hiểu", time: "30 phút", count: "~20 câu", note: "Đọc hiểu văn bản tiếng Việt thuộc nhiều lĩnh vực, đo khả năng phân tích, khái quát và suy luận." },
  { name: "Tư duy Khoa học / giải quyết vấn đề", time: "60 phút", count: "~40 câu", note: "Vận dụng kiến thức liên môn khoa học tự nhiên và công nghệ; dữ liệu dạng bảng, biểu đồ, thí nghiệm." },
];

const DETAIL: Record<ExamKey, { intro: string; points: string[] }> = {
  tsa: {
    intro: "Bài thi đánh giá tư duy của Đại học Bách khoa Hà Nội, gồm ba phần với tổng thời gian chuẩn 150 phút.",
    points: [
      "Làm lần lượt từng phần: Toán, rồi Đọc hiểu, rồi Khoa học. Xong phần trước mới mở phần sau, giống phòng thi thật.",
      "Có đề khảo thí và đề thi thử, bấm giờ theo từng phần.",
      "Đề kèm hình vẽ, đồ thị, bảng số liệu; bấm vào hình để phóng to.",
    ],
  },
  hsa: {
    intro: "Bài thi đánh giá năng lực của Đại học Quốc gia Hà Nội, luyện qua đề mô phỏng.",
    points: [
      "Luyện ba mảng: tư duy định lượng, tư duy định tính và khoa học.",
      "Làm có bấm giờ, nộp bài là có điểm và đáp án.",
      "Điểm các bài được lưu để xem lại tiến bộ ở mục Đánh giá học tập.",
    ],
  },
  thptqg: {
    intro: "Luyện đề tốt nghiệp THPT theo môn, có thể thi thử có bấm giờ hoặc tự tạo đề.",
    points: [
      "Đề mô phỏng kèm hình vẽ, chấm theo thang điểm 10.",
      "Mục Luyện đề để làm theo từng đề, mục Thi thử để làm như thi thật.",
      "Lưu lịch sử làm bài và điểm từng bài.",
    ],
  },
};

export default function Page() {
  return (
    <div>
      <PageHead title="Ba kỳ thi, mỗi kỳ có phòng luyện riêng" desc="Chọn kỳ thi bạn đang chuẩn bị và vào thẳng phòng luyện của kỳ đó." />

      <div className="space-y-5">
        {EXAM_ORDER.map((k) => {
          const e = EXAMS[k];
          const d = DETAIL[k];
          return (
            <section key={k} id={k} className="group glass-box examcard-glow relative overflow-hidden rounded-lg p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg p-3.5" style={{ backgroundColor: e.soft, boxShadow: `inset 0 0 0 1px ${e.softBorder}` }}>
                  <Image src={e.image} alt={e.tag} width={500} height={500} sizes="80px" className="h-full w-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded px-2.5 py-1 text-[11px] font-extrabold tracking-wider" style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}>{e.tag}</span>
                    <span className="text-xs text-gray-500">{e.org}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-extrabold leading-snug text-gray-800">{e.name}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-500">{d.intro}</p>

                  {k === "tsa" && (
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {TSA_PARTS.map((p) => (
                        <div key={p.name} className="rounded-md p-4" style={{ backgroundColor: "var(--brand-pink)" }}>
                          <p className="text-sm font-extrabold" style={{ color: "var(--heading)" }}>{p.name}</p>
                          <p className="mt-1 text-xs font-bold" style={{ color: "var(--brand-red)" }}>{p.time} · {p.count}</p>
                          <p className="mt-2 text-xs leading-relaxed text-gray-600">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-5 space-y-2 text-sm text-gray-700">
                    {d.points.map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--brand-red)" }} />
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6"><GoButton path={`/practice/${k}`}>Luyện đề {e.tag}</GoButton></div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
