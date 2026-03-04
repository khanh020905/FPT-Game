/**
 * Shop Items Catalog
 * Items purchasable from the ShopSystem
 */

export const ITEMS = {
  // ===== HEALTH ITEMS =====
  "thuoc-cam": {
    id: "thuoc-cam",
    name: "Thuốc Cảm",
    emoji: "💊",
    description: "Giảm triệu chứng cảm cúm, phục hồi sức khỏe.",
    price: 15000,
    effects: { health: 25 },
    category: "health",
    stackable: true,
    maxStack: 5,
  },
  "thuoc-dau-dau": {
    id: "thuoc-dau-dau",
    name: "Thuốc Đau Đầu",
    emoji: "🤕",
    description: "Giảm đau đầu sau những giờ code marathon.",
    price: 10000,
    effects: { health: 15, intelligence: 3 },
    category: "health",
    stackable: true,
    maxStack: 5,
  },
  "vitamin-c": {
    id: "vitamin-c",
    name: "Vitamin C",
    emoji: "🍊",
    description: "Tăng sức đề kháng, phòng ngừa bệnh.",
    price: 20000,
    effects: { health: 10 },
    category: "health",
    stackable: true,
    maxStack: 3,
  },
  "cafe-sua": {
    id: "cafe-sua",
    name: "Cà Phê Sữa",
    emoji: "☕",
    description: "Tỉnh táo hơn, tăng trí thông minh tạm thời.",
    price: 18000,
    effects: { intelligence: 8, health: -3 },
    category: "consumable",
    stackable: true,
    maxStack: 10,
  },
  "tra-da": {
    id: "tra-da",
    name: "Trà Đá",
    emoji: "🧊",
    description: "Giải khát đơn giản mà hiệu quả.",
    price: 5000,
    effects: { health: 5, confidence: 2 },
    category: "consumable",
    stackable: true,
    maxStack: 10,
  },

  // ===== PROJECT MATERIALS =====
  "usb-drive": {
    id: "usb-drive",
    name: "USB Drive",
    emoji: "💾",
    description: "Lưu trữ project, tránh mất dữ liệu.",
    price: 80000,
    effects: { progress: 5 },
    category: "material",
    stackable: false,
  },
  "sach-tham-khao": {
    id: "sach-tham-khao",
    name: "Sách Tham Khảo",
    emoji: "📕",
    description: "Sách chuyên ngành giúp học tập hiệu quả.",
    price: 120000,
    effects: { intelligence: 15 },
    category: "material",
    stackable: false,
  },
  "laptop-charger": {
    id: "laptop-charger",
    name: "Sạc Laptop Dự Phòng",
    emoji: "🔌",
    description: "Không còn lo hết pin giữa chừng.",
    price: 200000,
    effects: { confidence: 10 },
    category: "material",
    stackable: false,
  },
  "ao-fpt": {
    id: "ao-fpt",
    name: "Áo FPT University",
    emoji: "👕",
    description: "Áo đồng phục chính hãng, tăng tự tin.",
    price: 150000,
    effects: { confidence: 20 },
    category: "material",
    stackable: false,
  },

  // ===== SPECIAL =====
  "phi-hoc-lai": {
    id: "phi-hoc-lai",
    name: "Phí Học Lại",
    emoji: "📋",
    description: "Phí đăng ký học lại môn (khi progress < 70%)",
    price: 1500000,
    effects: { progress: 20 },
    category: "retake",
    stackable: false,
    requiresLowProgress: true,
  },
};

export const ITEM_LIST = Object.values(ITEMS);
export const ITEM_CATEGORIES = {
  health: { name: "Sức Khỏe", emoji: "💊" },
  consumable: { name: "Đồ Uống", emoji: "🥤" },
  material: { name: "Vật Liệu", emoji: "📦" },
  retake: { name: "Học Phí", emoji: "📋" },
};
