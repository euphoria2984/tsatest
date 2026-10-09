import HeroBanner from "@/components/HeroBanner";
import Contact from "@/components/Contact";
import { Divider, ExamCard, FeatureCard, GoButton } from "@/components/ui";
import { EXAM_ORDER, FEATURES } from "@/lib/site";

const STEPS = [
  { t: "Chọn kỳ thi", d: "HSA, TSA hoặc THPTQG, tùy kỳ thi bạn đang ôn." },
  { t: "Vào phòng thi", d: "Chọn một đề rồi bắt đầu làm bài. Phòng thi bấm giờ và chạy toàn màn hình cho bạn." },
  { t: "Nộp bài, xem điểm", d: "Điểm và đáp án có ngay sau khi nộp." },
  { t: "Xem đánh giá học tập", d: "Biết phần nào còn yếu và luyện thêm đúng chỗ đó." },
];

function Head({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-xl font-black uppercase leading-tight tracking-wide sm:text-2xl" style={{ color: "var(--brand-red)" }}>{title}</h2>
      {hint && <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">{hint}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />

      {/* Ba thẻ kỳ thi kéo lên đè mép dưới khối đỏ */}
      <section id="ky-thi" className="mx-auto max-w-[1120px] px-4 pt-14 sm:px-6 sm:pt-16">
        <Head title="Chọn kỳ thi của bạn" hint="Bấm vào một kỳ thi để vào thẳng phòng luyện của kỳ đó." />
        <div className="grid gap-5 md:grid-cols-3">
          {EXAM_ORDER.map((k) => <ExamCard key={k} examKey={k} />)}
        </div>
      </section>

      <Divider className="my-12 sm:my-14" />

      <section id="tinh-nang" className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <Head title="Mọi thứ bạn cần để ôn thi" hint="Từ làm đề, xem điểm đến theo dõi tiến độ và hỏi bài bạn bè." />
        <div className="grid gap-4 lg:grid-cols-5">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} index={i} {...f} />)}
        </div>
      </section>

      <Divider className="mb-5 mt-12 sm:mt-14" />

      <section id="cach-dung" className="border-y border-[rgba(var(--brand-red-rgb),0.08)] bg-white py-7 sm:py-9">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <Head title="Bắt đầu trong bốn bước" hint="Từ lúc mở web đến lúc biết mình cần luyện thêm gì." />
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
            {/* Đường nối tâm bốn ô tròn, chỉ hiện trên màn hình rộng */}
            <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px md:block" style={{ backgroundColor: "rgba(var(--brand-red-rgb), 0.25)" }} />
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative flex flex-col items-center">
                <span
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold tabular-nums text-white ring-[6px] ring-white"
                  style={{ backgroundColor: "var(--brand-red)" }}
                >
                  {i + 1}
                </span>
                <div className="mt-5 w-full flex-1 rounded-sm border border-transparent bg-[var(--app-bg)] px-5 py-6 text-center transition-colors duration-300 hover:border-[var(--brand-red)]">
                  <h3 className="text-[17px] font-extrabold text-gray-800">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex justify-center"><GoButton>Vào web luyện thi</GoButton></div>
        </div>
      </section>

      <Divider className="mb-12 mt-5 sm:mb-14" />

      <section id="lien-he" className="mx-auto max-w-[1120px] px-4 pb-20 sm:px-6 sm:pb-24">
        <Head title="Liên hệ admin" hint="Có góp ý, báo lỗi đề hoặc cần hỗ trợ? Nhắn cho mình qua kênh bạn tiện nhất." />
        <Contact />
      </section>
    </>
  );
}
