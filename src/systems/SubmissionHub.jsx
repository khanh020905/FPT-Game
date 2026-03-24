import { useState, useEffect, useRef, useCallback } from "react";
import { useGame } from "../engine/GameContext";
import {
  sfxOpen,
  sfxClose,
  sfxClick,
  sfxSuccess,
  sfxCorrect,
  sfxWrong,
  sfxError,
} from "../engine/sfxEngine";

/* ══════════════════════════════════════════════
   MINI-GAME DATA
   ══════════════════════════════════════════════ */

// Shadowing — type the words that scroll past
const SHADOWING_WORDS = [
  "hello",
  "university",
  "student",
  "english",
  "practice",
  "listen",
  "speak",
  "future",
  "global",
  "campus",
];

// Speaking — remember the emoji sequence
const SPEAKING_EMOJIS = ["🔴", "🟢", "🔵", "🟡"];

// Writing — unscramble words into correct order
const WRITING_SENTENCES = [
  {
    scrambled: ["university", "I", "at", "study", "FPT"],
    answer: "I study at FPT university",
  },
  {
    scrambled: ["is", "English", "important", "very"],
    answer: "English is very important",
  },
  {
    scrambled: ["every", "practice", "day", "I"],
    answer: "I practice every day",
  },
];

/* ══════════════════════════════════════════════
   SUBMISSIONS DATA
   ══════════════════════════════════════════════ */
const SUBMISSIONS = [
  {
    id: "prj-1",
    name: "Video Shadowing Practice",
    type: "video",
    deadline: "Ngày 5",
    submitted: false,
    miniGame: "shadowing",
  },
  {
    id: "prj-2",
    name: "Bài tập Speaking — Tập nói trước gương",
    type: "speaking",
    deadline: "Ngày 8",
    submitted: false,
    miniGame: "speaking",
  },
  {
    id: "prj-3",
    name: "Project LUK Writing — Essay 300 từ",
    type: "writing",
    deadline: "Ngày 15",
    submitted: false,
    miniGame: "writing",
  },
];

/* ══════════════════════════════════════════════
   MINI GAME: SHADOWING (Type falling words)
   ══════════════════════════════════════════════ */
function ShadowingGame({ onComplete, onCancel }) {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [wordsNeeded] = useState(5);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  const pickWord = useCallback(() => {
    setCurrentWord(
      SHADOWING_WORDS[Math.floor(Math.random() * SHADOWING_WORDS.length)],
    );
    setInput("");
  }, []);

  useEffect(() => {
    pickWord();
    inputRef.current?.focus();
  }, [pickWord]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (score >= wordsNeeded) {
        sfxSuccess();
        onComplete();
      } else {
        sfxError();
        onCancel();
      }
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, score, wordsNeeded, onComplete, onCancel]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.toLowerCase().trim() === currentWord.toLowerCase()) {
      setScore((s) => s + 1);
      sfxCorrect();
      setFeedback("✅");
      setTimeout(() => {
        setFeedback(null);
        if (score + 1 >= wordsNeeded) {
          onComplete();
        } else {
          pickWord();
        }
      }, 400);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>⏱️ {timeLeft}s</span>
        <span>
          ✅ {score}/{wordsNeeded} từ
        </span>
      </div>
      <div className="stat-bar mb-3">
        <div
          className="stat-bar-fill"
          style={{
            width: `${(timeLeft / 15) * 100}%`,
            background: timeLeft > 5 ? "#22c55e" : "#ef4444",
            transition: "all 0.3s",
          }}
        />
      </div>

      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
        Gõ lại từ bên dưới
      </p>

      <div
        className="glass-card p-6 relative overflow-hidden"
        style={{
          animation: feedback ? "none" : "pulse 2s ease-in-out infinite",
        }}
      >
        {feedback && (
          <div
            className="absolute inset-0 bg-green-500/10 flex items-center justify-center text-4xl z-10"
            style={{ animation: "fade-in 0.2s ease-out" }}
          >
            {feedback}
          </div>
        )}
        <p
          className="text-3xl font-bold tracking-widest"
          style={{
            color: "#00fff7",
            fontFamily: "'Press Start 2P', monospace",
            textShadow: "0 0 20px rgba(0,255,247,0.3)",
          }}
        >
          {currentWord}
        </p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Gõ từ ở đây..."
        className="w-full p-3 rounded-xl text-center text-lg font-bold"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(0,255,247,0.2)",
          color: "#e2e8f0",
          outline: "none",
          fontFamily: "'Inter', sans-serif",
        }}
        autoFocus
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MINI GAME: SPEAKING (Simon Says — memory)
   ══════════════════════════════════════════════ */
