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
    subtitle: "Phòng Ban & English Level 5-6",
    emoji: "🏫",
    heroGradient:
      "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
    accentColor: "#f37021",
    tagline: "Phòng Ban Hành Chính — English với giảng viên quốc tế",
    description:
      "Toà Alpha là trung tâm hành chính của FPT University Đà Nẵng — nơi đặt các phòng ban quan trọng như Phòng Đào Tạo, Phòng Y Tế, Phòng Dịch Vụ Sinh Viên và Phòng Tuyển Sinh. Đây cũng là nơi sinh viên năm nhất học Tiếng Anh Level 5 & 6 với giảng viên nước ngoài đến từ Anh, Mỹ, Úc.",
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
        activity: "English Level 5 — Speaking & Debate với giảng viên quốc tế",
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
        activity: "English Level 6 — Academic Writing với giảng viên quốc tế",
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
        "Sau khi hoàn thành LUK Global (Level 1-4) tại Toà Gamma, sinh viên năm nhất tiếp tục học English Level 5 & 6 tại Toà Alpha — với đội ngũ giảng viên Việt Nam & quốc tế đến từ Anh, Mỹ, Úc, Canada.",
      levels: [
        {
          name: "Level 5 — Summit 1",
          level: 5,
          color: "#f37021",
          desc: "Phát triển các kỹ năng nghe, nói, đọc, viết cơ bản và làm quen với giao tiếp tiếng Anh trong môi trường học tập.",
        },
        {
          name: "Level 6 — Summit 2",
          level: 6,
          color: "#dc2626",
          desc: "Cải thiện khả năng giao tiếp, thuyết trình và sử dụng tiếng Anh trong học tập và làm việc nhóm.",
        },
      ],
      teachers: [
        {
          name: "Lilibeth",
          country: "🌍 Quốc tế",
          specialty: "Communication Skills",
        },
        {
          name: "Mary Gale",
          country: "🌍 Quốc tế",
          specialty: "Academic English",
        },
        {
          name: "Lyne",
          country: "🌍 Quốc tế",
          specialty: "Speaking & Listening",
        },
        {
          name: "Power",
          country: "🌍 Quốc tế",
          specialty: "Reading & Writing",
        },
        {
          name: "Tel",
          country: "🌍 Quốc tế",
          specialty: "Grammar & Vocabulary",
        },
        {
          name: "Phung Nhan",
          country: "🇻🇳 Việt Nam",
          specialty: "IELTS Preparation",
        },
        {
          name: "May",
          country: "🇻🇳 Việt Nam",
          specialty: "Academic Writing",
        },
        {
          name: "Trang",
          country: "🇻🇳 Việt Nam",
          specialty: "Public Speaking",
        },
        {
          name: "Seya",
          country: "🌍 Quốc tế",
          specialty: "Business English",
        },
      ],
      highlights: [
        "Giảng viên Việt Nam & quốc tế từ Anh, Mỹ, Úc, Canada",
        "Lớp nhỏ 25-35 sinh viên — tương tác tối đa",
        "Có bài test đánh giá trình độ định kỳ",
        "Chứng chỉ FPT English Certificate được doanh nghiệp công nhận",
      ],
    },
    departments: {
      title: "Các Phòng Ban Tại Toà Alpha",
      description:
        "Toà Alpha là trung tâm hành chính quan trọng nhất của FPT University Đà Nẵng — nơi đặt các phòng ban phục vụ sinh viên từ tuyển sinh, đào tạo, y tế đến dịch vụ sinh viên. Mọi thủ tục và hỗ trợ đều được giải quyết nhanh chóng và chuyên nghiệp tại đây.",
      list: [
        {
          name: "Phòng Đào Tạo",
          emoji: "📚",
          color: "#2563eb",
          img: "/phong-dao-tao.png",
          shortDesc: "Quản lý chương trình học & lịch thi",
          description:
            "Phòng Đào Tạo là đầu mối quản lý toàn bộ chương trình giảng dạy, lịch học, lịch thi và kết quả học tập của sinh viên. Đây là nơi sinh viên đến khi cần hỗ trợ về đăng ký môn học, chuyển ngành, bảo lưu, hoặc các vấn đề liên quan đến học vụ.",
          services: [
            "Đăng ký và điều chỉnh môn học mỗi học kỳ",
            "Xếp lịch thi, công bố điểm và xử lý phúc khảo",
            "Hỗ trợ chuyển ngành, chuyển cơ sở, bảo lưu",
            "Cấp bảng điểm, xác nhận sinh viên",
            "Quản lý chương trình đào tạo & chuẩn đầu ra",
            "Tư vấn lộ trình học tập cho sinh viên",
          ],
          contact: {
            location: "Tầng 1, Toà Alpha",
            hours: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            phone: "0236 730 0999 (ext. 1)",
          },
        },
        {
          name: "Phòng Y Tế",
          emoji: "🏥",
          color: "#16a34a",
          img: "/phong-y-te.png",
          shortDesc: "Chăm sóc sức khỏe sinh viên",
          description:
            "Phòng Y Tế chịu trách nhiệm chăm sóc sức khỏe ban đầu, sơ cứu, và quản lý bảo hiểm y tế cho toàn bộ sinh viên. Đội ngũ y bác sĩ và điều dưỡng túc trực thường xuyên, sẵn sàng hỗ trợ trong giờ học và các sự kiện.",
          services: [
            "Khám và sơ cứu ban đầu tại trường",
            "Phát thuốc thông thường miễn phí cho sinh viên",
            "Quản lý hồ sơ bảo hiểm y tế (BHYT)",
            "Tổ chức khám sức khỏe định kỳ đầu năm",
            "Tư vấn sức khỏe tâm lý và dinh dưỡng",
            "Hỗ trợ chuyển viện khi cần thiết",
          ],
          contact: {
            location: "Tầng 1, Toà Alpha",
            hours: "Thứ 2 - Thứ 7: 7:30 - 21:00",
            phone: "0236 730 0999 (ext. 2)",
          },
        },
        {
          name: "Phòng Dịch Vụ Sinh Viên",
          emoji: "🎓",
          color: "#f37021",
          img: "/phong-dich-vu-sv.png",
          shortDesc: "Hỗ trợ đời sống & hoạt động SV",
          description:
            "Phòng Dịch Vụ Sinh Viên là cầu nối giữa nhà trường và sinh viên, hỗ trợ mọi vấn đề về đời sống sinh hoạt, ký túc xá, học bổng, hoạt động ngoại khóa và các chính sách ưu đãi dành cho sinh viên.",
          services: [
            "Quản lý ký túc xá và nhà ở sinh viên",
            "Xét duyệt học bổng và hỗ trợ tài chính",
            "Tổ chức hoạt động ngoại khóa, CLB, đoàn hội",
            "Hỗ trợ xin visa, giấy tờ cho SV quốc tế",
            "Tư vấn việc làm part-time và thực tập",
            "Giải quyết khiếu nại và phản ánh của sinh viên",
          ],
          contact: {
            location: "Tầng 2, Toà Alpha",
            hours: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            phone: "0236 730 0999 (ext. 3)",
          },
        },
        {
          name: "Phòng Tuyển Sinh",
          emoji: "📋",
          color: "#7c3aed",
          img: "/phong-tuyen-sinh.png",
          shortDesc: "Tư vấn & tiếp nhận hồ sơ nhập học",
          description:
            "Phòng Tuyển Sinh là nơi đầu tiên các thí sinh và phụ huynh tiếp xúc với FPT University. Đội ngũ tư vấn chuyên nghiệp sẵn sàng giải đáp mọi thắc mắc về ngành học, học phí, chính sách ưu đãi và quy trình nhập học.",
          services: [
            "Tư vấn ngành học và chương trình đào tạo",
            "Tiếp nhận và xử lý hồ sơ xét tuyển",
            "Tổ chức Open Day và các sự kiện tuyển sinh",
            "Hỗ trợ đăng ký xét tuyển online",
            "Tư vấn học bổng tuyển sinh và chính sách ưu đãi",
            "Hướng dẫn thủ tục nhập học cho tân sinh viên",
          ],
          contact: {
            location: "Tầng 1, Toà Alpha (Sảnh chính)",
            hours: "Thứ 2 - Chủ Nhật: 8:00 - 20:00",
            phone: "0236 730 0999 (ext. 4)",
          },
        },
      ],
      highlights: [
        "Hỗ trợ sinh viên nhanh chóng, chuyên nghiệp",
        "Đội ngũ nhân viên tận tâm, thân thiện",
        "Hệ thống quản lý số hóa, hiện đại",
        "Giải quyết thủ tục trong vòng 24-48 giờ",
        "Tư vấn trực tuyến qua hotline và email",
        "Phục vụ liên tục từ thứ 2 đến thứ 7",
      ],
    },
    alphaEvents: {
      title: "Sự Kiện Tại Toà Alpha",
      description: "Toà Alpha không chỉ là nơi học tập mà còn là trung tâm tổ chức các sự kiện lớn của FPT University Đà Nẵng.",
      categories: [
        {
          name: "Sự kiện học thuật & Talkshow",
          emoji: "🎤",
          color: "#2563eb",
          location: "Tầng 5 — Toà Alpha",
          activities: ["Talkshow với doanh nghiệp, khách mời", "Workshop kỹ năng (marketing, IT, design...)", "Seminar chuyên ngành"],
        },
        {
          name: "Lễ chính thức (Formal Events)",
          emoji: "🎓",
          color: "#7c3aed",
          location: "Hội trường Toà Alpha",
          activities: ["Lễ khai giảng", "Lễ tốt nghiệp (Graduation)", "Lễ trao học bổng", "Các buổi ceremony lớn của trường"],
        },
        {
          name: "Sự kiện sinh viên (Student Events)",
          emoji: "🎪",
          color: "#e11d48",
          location: "Tầng trệt: booth, gian hàng | Hội trường: biểu diễn / thi",
          activities: ["Club Fair — Ngày hội CLB", "Showcase / Biểu diễn", "Mini Concert / Văn nghệ", "Game Event, Cosplay"],
        },
        {
          name: "Open Day — Tuyển sinh — Trải nghiệm",
          emoji: "🌍",
          color: "#16a34a",
          location: "Toàn bộ Toà Alpha",
          activities: ["Ngày hội Open Day (Alpha Global) với hàng nghìn người tham gia", "Check-in sống ảo", "Gian hàng trải nghiệm", "Tư vấn tuyển sinh"],
        },
      ],
    },
    features: [
      {
        icon: "📚",
        title: "Phòng Đào Tạo",
        desc: "Quản lý chương trình học, lịch thi và kết quả học tập",
      },
      {
        icon: "🇬🇧",
        title: "English Lv5-6",
        desc: "Học tiếng Anh nâng cao với giảng viên bản ngữ",
      },
      {
        icon: "🏥",
        title: "Phòng Y Tế",
        desc: "Chăm sóc sức khỏe và sơ cứu cho sinh viên",
      },
      {
        icon: "🎓",
        title: "Dịch Vụ Sinh Viên",
        desc: "Hỗ trợ đời sống, học bổng và hoạt động ngoại khóa",
      },
    ],
    funFacts: [
      "Phòng Tuyển Sinh tiếp nhận hơn 5000 hồ sơ mỗi năm!",
      "Phòng Y Tế mở cửa từ 7h30 sáng đến 9h tối, kể cả thứ 7",
      "Hơn 90% thủ tục tại Phòng Đào Tạo được xử lý trong 24h",
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
    subtitle: "LUK Global — Thư Viện — Lab & Nhạc Cụ Dân Tộc",
    emoji: "🏢",
    heroGradient:
      "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #f37021 100%)",
    accentColor: "#f37021",
    tagline: "LUK Global — Thư Viện — Lab — Nhạc Cụ Dân Tộc",
    description:
      "Toà Gamma là tòa nhà đa chức năng nhất của FPT University Đà Nẵng — nơi đặt LUK Global (tầng 5), Thư viện & Phòng Tự Học (tầng 3), Phòng Lab (tầng 4), cùng các phòng nhạc cụ dân tộc. 5 tầng, mỗi tầng một chức năng riêng biệt.",
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
          url: "/new-img/luk-orientation.jpg",
          cap: "Welcome K21 — LUK Global Orientation",
          tag: "Welcome",
        },
        {
          url: "/new-img/perfomance.jpg",
          cap: "Sinh viên biểu diễn trên sân khấu LUK Global",
          tag: "Performance",
        },
        {
          url: "/new-img/best-team-award.jpg",
          cap: "Best Team Presentation Award — 5,000,000 VNĐ",
          tag: "Award",
        },
        {
          url: "/new-img/work-sheet.jpg",
          cap: "Sinh viên hoàn thành worksheet trong lớp LUK",
          tag: "Learning",
        },
        {
          url: "/new-img/gree-fire-move.jpg",
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
        "Phần lớn sinh viên năm nhất yếu tiếng Anh học LUK Global",
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
        "FPT University là trường đại học đầu tiên tại Việt Nam đưa nhạc cụ dân tộc vào chương trình giảng dạy chính thức. Đàn Tỳ Bà (4 dây, lute truyền thống) là một trong 5 nhạc cụ sinh viên có thể học.",
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
          name: "Đàn Nguyệt",
          emoji: "🎸",
          img: "/dan-nguyet.png",
          desc: "2 dây — Đàn kìm nguyệt cầm",
        },
      ],
      highlights: [
        "Từ năm 2014, FPT tiên phong dạy nhạc cụ dân tộc",
        "100% sinh viên FPT tham gia học nhạc cụ",
        "46 giảng viên nhạc cụ chuyên nghiệp",
        "Biểu diễn hàng năm tại 'FPT Edu Music Festival'",
      ],
    },
    facilities: {
      title: "Tiện Ích & Phòng Ban Tại Toà Gamma",
      description:
        "Ngoài LUK Global và nhạc cụ dân tộc, Toà Gamma còn là nơi đặt Thư viện, các phòng tự học hiện đại và phòng Lab máy tính — phục vụ nhu cầu học tập và nghiên cứu của toàn bộ sinh viên.",
      list: [
        {
          name: "Thư Viện",
          emoji: "📚",
          color: "#2563eb",
          img: "/thu-vien-gamma.png",
          shortDesc: "Không gian đọc sách & nghiên cứu",
          description:
            "Thư viện Toà Gamma là trung tâm tri thức của FPT University Đà Nẵng với hàng nghìn đầu sách chuyên ngành IT, kinh tế, ngoại ngữ và kỹ năng mềm. Không gian yên tĩnh, thoáng mát với hệ thống máy lạnh, WiFi tốc độ cao và ghế ngồi êm ái.",
          services: [
            "Hàng nghìn đầu sách chuyên ngành IT, kinh tế, ngoại ngữ",
            "Hệ thống tra cứu sách điện tử và mượn sách online",
            "Khu vực đọc sách yên tĩnh với ghế sofa thoải mái",
            "Máy in, photocopy phục vụ sinh viên giá ưu đãi",
            "Truy cập miễn phí các cơ sở dữ liệu học thuật quốc tế",
            "Mở cửa từ 7h00 đến 21h00 các ngày trong tuần",
          ],
        },
        {
          name: "Phòng Tự Học",
          emoji: "📖",
          color: "#16a34a",
          img: "/phong-tu-hoc.png",
          shortDesc: "Không gian tự học cá nhân & nhóm",
          description:
            "Các phòng tự học tại Toà Gamma được thiết kế riêng biệt cho sinh viên ôn bài, làm project nhóm hoặc tự nghiên cứu. Mỗi phòng đều trang bị bàn ghế chất lượng, ổ cắm điện, WiFi và máy lạnh.",
          services: [
            "Phòng tự học cá nhân với vách ngăn riêng tư",
            "Phòng học nhóm 4-8 người có bảng trắng",
            "Trang bị đầy đủ ổ cắm điện và WiFi tốc độ cao",
            "Máy lạnh hoạt động liên tục, không gian yên tĩnh",
            "Đặt phòng trước qua app FPT Student",
            "Mở cửa từ 6h30 sáng đến 22h00 tối",
          ],
        },
        {
          name: "Phòng Lab Máy Tính",
          emoji: "💻",
          color: "#7c3aed",
          img: "/phong-lab-gamma.png",
          shortDesc: "Lab thực hành & kiểm tra trên máy",
          description:
            "Các phòng Lab tại Toà Gamma phục vụ sinh viên thực hành các môn lập trình, thi trên máy và làm đồ án. Máy tính cấu hình cao, kết nối mạng nội bộ FPT và các phần mềm bản quyền được cài đặt sẵn.",
          services: [
            "50+ máy tính cấu hình cao mỗi phòng Lab",
            "Cài đặt sẵn Visual Studio, IntelliJ, NetBeans, Eclipse",
            "Kết nối mạng nội bộ FPT tốc độ cao",
            "Phục vụ thi trên máy (Practical Exam) các môn chuyên ngành",
            "Giám sát viên hỗ trợ kỹ thuật thường trực",
            "Lab mở cho sinh viên tự luyện ngoài giờ học",
          ],
        },
      ],
    },
    floors: {
      title: "Sơ Đồ Các Tầng — Toà Gamma",
      description:
        "Toà Gamma có 5 tầng, mỗi tầng được phân chia chức năng rõ ràng — từ khu hành chính, thư viện, phòng nhạc cụ đến LUK Global.",
      list: [
        {
          floor: 1,
          name: "Tầng 1 — Sảnh & Hành Chính",
          emoji: "🏛️",
          color: "#f37021",
          description:
            "Sảnh chính Toà Gamma, khu vực đón tiếp và các phòng hành chính. Sinh viên đến đây để làm thủ tục, gặp cố vấn học tập và nhận thông báo quan trọng.",
          highlights: [
            "Sảnh đón tiếp rộng rãi, thoáng mát",
            "Phòng cố vấn học tập (Academic Advisor)",
            "Bảng thông báo và kệ tài liệu",
            "Khu vực ghế ngồi chờ cho sinh viên và phụ huynh",
          ],
        },
        {
          floor: 2,
          name: "Tầng 2 — Phòng Học Sinh Viên Năm 2",
          emoji: "📚",
          color: "#2563eb",
          description:
            "Tầng 2 dành riêng cho các lớp học chuyên ngành của sinh viên năm 2. Các phòng học lớn trang bị máy chiếu, bảng interactive và hệ thống âm thanh hiện đại.",
          highlights: [
            "8 phòng học lớn sức chứa 40-60 sinh viên",
            "Máy chiếu HD và bảng tương tác (Interactive Board)",
            "Phòng học nhóm nhỏ cho seminar và thảo luận",
            "Khu vực giải lao và máy bán nước tự động",
          ],
        },
        {
          floor: 3,
          name: "Tầng 3 — Thư Viện & Phòng Tự Học",
          emoji: "📖",
          color: "#16a34a",
          description:
            "Tầng 3 là trung tâm tri thức với Thư viện lớn và các phòng tự học cá nhân/nhóm. Không gian yên tĩnh, lý tưởng cho việc ôn thi và nghiên cứu.",
          highlights: [
            "Thư viện với hàng nghìn đầu sách chuyên ngành",
            "16 phòng tự học cá nhân có vách ngăn riêng tư",
            "6 phòng học nhóm có bảng trắng và TV màn hình lớn",
            "Khu vực đọc báo, tạp chí và tài liệu tham khảo",
          ],
        },
        {
          floor: 4,
          name: "Tầng 4 — Phòng Lab & Thực Hành",
          emoji: "💻",
          color: "#7c3aed",
          description:
            "Tầng 4 là khu vực Lab máy tính dành cho thực hành các môn lập trình, thi trên máy và làm đồ án. Đây cũng là nơi tổ chức các buổi Workshop công nghệ.",
          highlights: [
            "4 phòng Lab lớn — mỗi phòng 50+ máy tính",
            "Máy tính cấu hình cao (i7/16GB RAM/SSD)",
            "Phòng thi trên máy (Practical Exam) chuyên dụng",
            "Phòng Workshop và Seminar công nghệ",
          ],
        },
        {
          floor: 5,
          name: "Tầng 5 — LUK Global (Little UK)",
          emoji: "🌍",
          color: "#f37021",
          description:
            "Tầng 5 dành riêng cho chương trình LUK Global — nơi sinh viên năm nhất học tiếng Anh với giáo viên bản ngữ. Không gian được thiết kế theo phong cách quốc tế, tạo cảm giác như đang ở 'Little UK'.",
          highlights: [
            "Toàn bộ tầng 5 dành riêng cho LUK Global",
            "Phòng học thiết kế mở, linh hoạt theo nhóm",
            "Sân khấu mini cho thuyết trình và biểu diễn",
            "Khu vực 'English Only Zone' — chỉ nói tiếng Anh",
          ],
        },
      ],
    },
    features: [
      {
        icon: "🌍",
        title: "LUK Global Center",
        desc: "Trung tâm tiếng Anh quốc tế — Tầng 5",
      },
      {
        icon: "📚",
        title: "Thư Viện & Tự Học",
        desc: "Hàng nghìn đầu sách và phòng tự học hiện đại — Tầng 3",
      },
      {
        icon: "💻",
        title: "Phòng Lab",
        desc: "4 phòng Lab máy tính cấu hình cao — Tầng 4",
      },
      {
        icon: "🎼",
        title: "Phòng Nhạc Cụ",
        desc: "20 phòng tập nhạc cụ dân tộc — Tầng 2-3",
      },
    ],
    funFacts: [
      "Tầng 5 Toà Gamma được gọi là 'Little UK' — chỉ nói tiếng Anh!",
      "Thư viện Gamma có hơn 5000 đầu sách IT và ngoại ngữ",
      "Phòng Lab mở cửa miễn phí cho sinh viên tự luyện đến 22h",
    ],
  },

  canteen: {
    id: "canteen",
    name: "Cantin FPT",
    subtitle: "Thiên Đường Ăn Uống Giá Sinh Viên",
    emoji: "🍜",
    heroGradient:
      "linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%)",
    accentColor: "#16a34a",
    tagline: "Đa dạng món ăn — Giá cực hạt dẻ — Tiện lợi mỗi ngày",
    description:
      "Căn tin FPT University Đà Nẵng là thiên đường ăn uống giá sinh viên với 3 tầng phục vụ đa dạng. Tầng 1 chuyên đồ ăn sáng (bánh mì, bánh ướt, xôi), Tầng 2 & 3 phục vụ cơm trưa và ăn vặt. Giá chỉ từ 17,000 – 30,000 VNĐ, cực kỳ phù hợp với túi tiền sinh viên.",
    welcomeHighlights: [
      {
        icon: "🍚",
        stat: "3 tầng",
        label: "Khu ẩm thực",
        desc: "T1 đồ sáng, T2-3 cơm trưa & ăn vặt",
      },
      {
        icon: "💰",
        stat: "17-30K",
        label: "VNĐ/suất",
        desc: "Giá cực kỳ hạt dẻ cho sinh viên",
      },
      {
        icon: "🧋",
        stat: "20-35K",
        label: "Trà sữa",
        desc: "Quán trà sữa siêu ngon tại T2-3",
      },
      {
        icon: "⏰",
        stat: "Cả ngày",
        label: "Phục vụ",
        desc: "Sáng — Trưa — Chiều — Tối",
      },
    ],
    dailySchedule: [
      {
        time: "06:00 - 08:30",
        activity: "Bữa sáng Tầng 1 — Bánh mì, bánh ướt, xôi, bánh mì chảo",
        emoji: "🌅",
        type: "meal",
      },
      {
        time: "09:30 - 10:00",
        activity: "Giải lao — Nước uống, trà sữa, café tại quầy Tầng 1",
        emoji: "☕",
        type: "break",
      },
      {
        time: "11:00 - 13:30",
        activity: "Bữa trưa Tầng 2-3 — Cơm phần ~30K (cao điểm)",
        emoji: "🍚",
        type: "meal",
      },
      {
        time: "14:00 - 16:00",
        activity: "Ăn vặt & Trà sữa Tầng 2-3 — Giá 20-35K",
        emoji: "🧋",
        type: "social",
      },
      {
        time: "17:00 - 19:00",
        activity: "Bữa tối — Đa dạng món ăn tại Tầng 2-3",
        emoji: "🍲",
        type: "meal",
      },
      {
        time: "19:00 - 21:00",
        activity: "Trà sữa & giao lưu buổi tối",
        emoji: "🧋",
        type: "social",
      },
    ],
    features: [
      {
        icon: "🥖",
        title: "Tầng 1 — Đồ Ăn Sáng",
        desc: "Bánh mì ~17K, bánh ướt ~25K, xôi ~25K, bánh mì chảo ~25K",
      },
      {
        icon: "🍚",
        title: "Tầng 2-3 — Cơm Trưa",
        desc: "Cơm phần đa dạng chỉ khoảng 30,000đ/phần",
      },
      {
        icon: "🧋",
        title: "Trà Sữa Siêu Ngon",
        desc: "Trà và trà sữa giá 20,000 – 35,000 VNĐ",
      },
      {
        icon: "💰",
        title: "Giá Hạt Dẻ",
        desc: "Tất cả món ăn chỉ từ 17,000 – 30,000 VNĐ",
      },
      {
        icon: "☕",
        title: "Quầy Nước Tầng 1",
        desc: "Đồ uống buổi sáng tiện lợi phục vụ SV",
      },
      {
        icon: "🤝",
        title: "Giao Lưu & Kết Nối",
        desc: "Không gian rộng rãi cho sinh viên giao lưu, họp nhóm",
      },
    ],
    funFacts: [
      "Bánh mì tại căn tin chỉ ~17,000đ — rẻ nhất campus",
      "Cơm phần Tầng 2-3 chỉ khoảng 30,000đ — no bụng cả buổi",
      "Trà sữa tại căn tin siêu ngon, giá chỉ từ 20,000đ",
      "Tầng 1 chuyên phục vụ đồ ăn sáng đa dạng từ 6h sáng",
      "Căn tin 3 tầng phục vụ đầy đủ sáng-trưa-chiều-tối cho SV",
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
      "KTX A (Dom A) là ngôi nhà thứ hai của sinh viên FPT University Đà Nẵng. Mỗi phòng được trang bị giường tầng (kích thước 1930x900mm), tủ đồ, tủ giày, bàn học, giá phơi quần áo, cùng đèn chiếu sáng, điều hòa và bình nóng lạnh. An ninh 24/7 với camera và bảo vệ túc trực.",
    welcomeHighlights: [
      {
        icon: "🛏️",
        stat: "3 loại",
        label: "Phòng KTX",
        desc: "Phòng 3, 4 và 6 giường",
      },
      {
        icon: "💰",
        stat: "3.4-4.6TR",
        label: "VNĐ/kỳ (4 tháng)",
        desc: "Học phí KTX theo kỳ",
      },
      {
        icon: "❄️",
        stat: "Đầy đủ",
        label: "Tiện nghi",
        desc: "Điều hòa, nước nóng, bàn học",
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
        activity: "Ăn sáng tại cantin hoặc mua bánh mì",
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
        title: "Phòng 3, 4, 6 Giường",
        desc: "Giường tầng 1930x900mm, tủ đồ, tủ giày, bàn học, giá phơi đồ",
      },
      {
        icon: "❄️",
        title: "Điều Hòa & Nước Nóng",
        desc: "Điều hòa, bình nóng lạnh và đèn chiếu sáng đầy đủ",
      },
      {
        icon: "📶",
        title: "Hạ Tầng Internet",
        desc: "KTX hỗ trợ hạ tầng để nhà mạng lắp đặt dịch vụ cho SV",
      },
      {
        icon: "🔒",
        title: "An Ninh 24/7",
        desc: "Camera giám sát, bảo vệ",
      },
      {
        icon: "💰",
        title: "Giá Phòng Hợp Lý",
        desc: "3 giường: 4.6TR | 4 giường: 4.2TR | 6 giường: 3.4TR/kỳ",
      },
      {
        icon: "⚠️",
        title: "Nội Quy KTX",
        desc: "Cấm nấu ăn trong phòng — Vi phạm sẽ bị phạt 500,000đ",
      },
    ],
    funFacts: [
      "KTX A có sức chứa hơn 800 sinh viên — luôn full mỗi kỳ",
      "Phí KTX phòng 6 giường chỉ 3,400,000đ/kỳ (4 tháng) — siêu tiết kiệm",
      "Giường tầng KTX A kích thước 1930x900mm — đủ rộng cho SV",
      "Mỗi phòng đều có điều hòa, bình nóng lạnh — tiện nghi đầy đủ",
      "Cấm nấu ăn trong KTX — vi phạm bị phạt 500K nên SV thường ăn cantin",
    ],
  },

  "dorm-b": {
    id: "dorm-b",
    name: "Ký Túc Xá B",
    subtitle: "Ngôi Nhà Sinh Viên",
    emoji: "🏠",
    heroGradient:
      "linear-gradient(135deg, #78350f 0%, #d97706 50%, #f59e0b 100%)",
    accentColor: "#d97706",
    tagline: "Tiện nghi — An toàn — Gần khu thể thao",
    description:
      "KTX B (Dom B) nằm gần khu thể thao, phù hợp cho sinh viên yêu thích vận động. Phòng ở trang bị giường tầng (1930x900mm), tủ đồ, tủ giày, bàn học, giá phơi quần áo, điều hòa, bình nóng lạnh và đèn chiếu sáng đầy đủ. Internet do nhà mạng lắp đặt riêng.",
    welcomeHighlights: [
      {
        icon: "🛏️",
        stat: "3 loại",
        label: "Phòng KTX",
        desc: "Phòng 3, 4 và 6 giường",
      },
      {
        icon: "💰",
        stat: "3.4-4.6TR",
        label: "VNĐ/kỳ (4 tháng)",
        desc: "Học phí KTX theo kỳ",
      },
      {
        icon: "❄️",
        stat: "Đầy đủ",
        label: "Tiện nghi",
        desc: "Điều hòa, nước nóng, bàn học",
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
        time: "05:30 - 06:00",
        activity: "Thức dậy sớm, tập thể dục sáng tại sân",
        emoji: "🏃",
        type: "activity",
      },
      {
        time: "06:00 - 06:30",
        activity: "Tắm rửa, ăn sáng tại cantin",
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
        activity: "Ôn bài, làm assignment, code project nhóm",
        emoji: "💻",
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
        icon: "🛏️",
        title: "Phòng 3, 4, 6 Giường",
        desc: "Giường tầng 1930x900mm, tủ đồ, tủ giày, bàn học, giá phơi đồ",
      },
      {
        icon: "❄️",
        title: "Điều Hòa & Nước Nóng",
        desc: "Điều hòa, bình nóng lạnh và đèn chiếu sáng đầy đủ",
      },
      {
        icon: "📶",
        title: "Hạ Tầng Internet",
        desc: "KTX hỗ trợ hạ tầng để nhà mạng lắp đặt dịch vụ cho SV",
      },
      {
        icon: "🔒",
        title: "An Ninh 24/7",
        desc: "Camera giám sát, bảo vệ, quẹt thẻ ra vào",
      },
      {
        icon: "💰",
        title: "Giá Phòng Hợp Lý",
        desc: "3 giường: 4.6TR | 4 giường: 4.2TR | 6 giường: 3.4TR/kỳ",
      },
      {
        icon: "⚠️",
        title: "Nội Quy KTX",
        desc: "Cấm nấu ăn trong phòng — Vi phạm sẽ bị phạt 500,000đ",
      },
    ],
    funFacts: [
      "KTX B nằm gần khu thể thao — tiện lợi cho SV yêu thích vận động",
      "Phí KTX phòng 6 giường chỉ 3,400,000đ/kỳ (4 tháng) — siêu tiết kiệm",
      "Giường tầng KTX B kích thước 1930x900mm — tương tự KTX A",
      "Mỗi phòng đều có điều hòa, bình nóng lạnh — tiện nghi đầy đủ",
      "Cấm nấu ăn trong KTX — vi phạm bị phạt 500K nên SV thường ăn cantin",
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
  "event-yard": {
    id: "event-yard",
    name: "Sân Sự Kiện",
    subtitle: "Trung Tâm Sự Kiện & Lễ Hội FPT",
    emoji: "🏮",
    heroGradient:
      "linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)",
    accentColor: "#e11d48",
    tagline:
      "Summer Interfest — Hội Làng — Music Fest — Nơi tạo kỷ niệm không thể quên",
    description:
      "Sân Sự Kiện FPT University Đà Nẵng là không gian ngoài trời rộng lớn, nơi diễn ra các sự kiện lớn nhất campus: Summer Interfest (giao lưu văn hóa quốc tế), Hội Làng (lễ hội truyền thống dịp Tết), Open Day, Club Day, Music Fest, Tech Fest & Job Fair. Đây là 'trái tim' của đời sống sinh viên FPT.",
    welcomeHighlights: [
      {
        icon: "🌍",
        stat: "Quốc tế",
        label: "Summer Interfest",
        desc: "Ngày hội giao lưu văn hóa đa quốc gia",
      },
      {
        icon: "🏮",
        stat: "Hàng năm",
        label: "Hội Làng",
        desc: "Lễ hội truyền thống dịp Tết cổ truyền",
      },
      {
        icon: "🎤",
        stat: "Concert",
        label: "Music Fest",
        desc: "Đại nhạc hội với nghệ sĩ nổi tiếng",
      },
      {
        icon: "💼",
        stat: "100+ DN",
        label: "Tech Fest",
        desc: "Hội chợ công nghệ & tuyển dụng",
      },
    ],
    dailySchedule: [
      {
        time: "07:00 - 11:00",
        activity: "Tập luyện và thi đấu VOVINAM — Võ thuật truyền thống",
        emoji: "🥋",
        type: "activity",
      },
      {
        time: "14:00 - 17:00",
        activity: "Open Day / Club Day — Gian hàng CLB, trải nghiệm VR & AI",
        emoji: "🎪",
        type: "social",
      },
      {
        time: "16:00 - 18:00",
        activity: "Hoạt động CLB sinh viên ngoài trời",
        emoji: "🏃",
        type: "social",
      },
      {
        time: "19:00 - 22:00",
        activity: "Music Fest / Summer Interfest — Sân khấu chuyên nghiệp",
        emoji: "🎸",
        type: "event",
      },
    ],
    events: {
      title: "Các Sự Kiện Lớn Tại FPT Đà Nẵng",
      description:
        "Sân sự kiện là nơi diễn ra tất cả hoạt động văn hóa, nghệ thuật, công nghệ và kết nối cộng đồng lớn nhất của FPT University Đà Nẵng.",
      upcomingEvents: [
        {
          name: "🌍 SUMMER INTERFEST",
          date: "Mùa hè hàng năm",
          speaker: "Ngày hội giao lưu văn hóa quốc tế — SV trong nước & quốc tế",
          emoji: "🌍",
          color: "#2563eb",
        },
        {
          name: "🏮 HỘI LÀNG FPT",
          date: "Dịp Tết hàng năm",
          speaker: "Lễ hội truyền thống — Tái hiện làng quê Việt Nam",
          emoji: "🏮",
          color: "#e11d48",
        },
        {
          name: "🎤 MUSIC FEST / AI FEST",
          date: "Trong năm",
          speaker: "Concert nghệ sĩ nổi tiếng — Thu hút hàng chục ngàn người",
          emoji: "🎤",
          color: "#dc2626",
        },
        {
          name: "💼 TECH FEST & JOB FAIR",
          date: "Trong năm",
          speaker: "~100 doanh nghiệp tham gia — Tuyển dụng trực tiếp",
          emoji: "💼",
          color: "#16a34a",
        },
        {
          name: "🎓 OPEN DAY",
          date: "Định kỳ hàng tháng",
          speaker: "Ngày hội trải nghiệm trường cho THPT & phụ huynh",
          emoji: "🎓",
          color: "#f37021",
        },
        {
          name: "🎭 CLUB DAY / CARNIVAL DAY",
          date: "Thường xuyên",
          speaker: "Gian hàng CLB, cosplay, mini game, biểu diễn nghệ thuật",
          emoji: "🎭",
          color: "#8b5cf6",
        },
      ],
      hoiLang: {
        title: "🏮 Hội Làng FPT — Lễ Hội Truyền Thống",
        description:
          "Hội Làng là sự kiện văn hóa thường niên diễn ra dịp Tết, tái hiện không gian làng quê truyền thống Việt Nam ngay trong khuôn viên trường. Dành cho sinh viên, giảng viên và cán bộ — giữ gìn giá trị văn hóa và tạo không khí Tết cổ truyền ấm cúng.",
        activities: [
          {
            name: "Lễ khai hội — Trống chiêng & Rước lễ",
            emoji: "🥁",
            desc: "Nghi thức truyền thống trang trọng, mang đậm bản sắc dân tộc",
          },
          {
            name: "Chợ phiên — 15-20 gian hàng CLB",
            emoji: "🛍️",
            desc: "Ẩm thực, đồ thủ công, Ông Đồ, tò he, khu đổi quà",
          },
          {
            name: "Trò chơi dân gian",
            emoji: "🎮",
            desc: "Trải nghiệm Tết thật — kéo co, nhảy bao bố, đập niêu",
          },
          {
            name: "Hội diễn nghệ thuật",
            emoji: "🎭",
            desc: "Tiết mục văn nghệ sáng tạo, mang màu sắc cổ tích & truyền thống",
          },
          {
            name: "Vinh danh TOP 100 SV xuất sắc",
            emoji: "🏆",
            desc: "Kết hợp văn hóa + học tập, giải trí + ghi nhận thành tích",
          },
        ],
      },
      summerInterfest: {
        title: "🌍 Summer Interfest — Ngày Hội Giao Lưu Văn Hóa Quốc Tế",
        description:
          "Summer Interfest là ngày hội giao lưu văn hóa quốc tế do FPT Education tổ chức tại campus Đà Nẵng, quy tụ đông đảo sinh viên trong nước và quốc tế.",
        activities: [
          {
            name: "Gian hàng ẩm thực đa quốc gia",
            emoji: "🍲",
            desc: "Món ăn truyền thống, trang phục dân tộc, văn hóa đặc trưng từng nước",
          },
          {
            name: "Biểu diễn nghệ thuật quốc tế",
            emoji: "🎶",
            desc: "Âm nhạc, nhảy múa, trình diễn văn hóa trên sân khấu mở",
          },
          {
            name: "Giao lưu & kết nối quốc tế",
            emoji: "🤝",
            desc: "Làm quen, chia sẻ văn hóa, kết bạn quốc tế",
          },
        ],
      },
      highlights: [
        "Summer Interfest quy tụ sinh viên từ nhiều quốc gia — bức tranh đa sắc màu",
        "Hội Làng tái hiện chợ quê ngày Tết với 15-20 gian hàng CLB",
        "Music Fest thu hút hàng chục ngàn người — concert nghệ sĩ hàng đầu",
        "Tech Fest & Job Fair có ~100 doanh nghiệp tuyển dụng trực tiếp",
        "Open Day giúp học sinh THPT trải nghiệm VR, robot, AI trước khi vào ĐH",
      ],
    },
    features: [
      {
        icon: "🌍",
        title: "Summer Interfest",
        desc: "Ngày hội giao lưu văn hóa quốc tế — ẩm thực & nghệ thuật đa quốc gia",
      },
      {
        icon: "🏮",
        title: "Hội Làng FPT",
        desc: "Lễ hội truyền thống dịp Tết — chợ phiên, trò chơi dân gian, vinh danh SV",
      },
      {
        icon: "🎤",
        title: "Music Fest & AI Fest",
        desc: "Đại nhạc hội với nghệ sĩ nổi tiếng — sân khấu âm thanh, ánh sáng chuyên nghiệp",
      },
      {
        icon: "💼",
        title: "Tech Fest & Job Fair",
        desc: "Gặp gỡ ~100 doanh nghiệp, tuyển dụng trực tiếp, trải nghiệm công nghệ mới",
      },
      {
        icon: "🎓",
        title: "Open Day",
        desc: "Ngày hội trải nghiệm trường — tham quan campus, tư vấn ngành học, học bổng",
      },
      {
        icon: "🎭",
        title: "Club Day & Carnival",
        desc: "Gian hàng CLB, mini game, cosplay, biểu diễn — phát triển kỹ năng mềm",
      },
    ],
    funFacts: [
      "Summer Interfest tạo nên 'bức tranh đa sắc màu' với sinh viên từ nhiều quốc gia",
      "Hội Làng FPT có gian Ông Đồ, tò he, khu đổi quà — không khí Tết đặc sắc",
      "Music Fest thu hút hàng chục ngàn người tham gia — không khí bùng nổ",
      "Tech Fest & Job Fair có ~100 doanh nghiệp tuyển dụng intern & full-time",
      "Open Day giúp THPT trải nghiệm VR, robot, AI trước khi vào đại học",
    ],
  },
};
