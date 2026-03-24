import { useGame } from "../engine/GameContext";
import { sfxClose, sfxClick } from "../engine/sfxEngine";

const SCHEDULE = [
  {
    time: "07:30 - 09:30",
    subject: "LUK Listening & Speaking (Level 5)",
    room: "LUK Cafe - Tầng 1",
    type: "theory",
  },
  {
    time: "09:45 - 11:45",
    subject: "LUK Reading & Writing (Level 5)",
    room: "Brain 1 - Tầng 3",
    type: "theory",
  },
  {
    time: "13:00 - 15:00",
    subject: "Tập nói chuyện trước gương",
    room: "Phòng tự học - Tầng 2",
    type: "practice",
  },
  {
    time: "15:15 - 17:15",
    subject: "Quay video Shadowing Practice",
    room: "Phòng Lab Media - Tầng 4",
    type: "lab",
  },
];

const GRADES = [
  {
    subject: "LUK Listening (Level 5)",
    midterm: 7.5,
    final: null,
    status: "in-progress",
  },
  {
    subject: "LUK Speaking (Level 5)",
    midterm: null,
    final: null,
    status: "in-progress",
  },
  {
    subject: "LUK Reading (Level 6)",
    midterm: 8.0,
    final: null,
    status: "in-progress",
  },
  {
    subject: "LUK Writing (Level 6)",
    midterm: 7.0,
    final: null,
    status: "in-progress",
  },
];

export default function LukApp() {
  const { state, closeSystem, openSystem } = useGame();
  const { day, stats } = state;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          sfxClose();
          closeSystem();
        }}
      />

      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f37021] to-[#d35a10] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h2 className="text-lg font-bold text-white">LUK Global</h2>
              <p className="text-xs text-white/70">Gamma Tower — Tầng 5</p>
            </div>
          </div>
          <button
            onClick={() => {
              sfxClose();
              closeSystem();
            }}
            className="text-white/70 hover:text-white text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          {/* Student Info */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f37021]/20 flex items-center justify-center text-2xl">
                🧑‍🎓
              </div>
              <div>
                <p className="font-bold text-white">
                  {state.playerName || "Sinh viên FPT"}
                </p>
                <p className="text-xs text-gray-400">
                  MSSV: {state.mssv || "N/A"} • Semester 1
                </p>
                <p className="text-xs text-[#00fff7]">Ngày {day}/30</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              📅 Thời Khóa Biểu Hôm Nay
            </h3>
            <div className="space-y-2">
              {SCHEDULE.map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <div
                    className={`w-1 h-10 rounded-full ${item.type === "lab" ? "bg-purple-500" : item.type === "practice" ? "bg-green-500" : "bg-blue-500"}`}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white">
                      {item.subject}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.time} • {item.room}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${item.type === "lab" ? "bg-purple-500/20 text-purple-300" : item.type === "practice" ? "bg-green-500/20 text-green-300" : "bg-blue-500/20 text-blue-300"}`}
                  >
                    {item.type === "lab"
                      ? "Lab"
                      : item.type === "practice"
                        ? "Thực hành"
                        : "Lý thuyết"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grades */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              📊 Bảng Điểm
            </h3>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2.5 text-gray-400 font-medium">
                      Môn học
                    </th>
                    <th className="text-center p-2.5 text-gray-400 font-medium">
                      GK
                    </th>
                    <th className="text-center p-2.5 text-gray-400 font-medium">
                      CK
                    </th>
                    <th className="text-center p-2.5 text-gray-400 font-medium">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES.map((g, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-2.5 text-white">{g.subject}</td>
                      <td className="p-2.5 text-center">
                        {g.midterm ? (
                          <span
                            className={
                              g.midterm >= 5 ? "text-green-400" : "text-red-400"
                            }
                          >
                            {g.midterm}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {g.final ? (
                          <span
                            className={
                              g.final >= 5 ? "text-green-400" : "text-red-400"
                            }
                          >
                            {g.final}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-yellow-500/20 text-yellow-300">
                          Đang học
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              📋 Nhiệm Vụ & Deadline
            </h3>
            <div className="space-y-2">
              <div className="glass-card p-3 border-l-2 border-red-400">
                <p className="text-xs font-medium text-white">
                  Nộp video Shadowing Practice
                </p>
                <p className="text-[10px] text-red-400">
                  ⏰ Deadline: Ngày {Math.min(day + 3, 30)}
                </p>
              </div>
              <div className="glass-card p-3 border-l-2 border-yellow-400">
                <p className="text-xs font-medium text-white">
                  Bài tập LUK Speaking — Tập nói trước gương
                </p>
                <p className="text-[10px] text-yellow-400">
                  ⏰ Deadline: Ngày {Math.min(day + 5, 30)}
                </p>
              </div>
              <div className="glass-card p-3 border-l-2 border-green-400">
                <p className="text-xs font-medium text-white">
                  Project LUK Writing — Viết essay 300 từ
                </p>
                <p className="text-[10px] text-green-400">
                  ⏰ Deadline: Ngày {Math.min(day + 10, 30)}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Project Button */}
          <button
            onClick={() => {
              sfxClick();
              closeSystem();
              setTimeout(() => openSystem("submission"), 200);
            }}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:brightness-110 transition-all"
          >
            📤 Nộp Project / Bài tập LUK
          </button>
        </div>
      </div>
    </div>
  );
}
