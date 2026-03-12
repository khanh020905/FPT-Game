import { GameProvider, useGame } from "./engine/GameContext";
import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameCanvas from "./components/GameCanvas";
import PlayerHUD from "./components/PlayerHUD";
import EventModal from "./components/EventModal";
import DayTransition from "./components/DayTransition";
import LukApp from "./systems/LukApp";
import ShopSystem from "./systems/ShopSystem";
import MentorSystem from "./systems/MentorSystem";
import SubmissionHub from "./systems/SubmissionHub";
import FPTChatBot from "./components/FPTChatBot";
import MusicControl from "./components/MusicControl";
import Tutorial from "./components/Tutorial";
import Leaderboard from "./components/Leaderboard";

/**
 * Game Over Screen — shown when player runs out of health/progress or wins
 */
function GameOverScreen() {
  const { state, newGame } = useGame();
  const isWin = state.gameOverReason?.includes("Chúc mừng");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#1a1f2e] p-8 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: isWin ? 30 : 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isWin ? "#ffd700" : "#ef4444",
              opacity: 0.3,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <div className="text-7xl mb-6 animate-[float_3s_ease-in-out_infinite]">
          {isWin ? "🎓" : "💀"}
        </div>

        <h1
          className={`text-3xl font-bold mb-4 ${isWin ? "text-[#ffd700]" : "text-red-400"}`}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "20px",
            textShadow: isWin ? "0 0 20px #ffd700" : "0 0 20px #ef4444",
          }}
        >
          {isWin ? "HOÀN THÀNH!" : "GAME OVER"}
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed mb-8">
          {state.gameOverReason}
        </p>

        {/* Final Stats */}
        <div className="glass-card p-5 mb-8 text-left">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-bold">
            📊 Thống kê cuối cùng
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">📅 Ngày</span>
              <span className="text-white font-bold">{state.day}/30</span>
            </div>
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">📊 Tiến Độ</span>
              <span className="text-white font-bold">
                {state.stats.progress}%
              </span>
            </div>
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">🧠 Trí Tuệ</span>
              <span className="text-white font-bold">
                {state.stats.intelligence}
              </span>
            </div>
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">💪 Tự Tin</span>
              <span className="text-white font-bold">
                {state.stats.confidence}
              </span>
            </div>
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">🏆 Quests</span>
              <span className="text-white font-bold">
                {state.completedQuests.length}
              </span>
            </div>
            <div className="flex justify-between items-center glass-card p-2">
              <span className="text-gray-400">💰 Tiền</span>
              <span className="text-white font-bold">
                {state.stats.money.toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={newGame}
          className="px-10 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#f37021] to-[#ff2d95] hover:brightness-110 transition-all transform hover:scale-105 shadow-lg shadow-[#f3702130]"
        >
          🔄 Chơi Lại
        </button>
      </div>
    </div>
  );
}

/**
 * Main Game Screen — Sidebar (HUD) + Map + Systems
 * Uses flexbox to position the stats sidebar next to the map area
 */
function GameScreen() {
  const { state, closeSystem } = useGame();
  const { activeSystem, location } = state;
  const [showTutorial, setShowTutorial] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show tutorial on first game start
  useEffect(() => {
    const tutorialSeen = localStorage.getItem("fpt-tutorial-seen");
    if (!tutorialSeen) {
      setShowTutorial(true);
      localStorage.setItem("fpt-tutorial-seen", "true");
    }
  }, []);

  // Listen for leaderboard system
  useEffect(() => {
    if (activeSystem === "leaderboard") {
      setShowLeaderboard(true);
      closeSystem();
    }
  }, [activeSystem, closeSystem]);

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#0a0e17]">
      {/* ── Hamburger Toggle Button (mobile only) ── */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 left-3 z-[60] flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: sidebarOpen
            ? "rgba(239, 68, 68, 0.2)"
            : "rgba(0, 0, 0, 0.7)",
          border: sidebarOpen
            ? "1.5px solid rgba(239, 68, 68, 0.5)"
            : "1.5px solid rgba(0, 255, 247, 0.3)",
          backdropFilter: "blur(12px)",
          boxShadow: sidebarOpen
            ? "0 0 16px rgba(239, 68, 68, 0.3)"
            : "0 0 16px rgba(0, 255, 247, 0.2)",
          transition: "all 0.25s ease",
        }}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <span style={{ fontSize: 18, color: "#ef4444", fontWeight: "bold" }}>
            ✕
          </span>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "#00fff7",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                display: "block",
                width: 14,
                height: 2,
                background: "#00fff7",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "#00fff7",
                borderRadius: 2,
              }}
            />
          </div>
        )}
      </button>

      {/* ── Mobile Backdrop ── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          style={{ animation: "fade-in 0.2s ease-out" }}
        />
      )}

      {/* Left Sidebar — Player Stats Panel */}
      <div
        className={`
          fixed md:relative z-[50] h-full
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <PlayerHUD />
      </div>

      {/* Main Area — Canvas Game */}
      <GameCanvas />

      {/* Overlays */}
      <DayTransition />
      <EventModal />

      {/* System Modals (conditionally rendered) */}
      {activeSystem === "luk-app" && location === "gamma-tower" && <LukApp />}
      {activeSystem === "shop" && <ShopSystem />}
      {activeSystem === "mentor" && <MentorSystem />}
      {activeSystem === "submission" && <SubmissionHub />}

      {/* Tutorial (first time only) */}
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}

      {/* Leaderboard */}
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
}

/**
 * App Router — switches between Start / Playing / GameOver screens
 */
function AppRouter() {
  const { state } = useGame();

  switch (state.gamePhase) {
    case "start":
      return <StartScreen />;
    case "playing":
    case "day-transition":
      return <GameScreen />;
    case "gameover":
      return <GameOverScreen />;
    default:
      return <StartScreen />;
  }
}

/**
 * Root App — wraps everything in GameProvider
 */
export default function App() {
  return (
    <GameProvider>
      <AppRouter />
      <FPTChatBot />
      <MusicControl />
    </GameProvider>
  );
}