function SpeakingGame({ onComplete, onCancel }) {
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState("showing"); // showing | input | success | fail
  const maxRounds = 4;

  const addToSequence = useCallback(() => {
    const next = Math.floor(Math.random() * SPEAKING_EMOJIS.length);
    setSequence((prev) => [...prev, next]);
    setPlayerInput([]);
    setPhase("showing");
  }, []);

  useEffect(() => {
    addToSequence();
  }, [addToSequence]);

  // Show sequence animation
  useEffect(() => {
    if (phase !== "showing" || sequence.length === 0) return;
    let i = 0;
    setShowingIndex(-1);
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setShowingIndex(i);
        i++;
      } else {
        setShowingIndex(-1);
        setPhase("input");
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [phase, sequence]);

  const handlePress = (idx) => {
    if (phase !== "input") return;
    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);

    // Check if wrong
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setPhase("fail");
      sfxError();
      setTimeout(onCancel, 1000);
      return;
    }

    // Check if completed this round
    if (newInput.length === sequence.length) {
      const nextRound = round + 1;
      if (nextRound >= maxRounds) {
        setPhase("success");
        sfxSuccess();
        setTimeout(onComplete, 800);
      } else {
        setRound(nextRound);
        setPhase("success");
        setTimeout(() => addToSequence(), 800);
      }
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>🧠 Nhớ và lặp lại</span>
        <span>
          Vòng {round + 1}/{maxRounds}
        </span>
      </div>
      <div className="stat-bar mb-2">
        <div
          className="stat-bar-fill"
          style={{
            width: `${(round / maxRounds) * 100}%`,
            background: "linear-gradient(90deg, #8b5cf6, #6d28d9)",
          }}
        />
      </div>

      <p className="text-[10px] text-gray-500">
        {phase === "showing"
          ? "🔊 Quan sát thứ tự..."
          : phase === "input"
            ? "👆 Nhấn lại đúng thứ tự!"
            : phase === "success"
              ? "✅ Tuyệt vời!"
              : "❌ Sai rồi!"}
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-[220px] mx-auto">
        {SPEAKING_EMOJIS.map((emoji, i) => (
          <button
            key={i}
            onClick={() => handlePress(i)}
            disabled={phase !== "input"}
            className="aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-200"
            style={{
              background:
                showingIndex !== -1 && sequence[showingIndex] === i
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.05)",
              border: `2px solid ${showingIndex !== -1 && sequence[showingIndex] === i ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)"}`,
              transform:
                showingIndex !== -1 && sequence[showingIndex] === i
                  ? "scale(1.1)"
                  : "scale(1)",
              boxShadow:
                showingIndex !== -1 && sequence[showingIndex] === i
                  ? "0 0 20px rgba(255,255,255,0.2)"
                  : "none",
              cursor: phase === "input" ? "pointer" : "default",
              opacity: phase === "input" ? 1 : 0.7,
            }}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Show player input progress */}
      <div className="flex justify-center gap-1">
        {sequence.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background:
                i < playerInput.length ? "#22c55e" : "rgba(255,255,255,0.15)",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MINI GAME: WRITING (Unscramble sentence)
   ══════════════════════════════════════════════ */
function WritingGame({ onComplete, onCancel }) {
  const [sentenceData] = useState(
    () =>
      WRITING_SENTENCES[Math.floor(Math.random() * WRITING_SENTENCES.length)],
  );
  const [available, setAvailable] = useState(() => {
    const arr = [...sentenceData.scrambled];
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.map((w, i) => ({ word: w, id: i }));
  });
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'

  const handlePick = (item) => {
    setSelected((prev) => [...prev, item]);
    setAvailable((prev) => prev.filter((a) => a.id !== item.id));
  };

  const handleRemove = (item) => {
    setAvailable((prev) => [...prev, item]);
    setSelected((prev) => prev.filter((s) => s.id !== item.id));
  };

  const handleCheck = () => {
    const sentence = selected.map((s) => s.word).join(" ");
    if (sentence.toLowerCase() === sentenceData.answer.toLowerCase()) {
      setResult("correct");
      sfxSuccess();
      setTimeout(onComplete, 1000);
    } else {
      sfxWrong();
      setResult("wrong");
      setTimeout(() => setResult(null), 1000);
    }
  };

  return (
    <div className="text-center space-y-4">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
        Sắp xếp các từ thành câu đúng
      </p>

      {/* Selected words (sentence builder) */}
      <div
        className="glass-card p-4 min-h-[56px] flex flex-wrap gap-2 justify-center items-center"
        style={{
          border:
            result === "correct"
              ? "2px solid #22c55e"
              : result === "wrong"
                ? "2px solid #ef4444"
                : "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s",
        }}
      >
        {selected.length === 0 && (
          <span className="text-xs text-gray-600">
            Nhấn vào các từ bên dưới...
          </span>
        )}
        {selected.map((item) => (
          <button
            key={item.id}
            onClick={() => handleRemove(item)}
            className="px-3 py-1.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
            }}
          >
            {item.word}
          </button>
        ))}
      </div>

      {result === "correct" && (
        <p className="text-green-400 text-sm font-bold">✅ Chính xác!</p>
      )}
      {result === "wrong" && (
        <p className="text-red-400 text-sm font-bold">❌ Sai rồi, thử lại!</p>
      )}

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {available.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePick(item)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#cbd5e1",
            }}
          >
            {item.word}
          </button>
        ))}
      </div>

      {/* Check button */}
      {selected.length > 0 && (
        <button
          onClick={handleCheck}
          className="px-6 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 15px rgba(34,197,94,0.3)",
          }}
        >
          ✔️ Kiểm tra
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN: SUBMISSION HUB
   ══════════════════════════════════════════════ */
