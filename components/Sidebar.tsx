"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Compass, GraduationCap, ListChecks, Sparkles, X } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";
import { NAV, go } from "@/lib/site";

const ICONS = { compass: Compass, cap: GraduationCap, sparkles: Sparkles, list: ListChecks } as const;

/** Mục nào đang nằm trong màn hình thì sáng lên (theo dõi khi cuộn trang). */
function useActiveSection() {
  const [active, setActive] = useState<string>(NAV[0].id);
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur: string = NAV[0].id;
      for (const el of els) if (el.offsetTop <= y) cur = el.id;
      // chạm đáy trang -> chọn mục cuối
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = NAV[NAV.length - 1].id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return active;
}

function Panel({ active, onPick }: { active: string; onPick?: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="px-3 text-[11px] font-bold tracking-[0.14em] text-gray-400">TRÊN TRANG NÀY</p>
      <nav className="-mt-2 flex flex-col gap-1" aria-label="Các phần của trang">
        {NAV.map(({ label, id, icon }) => {
          const Icon = ICONS[icon];
          const on = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={onPick}
              aria-current={on ? "true" : undefined}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-200"
              style={{ backgroundColor: on ? "var(--brand-pink)" : undefined, color: on ? "var(--brand-red)" : "var(--nav-text)" }}
            >
              <span
                className="absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200"
                style={{ height: on ? 22 : 0, backgroundColor: "var(--brand-red)" }}
              />
              <Icon size={18} strokeWidth={on ? 2.4 : 2} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">{label}</span>
            </a>
          );
        })}
      </nav>

      {/* Thẻ kêu gọi ở cuối sidebar */}
      <div className="hero-bg relative overflow-hidden rounded-lg p-4 text-white">
        <p className="text-sm font-extrabold leading-snug">Luyện thi miễn phí</p>
        <p className="mt-1 text-xs leading-relaxed text-white/80">HSA · TSA · THPTQG, làm đề có bấm giờ, chấm điểm ngay.</p>
        <a
          href={go("/")}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-bold transition hover:brightness-95"
          style={{ color: "var(--brand-red)" }}
        >
          Vào web luyện thi <ArrowUpRight size={14} strokeWidth={2.6} />
        </a>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const active = useActiveSection();
  const { mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      {/* Màn hình nhỏ: ngăn kéo trượt từ trái */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="drawer-in auth-hide-scrollbar absolute left-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-3 flex justify-end">
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/[0.04]" style={{ color: "var(--nav-text)" }}>
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>
            <Panel active={active} onPick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Máy tính: bảng cố định bên trái, đứng yên khi cuộn */}
      <aside className="hidden w-60 shrink-0 self-start lg:block">
        <div className="glass-box examcard-glow fixed top-[88px] max-h-[calc(100vh-104px)] w-60 overflow-y-auto rounded-lg border border-gray-200/80 p-3 auth-hide-scrollbar">
          <Panel active={active} />
        </div>
      </aside>
    </>
  );
}
