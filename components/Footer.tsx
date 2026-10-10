import { ADMIN, EXAMS, EXAM_ORDER, NAV, go } from "@/lib/site";

const COL_TITLE = "text-xs font-extrabold tracking-[0.14em] text-white/60";
const LINK = "text-sm text-white/85 transition hover:text-white hover:underline underline-offset-4";

export default function Footer() {
  return (
    <footer className="hero-bg text-white">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Thương hiệu */}
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="#gioi-thieu" aria-label="Về đầu trang" className="inline-flex items-center">
            <img src="/logo.svg" alt="Aincrad" className="h-6 w-auto sm:h-7" style={{ filter: "brightness(0) invert(1)" }} />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">Nền tảng luyện thi, ôn tập &amp; cộng đồng học tập. Miễn phí cho mọi người.</p>
          <a
            href={go("/")}
            className="btn-tab btn-tab--onlight mt-5 inline-flex items-center gap-2 bg-white px-6 py-2 text-sm font-bold transition hover:brightness-95"
            style={{ color: "var(--brand-red)" }}
          >
            Vào web luyện thi
          </a>
        </div>

        {/* Điều hướng */}
        <nav aria-label="Điều hướng chân trang">
          <p className={COL_TITLE}>ĐIỀU HƯỚNG</p>
          <ul className="mt-4 grid gap-2.5">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className={LINK}>{n.label}</a></li>
            ))}
          </ul>
        </nav>

        {/* Kỳ thi */}
        <div>
          <p className={COL_TITLE}>KỲ THI</p>
          <ul className="mt-4 grid gap-2.5">
            {EXAM_ORDER.map((k) => (
              <li key={k}><a href={go(`${k}`)} className={LINK}>Luyện đề {EXAMS[k].tag}</a></li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <p className={COL_TITLE}>LIÊN HỆ</p>
          <ul className="mt-4 grid gap-2.5">
            {ADMIN.facebook && (
              <li>
                <a href={ADMIN.facebook} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-2`}>
                  Facebook
                </a>
              </li>
            )}
            {ADMIN.phone && (
              <li>
                <a href={`tel:${ADMIN.phone.replace(/\s/g, "")}`} className={`${LINK} inline-flex items-center gap-2`}>
                  {ADMIN.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-1 px-6 py-5 text-xs text-white/65 sm:flex-row">
          <span>© {new Date().getFullYear()} Luyện thi HSA · TSA · THPTQG</span>
          <span>Luyện đúng cấu trúc, vào phòng thi tự tin hơn.</span>
        </div>
      </div>
    </footer>
  );
}
