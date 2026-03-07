/**
 * Building Landing Page Data
 * Mô tả chi tiết từng tòa nhà trong FPT University
 * Images from official FPT University and public architecture sources
 */

// Real images from FPT University Da Nang official & public sources
export const CAMPUS_IMAGES = {
  aerial:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-1-scaled.jpg",
  alphaExterior:
    "https://chfrfrqktgurwrfaqvhq.supabase.co/storage/v1/object/public/images/fpt-alpha-building.jpg",
  alphaFront:
    "https://file.hstatic.net/200000622535/file/fpt-university-da-nang_b5e7d2f5f9094f1da9f12b13c5b19c14.jpg",
  betaLab:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/z4581854392561_cbde0f0ddd85a2cd4413c6de5cfa58e2.jpg",
  gammaBuilding:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/06/campus-da-nang-3.jpg",
  canteen:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/z4581854392561_cbde0f0ddd85a2cd4413c6de5cfa58e2.jpg",
  dormitory:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/ktx-dn-scaled.jpg",
  mainGate:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-2-scaled.jpg",
  lukGlobal:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/06/luk-global-fpt.jpg",
  tyBa: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhac-cu-dan-toc-fpt.jpg",
  vovinam:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/06/vovinam-fpt-1.jpg",
  studentLife:
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/sinh-vien-fpt-dn.jpg",
};

