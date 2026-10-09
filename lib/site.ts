// ============================================================================
// ĐỔI Ở ĐÂY: địa chỉ web luyện thi chính (không có dấu "/" ở cuối).
// Hoặc đặt bằng biến môi trường khi build, ví dụ:
//   NEXT_PUBLIC_MAIN_SITE_URL=https://luyenthi.vn npm run build
// ============================================================================
export const SITE_URL = (process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://storable-stopper-simplify.ngrok-free.dev/practice").replace(/\/$/, "");

export const SITE_NAME = "Luyện thi HSA · TSA · THPTQG";

/** Link sang web chính, vd. go("/practice/tsa"). */
export const go = (path = "") => `${SITE_URL}${path}`;

export type ExamKey = "hsa" | "tsa" | "thptqg";

export const EXAMS: Record<
  ExamKey,
  { key: ExamKey; tag: string; name: string; org: string; description: string; image: string; primary: string; soft: string; softBorder: string }
> = {
  hsa: {
    key: "hsa", tag: "HSA", name: "Đánh giá năng lực ĐHQG Hà Nội", org: "Đại học Quốc gia Hà Nội",
    description: "Luyện tư duy định lượng, định tính và khoa học qua đề mô phỏng.",
    image: "/hsa.webp", primary: "#4C8C66", soft: "#EBF5EF", softBorder: "#C0E0CE",
  },
  tsa: {
    key: "tsa", tag: "TSA", name: "Đánh giá tư duy ĐH Bách khoa Hà Nội", org: "Đại học Bách khoa Hà Nội",
    description: "Ôn Toán – Đọc hiểu – Khoa học/Kỹ thuật theo cấu trúc đề thật.",
    image: "/tsa.webp", primary: "#B0464F", soft: "#FBECEE", softBorder: "#F2C5C9",
  },
  thptqg: {
    key: "thptqg", tag: "THPTQG", name: "Tốt nghiệp THPT Quốc gia", org: "Bộ Giáo dục và Đào tạo",
    description: "Luyện đề theo môn, thi thử có bấm giờ và tự tạo đề.",
    image: "/thptqg.webp", primary: "#33456B", soft: "#ECEEF2", softBorder: "#C4CAD6",
  },
};
export const EXAM_ORDER: ExamKey[] = ["hsa", "tsa", "thptqg"];

// Menu của trang (cuộn tới từng phần trên cùng một trang)
export const NAV = [
{ label: "Giới thiệu", id: "gioi-thieu", icon: "compass" },
{ label: "Kỳ thi", id: "ky-thi", icon: "cap" },
{ label: "Tính năng", id: "tinh-nang", icon: "sparkles" },
{ label: "Cách dùng", id: "cach-dung", icon: "list" },
{ label: "Liên hệ", id: "lien-he", icon: "compass" },
] as const;

// ============================================================================
// ĐỔI Ở ĐÂY: thông tin liên hệ admin. Mục nào để trống ("") thì sẽ không hiện trên trang.
// ============================================================================
export const ADMIN = {
  name: "Admin",
  role: "Quản trị viên",
  facebook: "https://facebook.com/oleleolala8429",   // link trang / hồ sơ Facebook
  phone: "0352468655",
  note: "Cần hỗ trợ, báo lỗi đề, góp ý hay muốn hợp tác? Nhắn trực tiếp cho admin, mình sẽ phản hồi sớm nhất có thể.",
};

// Nền mặc định của khối đỏ ở đầu trang, áp dụng cho MỌI người xem.
//   { kind: "preset", id: "red" }  -> màu có sẵn: red, navy, green, teal, purple, sunset, dark
//   { kind: "image", url: "/hero-bg.webp" } -> ảnh của bạn: bỏ file vào thư mục public/ rồi ghi đường dẫn
export const HERO_DEFAULT = { kind: "image", url: "/nen.webp" };

export const FEATURES = [
  { title: "Phòng thi mô phỏng", desc: "Bấm giờ từng phần, vào toàn màn hình và có cảnh báo khi bạn thoát giữa chừng, để quen với áp lực phòng thi thật." },
  { title: "Chấm điểm ngay khi nộp", desc: "Nộp bài là có điểm và đáp án ngay. Không phải chờ ai chấm." },
  { title: "Đánh giá học tập", desc: "Điểm trung bình, biểu đồ điểm các bài gần đây và mức nắm vững của từng phần thi, để biết nên luyện thêm phần nào." },
  { title: "Cộng đồng học tập", desc: "Đăng bài, bình luận, hỏi đáp với bạn cùng ôn thi và cùng nhau tiến bộ." },
  { title: "Kho tài liệu", desc: "Chia sẻ và tải tài liệu ôn thi do chính người học đóng góp." },
] as const;
