"use client";

/**
 * Box đếm ngược đến các kỳ thi, đặt bên phải khối đỏ ở đầu trang.
 * ĐỔI NGÀY THI Ở ĐÂY: sửa mảng EXAM_DATES bên dưới (năm-tháng-ngày). Thi xong, ngày đó tự hiện "Đã diễn ra".
 */

import { useEffect, useState } from "react";
import { EXAMS, type ExamKey } from "@/lib/site";
import { Divider } from "@/components/ui";

type ExamDate = { key: ExamKey; label: string; y: number; m: number; d: number };

const EXAM_DATES: ExamDate[] = [
  { key: "tsa", label: "TSA đợt 1", y: 2027, m: 1, d: 16 },
  { key: "hsa", label: "HSA đợt 1", y: 2027, m: 3, d: 7 },
  { key: "thptqg", label: "THPTQG", y: 2027, m: 6, d: 11 },
];

// Màu trung tính ấm (hơi ngả sang đỏ nâu để hợp tông web): nền than ấm, chữ và ô số kem hồng
const BG = "#3a3031";
const CREAM = "#efe6e2";
const ZODIAC = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"].map((z) => z + "\uFE0E");
const ROMAN = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

const pad = (n: number) => String(n).padStart(2, "0");
const targetOf = (e: ExamDate) => new Date(e.y, e.m - 1, e.d, 0, 0, 0).getTime();
const dateText = (e: ExamDate) => `${pad(e.d)}/${pad(e.m)}/${e.y}`;