export const BUILDING_DATA = {
  "alpha-tower": {
    id: "alpha-tower",
    name: "Toà Alpha",
    subtitle: "Sự Kiện & English Level 5-6",
    emoji: "🏫",
    heroGradient:
      "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
    accentColor: "#f37021",
    tagline: "Workshop — Sự kiện — English với giảng viên quốc tế",
    description:
      "Toà Alpha là trung tâm sự kiện và workshop lớn nhất FPT University Đà Nẵng. Đây cũng là nơi sinh viên năm nhất học Tiếng Anh Level 5 & 6 với giảng viên nước ngoài đến từ Anh, Mỹ, Úc — trải nghiệm môi trường quốc tế ngay tại trường.",
    dailySchedule: [
      {
        time: "06:30",
        activity: "Thức dậy, chuẩn bị đi học",
        emoji: "⏰",
        type: "personal",
      },
      {
        time: "07:00",
        activity: "Ăn sáng tại Cantin",
        emoji: "🍜",
        type: "personal",
      },
      {
        time: "07:30 - 09:30",
        activity: "English Level 5 — Speaking & Debate với Mr. James (UK)",
        emoji: "🇬🇧",
        type: "english",
      },
      {
        time: "09:30 - 09:45",
        activity: "Giải lao — Practice English với bạn bè tại sảnh Alpha",
        emoji: "💬",
        type: "break",
      },
      {
        time: "09:45 - 11:45",
        activity: "English Level 6 — Academic Writing với Ms. Sarah (USA)",
        emoji: "🇺🇸",
        type: "english",
      },
      {
        time: "11:45 - 13:00",
        activity: "Ăn trưa — Cantin hoặc quán ngoài cổng",
        emoji: "🍱",
        type: "personal",
      },
      {
        time: "13:00 - 15:00",
        activity: "Workshop: Kỹ năng thuyết trình chuyên nghiệp",
        emoji: "🎤",
        type: "workshop",
      },
      {
        time: "15:15 - 17:15",
        activity: "Seminar: AI & Tương lai ngành Công nghệ",
        emoji: "🤖",
        type: "workshop",
      },
      {
        time: "17:30 - 18:30",
        activity: "Tự học tại thư viện Alpha tầng 4",
        emoji: "📖",
        type: "study",
      },
      {
        time: "19:00 - 21:00",
        activity: "Event: FPT Tech Talk — Diễn giả từ doanh nghiệp",
        emoji: "🎙️",
        type: "event",
      },
      {
        time: "22:00",
        activity: "Về KTX nghỉ ngơi",
        emoji: "🌙",
        type: "personal",
      },
    ],
    englishLv56: {
      title: "English Level 5 & 6 — Với Giảng Viên Quốc Tế",
      description:
        "Sau khi hoàn thành LUK Global (Level 1-4) tại Toà Gamma, sinh viên năm nhất tiếp tục học English Level 5 & 6 tại Toà Alpha — hoàn toàn với giảng viên bản ngữ đến từ Anh, Mỹ, Úc, Canada.",
      levels: [
        {
          name: "Level 5 — Typhoon",
          level: 5,
          color: "#f37021",
          desc: "Speaking & Debate — Thuyết trình, tranh luận và phản biện bằng tiếng Anh",
        },
        {
          name: "Level 6 — Volcano",
          level: 6,
          color: "#dc2626",
          desc: "Academic Writing & Research — Viết luận học thuật, nghiên cứu khoa học",
        },
      ],
      teachers: [
        {
          name: "Mr. James Wilson",
          country: "🇬🇧 UK",
          specialty: "Public Speaking & Debate",
          exp: "12 năm",
        },
        {
          name: "Ms. Sarah Johnson",
          country: "🇺🇸 USA",
          specialty: "Academic Writing",
          exp: "8 năm",
        },
        {
          name: "Mr. David Brown",
          country: "🇦🇺 Australia",
          specialty: "IELTS Preparation",
          exp: "15 năm",
        },
        {
          name: "Ms. Emily Clark",
          country: "🇨🇦 Canada",
          specialty: "Business English",
          exp: "10 năm",
        },
      ],
      highlights: [
        "100% giảng viên bản ngữ từ Anh, Mỹ, Úc, Canada",
        "Lớp nhỏ 15-20 sinh viên — tương tác tối đa",
        "Mock IELTS 7.0+ sau khi hoàn thành Level 6",
        "Chứng chỉ FPT English Certificate được doanh nghiệp công nhận",
      ],
    },
    events: {
      title: "Hội Làng FPT & Đại Nhạc Hội",
      description:
        "Toà Alpha là trái tim sự kiện của FPT University Đà Nẵng — nơi tổ chức Hội Làng FPT huyền thoại, các đại nhạc hội có ca sĩ nổi tiếng hàng đầu Việt Nam biểu diễn, và những sự kiện hoành tráng nhất.",
      upcomingEvents: [
        {
          name: "🏮 HỘI LÀNG FPT 2026",
          date: "Tháng 4 hàng năm",
          speaker: "Lễ hội văn hóa lớn nhất — Hàng nghìn SV tham gia",
          emoji: "🎪",
          color: "#f37021",
        },
        {
          name: "🎤 Đại Nhạc Hội FPT — Sơn Tùng M-TP",
          date: "Tháng 11",
          speaker: "Ca sĩ hàng đầu Vpop biểu diễn live",
          emoji: "🌟",
          color: "#dc2626",
        },
        {
          name: "🎶 FPT Music Fest — Đen Vâu, HIEUTHUHAI",
          date: "Tháng 9",
          speaker: "Rapper/Ca sĩ triệu view biểu diễn",
          emoji: "🎵",
          color: "#8b5cf6",
        },
        {
          name: "🏆 FPT Award Night & Gala Dinner",
          date: "Cuối năm",
          speaker: "Trao giải SV xuất sắc, biểu diễn văn nghệ",
          emoji: "✨",
          color: "#eab308",
        },
        {
          name: "💼 Career Fair 2026",
          date: "Mỗi học kỳ",
          speaker: "50+ doanh nghiệp công nghệ tuyển dụng",
          emoji: "🎯",
          color: "#3b82f6",
        },
        {
          name: "🤖 Hackathon: Code for Good",
          date: "Cuối tháng",
          speaker: "24h coding marathon",
          emoji: "🏆",
          color: "#22c55e",
        },
      ],
      hoiLang: {
        title: "🏮 Hội Làng FPT — Lễ Hội Huyền Thoại",
        description:
          "Hội Làng là lễ hội truyền thống lớn nhất và đặc biệt nhất của FPT University — diễn ra hàng năm vào tháng 4. Đây là sự kiện mà mọi sinh viên FPT đều mong chờ nhất trong năm!",
        activities: [
          {
            name: "Rước kiệu & Lễ khai mạc",
            emoji: "🏮",
            desc: "Đoàn rước kiệu truyền thống khai mạc lễ hội",
          },
          {
            name: "Đại nhạc hội ca sĩ nổi tiếng",
            emoji: "🎤",
            desc: "Sơn Tùng, Đen Vâu, HIEUTHUHAI... biểu diễn live",
          },
          {
            name: "Hội chợ ẩm thực đường phố",
            emoji: "🍢",
            desc: "100+ gian hàng ăn uống truyền thống & hiện đại",
          },
          {
            name: "Trò chơi dân gian",
            emoji: "🎯",
            desc: "Kéo co, nhảy bao bố, đập niêu... siêu vui",
          },
          {
            name: "Cuộc thi cosplay & văn nghệ",
            emoji: "🎭",
            desc: "Sinh viên biểu diễn sáng tạo các tiết mục",
          },
          {
            name: "Lễ hội ánh sáng & pháo hoa",
            emoji: "🎆",
            desc: "Kết thúc đêm hội với màn pháo hoa rực rỡ",
          },
        ],
      },
      highlights: [
        "Hội Làng FPT thu hút 5000+ sinh viên mỗi năm",
        "Ca sĩ hạng A Vpop từng biểu diễn tại đây",
        "Sân khấu ngoài trời 1000+ chỗ ngồi",
        "Hệ thống âm thanh, ánh sáng concert chuyên nghiệp",
        "Live stream sự kiện đến 5 cơ sở FPT toàn quốc",
        "Networking trực tiếp với doanh nghiệp công nghệ",
      ],
    },
    features: [
      {
        icon: "🏮",
        title: "Hội Làng FPT",
        desc: "Lễ hội truyền thống lớn nhất — ca sĩ nổi tiếng biểu diễn",
      },
      {
        icon: "🇬🇧",
        title: "English Lv5-6",
        desc: "Học tiếng Anh nâng cao với giảng viên bản ngữ",
      },
      {
        icon: "🎤",
        title: "Sân Khấu 1000+",
        desc: "Tổ chức concert, đại nhạc hội hoành tráng",
      },
      {
        icon: "💼",
        title: "Career Center",
        desc: "Tư vấn nghề nghiệp và kết nối doanh nghiệp",
      },
    ],
    funFacts: [
      "Hội Làng FPT từng mời Sơn Tùng M-TP, Đen Vâu biểu diễn!",
      "Mỗi năm có 20+ sự kiện lớn tổ chức tại Alpha Tower",
      "Sân khấu ngoài trời được dựng riêng cho Hội Làng mỗi năm",
    ],
  },

  "beta-tower": {
    id: "beta-tower",
    name: "Toà Beta",
    subtitle: "Trung Tâm Thực Hành & Lab",
    emoji: "💻",
    heroGradient:
      "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #8b5cf6 100%)",
    accentColor: "#7c3aed",
    tagline: "Nơi biến ý tưởng thành hiện thực",
    description:
      "Toà Beta là trung tâm Lab & Thực hành hiện đại nhất FPT University Đà Nẵng. Với 10+ phòng lab trang bị 200+ máy tính cấu hình cao, nơi đây là 'ngôi nhà thứ hai' của sinh viên IT — rèn kỹ năng coding, làm project nhóm, hackathon, và trải nghiệm công nghệ mới nhất từ AI, IoT đến VR/AR.",
    welcomeHighlights: [
      {
        icon: "🖥️",
        stat: "200+",
        label: "Máy tính",
        desc: "Cấu hình cao cho mọi bài thực hành",
      },
      {
        icon: "🔬",
        stat: "10+",
        label: "Phòng Lab",
        desc: "Lab chuyên dụng IoT, AI, Game, Security",
      },
      {
        icon: "⏰",
        stat: "15h",
        label: "Mở cửa/ngày",
        desc: "Từ 7h sáng đến 22h tối",
      },
      {
        icon: "🏆",
        stat: "50+",
        label: "Startup",
        desc: "Startup sinh viên bắt đầu từ Lab Beta",
      },
    ],
    dailySchedule: [
      {
        time: "07:30 - 09:30",
        activity: "Lab PRF192 — Lập trình C cơ bản trên máy",
        emoji: "⌨️",
        type: "lab",
      },
      {
        time: "09:45 - 11:45",
        activity: "Lab MAD101 — Toán rời rạc thực hành trên máy",
        emoji: "🔢",
        type: "lab",
      },
      {
        time: "13:00 - 15:00",
        activity: "Workshop: Git & GitHub — Version Control cho sinh viên",
        emoji: "🐙",
        type: "activity",
      },
      {
        time: "15:15 - 17:15",
        activity: "Làm project nhóm — Đồ án PRF192 website đầu tay",
        emoji: "👨‍💻",
        type: "project",
      },
      {
        time: "17:30 - 19:00",
        activity: "Tự code, debug, ôn luyện thuật toán tại Lab",
        emoji: "🧠",
        type: "study",
      },
      {
        time: "19:00 - 21:00",
        activity: "Hackathon Club — Luyện giải thuật LeetCode, Codeforces",
        emoji: "🏆",
        type: "activity",
      },
      {
        time: "21:00 - 22:00",
        activity: "Lab mở tự do — Sinh viên code project cá nhân",
        emoji: "🌙",
        type: "study",
      },
    ],
    features: [
      {
        icon: "🖥️",
        title: "10 Phòng Lab",
        desc: "200+ máy tính cấu hình i7/RTX cho mọi bài thực hành",
      },
      {
        icon: "🔬",
        title: "Lab IoT & AI",
        desc: "Phòng thí nghiệm công nghệ tiên tiến — Arduino, Raspberry Pi",
      },
      {
        icon: "🎮",
        title: "Game Dev Lab",
        desc: "Phòng phát triển game với thiết bị VR/AR và PC gaming",
        img: "/vr-lab.png",
      },
      {
        icon: "🤖",
        title: "Robotics Lab",
        desc: "Phòng chế tạo robot, drone và embedded system",
        img: "/robotics-lab.png",
      },
      {
        icon: "🔒",
        title: "Security Lab",
        desc: "Lab An Toàn Thông Tin — Ethical Hacking & Pentesting",
      },
      {
        icon: "☁️",
        title: "Cloud Lab",
        desc: "Phòng thực hành Cloud Computing — AWS, Azure, GCP",
      },
    ],
    funFacts: [
      "Lab Beta mở cửa từ 7h sáng đến 22h tối — 365 ngày/năm",
      "Sinh viên FPT code trung bình 4-6 tiếng mỗi ngày tại Lab",
      "Nhiều startup triệu đô của sinh viên FPT bắt đầu từ phòng lab Beta",
      "Mùa đồ án cuối kỳ, Lab luôn kín chỗ từ sáng đến tối",
      "Lab có hệ thống UPS chống mất điện — code không bao giờ bị mất",
    ],
  },

  "gamma-tower": {
    id: "gamma-tower",
    name: "Toà Gamma",
    subtitle: "LUK Global & Nhạc Cụ Dân Tộc",
    emoji: "🏢",
    heroGradient:
      "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #f37021 100%)",
    accentColor: "#f37021",
    tagline: "Hội nhập quốc tế — Gìn giữ bản sắc",
    description:
      "Toà Gamma là nơi đặc biệt nhất của FPT University — nơi sinh viên vừa học tiếng Anh quốc tế tại LUK Global, vừa học đàn Tỳ Bà và nhạc cụ dân tộc Việt Nam. Đây là triết lý giáo dục độc đáo: Hội nhập toàn cầu nhưng giữ gìn văn hóa dân tộc.",
    dailySchedule: [
      {
        time: "07:30 - 09:30",
        activity: "LUK Global — English Communication Level 1 (Hurricane)",
        emoji: "🌍",
        type: "luk",
      },
      {
        time: "09:30 - 09:45",
        activity: "Giải lao — Practice speaking English với bạn bè",
        emoji: "💬",
        type: "break",
      },
      {
        time: "09:45 - 11:45",
        activity: "LUK Global — Reading & Writing Skills",
        emoji: "📝",
        type: "luk",
      },
      {
        time: "11:45 - 13:00",
        activity: "Ăn trưa & nghe nhạc dân tộc tại sảnh Gamma",
        emoji: "🎵",
        type: "personal",
      },
      {
        time: "13:00 - 15:00",
        activity: "Học Đàn Tỳ Bà — Luyện ngón cơ bản & bài 'Xuân Phong Khúc'",
        emoji: "🎼",
        type: "music",
      },
      {
        time: "15:15 - 17:15",
        activity: "Học Đàn Tranh / Sáo Trúc (tùy lớp đăng ký)",
        emoji: "🎶",
        type: "music",
      },
      {
        time: "17:30 - 18:30",
        activity: "Tự luyện nhạc cụ tại phòng tập Gamma tầng 3",
        emoji: "🎸",
        type: "practice",
      },
      {
        time: "19:00 - 21:00",
        activity: "CLB Âm nhạc dân tộc — Tập biểu diễn",
        emoji: "🎭",
        type: "activity",
      },
    ],
    lukGlobal: {
      title: "LUK GLOBAL — Little UK",
      description:
        "Chương trình tiếng Anh nền tảng bắt buộc cho tất cả sinh viên năm nhất. LUK Global giúp sinh viên FPT tự tin giao tiếp quốc tế và sẵn sàng học các môn chuyên ngành bằng tiếng Anh.",
      gallery: [
        {
          url: "/luk-welcome-k21.png",
          cap: "Welcome K21 — LUK Global Orientation",
          tag: "Welcome",
        },
        {
          url: "/luk-stage-performance.png",
          cap: "Sinh viên biểu diễn trên sân khấu LUK Global",
          tag: "Performance",
        },
        {
          url: "/luk-best-team.png",
          cap: "Best Team Presentation Award — 5,000,000 VNĐ",
          tag: "Award",
        },
        {
          url: "/luk-worksheet.png",
          cap: "Sinh viên hoàn thành worksheet trong lớp LUK",
          tag: "Learning",
        },
        {
          url: "/luk-greenfire.png",
          cap: "GREENFIRE, MOVE! — Hoạt động năng động",
          tag: "Activity",
        },
      ],
      levels: [
        {
          name: "Hurricane",
          level: 1,
          color: "#3b82f6",
          desc: "Giao tiếp cơ bản — Nghe nói hàng ngày",
        },
        {
          name: "Greenfire",
          level: 2,
          color: "#16a34a",
          desc: "Phát triển — Đọc hiểu & Viết tuần",
        },
        {
          name: "Heatwave",
          level: 3,
          color: "#ea580c",
          desc: "Nâng cao — Thuyết trình & Tranh luận",
        },
        {
          name: "Thunderbolt",
          level: 4,
          color: "#7c3aed",
          desc: "Chuyên sâu — Học thuật & Nghiên cứu",
        },
      ],
      // Greenfire (Level 2) detailed curriculum
      greenfire: {
        thingsToLearn: [
          "Nến phải đủ vùng mới có thể thành công",
          "Cách hoạt động của bộ não",
          "Nóng lên toàn cầu",
          "Không có ai là phế cả",
          "Học tiếng Anh đúng cách",
          "Hỏi nhiều hơn mỗi ngày",
          "Phát âm",
        ],
        dailyGroupActivities: [
          "Học phát âm để quay video ngày và nhận stamp",
          "Quay video cùng nhóm 1 lần 1 tuần",
        ],
        workshop: [
          "Xem phim",
          "Làm đồ handmade",
          "Tập nhảy và hát",
          "Chơi trò chơi",
        ],
        writeNews: {
          items: [
            "3 news/ngày",
            "Topic theo chủ đề của tuần",
            "Viết news dùng format: where, when, who, what, how, why, summary, 3 câu hỏi",
            "Trình bày theo đúng hướng dẫn",
            "Không đạt đủ yêu cầu sẽ không được stamp",
          ],
        },
        presentation: {
          items: [
            "Thuyết trình theo chủ đề của tuần",
            "Đi quay video phỏng vấn người nước ngoài về vấn đề thuyết trình của tuần",
            "Intro để mở đầu thuyết trình",
            "Edit video và làm slide",
            "Làm minh hoạ phía sau để hỗ trợ diễn đạt cho người đang nói",
          ],
        },
        newsPresentation: {
          items: [
            "Đứng lên ghế nhanh",
            "Nói to rõ chuẩn phát âm",
            "Chỉ có 60s",
            "Làm tất cả mọi thứ để mọi người hiểu",
          ],
        },
      },
      highlights: [
        "100% sinh viên năm nhất học LUK Global",
        "Giáo viên bản ngữ từ Anh, Mỹ, Úc",
        "Thi IELTS miễn phí sau khi hoàn thành",
        "Tầng 5 Gamma Tower — Không gian học hiện đại",
        "Best Team Presentation — Giải thưởng 5,000,000 VNĐ",
        "Hoạt động Greenfire, Hurricane, Heatwave năng động",
      ],
    },
    tyBa: {
      title: "Đàn Tỳ Bà — Nhạc Cụ Dân Tộc",
      description:
        "FPT University là trường đại học đầu tiên tại Việt Nam đưa nhạc cụ dân tộc vào chương trình giảng dạy chính thức. Đàn Tỳ Bà (4 dây, lute truyền thống) là một trong 8 nhạc cụ sinh viên có thể học.",
      instruments: [
        {
          name: "Đàn Tỳ Bà",
          emoji: "🎼",
          img: "/dan-ty-ba.png",
          desc: "4 dây — Lute truyền thống, âm thanh trong trẻo",
          featured: true,
        },
        {
          name: "Đàn Tranh",
          emoji: "🎶",
          img: "/dan-tranh.png",
          desc: "16 dây — Zither Việt Nam, giai điệu du dương",
        },
        {
          name: "Sáo Trúc",
          emoji: "🪈",
          img: "/sao-truc.png",
          desc: "Sáo ngang bằng trúc, tiếng sáo bay bổng",
        },
        {
          name: "Đàn Nhị",
          emoji: "🎻",
          img: "/dan-nhi.png",
          desc: "2 dây kéo — Fiddle Việt Nam",
        },
        {
          name: "Đàn Bầu",
          emoji: "🎵",
          img: "/dan-bau.png",
          desc: "Độc huyền cầm — 1 dây duy nhất",
        },
        {
          name: "Đàn Nguyệt",
          emoji: "🎸",
          img: "/dan-nguyet.png",
          desc: "2 dây — Đàn kìm nguyệt cầm",
        },
      ],
      highlights: [
        "Từ năm 2014, FPT tiên phong dạy nhạc cụ dân tộc",
        "62% sinh viên FPT tham gia học nhạc cụ",
        "46 giảng viên nhạc cụ chuyên nghiệp",
        "Biểu diễn hàng năm tại 'FPT Edu Music Festival'",
      ],
    },
    features: [
      {
        icon: "🌍",
        title: "LUK Global Center",
        desc: "Trung tâm tiếng Anh quốc tế tầng 4-5",
      },
      {
        icon: "🎼",
        title: "Phòng Nhạc Cụ",
        desc: "20 phòng tập nhạc cụ dân tộc tầng 2-3",
      },
      {
        icon: "🎭",
        title: "Sảnh Biểu Diễn",
        desc: "Sân khấu cho concert và biểu diễn văn hóa",
      },
      {
        icon: "📱",
        title: "LMS Portal",
        desc: "Hệ thống quản lý học tập trực tuyến",
      },
    ],
    funFacts: [
      "Sinh viên FPT vừa code vừa biết chơi đàn Tỳ Bà!",
      "Câu lạc bộ nhạc dân tộc FPT từng biểu diễn tại APEC",
      "Tòa Gamma có phòng cách âm chuyên dụng cho luyện tập",
    ],
  },

  canteen: {
    id: "canteen",
    name: "Cantin FPT",
    subtitle: "Ẩm Thực & Giao Lưu",
    emoji: "🍜",
    heroGradient:
      "linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%)",
    accentColor: "#16a34a",
    tagline: "Nạp năng lượng — Kết nối bạn bè",
    description:
      "Cantin 3 tầng FPT University phục vụ hơn 3000 suất ăn mỗi ngày với thực đơn đa dạng từ cơm văn phòng, phở, bún đến trà sữa, café. Đây không chỉ là nơi ăn uống mà còn là trung tâm giao lưu, networking yêu thích nhất của sinh viên FPT.",
    welcomeHighlights: [
      {
        icon: "🍚",
        stat: "3,000+",
        label: "Suất ăn/ngày",
        desc: "Phục vụ liên tục 3 bữa chính",
      },
      {
        icon: "🏪",
        stat: "15+",
        label: "Gian hàng",
        desc: "Đa dạng món Việt & quốc tế",
      },
      {
        icon: "💰",
        stat: "15K-35K",
        label: "Giá/suất",
        desc: "Giá sinh viên cực kỳ hợp lý",
      },
      {
        icon: "⏰",
        stat: "16h",
        label: "Mở cửa/ngày",
        desc: "Từ 6h sáng đến 22h tối",
      },
    ],
    dailySchedule: [
      {
        time: "06:00 - 08:00",
        activity: "Bữa sáng — Phở, bún, xôi, bánh mì, cháo",
        emoji: "🌅",
        type: "meal",
      },
      {
        time: "09:30 - 10:00",
        activity: "Giải lao slot 1 — Trà sữa, café, snack",
        emoji: "☕",
        type: "break",
      },
      {
        time: "11:30 - 13:30",
        activity: "Bữa trưa — Cơm văn phòng, mì, hủ tiếu (cao điểm)",
        emoji: "🍚",
        type: "meal",
      },
      {
        time: "14:00 - 16:00",
        activity: "Giờ vàng tự học — Sinh viên học nhóm tại cantin",
        emoji: "📖",
        type: "study",
      },
      {
        time: "17:00 - 19:00",
        activity: "Bữa tối — Đa dạng món truyền thống & hiện đại",
        emoji: "🍲",
        type: "meal",
      },
      {
        time: "19:00 - 22:00",
        activity: "Café & Trà sữa — Khu vực sinh hoạt tối, giao lưu",
        emoji: "🧋",
        type: "social",
      },
    ],
    features: [
      {
        icon: "🍚",
        title: "3000+ Suất/Ngày",
        desc: "Phục vụ đa dạng món Việt Nam từ Bắc-Trung-Nam",
      },
      {
        icon: "💰",
        title: "Giá Sinh Viên",
        desc: "Cơm 15-25K, Phở/Bún 20-30K, Trà sữa 15-25K",
      },
      {
        icon: "🧋",
        title: "Khu Trà Sữa & Café",
        desc: "Hơn 5 quầy đồ uống — Tiger Sugar, Mixue, café Phin",
      },
      {
        icon: "🤝",
        title: "Networking Zone",
        desc: "Khu vực giao lưu rộng 200m² cho CLB & nhóm project",
      },
      {
        icon: "❄️",
        title: "Máy Lạnh Toàn Bộ",
        desc: "Không gian thoáng mát, sạch sẽ quanh năm",
      },
      {
        icon: "📶",
        title: "WiFi Miễn Phí",
        desc: "Kết nối internet tốc độ cao tại mọi khu vực",
      },
    ],
    funFacts: [
      "Món phổ biến nhất: Cơm gà xối mỡ — chỉ 25,000đ",
      "Sinh viên FPT uống trung bình 2 ly trà sữa mỗi tuần",
      "Cantin 3 tầng rộng hơn 2000m² — lớn nhất khu vực FPT City",
      "Giờ cao điểm trưa có hơn 1500 sinh viên ăn cùng lúc",
      "Tầng 3 cantin có khu vực riêng cho CLB họp và sinh hoạt",
    ],
  },

  "dorm-a": {
    id: "dorm-a",
    name: "Ký Túc Xá A",
    subtitle: "Ngôi Nhà Thứ Hai",
    emoji: "🏠",
    heroGradient:
      "linear-gradient(135deg, #713f12 0%, #ca8a04 50%, #eab308 100%)",
    accentColor: "#ca8a04",
    tagline: "Nghỉ ngơi — Nạp lại năng lượng — Kỷ niệm đẹp",
    description:
      "KTX A là ngôi nhà thứ hai của sinh viên FPT University Đà Nẵng. Thiết kế hiện đại với tông xám trắng đặc trưng, phòng 4-6 người tiện nghi đầy đủ: điều hòa, nước nóng, bàn học, tủ cá nhân. An ninh 24/7 với camera và bảo vệ túc trực.",
    welcomeHighlights: [
      {
        icon: "🛏️",
        stat: "800+",
        label: "Sinh viên",
        desc: "Sức chứa KTX A toàn bộ",
      },
      {
        icon: "💰",
        stat: "500K",
        label: "VNĐ/tháng",
        desc: "Phí KTX siêu hợp lý",
      },
      {
        icon: "📶",
        stat: "100Mbps",
        label: "WiFi Speed",
        desc: "Internet miễn phí 24/7",
      },
      {
        icon: "🔒",
        stat: "24/7",
        label: "An ninh",
        desc: "Camera + Bảo vệ túc trực",
      },
    ],
    dailySchedule: [
      {
        time: "06:00 - 06:30",
        activity: "Thức dậy, vệ sinh cá nhân, chuẩn bị đi học",
        emoji: "🪥",
        type: "personal",
      },
      {
        time: "06:30 - 07:00",
        activity: "Ăn sáng tại cantin KTX hoặc mua bánh mì",
        emoji: "🥖",
        type: "meal",
      },
      {
        time: "07:00 - 17:00",
        activity: "Đi học tại các tòa nhà Alpha, Beta, Gamma",
        emoji: "📚",
        type: "class",
      },
      {
        time: "17:30 - 18:30",
        activity: "Tập thể dục, chạy bộ quanh campus",
        emoji: "🏃",
        type: "activity",
      },
      {
        time: "19:00 - 21:00",
        activity: "Ôn bài, làm assignment, code project nhóm",
        emoji: "💻",
        type: "study",
      },
      {
        time: "21:00 - 22:00",
        activity: "Giặt đồ, sinh hoạt cá nhân, giải trí",
        emoji: "👕",
        type: "personal",
      },
      {
        time: "22:00 - 23:00",
        activity: "Đọc sách, xem video học thêm, relax",
        emoji: "📖",
        type: "study",
      },
      {
        time: "23:00",
        activity: "Giờ giới nghiêm — Tắt đèn nghỉ ngơi",
        emoji: "🌙",
        type: "personal",
      },
    ],
    features: [
      {
        icon: "🛏️",
        title: "Phòng 4-6 Người",
        desc: "Giường tầng chắc chắn, nệm êm, tủ cá nhân có khóa",
      },
      {
        icon: "❄️",
        title: "Điều Hòa & Nước Nóng",
        desc: "Máy lạnh, bình nóng lạnh mọi phòng",
      },
      {
        icon: "📶",
        title: "WiFi 100Mbps",
        desc: "Internet tốc độ cao miễn phí 24/7",
      },
      {
        icon: "🔒",
        title: "An Ninh 24/7",
        desc: "Camera giám sát, bảo vệ, quẹt thẻ ra vào",
      },
      {
        icon: "👕",
        title: "Giặt Ủi Tự Động",
        desc: "Máy giặt công nghiệp tự phục vụ, sấy khô",
      },
      {
        icon: "🏋️",
        title: "Phòng Gym",
        desc: "Phòng tập thể dục miễn phí cho sinh viên KTX",
      },
    ],
    funFacts: [
      "KTX A có sức chứa hơn 800 sinh viên — luôn full mỗi kỳ",
      "Phí KTX chỉ từ 500,000đ/tháng — rẻ nhất Đà Nẵng",
      "WiFi speed trung bình 100Mbps — đủ streaming 4K",
      "KTX có phòng gym miễn phí với nhiều dụng cụ thể thao",
      "Mỗi tầng KTX có khu bếp chung để sinh viên tự nấu ăn",
    ],
  },

  "dorm-b": {
    id: "dorm-b",
    name: "Ký Túc Xá B",
    subtitle: "Khu Vực Yên Tĩnh & Thể Thao",
    emoji: "🏠",
    heroGradient:
      "linear-gradient(135deg, #78350f 0%, #d97706 50%, #f59e0b 100%)",
    accentColor: "#d97706",
    tagline: "Yên tĩnh — Tập trung — Gần sân thể thao",
    description:
      "KTX B nằm sát khu liên hợp thể thao, phù hợp cho sinh viên yêu thích vận động. Khu vực yên tĩnh hơn KTX A, có phòng study room 24/7, minimart tiện lợi, và sân bóng đá cỏ nhân tạo 1500m² ngay bên cạnh.",
    welcomeHighlights: [
      {
        icon: "🤫",
        stat: "Quiet",
        label: "Zone yên tĩnh",
        desc: "Quy định giữ trật tự từ 22:00",
      },
      {
        icon: "⚽",
        stat: "1,500m²",
        label: "Sân bóng",
        desc: "Cỏ nhân tạo đạt chuẩn kỹ thuật",
      },
      {
        icon: "📖",
        stat: "24/7",
        label: "Study Room",
        desc: "Phòng tự học mở suốt ngày đêm",
      },
      {
        icon: "🛒",
        stat: "T1",
        label: "Minimart",
        desc: "Cửa hàng tiện lợi tầng trệt",
      },
    ],
    dailySchedule: [
      {
        time: "05:30 - 06:00",
        activity: "Thức dậy sớm, tập thể dục sáng tại sân",
        emoji: "🏃",
        type: "activity",
      },
      {
        time: "06:00 - 06:30",
        activity: "Tắm rửa, ăn sáng tại minimart hoặc cantin",
        emoji: "🪥",
        type: "personal",
      },
      {
        time: "07:00 - 17:00",
        activity: "Đi học — Chỉ 5 phút đi bộ đến các tòa nhà",
        emoji: "📚",
        type: "class",
      },
      {
        time: "17:30 - 19:00",
        activity: "Đá bóng, bóng rổ, cầu lông tại sân thể thao",
        emoji: "⚽",
        type: "activity",
      },
      {
        time: "19:30 - 21:30",
        activity: "Tự học tại Study Room tầng 1 — Yên tĩnh tuyệt đối",
        emoji: "📖",
        type: "study",
      },
      {
        time: "22:00",
        activity: "Giờ yên tĩnh bắt đầu — Toàn bộ KTX giữ trật tự",
        emoji: "🤫",
        type: "personal",
      },
      {
        time: "23:00",
        activity: "Giờ giới nghiêm — Nghỉ ngơi",
        emoji: "😴",
        type: "personal",
      },
    ],
    features: [
      {
        icon: "🤫",
        title: "Khu Yên Tĩnh",
        desc: "Quy định giữ trật tự nghiêm ngặt từ 22:00",
      },
      {
        icon: "📖",
        title: "Study Room 24/7",
        desc: "Phòng học chung tầng 1, đèn sáng, bàn ghế thoải mái",
      },
      {
        icon: "⚽",
        title: "Sân Bóng 1500m²",
        desc: "Cỏ nhân tạo, hệ thống chiếu sáng, khung lưới",
      },
      {
        icon: "🏋️",
        title: "Khu Thể Thao Đa Năng",
        desc: "Bóng rổ, cầu lông, xà đơn, xà kép, thiết bị gym",
      },
      {
        icon: "🛒",
        title: "Minimart",
        desc: "Cửa hàng tiện lợi ngay tầng trệt, mở 7h-22h",
      },
      {
        icon: "🍳",
        title: "Khu Bếp Chung",
        desc: "Bếp nấu ăn với đầy đủ dụng cụ cho sinh viên",
      },
    ],
    funFacts: [
      "KTX B gần sân bóng đá nhất — chỉ 30 giây đi bộ",
      "Sân bóng cỏ nhân tạo 1500m² có hệ thống chiếu sáng đêm",
      "Sinh viên KTX B thường dậy sớm hơn 30 phút để tập thể dục",
      "Study Room tầng 1 có sinh viên học đến 2-3 giờ sáng mỗi mùa thi",
      "Phòng tập gym miễn phí với xoay eo, xà đơn, đi bộ trên không",
    ],
  },

  "main-gate": {
    id: "main-gate",
    name: "Cổng Chính FPT",
    subtitle: "Cổng Chào Đại Học",
    emoji: "🚪",
    heroGradient:
      "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
    accentColor: "#f37021",
    tagline: "Nơi bắt đầu hành trình mới",
    description:
      "Cổng chính FPT University Đà Nẵng — biểu tượng chào đón hàng nghìn sinh viên mỗi ngày. Từ đây, bạn bắt đầu hành trình 4 năm đại học đầy thử thách và ý nghĩa.",
    welcomeHighlights: [
      {
        icon: "🏫",
        stat: "5",
        label: "Cơ sở toàn quốc",
        desc: "Hà Nội, Đà Nẵng, HCM, Cần Thơ, Quy Nhơn",
      },
      {
        icon: "👨‍🎓",
        stat: "30,000+",
        label: "Sinh viên",
        desc: "Cộng đồng sinh viên năng động nhất",
      },
      {
        icon: "🏆",
        stat: "95%",
        label: "Có việc ngay",
        desc: "Tỷ lệ việc làm sau tốt nghiệp",
      },
      {
        icon: "🌍",
        stat: "100+",
        label: "Đối tác quốc tế",
        desc: "Trường ĐH và doanh nghiệp toàn cầu",
      },
    ],
    dailySchedule: [
      {
        time: "05:30 - 06:00",
        activity: "Bảo vệ mở cổng — Chuẩn bị đón sinh viên",
        emoji: "🔓",
        type: "personal",
      },
      {
        time: "06:30 - 07:30",
        activity: "Sinh viên đổ về trường — Giờ cao điểm sáng",
        emoji: "🚶",
        type: "personal",
      },
      {
        time: "07:30",
        activity: "Tiếng chuông vào lớp slot 1 — Ngày mới bắt đầu",
        emoji: "🔔",
        type: "class",
      },
      {
        time: "11:30 - 13:00",
        activity: "Giờ nghỉ trưa — Sinh viên qua lại cantin",
        emoji: "🍜",
        type: "meal",
      },
      {
        time: "13:00",
        activity: "Tiếng chuông slot chiều — Lớp học buổi chiều",
        emoji: "📚",
        type: "class",
      },
      {
        time: "17:00 - 18:00",
        activity: "Sinh viên tan học — Giờ cao điểm chiều",
        emoji: "🌅",
        type: "personal",
      },
      {
        time: "18:00 - 20:00",
        activity: "CLB & hoạt động ngoại khóa tại campus",
        emoji: "⚽",
        type: "activity",
      },
      {
        time: "22:00",
        activity: "Cổng đóng — An ninh đêm hoạt động",
        emoji: "🌙",
        type: "personal",
      },
    ],
    features: [
      {
        icon: "🎓",
        title: "Biểu Tượng FPT",
        desc: "Logo FPT University nổi bật — Biểu tượng của tri thức",
      },
      {
        icon: "🛡️",
        title: "Bảo Vệ 24/7",
        desc: "Kiểm soát ra vào bằng thẻ sinh viên thông minh",
      },
      {
        icon: "🅿️",
        title: "Bãi Xe Rộng",
        desc: "Bãi đỗ xe máy và ô tô rộng rãi, có mái che",
      },
      {
        icon: "📍",
        title: "Điểm Check-in",
        desc: "Spot chụp ảnh yêu thích của tân sinh viên",
      },
      {
        icon: "🚌",
        title: "Shuttle Bus",
        desc: "Xe bus nội bộ đưa đón sinh viên",
      },
      {
        icon: "🌳",
        title: "Cảnh Quan Xanh",
        desc: "Hàng cây xanh mát dọc đường vào campus",
      },
    ],
    funFacts: [
      "Mỗi sáng có hơn 3000 sinh viên đi qua cổng chính",
      "Cổng FPT là background check-in phổ biến nhất của tân sinh viên",
      "Ngày khai giảng cổng được trang trí cờ hoa rực rỡ với hàng nghìn phụ huynh",
      "FPT University đạt giải thưởng kiến trúc WA Award quốc tế",
      "Campus Đà Nẵng rộng hơn 30 hecta — lớn nhất khu vực miền Trung",
    ],
  },
};
