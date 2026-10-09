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

/** Dải ngăn cách giữa các mục: hai đoạn thẳng ngắn ở hai bên, giữa là ô vuông nhỏ xoay 45° thành hình thoi. */
export function Divider({ className = "" }: { className?: string }) {
  const line = "h-px w-10 sm:w-14";
  const lineColor = { backgroundColor: "rgba(var(--brand-red-rgb), 0.35)" };
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-2.5 ${className}`}>
      <span className={line} style={lineColor} />
      <span className="h-2 w-2 rotate-45" style={{ backgroundColor: "var(--brand-red)" }} />
      <span className={line} style={lineColor} />
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
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-colors duration-300 group-hover:!bg-[var(--brand-red)] group-hover:!text-white"
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
      href={go(`/practice/${examKey}`)}
      aria-label={`Vào phòng luyện ${e.name}`}
      className="group examcard-glow relative flex w-full flex-col rounded-lg border bg-white p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md p-2.5" style={{ backgroundColor: e.soft, boxShadow: `inset 0 0 0 1px ${e.softBorder}` }}>
          <Image src={e.image} alt={e.tag} width={500} height={500} sizes="64px" className="h-full w-full object-contain" />
        </span>
        <span className="rounded px-2.5 py-1 text-[11px] font-extrabold tracking-wider" style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}>{e.tag}</span>
      </span>
      <span className="mt-4 line-clamp-2 block text-[15px] font-extrabold leading-snug text-gray-800">{e.name}</span>
      <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-gray-500">{e.description}</span>
      <span className="mt-auto pt-4 text-sm font-bold underline-offset-4 group-hover:underline" style={{ color: "var(--brand-red)" }}>
        Vào phòng luyện
      </span>
    </a>
  );
}

/** Nút lớn kêu gọi sang web chính. */
export function GoButton({ children, path = "/", variant = "red" }: { children: React.ReactNode; path?: string; variant?: "red" | "white" | "ghost" }) {
  const style =
    variant === "white" ? { backgroundColor: "#fff", color: "var(--brand-red)" }
    : variant === "ghost" ? { border: "1px solid rgba(255,255,255,0.55)", color: "#fff" }
    : { backgroundColor: "var(--brand-red)", color: "#fff" };
  return (
    <a href={go(path)} className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold shadow-sm transition hover:brightness-95" style={style}>
      {children}
    </a>
  );
}
