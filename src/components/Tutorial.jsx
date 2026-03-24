/**
 * Tutorial.jsx — Interactive tutorial/guide for new players
 * Shows step-by-step instructions on first game start
 */

import { useState } from "react";

const TUTORIAL_STEPS = [
  {
    title: "Chào mừng đến FPT! 🎓",
    emoji: "👋",
    content:
      "Chào mừng bạn đến FPT University Da Nang! Bạn là sinh viên năm nhất, hãy cùng khám phá campus và sống sót qua kỳ học đầu tiên nhé!",
    tip: "Mục tiêu: Sống sót 30 ngày với đủ điểm Progress, Health, và Money!",
  },
  {
    title: "Di chuyển 🎮",
    emoji: "⌨️",
    content:
      "Sử dụng phím WASD hoặc các phím mũi tên để di chuyển nhân vật trên bản đồ campus.",
    tip: "W = Lên, A = Trái, S = Xuống, D = Phải",
  },
  {
    title: "Tương tác 🏫",
    emoji: "🔑",
    content:
      "Khi đến gần một tòa nhà, nhấn phím E để vào bên trong. Mỗi tòa nhà có các hoạt động khác nhau!",
    tip: "Vùng tương tác sẽ được đánh dấu bằng viền xanh trên bản đồ.",
  },
  {
    title: "Chỉ số quan trọng 📊",
    emoji: "❤️",
    content:
      "Theo dõi 4 chỉ số quan trọng ở thanh bên trái:\n• 📊 Tiến Độ — Điểm học tập\n• ❤️ Sức Khỏe — Nếu về 0 = Game Over!\n• 🧠 Trí Tuệ — Kiến thức tích lũy\n• 💪 Tự Tin — Kỹ năng mềm",
    tip: "Giữ các chỉ số cân bằng! Đừng để bất kỳ chỉ số nào quá thấp.",
  },
  {
    title: "Hành động mỗi ngày ⚡",
    emoji: "⚡",
    content:
      "Mỗi ngày bạn có 4 lượt hành động. Hãy sử dụng khôn ngoan: đi học, thực hành, ăn uống, giao lưu...",
    tip: "Về KTX nhấn 'Ngủ' để kết thúc ngày và sang ngày mới!",
  },
  {
    title: "Các tòa nhà chính 🏢",
    emoji: "🗺️",
    content:
      "• 🏫 Toà Alpha — Lớp học lý thuyết\n• 🍜 Cantin — Ăn uống & Giao lưu\n• 🏢 Toà Gamma — LUK App (LMS)\n• 🏠 KTX A/B — Nghỉ ngơi & Ngủ\n• 🚪 Cổng Chính — Điểm spawn",
    tip: "Mỗi tòa nhà có hành động riêng. Thử khám phá tất cả!",
  },
  {
    title: "Bắt đầu nào! 🚀",
    emoji: "🎉",
    content:
      "Bạn đã sẵn sàng! Hãy bắt đầu hành trình sinh viên tại FPT University. Chúc bạn may mắn!",
    tip: "Tip: Hoàn thành nhiệm vụ (quests) để nhận phần thưởng!",
  },
];

export default function Tutorial({ onClose }) {
  const [step, setStep] = useState(0);
  const current = TUTORIAL_STEPS[step];
  const isLast = step === TUTORIAL_STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#00fff7]/20 bg-[#0f1420]"
        style={{
          animation: "slide-up 0.4s ease-out",
          boxShadow: "0 0 40px rgba(0, 255, 247, 0.1)",
        }}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#00fff7] to-[#f37021] transition-all duration-300"
            style={{ width: `${((step + 1) / TUTORIAL_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Header with emoji */}
        <div className="pt-8 pb-4 text-center">
          <div
            className="text-5xl mb-4 inline-block"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            {current.emoji}
          </div>
          <h2
            className="text-lg font-bold text-[#00fff7]"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "12px",
              textShadow: "0 0 10px rgba(0, 255, 247, 0.3)",
            }}
          >
            {current.title}
          </h2>
          <p className="text-[10px] text-gray-500 mt-1">
            Bước {step + 1}/{TUTORIAL_STEPS.length}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line text-center">
            {current.content}
          </div>

          {/* Tip Box */}
          <div className="mt-4 p-3 rounded-xl bg-[#ffd700]/8 border border-[#ffd700]/15">
            <p className="text-[11px] text-[#ffd700] flex items-start gap-2">
              <span className="flex-shrink-0">💡</span>
              <span>{current.tip}</span>
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          {!isFirst && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              ← Trước
            </button>
          )}

          {isFirst && (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Bỏ qua
            </button>
          )}

          {isLast ? (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#f37021] to-[#ff2d95] hover:brightness-110 transition-all shadow-lg shadow-[#f3702130]"
            >
              🎮 Bắt đầu chơi!
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#00fff7]/80 to-[#3b82f6] hover:brightness-110 transition-all"
            >
              Tiếp theo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