export default function ExamCountdown() {
  // null trước khi trang chạy trên trình duyệt, để không lệch giữa lúc build và lúc hiển thị
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const list = [...EXAM_DATES].sort((a, b) => targetOf(a) - targetOf(b));
  const next = now === null ? list[0] : list.find((e) => targetOf(e) > now) ?? null;

  const diff = next && now !== null ? Math.max(0, targetOf(next) - now) : null;
  const dayStr = diff === null ? "--" : String(Math.floor(diff / 86400000)).padStart(2, "0");
  const small = [
    { v: diff === null ? "--" : pad(Math.floor(diff / 3600000) % 24), u: "Giờ" },
    { v: diff === null ? "--" : pad(Math.floor(diff / 60000) % 60), u: "Phút" },
    { v: diff === null ? "--" : pad(Math.floor(diff / 1000) % 60), u: "Giây" },
  ];
  const line = "rgba(239,230,226,0.16)";

  return (
    <aside className="frame-cream relative w-full overflow-hidden px-3 py-3 text-center shadow-2xl sm:px-5 lg:ml-auto lg:max-w-[430px]" style={{ backgroundColor: BG, color: CREAM }} aria-label="Đếm ngược kỳ thi">
      {/* Đồng hồ La Mã: tâm đặt đúng góc trên phải, aside cắt bớt nên chỉ thấy 1/4 phía dưới bên trái.
          Mặt số quay chậm, hai kim đặt cố định trong phần nhìn thấy. */}
      <svg aria-hidden viewBox="-100 -100 200 200" className="pointer-events-none absolute -right-[170px] -top-[170px] h-[340px] w-[340px] sm:-right-[240px] sm:-top-[240px] sm:h-[480px] sm:w-[480px]" style={{ opacity: 0.3, filter: "drop-shadow(0 0 3px rgba(239,230,226,0.5))" }}>
        <g fill="none" stroke={CREAM}>
          <circle r="98" strokeWidth="2.4" />
          <circle r="93" strokeWidth="0.8" />
          <circle r="79" strokeWidth="0.8" />
        </g>
        <g className="clock-spin" stroke={CREAM}>
          {/* vòng hình thoi */}
          {Array.from({ length: 36 }, (_, k) => (
            <path key={k} d="M0 -90 L2.2 -86 L0 -82 L-2.2 -86 Z" fill={CREAM} stroke="none" opacity="0.75" transform={`rotate(${k * 10})`} />
          ))}
          {/* số La Mã */}
          {ROMAN.map((r, k) => (
            <text key={r} transform={`rotate(${k * 30}) translate(0 -69)`} textAnchor="middle" dominantBaseline="central" fontSize="15" fill={CREAM} stroke="none" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{r}</text>
          ))}
          {/* mũi tên la bàn */}
          {Array.from({ length: 8 }, (_, k) => (
            <path key={k} d={k % 2 === 0 ? "M0 -57 L4.5 -46 L-4.5 -46 Z" : "M0 -52 L3.2 -44 L-3.2 -44 Z"} fill={CREAM} stroke="none" opacity="0.55" transform={`rotate(${k * 45})`} />
          ))}
          {/* vòng răng cưa */}
          <circle r="60" fill="none" strokeWidth="3.6" strokeDasharray="2.6 1.9" opacity="0.6" />
          {/* vòng cung hoàng đạo */}
          {ZODIAC.map((z, k) => (
            <g key={k} transform={`rotate(${k * 30 + 15}) translate(0 -31)`}>
              <circle r="8" fill="none" strokeWidth="0.9" />
              <text textAnchor="middle" dominantBaseline="central" fontSize="9.5" fill={CREAM} stroke="none" style={{ fontFamily: '"Segoe UI Symbol", "Noto Sans Symbols", "Apple Symbols", serif' }}>{z}</text>
            </g>
          ))}
          <circle r="16" fill="none" strokeWidth="0.8" />
        </g>
        {/* kim giờ: hình mũi giáo */}
        <g transform="rotate(200)">
          <path d="M0 -58 L3.4 -42 Q1.2 -38 3 -33 L5.2 -23 Q2 -19 2.8 -13 L0 -7 L-2.8 -13 Q-2 -19 -5.2 -23 L-3 -33 Q-1.2 -38 -3.4 -42 Z" fill={CREAM} stroke="none" />
        </g>
        {/* kim phút: mảnh, dài, có hoa văn xoắn gần tâm */}
        <g transform="rotate(252)">
          <line x1="0" y1="-92" x2="0" y2="-30" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M0 -32 C6 -29 6 -23 0 -22 C-6 -21 -6 -15 1 -14 C6 -13 4 -7 0 -4" fill="none" stroke={CREAM} strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle r="5.5" fill={CREAM} />
        <circle r="8.5" fill="none" stroke={CREAM} strokeWidth="0.9" />
      </svg>

      <h2 className="font-serif-title relative text-2xl uppercase tracking-wide sm:text-3xl">Đếm ngược</h2>
      <Divider tone="cream" width={200} className="relative mt-2" />

      {next ? (
        <>
          <div className="relative mt-4 flex items-center justify-center gap-2" aria-label={`Còn ${dayStr} ngày`}>
            {dayStr.split("").map((c, i) => <span key={i} className="flip-tile flip-lg font-num">{c}</span>)}
          </div>
          <p className="font-serif-title relative mt-4 text-sm uppercase leading-relaxed tracking-wider sm:text-base">
            Ngày còn lại đến<br />{next.label} · {dateText(next)}
          </p>
          <div className="relative mt-4 flex items-start justify-center gap-4">
            {small.map((p) => (
              <div key={p.u} className="flex flex-col items-center gap-1.5">
                <div className="flex gap-1">
                  {p.v.split("").map((c, i) => <span key={i} className="flip-tile flip-sm font-num">{c}</span>)}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-70">{p.u}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="relative py-6 text-sm font-medium opacity-80">Các kỳ thi trong danh sách đã diễn ra.</p>
      )}

      <ul className="relative mt-5 border-t text-left" style={{ borderColor: line }}>
        {list.map((e) => {
          const left = now === null ? null : targetOf(e) - now;
          const days = left === null ? null : Math.ceil(left / 86400000);
          const isNext = next?.label === e.label;
          return (
            <li key={e.label} className="flex items-center gap-3 border-b py-2.5" style={{ borderColor: line }}>
              <span className="tag-chamfer w-[72px] shrink-0 px-2 py-1 text-center text-[12px] font-black tracking-wider" style={{ WebkitTextStroke: "0.05em currentColor", ["--ring" as string]: isNext ? CREAM : "rgba(239,230,226,0.45)", backgroundColor: isNext ? CREAM : "transparent", color: isNext ? BG : CREAM } as React.CSSProperties}>
                {EXAMS[e.key].tag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">{e.label}</p>
                <p className="mt-0.5 text-xs opacity-70">{dateText(e)}</p>
              </div>
              <span className="shrink-0 text-right text-xs font-medium tabular-nums opacity-90">
                {days === null ? "--" : left! <= 0 ? "Đã diễn ra" : <><span className="font-num text-lg tracking-wide">{days}</span> ngày</>}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
