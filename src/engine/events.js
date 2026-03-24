/**
 * Event/Scenario Data Definitions
 * Interactive and non-interactive events that occur during gameplay
 */

export const EVENTS = {
  // ===== FATE ENGINE EVENTS =====
  "di-tre": {
    id: "di-tre",
    name: "Đi Trễ!",
    emoji: "⏰",
    type: "fate",
    description: "Bạn ngủ quên và đến lớp trễ 15 phút! Thầy/cô không vui...",
    isInteractive: false,
    effects: { confidence: -10, progress: -5 },
    weight: 3,
  },
  "thien-tai": {
    id: "thien-tai",
    name: "Thiên Tai — Mưa Lớn!",
    emoji: "🌧️",
    type: "fate",
    description: "Trời mưa to bất ngờ! Bạn bị ướt sũng trên đường đi học.",
    isInteractive: true,
    choices: [
      {
        id: "wait",
        text: "Đợi tạnh mưa (-1 tiết học)",
        effects: { progress: -3 },
        consequence: {
          emoji: "📚",
          title: "Bỏ lỡ bài kiểm tra!",
          description: "Hóa ra hôm nay có kiểm tra 15 phút đầu giờ. Bạn bị 0 điểm vì vắng mặt!"
        }
      },
      {
        id: "run",
        text: "Chạy dưới mưa!",
        effects: { health: -15, confidence: 5 },
        consequence: {
          emoji: "💪",
          title: "Được khen ngợi!",
          description: "Coach khen bạn có tinh thần trách nhiệm vì đội mưa đến lớp đúng giờ. Cả lớp vỗ tay!"
        }
      },
    ],
    weight: 2,
  },
  "viec-gia-dinh": {
    id: "viec-gia-dinh",
    name: "Việc Gia Đình",
    emoji: "📞",
    type: "fate",
    description: "Ba mẹ gọi điện, có việc gia đình cần giải quyết.",
    isInteractive: true,
    choices: [
      {
        id: "skip-class",
        text: "Nghỉ học về quê",
        effects: { progress: -10, health: 10, confidence: -5 },
        consequence: {
          emoji: "🏠",
          title: "Về nhà an toàn!",
          description: "Gia đình rất vui khi thấy bạn. Nhưng bạn bỏ lỡ bài giảng quan trọng và phải tự học bù lại."
        }
      },
      {
        id: "stay",
        text: "Ở lại trường, gọi lại sau",
        effects: { confidence: -8, health: -5 },
        consequence: {
          emoji: "📞",
          title: "Ba mẹ thông cảm!",
          description: "Ba mẹ hiểu việc học quan trọng. Tối đó bạn gọi video call nói chuyện cả tiếng đồng hồ."
        }
      },
    ],
    weight: 1,
  },
  "kiem-tra-dot-xuat": {
    id: "kiem-tra-dot-xuat",
    name: "Coach Hỏi Bất Ngờ!",
    emoji: "🧑‍🏫",
    type: "fate",
    description:
      "Coach bất ngờ gọi bạn lên trả lời câu hỏi trước cả lớp! Bạn xử lý thế nào?",
    isInteractive: true,
    choices: [
      {
        id: "try-hard",
        text: "Tự tin trả lời 💪",
        effects: { intelligence: 8, progress: 10, confidence: 5 },
        consequence: {
          emoji: "🌟",
          title: "Xuất sắc!",
          description: "Coach gật đầu khen ngợi: 'Very good! Bạn này chăm học lắm!' Cả lớp nhìn bạn ngưỡng mộ."
        }
      },
      {
        id: "nervous",
        text: "Ấp úng trả lời 😅",
        effects: { progress: 3, confidence: -8 },
        consequence: {
          emoji: "😌",
          title: "Coach động viên!",
          description: "Coach nhẹ nhàng nói: 'Không sao, lần sau chuẩn bị kỹ hơn nhé!' Bạn thầm hứa sẽ ôn bài chăm hơn."
        }
      },
      {
        id: "skip",
        text: "Nói 'Em không biết ạ'",
        effects: { progress: -5, confidence: -10 },
        consequence: {
          emoji: "📝",
          title: "Bị ghi tên!",
          description: "Coach ghi tên bạn vào sổ theo dõi. Tuần sau sẽ bị hỏi lại và phải trả lời được!"
        }
      },
    ],
    weight: 2,
  },
  "tien-roi": {
    id: "tien-roi",
    name: "Rớt Tiền!",
    emoji: "💸",
    type: "fate",
    description: "Bạn phát hiện mất ví khi đi Cantin...",
    isInteractive: false,
    effects: { money: -50000, confidence: -5 },
    weight: 1,
  },
  "gap-senior": {
    id: "gap-senior",
    name: "Gặp Anh/Chị Khóa Trên",
    emoji: "🎓",
    type: "fate",
    description: "Một anh/chị khóa trên tốt bụng cho bạn tài liệu ôn thi!",
    isInteractive: false,
    effects: { intelligence: 10, confidence: 8 },
    weight: 2,
  },
  "mat-the": {
    id: "mat-the",
    name: "Mất Thẻ Sinh Viên!",
    emoji: "🪪",
    type: "fate",
    description:
      "Bạn phát hiện mất thẻ sinh viên! Không có thẻ thì không vào được KTX và các tòa nhà.",
    isInteractive: true,
    choices: [
      {
        id: "find",
        text: "Đi tìm lại khắp nơi 🔍",
        effects: { health: -10, confidence: -5 },
        consequence: {
          emoji: "🎉",
          title: "Tìm thấy rồi!",
          description: "Sau 2 tiếng lục tung cantin, bạn tìm thấy thẻ dưới gầm bàn. Mệt nhưng nhẹ nhõm!"
        }
      },
      {
        id: "reissue",
        text: "Làm lại thẻ mới (tốn tiền)",
        effects: { money: -50000, confidence: -3 },
        consequence: {
          emoji: "🪪",
          title: "Thẻ mới sáng bóng!",
          description: "Thẻ mới được làm trong 30 phút. Ảnh mới đẹp hơn ảnh cũ! Nhưng ví mỏng đi đáng kể..."
        }
      },
      {
        id: "borrow",
        text: "Mượn thẻ bạn cùng phòng",
        effects: { confidence: 5 },
        consequence: {
          emoji: "😂",
          title: "Bị bảo vệ phát hiện!",
          description: "Bảo vệ nhìn ảnh thẻ rồi nhìn bạn: 'Đây không phải em!' May mắn chỉ bị nhắc nhở nhẹ."
        }
      },
    ],
    weight: 2,
  },
  "free-food": {
    id: "free-food",
    name: "Event Ăn Miễn Phí!",
    emoji: "🎉",
    type: "fate",
    description: "CLB tổ chức event có đồ ăn miễn phí ở sân trường!",
    isInteractive: false,
    effects: { health: 20, confidence: 10, money: 25000 },
    weight: 1,
  },
  "mat-dien": {
    id: "mat-dien",
    name: "Mất Điện KTX!",
    emoji: "🔌",
    type: "fate",
    description: "Ký túc xá mất điện cả tối, không thể làm bài!",
    isInteractive: true,
    choices: [
      {
        id: "candle-study",
        text: "Học bằng đèn pin",
        effects: { intelligence: 5, health: -10 },
        consequence: {
          emoji: "⚡",
          title: "Điện trở lại!",
          description: "KTX bỗng dưng có điện trở lại sau 1 tiếng! Bạn đã kiên trì học và tiến bộ hơn cả lớp."
        }
      },
      {
        id: "sleep-early",
        text: "Đi ngủ sớm",
        effects: { health: 20 },
        consequence: {
          emoji: "📋",
          title: "Kiểm tra phòng!",
          description: "Sáng hôm sau bảo vệ KTX kiểm tra phòng đột xuất. May mắn phòng bạn sạch sẽ nên không bị phạt!"
        }
      },
    ],
    weight: 1,
  },
  scholarship: {
    id: "scholarship",
    name: "Học Bổng Bất Ngờ!",
    emoji: "🏆",
    type: "fate",
    description: "Bạn nhận được thông báo đạt học bổng khuyến khích!",
    isInteractive: false,
    effects: { money: 500000, confidence: 20, progress: 5 },
    weight: 1,
    minDay: 10,
  },

  // ===== LUK GLOBAL EVENTS =====
  "luk-presentation": {
    id: "luk-presentation",
    name: "Thuyết Trình LUK Global!",
    emoji: "🌍",
    type: "fate",
    description:
      "Hôm nay là ngày thuyết trình nhóm tại LUK Global! Bạn phải present bằng tiếng Anh trước cả lớp.",
    isInteractive: true,
    choices: [
      {
        id: "present-well",
        text: "Tự tin thuyết trình 💪",
        effects: { confidence: 15, intelligence: 10, progress: 8, health: -5 },
        consequence: {
          emoji: "🏆",
          title: "Standing Ovation!",
          description: "Cả lớp vỗ tay nhiệt liệt! Coach nói: 'This is how you present!' Bạn được đề cử Best Speaker."
        }
      },
      {
        id: "nervous",
        text: "Run quá, đọc script 📄",
        effects: { confidence: -5, intelligence: 5, progress: 5 },
        consequence: {
          emoji: "💬",
          title: "Coach góp ý!",
          description: "Coach nhận xét: 'Nội dung tốt nhưng cần bỏ script. Lần sau hãy eye contact nhiều hơn!' Bạn rút kinh nghiệm."
        }
      },
      {
        id: "skip-turn",
        text: "Nhờ bạn nhóm nói thay",
        effects: { confidence: -10, progress: 3 },
        consequence: {
          emoji: "😔",
          title: "Bị trừ điểm!",
          description: "Coach phát hiện bạn không present. Điểm cá nhân bị trừ 10%. Bạn bè trong nhóm hơi thất vọng."
        }
      },
    ],
    weight: 3,
  },
  "luk-best-team": {
    id: "luk-best-team",
    name: "Best Team LUK Global! 🏆",
    emoji: "🥇",
    type: "fate",
    description:
      "Nhóm của bạn được chọn là Best Team Presentation tại LUK Global Hurricane! Giải thưởng 5,000,000 VNĐ!",
    isInteractive: false,
    effects: { money: 200000, confidence: 25, intelligence: 10, progress: 10 },
    weight: 1,
    minDay: 5,
  },

  // ===== NHẠC CỤ DÂN TỘC EVENTS =====
  "sao-truc": {
    id: "sao-truc",
    name: "Buổi Học Sáo Trúc 🪈",
    emoji: "🪈",
    type: "fate",
    description:
      "Hôm nay có buổi học sáo trúc tại Toà Gamma! Thầy dạy bài 'Trống Cơm' truyền thống.",
    isInteractive: true,
    choices: [
      {
        id: "practice-hard",
        text: "Tập thổi chăm chỉ 🎵",
        effects: { confidence: 12, intelligence: 5, health: -5 },
        consequence: {
          emoji: "🎶",
          title: "Thầy khen!",
          description: "Thầy kéo bạn lại: 'Em có năng khiếu! Tuần sau thầy sẽ dạy riêng em bài nâng cao.' Bạn vui sướng!"
        }
      },
      {
        id: "enjoy",
        text: "Vui vẻ thổi theo nhóm",
        effects: { confidence: 8, health: 5 },
        consequence: {
          emoji: "🤝",
          title: "Kết bạn mới!",
          description: "Bạn quen được mấy bạn khác lớp cũng thích sáo trúc. Cùng lập nhóm tập mỗi tuần!"
        }
      },
      {
        id: "skip-music",
        text: "Trốn đi code thay 💻",
        effects: { intelligence: 5, progress: 3, confidence: -8 },
        consequence: {
          emoji: "😱",
          title: "Bị bắt!",
          description: "Giảng viên điểm danh và phát hiện bạn vắng. Bị nhắc nhở trước lớp vào tuần sau!"
        }
      },
    ],
    weight: 2,
  },
  "dan-bau-nhi": {
    id: "dan-bau-nhi",
    name: "Hòa Tấu Đàn Bầu & Đàn Nhị",
    emoji: "🎵",
    type: "fate",
    description:
      "CLB Âm nhạc dân tộc FPT mời bạn tham gia buổi hòa tấu đàn bầu và đàn nhị tại sảnh Gamma. Tiếng đàn bầu độc huyền cầm hòa cùng đàn nhị du dương!",
    isInteractive: true,
    choices: [
      {
        id: "join-perform",
        text: "Tham gia biểu diễn 🎼",
        effects: { confidence: 15, intelligence: 5, health: 5 },
        consequence: {
          emoji: "🌟",
          title: "Được mời biểu diễn!",
          description: "CLB mời bạn tham gia biểu diễn trong đêm nhạc 'FPT Edu Music Festival' cuối kỳ! Cơ hội cười vàng!"
        }
      },
      {
        id: "watch",
        text: "Ngồi xem thưởng thức",
        effects: { confidence: 5, health: 10 },
        consequence: {
          emoji: "🍵",
          title: "Buổi chiều thư giãn!",
          description: "Tiếng đàn du dương giúp bạn thư giãn hoàn toàn. Tinh thần sảng khoái để học buổi tối!"
        }
      },
      {
        id: "record-video",
        text: "Quay video đăng TikTok 📱",
        effects: { confidence: 8, money: 10000 },
        consequence: {
          emoji: "📱",
          title: "Video lên xu hướng!",
          description: "Video được 50K views trên TikTok! Mấy nhãn hàng liên hệ hợp tác. Bạn kiếm được thêm tiền!"
        }
      },
    ],
    weight: 2,
  },
  "dan-tranh": {
    id: "dan-tranh",
    name: "Masterclass Đàn Tranh 🎶",
    emoji: "🎶",
    type: "fate",
    description:
      "Nghệ sĩ đàn tranh nổi tiếng đến FPT Đà Nẵng dạy masterclass! Cơ hội học hỏi từ bậc thầy nhạc cụ 16 dây truyền thống.",
    isInteractive: true,
    choices: [
      {
        id: "attend",
        text: "Tham gia học hỏi 🎓",
        effects: { intelligence: 12, confidence: 10, health: -5 },
        consequence: {
          emoji: "🎓",
          title: "Được tặng chữ ký!",
          description: "Nghệ sĩ tặng bạn chữ ký và lời khuyên: 'Cần luyện tập mỗi ngày, dù chỉ 15 phút!' Bạn được truyền cảm hứng."
        }
      },
      {
        id: "skip",
        text: "Bận ôn thi, không đi",
        effects: { intelligence: 5, progress: 5 },
        consequence: {
          emoji: "😢",
          title: "Tiếc nuối!",
          description: "Bạn thấy ảnh mọi người chụp cùng nghệ sĩ trên group lớp. Hơi tiếc nhưng ôn thi cũng quan trọng!"
        }
      },
    ],
    weight: 1,
    minDay: 7,
  },

  // ===== VOVINAM EVENTS =====
  "vovinam-training": {
    id: "vovinam-training",
    name: "Buổi Tập Vovinam! 🥋",
    emoji: "🥋",
    type: "fate",
    description:
      "FPT Đà Nẵng có buổi tập Vovinam hàng tuần! Võ thuật Việt Nam giúp rèn luyện sức khỏe và tinh thần thượng võ.",
    isInteractive: true,
    choices: [
      {
        id: "train-hard",
        text: "Tập luyện hết sức 💪",
        effects: { health: 15, confidence: 12, intelligence: -3 },
        consequence: {
          emoji: "🥋",
          title: "Lên đai!",
          description: "Thầy dạy nhìn bạn gật gù: 'Tinh thần tốt lắm! Em có thể thi đai sớm!' Bạn cười từ tin hơn."
        }
      },
      {
        id: "light-train",
        text: "Tập nhẹ nhàng",
        effects: { health: 10, confidence: 5 },
        consequence: {
          emoji: "😊",
          title: "Cuối buổi vui vẻ!",
          description: "Buổi tập kết thúc nhẹ nhàng. Bạn cảm thấy cơ thể linh hoạt hơn và tinh thần sảng khoái."
        }
      },
      {
        id: "watch-only",
        text: "Đứng xem không tập",
        effects: { confidence: -3, health: 5 },
        consequence: {
          emoji: "🙄",
          title: "Bị chọc!",
          description: "Mấy bạn trong lớp chọc: 'Sao không tập đi?' Bạn hơi ngượng nhưng vẫn cười trừa."
        }
      },
    ],
    weight: 3,
  },
  "vovinam-belt": {
    id: "vovinam-belt",
    name: "Thi Đai Vovinam! 🏅",
    emoji: "🏅",
    type: "fate",
    description:
      "Kỳ thi thăng đai Vovinam tại FPT Đà Nẵng! Bạn có cơ hội thi lên đai xanh. Phải biểu diễn bài quyền và đối luyện trước ban giám khảo.",
    isInteractive: true,
    choices: [
      {
        id: "take-exam",
        text: "Thi đai — chiến hết mình! 🔥",
        effects: { confidence: 20, health: -10, progress: 5 },
        consequence: {
          emoji: "🥇",
          title: "Đậu đai xanh!",
          description: "Bạn đã vượt qua kỳ thi xuất sắc! Đai xanh được trao trước toàn trường. Cảm giác tự hào dâng trào!"
        }
      },
      {
        id: "not-ready",
        text: "Chưa sẵn sàng, đợi kỳ sau",
        effects: { confidence: -5, health: 5 },
        consequence: {
          emoji: "💪",
          title: "Quyết tâm hơn!",
          description: "Bạn nhìn các bạn khác đậu đai và tự hứa: 'Kỳ sau mình sẽ chiến!' Bắt đầu tập chăm hơn mỗi tối."
        }
      },
    ],
    weight: 1,
    minDay: 10,
  },
};

export const EVENT_LIST = Object.values(EVENTS);

// Events suitable for morning (new day) trigger
export const MORNING_EVENTS = EVENT_LIST.filter((e) => e.type === "fate");
