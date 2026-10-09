import type { Metadata } from "next";
import { FeatureCard, GoButton, PageHead } from "@/components/ui";
import { FEATURES } from "@/lib/site";

export const metadata: Metadata = { title: "Tính năng" };

export default function Page() {
  return (
    <div>
      <PageHead title="Mọi thứ bạn cần để ôn thi nằm trong một nơi" desc="Từ làm đề, xem điểm đến theo dõi tiến độ và hỏi bài bạn bè." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((f, i) => <FeatureCard key={f.title} index={i} {...f} />)}
      </div>
      <div className="mt-8"><GoButton>Thử ngay</GoButton></div>
    </div>
  );
}
