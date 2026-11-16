// packages/design-tokens/assets-manifest.ts
// Source of Truth: Assets/README.md (Hessekhub Brand Assets)

export const BRAND_LOGOS = {
  ink: {
    path: "/assets/Logos/hessekhub-logo-black.png",
    alt: "لوگوتایپ حس خوب — کافهبوتیک سلامتی",
    minWidthPx: 88,
  },
  white: {
    path: "/assets/Logos/hessekhub-logo-white.png",
    alt: "لوگوتایپ سفید حس خوب — کافهبوتیک سلامتی",
    minWidthPx: 88,
  },
} as const;

export type BrandGlyphId =
  | "plate"
  | "apple-core"
  | "leaf"
  | "dumbbell-curved"
  | "water-drop"
  | "bowl-cutout"
  | "avocado"
  | "brand-hourglass"
  | "quarter-circle-corner"
  | "plum-squircle"
  | "tennis-ball"
  | "heart"
  | "target"
  | "banana"
  | "broccoli"
  | "salad-bowl"
  | "water-bottle"
  | "milestone-flag"
  | "bicep-arm";

export interface BrandGlyphMeta {
  id: BrandGlyphId;
  code: string;
  fileName: string;
  path: string;
  faTitle: string;
  enTitle: string;
  semanticColorToken: string;
  category: "nutrition" | "fitness" | "health" | "brand" | "motivation";
  usageContext: string;
}

