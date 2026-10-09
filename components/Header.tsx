"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, go } from "@/lib/site";

/** Mục nào đang nằm trong màn hình thì được tô đậm (theo dõi khi cuộn trang). */
function useActiveSection() {
  const [active, setActive] = useState<string>(NAV[0].id);
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY + 160;
      let cur: string = NAV[0].id;
      for (const el of els) if (el.getBoundingClientRect().top + window.scrollY <= y) cur = el.id;
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

export default function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/95 backdrop-blur shadow-[0_1px_2px_rgba(var(--brand-red-rgb),0.05),0_8px_24px_-12px_rgba(var(--brand-red-rgb),0.18)]">
      <div className="mx-auto grid h-16 max-w-[1120px] grid-cols-[auto_1fr] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <a href="#gioi-thieu" aria-label="Về đầu trang" className="flex shrink-0 items-center justify-self-start">
          <img src="/logo.svg" alt="Aincrad" className="h-6 w-auto sm:h-7" />
        </a>

        <nav className="hidden items-center justify-center gap-1 justify-self-center md:flex" aria-label="Các phần của trang">
          {NAV.map((n) => {
            const on = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={on ? "true" : undefined}
                className="relative rounded-sm px-3 py-2 text-sm font-semibold transition-colors hover:text-gray-900"
                style={{ color: on ? "var(--brand-red)" : "var(--nav-text)" }}
              >
                {n.label}
                <span className="absolute inset-x-3 -bottom-px h-0.5 transition-transform duration-300" style={{ backgroundColor: "var(--brand-red)", transform: on ? "scaleX(1)" : "scaleX(0)" }} />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={go("/")}
            className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-sm font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: "var(--brand-red)" }}
          >
            <span className="hidden sm:inline">Vào web luyện thi</span>
            <span className="sm:hidden">Vào web</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-sm hover:bg-black/[0.04] md:hidden"
            style={{ color: "var(--nav-text)" }}
          >
            {open ? <X size={20} strokeWidth={2.4} /> : <Menu size={20} strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {/* Menu thả xuống trên điện thoại */}
      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 py-2 md:hidden" aria-label="Menu">
          {NAV.map((n) => {
            const on = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-sm px-3 py-3 text-sm font-semibold"
                style={{ backgroundColor: on ? "var(--brand-pink)" : undefined, color: on ? "var(--brand-red)" : "var(--nav-text)" }}
              >
                {n.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
