import { ADMIN } from "@/lib/site";

// Mỗi kênh chỉ hiện khi bạn điền thông tin trong lib/site.ts (ADMIN)
export default function Contact() {
  const channels = [
    ADMIN.facebook && { label: "FACEBOOK", value: ADMIN.facebook.replace(/^https?:\/\/(www\.)?/, ""), action: "Nhắn tin", href: ADMIN.facebook },
    ADMIN.phone && { label: "ĐIỆN THOẠI", value: ADMIN.phone, action: "Gọi ngay", href: `tel:${ADMIN.phone.replace(/\s/g, "")}` },
  ].filter(Boolean) as { label: string; value: string; action: string; href: string }[];

  return (
    <div className="hero-bg relative grid items-center gap-8 overflow-hidden rounded-sm p-8 text-white shadow-[0_18px_40px_-18px_rgba(var(--brand-red-rgb),0.6)] sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      {/* Khung viền mảnh bên trong, góc vuông */}
      <span aria-hidden className="pointer-events-none absolute inset-3 border border-white/20 sm:inset-4" />

      {/* Trái: lời nhắn */}
      <div className="relative">
        <span className="inline-block rounded-sm px-2.5 py-1 text-[11px] font-extrabold tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.18)" }}>
          {ADMIN.role.toUpperCase()}
        </span>
        <h3 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">Liên hệ {ADMIN.name}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{ADMIN.note}</p>
      </div>

      {/* Phải: từng kênh là một ô trắng, vạch đỏ bên trái */}
      <ul className="relative grid gap-3">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 rounded-sm border-l-4 bg-white px-5 py-4 text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderLeftColor: "var(--brand-pink)" }}
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-extrabold tracking-[0.14em] text-gray-400">{c.label}</span>
                <span className="mt-0.5 block truncate text-lg font-extrabold">{c.value}</span>
              </span>
              <span className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-bold transition group-hover:bg-[var(--brand-red)] group-hover:text-white" style={{ backgroundColor: "var(--brand-pink)", color: "var(--brand-red)" }}>
                {c.action}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