export default function SubmissionHub() {
  const { state, closeSystem, performAction } = useGame();
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [activeMiniGame, setActiveMiniGame] = useState(null); // { id, type }

  const submittedCount = submissions.filter((s) => s.submitted).length;

  const handleStartMiniGame = (sub) => {
    sfxOpen();
    setActiveMiniGame({ id: sub.id, type: sub.miniGame });
  };

  const handleMiniGameComplete = () => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === activeMiniGame.id ? { ...s, submitted: true } : s,
      ),
    );
    setActiveMiniGame(null);
  };

  const handleMiniGameCancel = () => {
    sfxClose();
    setActiveMiniGame(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          if (!activeMiniGame) closeSystem();
        }}
      />

      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeMiniGame ? "🎮" : "📤"}</span>
            <div>
              <h2 className="text-lg font-bold text-white">
                {activeMiniGame ? "Mini Task" : "Nộp Bài"}
              </h2>
              <p className="text-xs text-white/70">
                {activeMiniGame
                  ? "Hoàn thành task để nộp bài!"
                  : "LUK Global Platform"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!activeMiniGame && (
              <span className="text-xs text-white/70 bg-white/20 px-2 py-1 rounded-full">
                {submittedCount}/{submissions.length} đã nộp
              </span>
            )}
            <button
              onClick={() => {
                if (activeMiniGame) handleMiniGameCancel();
                else closeSystem();
              }}
              className="text-white/70 hover:text-white text-xl transition-colors"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[calc(85vh-80px)]">
          {activeMiniGame ? (
            <>
              {/* Mini Game Area */}
              {activeMiniGame.type === "shadowing" && (
                <ShadowingGame
                  onComplete={handleMiniGameComplete}
                  onCancel={handleMiniGameCancel}
                />
              )}
              {activeMiniGame.type === "speaking" && (
                <SpeakingGame
                  onComplete={handleMiniGameComplete}
                  onCancel={handleMiniGameCancel}
                />
              )}
              {activeMiniGame.type === "writing" && (
                <WritingGame
                  onComplete={handleMiniGameComplete}
                  onCancel={handleMiniGameCancel}
                />
              )}

              <button
                onClick={handleMiniGameCancel}
                className="w-full py-2 rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                ← Quay lại
              </button>
            </>
          ) : (
            <>
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
                          {sub.type === "video"
                            ? "🎥"
                            : sub.type === "speaking"
                              ? "🗣️"
                              : "✍️"}
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
                    ) : (
                      <button
                        onClick={() => handleStartMiniGame(sub)}
                        className="text-xs text-white bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1.5 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-1"
                      >
                        🎮 Làm bài
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Info */}
              <div className="glass-card p-3 bg-[#8b5cf6]/5 border border-[#8b5cf6]/10">
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  💡 <strong className="text-gray-300">Lưu ý:</strong> Hoàn
                  thành mini task để nộp bài. Mỗi bài có một thử thách nhỏ giống
                  game!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
