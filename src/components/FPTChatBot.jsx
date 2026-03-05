import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = "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";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `Bạn là FPT AI — trợ lý ảo chính thức của Đại học FPT (FPT University). Bạn là một con cóc vàng thông thái, thân thiện và dễ thương.

Thông tin về FPT University:
- FPT University thành lập năm 2006, thuộc Tập đoàn FPT — tập đoàn công nghệ lớn nhất Việt Nam.
- Cơ sở: Hà Nội (Hòa Lạc), Đà Nẵng, TP.HCM, Cần Thơ, Quy Nhơn.
- Các ngành đào tạo: Công nghệ thông tin (SE, AI, IoT, IS), Quản trị kinh doanh, Ngôn ngữ Anh, Ngôn ngữ Nhật, Ngôn ngữ Hàn, Thiết kế đồ họa, Truyền thông đa phương tiện.
- Mã ngành phổ biến: PRF192, PRO192, CSD201, PRJ301, SWP391, SWR302, DBI202, NWC203.
- Hệ thống LUK Global (Little UK) — môi trường 100% tiếng Anh.
- Tòa nhà: Alpha Tower (sự kiện, English Lv5-6), Beta Tower (Lab thực hành), Gamma Tower (LUK Global).
- KTX (Ký túc xá) A và B cho sinh viên.
- Cantin phục vụ ăn uống đa dạng.
- Sân thể thao: bóng đá, bóng rổ, cầu lông, vovinam.
- Sự kiện nổi bật: Hội Làng FPT (lễ hội truyền thống lớn nhất), Convocation Day, Hackathon, FPT Tech Talk, Open Day.
- CLB: 50+ câu lạc bộ (lập trình, âm nhạc, thể thao, tình nguyện...).
- Học phí: khoảng 28-32 triệu/kỳ (tùy ngành, năm học).
- Học kỳ: 3 kỳ/năm (Spring, Summer, Fall).
- OJT (On-the-Job Training): thực tập tại doanh nghiệp từ kỳ 5.
- Tỷ lệ có việc ngay sau tốt nghiệp: trên 95%.
- Đối tác: FPT Software, FPT IS, các công ty công nghệ lớn.

Quy tắc trả lời:
1. Luôn trả lời bằng tiếng Việt trừ khi được yêu cầu tiếng Anh.
2. Thân thiện, vui vẻ, dùng emoji phù hợp.
3. Nếu không biết chính xác, hãy nói rõ và đề nghị sinh viên liên hệ phòng tuyển sinh.
4. Trả lời ngắn gọn, dễ hiểu, tối đa 3-4 câu cho mỗi câu hỏi đơn giản.
5. Có thể xưng "Cóc Vàng" hoặc "FPT AI" tùy ngữ cảnh.`;

