import Image from "next/image";
import { ClipboardCheck, Library, TrendingUp, Timer, Users } from "lucide-react";
import { EXAMS, go, type ExamKey } from "@/lib/site";

/** Tiêu đề mục: chữ navy + mô tả nhỏ (giống web chính, không có vạch đỏ). */
export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-extrabold leading-tight" style={{ color: "var(--heading)" }}>{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

/** Đầu trang con: tiêu đề lớn + mô tả. */
export function PageHead({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: "var(--heading)" }}>{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">{desc}</p>
    </header>
  );
}

/** Icon theo thứ tự trong FEATURES: phòng thi, chấm điểm, đánh giá, cộng đồng, tài liệu. */
const FEATURE_ICONS = [Timer, ClipboardCheck, TrendingUp, Users, Library];

/** Dải ngăn cách giữa các mục: đường kẻ hai đầu nhọn hình thoi, giữa là cụm hình thoi và chấm tròn (kiểu viền Genshin). */
export function Divider({ className = "", tone = "red", width = 280 }: { className?: string; tone?: "red" | "cream"; width?: number }) {
  const color = tone === "cream" ? "#efe6e2" : "var(--brand-red)";
  return (
    <div aria-hidden="true" className={`flex justify-center ${className}`}>
      <svg viewBox="0 0 280 16" width={width} height={(width * 16) / 280} style={{ maxWidth: "88%", color, opacity: tone === "cream" ? 0.8 : 0.85 }}>
        <g fill="currentColor">
          <path d="M0 8L12 3L24 8L12 13Z" /><path d="M256 8L268 3L280 8L268 13Z" transform="translate(0 0)" />
          <path d="M87 8L94 5L101 8L94 11Z" /><path d="M179 8L186 5L193 8L186 11Z" />
          <circle cx="108" cy="8" r="1.8" /><circle cx="172" cy="8" r="1.8" />
          <path d="M117 8L123 5.5L129 8L123 10.5Z" /><path d="M151 8L157 5.5L163 8L157 10.5Z" />
          <path d="M140 0L149 8L140 16L131 8Z" />
        </g>
        <g stroke="currentColor" strokeWidth="1.2"><path d="M24 8H87" /><path d="M193 8H256" /></g>
      </svg>
    </div>
  );
}

/** Thẻ tính năng: các thẻ cùng kích thước, icon trong ô vuông hồng (hover thì đổi sang đỏ). Viền đỏ chỉ hiện khi di chuột vào. */
export function FeatureCard({ index, title, desc, className = "" }: { index: number; title: string; desc: string; className?: string }) {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return (
    <div
      className={`group examcard-glow relative flex flex-row items-start gap-4 rounded-sm border bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-1 lg:flex-col ${className}`}
    >
      <span
        className="cut-corners flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-300 group-hover:!bg-[var(--brand-red)] group-hover:!text-white"
        style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}
      >
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <h3 className="text-[16px] font-extrabold leading-snug text-gray-800">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

/** Thẻ kỳ thi (cùng kiểu ExamTicketCard của web chính), bấm để sang phòng luyện của kỳ đó. */
export function ExamCard({ examKey }: { examKey: ExamKey }) {
  const e = EXAMS[examKey];
  return (
    <a
      href={go(`/${examKey}`)}
      aria-label={`Vào phòng luyện ${e.name}`}
      className="group examcard-glow relative flex w-full flex-col rounded-lg border bg-white p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md p-2.5" style={{ backgroundColor: e.soft, boxShadow: `inset 0 0 0 1px ${e.softBorder}` }}>
          <Image src={e.image} alt={e.tag} width={500} height={500} sizes="64px" className="h-full w-full object-contain" />
        </span>
        <span className="cut-corners px-2.5 py-1 text-[11px] font-extrabold tracking-wider" style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}>{e.tag}</span>
      </span>
      <span className="mt-4 line-clamp-2 block text-[15px] font-extrabold leading-snug text-gray-800">{e.name}</span>
      <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-gray-500">{e.description}</span>
      <span className="mt-auto pt-4 text-sm font-bold underline-offset-4 group-hover:underline" style={{ color: "var(--brand-red)" }}>
        Vào phòng luyện
      </span>
    </a>
  );
}

/** Nút lớn kêu gọi sang web chính (dạng tab hai đầu nhọn). */
export function GoButton({ children, path = "/", variant = "red" }: { children: React.ReactNode; path?: string; variant?: "red" | "white" | "ghost" }) {
  const style =
    variant === "white" ? { backgroundColor: "#fff", color: "var(--brand-red)" }
    : variant === "ghost" ? { color: "#fff" }
    : { backgroundColor: "var(--brand-red)", color: "#fff" };
  const cls = variant === "white" ? "btn-tab btn-tab--onlight" : variant === "ghost" ? "btn-tab btn-tab-outline" : "btn-tab";
  return (
    <a href={go(path)} className={`${cls} inline-flex items-center gap-2 px-8 py-3 text-sm font-bold transition hover:brightness-95`} style={style}>
      {children}
    </a>
  );
}
