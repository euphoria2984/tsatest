"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { go } from "@/lib/site";

// Câu hỏi thử ở khối đầu trang: bấm một đáp án để xem web chấm điểm thế nào.
// Đáp án đúng là A: f nhỏ nhất tại x = 2, f(2) = −1.
const OPTIONS = ["−1", "0", "1", "3"];
const ANSWER = 0;

export default function DemoQuestion() {
  const [picked, setPicked] = useState<number | null>(null);
  const [left, setLeft] = useState(45 * 60);

  useEffect(() => {
    const id = window.setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="overflow-hidden rounded-lg bg-white text-gray-800 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.5)]" aria-label="Câu hỏi thử">
      <div className="flex items-center justify-between gap-3 px-5 py-3 text-[13px] font-semibold text-white" style={{ backgroundColor: "var(--heading)" }}>
        <span>Đề thử · <b className="font-bold">Toán</b></span>
        <span className="flex items-center gap-1.5 text-base font-extrabold tabular-nums">
          <Clock size={16} /> {mm}:{ss}
        </span>
      </div>

      <div className="px-5 pb-4 pt-5">
        <p className="text-xs font-bold" style={{ color: "var(--brand-red)" }}>Câu 1</p>
        <p className="mb-4 mt-1 font-serif text-[18px] leading-relaxed text-gray-900">
          Cho hàm số f(x) = x² − 4x + 3. Giá trị nhỏ nhất của f(x) trên ℝ là:
        </p>

        <ul className="grid gap-2">
          {OPTIONS.map((o, i) => {
            const done = picked !== null;
            const right = done && i === ANSWER;
            const wrong = done && i === picked && i !== ANSWER;
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={done}
                  onClick={() => setPicked(i)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left font-serif text-[17px] transition-colors ${
                    right ? "border-green-600 bg-green-50" : wrong ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-[var(--brand-red)] hover:bg-[#fbf4f5]"
                  } disabled:cursor-default`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-sans text-[13px] font-bold ${
                      right ? "border-green-600 bg-green-600 text-white" : wrong ? "border-red-600 bg-red-600 text-white" : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {"ABCD"[i]}
                  </span>
                  {o}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 min-h-[3.2em] text-sm text-gray-500" aria-live="polite">
          {picked === null ? (
            "Chọn một đáp án để xem kết quả."
          ) : picked === ANSWER ? (
            <><b className="text-gray-800">Chính xác.</b> Hàm đạt giá trị nhỏ nhất tại x = 2, khi đó f(2) = −1.</>
          ) : (
            <><b className="text-gray-800">Chưa đúng.</b> Hàm đạt giá trị nhỏ nhất tại x = 2, khi đó f(2) = −1, nên đáp án là A.</>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500">
        <span>Đây chỉ là câu ví dụ. Đề thật có trong web.</span>
        {picked !== null ? (
          <button type="button" onClick={() => setPicked(null)} className="font-bold" style={{ color: "var(--brand-red)" }}>Làm lại</button>
        ) : (
          <a href={go("/practice")} className="font-bold" style={{ color: "var(--brand-red)" }}>Làm đề thật</a>
        )}
      </div>
    </div>
  );
}