export default function FPTChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào! 🐸✨ Tôi là **FPT AI** — Cóc Vàng thông thái!\n\nBạn cần gì hỏi tôi nhé, tôi sẵn sàng giúp bạn mọi thông tin về FPT University! 🎓🏫",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Hide tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.slice(-10), // keep last 10 messages for context
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Xin lỗi, Cóc Vàng đang bận. Vui lòng thử lại nhé! 🐸";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ôi, có lỗi kết nối rồi! 🐸💦 Vui lòng thử lại sau nhé!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes toadBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes toadPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(255,200,0,0.4), 0 4px 20px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 0 30px rgba(255,200,0,0.7), 0 4px 20px rgba(0,0,0,0.4); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tooltipFade {
          0%, 80% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(10px); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        .chat-scrollbar::-webkit-scrollbar { width: 5px; }
        .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,200,0,0.3); border-radius: 10px; }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,200,0,0.5); }
      `}</style>

      {/* ── Floating Toad Button ── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
        {/* Tooltip bubble */}
        {showTooltip && !isOpen && (
          <div
            style={{
              position: "absolute",
              bottom: 80,
              right: 0,
              background: "linear-gradient(135deg, #1a1f2e, #0f172a)",
              border: "1.5px solid rgba(255,200,0,0.4)",
              borderRadius: 12,
              padding: "10px 14px",
              width: 220,
              animation: "tooltipFade 8s ease-in-out forwards",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 15px rgba(255,200,0,0.15)",
            }}
          >
            <p style={{ color: "#ffd700", fontSize: 12, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
              🐸 Tôi là FPT AI!
            </p>
            <p style={{ color: "#94a3b8", fontSize: 11, margin: "4px 0 0", lineHeight: 1.4 }}>
              Bạn cần gì hỏi tôi nhé, tôi sẵn sàng giúp bạn! ✨
            </p>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -8,
                right: 28,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid #1a1f2e",
              }}
            />
          </div>
        )}

        {/* Toad Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "3px solid #ffd700",
            background: "linear-gradient(135deg, #1a1f2e 0%, #0f172a 100%)",
            cursor: "pointer",
            padding: 0,
            overflow: "hidden",
            animation: isOpen ? "none" : "toadBounce 2s ease-in-out infinite, toadPulse 2s ease-in-out infinite",
            transition: "all 0.3s ease",
            transform: isOpen ? "scale(0.9) rotate(15deg)" : undefined,
            position: "relative",
          }}
          title="FPT AI Chatbot"
        >
          <img
            src="/golden-toad.png"
            alt="FPT AI Cóc Vàng"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          {/* Online indicator */}
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #0f172a",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
        </button>
      </div>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 380,
            maxWidth: "calc(100vw - 48px)",
            height: 520,
            maxHeight: "calc(100vh - 140px)",
            borderRadius: 16,
            overflow: "hidden",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            animation: "chatSlideUp 0.3s ease-out",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,200,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,200,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1400 0%, #2d2000 50%, #1a1400 100%)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: "1px solid rgba(255,200,0,0.2)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #ffd700",
                flexShrink: 0,
              }}
            >
              <img
                src="/golden-toad.png"
                alt="FPT AI"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  margin: 0,
                  color: "#ffd700",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 11,
                }}
              >
                FPT AI
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  color: "#94a3b8",
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    boxShadow: "0 0 6px #22c55e",
                  }}
                />
                Cóc Vàng đang online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#94a3b8",
                cursor: "pointer",
                padding: "6px 8px",
                fontSize: 16,
                lineHeight: 1,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.05)";
                e.target.style.color = "#94a3b8";
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="chat-scrollbar"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              background: "linear-gradient(180deg, #0a0e17 0%, #111827 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid #ffd700",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/golden-toad.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #f37021, #e85d10)"
                        : "linear-gradient(135deg, #1e293b, #1a2332)",
                    border:
                      msg.role === "user"
                        ? "none"
                        : "1px solid rgba(255,200,0,0.15)",
                    color: msg.role === "user" ? "#fff" : "#e2e8f0",
                    fontSize: 13,
                    lineHeight: 1.55,
                    boxShadow:
                      msg.role === "user"
                        ? "0 2px 10px rgba(243,112,33,0.3)"
                        : "0 2px 10px rgba(0,0,0,0.3)",
                    wordBreak: "break-word",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1.5px solid #ffd700",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/golden-toad.png"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #1e293b, #1a2332)",
                    border: "1px solid rgba(255,200,0,0.15)",
                    borderRadius: "14px 14px 14px 4px",
                    padding: "12px 18px",
                    display: "flex",
                    gap: 5,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#ffd700",
                        animation: `dotBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "12px 14px",
              background: "#0d1117",
              borderTop: "1px solid rgba(255,200,0,0.15)",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi Cóc Vàng bất cứ điều gì..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,200,0,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#e2e8f0",
                fontSize: 13,
                outline: "none",
                transition: "border-color 0.2s",
                fontFamily: "inherit",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(255,200,0,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,200,0,0.2)")
              }
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                border: "none",
                background:
                  isLoading || !input.trim()
                    ? "rgba(255,200,0,0.15)"
                    : "linear-gradient(135deg, #ffd700, #f59e0b)",
                color:
                  isLoading || !input.trim() ? "rgba(255,200,0,0.4)" : "#1a1400",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: 18,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
                boxShadow:
                  isLoading || !input.trim()
                    ? "none"
                    : "0 4px 15px rgba(255,200,0,0.3)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
