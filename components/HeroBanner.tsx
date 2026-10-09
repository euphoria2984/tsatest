"use client";

/**
 * Khối đỏ ở đầu trang, đổi được nền như web chính.
 *  - Nút "Đổi nền" CHỈ hiện khi bạn mở trang với đuôi  ?doi-nen  (vd. https://ten-mien.vn/?doi-nen). Mở một lần là máy đó nhớ.
 *    Người xem bình thường không thấy nút này.
 *  - Nền bạn chọn được lưu trong trình duyệt của bạn (web tĩnh không có máy chủ/cơ sở dữ liệu).
 *  - Muốn đổi nền cho MỌI người xem: sửa HERO_DEFAULT trong lib/site.ts (xem README).
 */

import { useEffect, useRef, useState } from "react";
import { Check, Pencil, Plus, X } from "lucide-react";
import { HERO_DEFAULT, go } from "@/lib/site";

type Preset = { id: string; label: string; from: string; to: string };
const PRESETS: Preset[] = [
  { id: "red", label: "Đỏ thương hiệu", from: "var(--brand-red)", to: "var(--brand-maroon)" },
  { id: "navy", label: "Xanh navy", from: "#33456B", to: "#1B2A5B" },
  { id: "green", label: "Xanh lá", from: "#4C8C66", to: "#2F6247" },
  { id: "teal", label: "Xanh ngọc", from: "#0F766E", to: "#134E4A" },
  { id: "purple", label: "Tím", from: "#6D4C9F", to: "#43296B" },
  { id: "sunset", label: "Hoàng hôn", from: "#D9622B", to: "#8E2A52" },
  { id: "dark", label: "Đen than", from: "#3A3C44", to: "#15161A" },
];

type Bg = { kind: "preset"; id: string } | { kind: "image"; url: string };
const STORE = "heroBg";
const FLAG = "heroEditor";

function sanitize(v: any): Bg | null {
  if (v?.kind === "image" && typeof v.url === "string" && (v.url.startsWith("data:image/") || v.url.startsWith("/"))) return { kind: "image", url: v.url };
  if (v?.kind === "preset" && PRESETS.some((p) => p.id === v.id)) return { kind: "preset", id: v.id };
  return null;
}

/** Thu nhỏ về tối đa 1600px rộng và đổi sang WebP cho nhẹ. */
function toWebpDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Không đọc được ảnh.")); };
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, 1600 / img.width);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext("2d");
      if (!ctx) return reject(new Error("Không xử lý được ảnh."));
      ctx.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/webp", 0.82));
    };
    img.src = url;
  });
}

export default function HeroBanner() {
  const [bg, setBg] = useState<Bg>(sanitize(HERO_DEFAULT) ?? { kind: "preset", id: "red" });
  const [editor, setEditor] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [msg, setMsg] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).has("doi-nen")) localStorage.setItem(FLAG, "1");
      setEditor(localStorage.getItem(FLAG) === "1");
      const saved = sanitize(JSON.parse(localStorage.getItem(STORE) ?? "null"));
      if (saved) setBg(saved);
    } catch {}
  }, []);

  function close() {
    setClosing(true);
    window.setTimeout(() => { setOpen(false); setClosing(false); }, 160);
  }
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) close(); };
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open]);

  function apply(next: Bg) {
    setBg(next);
    try { localStorage.setItem(STORE, JSON.stringify(next)); setMsg(""); }
    catch { setMsg("Ảnh quá nặng để lưu, hãy chọn ảnh nhỏ hơn."); }
  }

  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) return setMsg("Hãy chọn một file ảnh.");
    try { apply({ kind: "image", url: await toWebpDataUrl(f) }); }
    catch (err) { setMsg(err instanceof Error ? err.message : "Không đọc được ảnh."); }
  }

  const presetId = bg.kind === "preset" ? bg.id : null;
  const preset = presetId ? PRESETS.find((p) => p.id === presetId) ?? PRESETS[0] : null;
  const style: React.CSSProperties =
    bg.kind === "image"
      ? { backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${bg.url})`, backgroundSize: "cover", backgroundPosition: "center" }
      : {
          backgroundImage: [
            "radial-gradient(circle at 88% 12%, rgba(255,255,255,0.20), transparent 42%)",
            "radial-gradient(circle at 6% 115%, rgba(0,0,0,0.28), transparent 52%)",
            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
            `linear-gradient(135deg, ${preset!.from}, ${preset!.to})`,
          ].join(", "),
          backgroundSize: "auto, auto, 18px 18px, auto",
        };

  return (
    <div className="relative">
      <section id="gioi-thieu" className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden text-white" style={style}>
        {/* Khung viền mảnh bên trong, giống khối Liên hệ */}
        <span aria-hidden className="pointer-events-none absolute inset-3 border border-white/20 sm:inset-4" />
        <div className="relative mx-auto w-full max-w-[1120px] px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-block rounded px-2.5 py-1 text-[11px] font-extrabold tracking-wider" style={{ backgroundColor: "rgba(255,255,255,0.18)" }}>
            HSA · TSA · THPTQG
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-[1.1] [text-wrap:balance] sm:text-[52px]">
            LUYỆN THI ĐÚNG CẤU TRÚC, VÀO PHÒNG TỰ TIN HƠN
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Làm đề mô phỏng có bấm giờ, chấm điểm ngay khi nộp bài và học cùng cộng đồng, hoàn toàn miễn phí.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={go("/practice")} className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold shadow-sm transition hover:brightness-95" style={{ color: "var(--brand-red)" }}>
              Vào phòng luyện
            </a>
            <a href="#tinh-nang" className="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.55)" }}>
              Xem tính năng
            </a>
          </div>
        </div>
      </section>

      {editor && (
        <div ref={boxRef} className="absolute right-6 top-6 z-20 sm:right-8 sm:top-8">
          <button
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:brightness-110"
            style={{ backgroundColor: "rgba(0,0,0,0.30)" }}
          >
            <Pencil size={13} /> Đổi nền
          </button>

          {open && (
            <div className={`${closing ? "app-pop-out" : "app-pop-in"} absolute right-0 mt-2 w-64 rounded-lg bg-white p-3 text-gray-800 shadow-xl`}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-extrabold">Đổi nền</p>
                <button type="button" onClick={close} aria-label="Đóng" className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:text-gray-700"><X size={14} /></button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRESETS.map((p) => {
                  const on = presetId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      title={p.label}
                      aria-label={p.label}
                      onClick={() => apply({ kind: "preset", id: p.id })}
                      className="flex h-11 items-center justify-center rounded-md transition hover:scale-105"
                      style={{ backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})`, boxShadow: on ? "0 0 0 2px var(--brand-red)" : "inset 0 0 0 1px rgba(0,0,0,0.1)" }}
                    >
                      {on && <Check size={16} className="text-white" />}
                    </button>
                  );
                })}
                <button
                  type="button"
                  title="Tải ảnh lên"
                  aria-label="Tải ảnh lên"
                  onClick={() => fileRef.current?.click()}
                  className="flex h-11 items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-500 transition hover:scale-105 hover:text-gray-800"
                  style={bg.kind === "image" ? { boxShadow: "0 0 0 2px var(--brand-red)" } : undefined}
                >
                  {bg.kind === "image" ? <Check size={16} /> : <Plus size={16} />}
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} className="hidden" />
              <p className="mt-2 text-[11px] leading-snug text-gray-500">Chỉ lưu trên trình duyệt này. Muốn đổi cho mọi người, xem hướng dẫn trong README.</p>
              {msg && <p className="mt-1.5 text-[11px] font-medium text-red-600">{msg}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
