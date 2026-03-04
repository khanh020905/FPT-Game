import { useState } from "react";
import { useGame } from "../engine/GameContext";

const SUBMISSIONS = [
  {
    id: "prj-1",
    name: "Lab 3 — PRF192",
    type: "lab",
    deadline: "Ngày 10",
    submitted: false,
  },
  {
    id: "prj-2",
    name: "Tiểu luận SSG104",
    type: "essay",
    deadline: "Ngày 15",
    submitted: false,
  },
  {
    id: "prj-3",
    name: "Đồ án nhóm PRF192",
    type: "project",
    deadline: "Ngày 25",
    submitted: false,
  },
];

export default function SubmissionHub() {
  const { state, closeSystem, performAction } = useGame();
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [uploading, setUploading] = useState(null);

  const handleSubmit = (id) => {
    setUploading(id);
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, submitted: true } : s)),
      );
      setUploading(null);
    }, 1500);
  };

  const submittedCount = submissions.filter((s) => s.submitted).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeSystem}
      />

      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📤</span>
            <div>
              <h2 className="text-lg font-bold text-white">Nộp Bài</h2>
              <p className="text-xs text-white/70">
                Digital Distribution Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/70 bg-white/20 px-2 py-1 rounded-full">
              {submittedCount}/{submissions.length} đã nộp
            </span>
            <button
              onClick={closeSystem}
              className="text-white/70 hover:text-white text-xl transition-colors"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[calc(85vh-80px)]">
          {/* Progress */}
          <div className="glass-card p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Tiến độ nộp bài</span>
              <span className="text-xs font-bold text-[#8b5cf6]">
                {Math.round((submittedCount / submissions.length) * 100)}%
              </span>
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(submittedCount / submissions.length) * 100}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #6d28d9)",
                }}
              />
            </div>
          </div>

          {/* Submissions List */}
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className={`glass-card p-4 transition-all ${sub.submitted ? "border-l-2 border-green-400" : "border-l-2 border-yellow-400"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {sub.type === "lab"
                        ? "🔬"
                        : sub.type === "essay"
                          ? "📝"
                          : "💻"}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {sub.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    ⏰ Deadline: {sub.deadline}
                  </p>
                </div>

                {sub.submitted ? (
                  <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg font-medium">
                    ✅ Đã nộp
                  </span>
                ) : uploading === sub.id ? (
                  <span className="text-xs text-[#8b5cf6] bg-[#8b5cf6]/10 px-3 py-1.5 rounded-lg font-medium animate-pulse">
                    ⏳ Đang nộp...
                  </span>
                ) : (
                  <button
                    onClick={() => handleSubmit(sub.id)}
                    className="text-xs text-white bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1.5 rounded-lg font-medium transition-all hover:scale-105"
                  >
                    📤 Nộp bài
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Info */}
          <div className="glass-card p-3 bg-[#8b5cf6]/5 border border-[#8b5cf6]/10">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              💡 <strong className="text-gray-300">Lưu ý:</strong> Nộp bài đúng
              hạn để không bị trừ điểm. Bạn có thể nộp lại trước deadline nếu
              cần chỉnh sửa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