export const BRAND_GLYPHS: Record<BrandGlyphId, BrandGlyphMeta> = {
  plate: {
    id: "plate",
    code: "01",
    fileName: "glyph-01-plate-n.png",
    path: "/assets/Brand-Glyphs/glyph-01-plate-n.png",
    faTitle: "بشقاب با حلقه داخلی",
    enTitle: "Dining Plate",
    semanticColorToken: "var(--hk-ice-200)",
    category: "nutrition",
    usageContext: "کنترل وعده غذایی، راهنمای بشقاب خانگی، حالت خالی منو",
  },
  "apple-core": {
    id: "apple-core",
    code: "02",
    fileName: "glyph-02-apple-core-n.png",
    path: "/assets/Brand-Glyphs/glyph-02-apple-core-n.png",
    faTitle: "ته سیب / تناسب اندام",
    enTitle: "Apple Core / Waist",
    semanticColorToken: "var(--hk-vermilion-600)",
    category: "nutrition",
    usageContext: "میانوعده سالم، پایش سایز دور شکم و تناسب",
  },
  leaf: {
    id: "leaf",
    code: "03",
    fileName: "glyph-03-leaf-n.png",
    path: "/assets/Brand-Glyphs/glyph-03-leaf-n.png",
    faTitle: "برگ ارگانیک",
    enTitle: "Fresh Leaf",
    semanticColorToken: "var(--hk-lime-200)",
    category: "nutrition",
    usageContext: "تازگی مواد اولیه ارگانیک و وعدههای گیاهی",
  },
  "dumbbell-curved": {
    id: "dumbbell-curved",
    code: "04",
    fileName: "glyph-04-dumbbell-curved-n.png",
    path: "/assets/Brand-Glyphs/glyph-04-dumbbell-curved-n.png",
    faTitle: "دمبل خمیده",
    enTitle: "Curved Dumbbell",
    semanticColorToken: "var(--hk-vermilion-600)",
    category: "fitness",
    usageContext: "برنامه ورزشکاران، تمرینات قدرتی و فیتنس",
  },
  "water-drop": {
    id: "water-drop",
    code: "05",
    fileName: "glyph-05-water-drop-n.png",
    path: "/assets/Brand-Glyphs/glyph-05-water-drop-n.png",
    faTitle: "قطره آب",
    enTitle: "Water Droplet",
    semanticColorToken: "var(--hk-ice-200)",
    category: "health",
    usageContext: "هیدراتاسیون و یادآور مصرف آب روزانه",
  },
  "bowl-cutout": {
    id: "bowl-cutout",
    code: "06",
    fileName: "glyph-06-bowl-cutout-n.png",
    path: "/assets/Brand-Glyphs/glyph-06-bowl-cutout-n.png",
    faTitle: "کاسه برشخورده",
    enTitle: "Cutout Dessert Bowl",
    semanticColorToken: "var(--hk-coral-500)",
    category: "nutrition",
    usageContext: "دسرهای رژیمی ویژه، میانوعدههای پروتئینی و چیتدی",
  },
  avocado: {
    id: "avocado",
    code: "07",
    fileName: "glyph-07-avocado-n.png",
    path: "/assets/Brand-Glyphs/glyph-07-avocado-n.png",
    faTitle: "قاچ آووکادو با هسته",
    enTitle: "Avocado Slice",
    semanticColorToken: "var(--hk-green-600)",
    category: "nutrition",
    usageContext: "چربیهای مفید، سالادهای تخصصی و سوپرفودها",
  },
  "brand-hourglass": {
    id: "brand-hourglass",
    code: "08",
    fileName: "glyph-08-brand-hourglass-n.png",
    path: "/assets/Brand-Glyphs/glyph-08-brand-hourglass-n.png",
    faTitle: "ساعتشنی (نشان برند)",
    enTitle: "Brand Hourglass",
    semanticColorToken: "var(--hk-blue-700)",
    category: "brand",
    usageContext: "نشان مرکزی برند، مدیریت زمان و گذار بین فازهای برنامه",
  },
  "quarter-circle-corner": {
    id: "quarter-circle-corner",
    code: "09",
    fileName: "glyph-09-quarter-circle-corner-n.png",
    path: "/assets/Brand-Glyphs/glyph-09-quarter-circle-corner-n.png",
    faTitle: "ربعدایره گوشه",
    enTitle: "Frame Quarter-Circle",
    semanticColorToken: "var(--hk-blue-700)",
    category: "brand",
    usageContext: "کادربندی کارتهای ویژه و تزئین حاشیه اسلایدها",
  },
  "plum-squircle": {
    id: "plum-squircle",
    code: "10",
    fileName: "glyph-10-plum-squircle-n.png",
    path: "/assets/Brand-Glyphs/glyph-10-plum-squircle-n.png",
    faTitle: "بالشتک اسکویرکل / آلو",
    enTitle: "Plum Squircle / Berry",
    semanticColorToken: "var(--hk-plum-700)",
    category: "brand",
    usageContext: "باشگاه مشتریان VIP، اشتراکهای ویژه و حس لوکس",
  },
  "tennis-ball": {
    id: "tennis-ball",
    code: "11",
    fileName: "glyph-11-tennis-ball-n.png",
    path: "/assets/Brand-Glyphs/glyph-11-tennis-ball-n.png",
    faTitle: "توپ تنیس",
    enTitle: "Tennis Ball",
    semanticColorToken: "var(--hk-lime-200)",
    category: "fitness",
    usageContext: "فعالیت هوازی، تحرک روزانه و انرژی",
  },
  heart: {
    id: "heart",
    code: "12",
    fileName: "glyph-12-heart-n.png",
    path: "/assets/Brand-Glyphs/glyph-12-heart-n.png",
    faTitle: "قلب سلامت",
    enTitle: "Vital Heart",
    semanticColorToken: "var(--hk-vermilion-600)",
    category: "health",
    usageContext: "سلامت پایدار، فاز نگهداری و علاقهمندیهای کاربر",
  },
  target: {
    id: "target",
    code: "13",
    fileName: "glyph-13-target-n.png",
    path: "/assets/Brand-Glyphs/glyph-13-target-n.png",
    faTitle: "سیبل هدف متحدالمرکز",
    enTitle: "Bullseye Target",
    semanticColorToken: "var(--hk-vermilion-600)",
    category: "motivation",
    usageContext: "کارت هدف برنامه، رسیدن به وزن و سایز مطلوب",
  },
  banana: {
    id: "banana",
    code: "14",
    fileName: "glyph-14-banana-n.png",
    path: "/assets/Brand-Glyphs/glyph-14-banana-n.png",
    faTitle: "موز انرژیبخش",
    enTitle: "Energy Banana",
    semanticColorToken: "var(--hk-yellow-200)",
    category: "nutrition",
    usageContext: "میوه تازه، پتاسیم و سوخت قبل از تمرین",
  },
  broccoli: {
    id: "broccoli",
    code: "15",
    fileName: "glyph-15-broccoli-n.png",
    path: "/assets/Brand-Glyphs/glyph-15-broccoli-n.png",
    faTitle: "کلم بروکلی",
    enTitle: "Broccoli Crown",
    semanticColorToken: "var(--hk-green-600)",
    category: "nutrition",
    usageContext: "سبزیجات تازه، فیبر و ریزمغذیها",
  },
  "salad-bowl": {
    id: "salad-bowl",
    code: "16",
    fileName: "glyph-16-salad-bowl-n.png",
    path: "/assets/Brand-Glyphs/glyph-16-salad-bowl-n.png",
    faTitle: "کاسه سالاد پایهدار",
    enTitle: "Salad Bowl",
    semanticColorToken: "var(--hk-orange-500)",
    category: "nutrition",
    usageContext: "وعدههای اصلی روزانه و منوی سالاد کافهبوتیک",
  },
  "water-bottle": {
    id: "water-bottle",
    code: "17",
    fileName: "glyph-17-water-bottle-n.png",
    path: "/assets/Brand-Glyphs/glyph-17-water-bottle-n.png",
    faTitle: "بطری ورزشی / شیکر",
    enTitle: "Water Shaker Bottle",
    semanticColorToken: "var(--hk-ice-200)",
    category: "fitness",
    usageContext: "نوشیدنیهای تخصصی کافه، دتاکس و شیک پروتئین",
  },
  "milestone-flag": {
    id: "milestone-flag",
    code: "18",
    fileName: "glyph-18-milestone-flag-n.png",
    path: "/assets/Brand-Glyphs/glyph-18-milestone-flag-n.png",
    faTitle: "پرچم مایلاستون",
    enTitle: "Milestone Flag",
    semanticColorToken: "var(--hk-orange-500)",
    category: "motivation",
    usageContext: "نقاط عطف مسیر، جشن ثبت موفق چکاین هفتگی",
  },
  "bicep-arm": {
    id: "bicep-arm",
    code: "19",
    fileName: "glyph-19-bicep-arm-n.png",
    path: "/assets/Brand-Glyphs/glyph-19-bicep-arm-n.png",
    faTitle: "بازوی ورزشکار",
    enTitle: "Flexed Bicep",
    semanticColorToken: "var(--hk-tan-500)",
    category: "fitness",
    usageContext: "انضباط، عضلهسازی و قدرت بدنی",
  },
};
