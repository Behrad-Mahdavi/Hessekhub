# سیستم دیزاین پلتفرم حس خوب (DESIGN_SYSTEM.md)

**نسخه ۲.۰ (ممیزی و نهایی‌شده) · آبان ۱۴۰۵ · وضعیت: مرجع رسمی تیم محصول، طراحی و فنی**

---

## ۰. فلسفه و هدف این سند

این سند منبع حقیقت واحد (Single Source of Truth) و زبان مشترک میان **برند** و **محصول دیجیتال و فیزیکی** حس خوب است: اپ مشتری (PWA)، پنل کارشناس تغذیه، پنل عملیات آشپزخانه، کاکپیت محصول، وب‌سایت، کافه‌بوتیک و لیبل‌های بسته‌بندی. هر تصمیم بصری در این سند بر پایه اصول اقتصاد رفتاری، مهندسی رابط کاربری و دسترس‌پذیری (WCAG 2.2 AA) بنا شده و هر مقدار قابل‌اندازه‌گیری به یک **توکن (`--hk-*`)** تبدیل شده است.

### برچسب‌های ردیابی منبع
- **[BB]** استخراج‌شده از برندبوک (مهر ۱۴۰۳): پالت پایه، لوگو، گلیف‌ها، عکاسی، لحن کلامی.
- **[HK+]** مهندسی‌شده برای مقیاس‌پذیری محصول دیجیتال: مقیاس‌های OKLab، توکن‌های معنایی، کامپوننت‌ها، الگوهای دامنه و دسترس‌پذیری.

### قواعد بنیادین منبع (Source Hygiene)
1. **مرجع رنگ:** کدهای هگز پایه در فضای ادراکی OKLab کالیبره شده‌اند. پیش از چاپ افست بسته‌بندی، پالت با پروفایل CMYK چاپخانه تطبیق داده شود.
2. **مرجع لوگو:** تنها فایل وکتور اصلی لوگوتایپ «حس خوب» و نشان «ساعت‌شنی/دمبل» ملاک است (صفحات قالب‌های متفرقه در PDF قدیمی برندبوک فاقد اعتبارند).
3. **مرجع تایپوگرافی:** سیستم از معماری دوفونتی کنترل‌شده استفاده می‌کند: **`IRANSansFaNum`** برای تمام متون فارسی و ۱۰۰٪ ارقام در کل پلتفرم، و **`Montserrat-Latin`** منحصراً برای حروف الفبای انگلیسی (کدها، شناسه‌ها و اصطلاحات لاتین).

---

## ۱. اصول طراحی (Design Principles) [HK+]

برندبوک استراتژی را این‌گونه تعریف می‌کند: *«هویت لاکچری اما صمیمی؛ فرم‌ها همراهانه اما جدی؛ هویت بصری ماجراجو و هیجان‌انگیز»*. در محصولی که با داده سلامت و عملیات روزانه سر و کار دارد، این ۷ اصل تنش میان «شادی برند» و «جدیت داده» را حل می‌کنند:

### ۱.۱ لاکچری یعنی آرامش و پیش‌دستی، نه تزئینات اضافه
تجربه لوکس یعنی اصطکاک کم، فضای خالی سخاوتمندانه (Whitespace)، سلسله‌مراتب واضح و حس «شناخته‌شدن کاربر». هیچ گرادیان تزئینی، سایه سنگین یا شلوغی بصری روی کارت‌ها و فرم‌ها مجاز نیست.

### ۱.۲ جدی در داده، شاد در لحظه (قاعده ۸۰/۱۵/۵)
اعداد، نمودارها، جداول و فرم‌ها **خنثی، تمیز و دقیق** هستند:
- **۸۰٪ سطح صفحه:** خنثی گرم (`bg.canvas`, `bg.surface`, `bg.subtle`).
- **۱۵٪ ساختار و اقدام:** آبی برند (`primary`) و متن قوی (`ink`).
- **۵٪ لحظه‌های برند:** رنگ‌های پرشور و گلیف‌ها فقط در لحظه‌های عاطفی (خوش‌آمدگویی، جشن نقطه عطف، حالت خالی، کارت هدف).
- **محدودیت لهجه:** در هر صفحه حداکثر **۲ رنگ لهجه برندی (Brand Accents)** مجاز است. *(تبصره: رنگ‌های وضعیت معنایی داده مانند `success`, `warning`, `danger` در جداول پنل کارشناس و کاکپیت مشمول محدودیت لهجه تزئینی نیستند، اما باید به صورت نشان‌های فشرده استفاده شوند).*

### ۱.۳ یک صفحه، یک اقدام اصلی (Hick's Law)
هر نما یا شیت تنها **یک دکمه اقدام اصلی (`primary.fill`)** دارد. اگر کاربر مجبور به انتخاب هم‌وزن میان سه دکمه اصلی باشد، طراحی صفحه رد می‌شود.

### ۱.۴ معنا و استقلال از رنگ
قرمز فقط برای خطر سیستم و هشدار ایمنی است؛ سبز فقط برای موفقیت و سلامت. رنگ هرگز تنها حامل معنا نیست و همواره با آیکون، شکل خط (پر/خط‌چین) یا برچسب متنی همراه می‌شود.

### ۱.۵ بدن انسان‌ها محترم است (Zero Body-Shaming)
رابط کاربری هرگز مشتری را بابت نوسان وزن خجالت‌زده یا سرزنش نمی‌کند: بالا رفتن وزن یا استپ وزنی هرگز قرمز نمی‌شود، غذاها به «خوب و بد» تقسیم نمی‌شوند، و پیام‌های سیستم همواره علمی، محترمانه و راهگشا هستند.

### ۱.۶ فارسی اول و RTL اصیل
طراحی از راست‌به‌چپ (RTL)، خط فارسی، تقویم شمسی و ارقام فارسی آغاز می‌شود. تمام ویژگی‌های چیدمان در کد با Logical Properties (`ms-*`, `pe-*`, `inset-inline-start`) نوشته می‌شوند.

### ۱.۷ پیش‌دستی و قابلیت بازگشت (Proactivity & Undo)
رابط کاربری پیش از خطای کاربر به او کمک می‌کند (نمایش وزن هفته قبل زیر فیلد چک‌این) و پس از هر تغییر مهم (مثل تعویض گزینه غذا)، امکان **بازگردانی فوری (Undo)** فراهم می‌سازد.

---

## ۲. دارایی‌های هویت برند [BB + HK+]

### ۲.۱ لوگو و نشان
- **لوگوتایپ:** نوشتار دست‌نویس «حس خوب» با سه ویژگی ذاتی **Happy** (لبخند)، **Movement** (حرکت مداری) و **Flow** (جریان موجی).
- **نشان (Brandmark):** فرم هندسی آبی (`#264FA3`) متشکل از دو نیمه ساعت‌شنی/دمبل.

| قاعده فنی لوگو | مقدار استاندارد |
|---|---|
| حریم امن (Clear Space) | حداقل نصف ارتفاع نشان آبی در هر چهار جهت |
| حداقل عرض لوگوتایپ دیجیتال | `88px` (زیر این اندازه فقط از نشان آبی استفاده شود) |
| حداقل ابعاد نشان تنها | `24×24px` |
| نسخه‌های مجاز | رنگی استاندارد، تک‌رنگ `ink (#100F0D)`، تک‌رنگ معکوس `white (#FFFFFF)` |
| آیکون نصب PWA | نشان آبی روی پس‌زمینه `bg.canvas` یا `ice-100` با حاشیه امن ۲۰٪ (`purpose: "any maskable"`) |
| موارد ممنوع | تغییر نسبت طول و عرض، چرخاندن، اعمال سایه (`drop-shadow`)، خط دور (`stroke`)، یا قرارگیری روی عکس بدون لایه `scrim` |

### ۲.۲ گلیف‌های ۱۷گانه برند (Brand Glyphs)
گلیف‌ها اشکال تخت هندسی هستند که **فقط در لحظه‌های عاطفی، حالت‌های خالی (Empty States)، جشن نقاط عطف و بسته‌بندی** به کار می‌روند. **استفاده از گلیف‌ها به عنوان آیکون دکمه‌ها یا ناوبری اکیداً ممنوع است.**

| گلیف | رنگ ثابت توکن | کاربرد معنایی در محصول |
|---|---|---|
| ساعت‌شنی (جزء نشان) | `blue-700 (#264FA3)` | زمان، فازهای برنامه، در حال آماده‌سازی |
| هدف (دایره‌های متحدالمرکز) | `vermilion-600 (#D93C27)` | هدف برنامه مشتری (کارت هدف) |
| پرچم | `orange-500 (#E26934)` | نقطه عطف (Milestone) و پایان فاز |
| بشقاب با حلقه داخلی | `ice-200 (#B3DEE4)` | وعده غذایی اصلی |
| کاسه | `orange-500 (#E26934)` | سالاد و وعده‌های کاسه‌ای |
| کاسه برش‌خورده | `plum-700 (#9B227B)` | دسر، چیت‌دی و خوراکی ویژه |
| ته سیب / موز / بروکلی / برگ | `vermilion-600` / `yellow-200` / `green-600` / `lime-200` | میان‌وعده، میوه، سبزیجات، تازگی |
| قطره / بطری | `ice-200 (#B3DEE4)` | هیدراتاسیون و نوشیدنی‌های کافه |
| دمبل / توپ تنیس / بازوی ورزشکار | `plum-700` / `lime-200` / `tan-500` | فعالیت ورزشی، برنامه ورزشکاران، دیسیپلین |
| قلب | `vermilion-600 (#D93C27)` | سلامت پایدار، وفاداری و باشگاه مشتریان |
| ربع‌دایره (گوشه) | `blue-700 (#264FA3)` | قاب‌بندی تزئینی |

**قواعد ترکیب و پترن گلیف‌ها:**
- حداقل اندازه رندر هر گلیف: `24×24px` (شبکه طراحی `64×64px`).
- در صفحات عملکردی (فرم، داشبورد، جدول): حداکثر ۱۰٪ مساحت در حاشیه‌ها؛ در صفحات عاطفی (جشن، خوش‌آمد): حداکثر ۳۵٪ مساحت با حداکثر ۳ رنگ و فاصله حداقل `1.5x` عرض گلیف.

### ۲.۳ استاندارد عکاسی و رسانه
- **زاویه و نور:** نمای مستقیم از بالا (Flat-lay ۹۰ درجه) برای ظروف پکیج، یا زاویه ۴۵ درجه با نور طبیعی روشن روی سطح سفید مات یا چوب گرم.
- **اصالت:** رنگ‌های طبیعی مواد غذایی تازه بدون فیلترهای مصنوعی؛ حضور دست یا انسان در کادر برای القای حس «همراهی».
- **الزام فنی و دسترس‌پذیری:** فرمت تحویلی `AVIF`/`WebP`، نسبت‌های استاندارد (`1:1`, `4:3`, `16:9`)، و الزام به درج `alt` توصیفی دقیق برای تمام تصاویر منو (مثلاً: *«سینه مرغ گریل‌شده با کینوا، کلم بروکلی و پنیر فتا»*).

---

## ۳. سیستم رنگ و کنتراست (Color System) [BB + HK+]

### ۳.۱ مقیاس‌های تونال اولیه (Primitive Scales — OKLab)
پالت ۱۲ رنگه برند در فضای ادراکی OKLab به ۱۰ پله (`50` تا `900`) بسط داده شده است. پله‌های دارای علامت `★` رنگ لنگر برندبوک هستند:

| پله | Blue (Primary) | Ice | Plum (Luxe) | Green (Success) | Lime | Yellow (Warn) | Tan (Cafe) | Orange (Accent) | Coral (Notify) | Vermilion (Danger) | Neutral (Warm) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **50** | `#F3F7FF` | `#E7FBFE` | `#FFF3FA` | `#ECFBF0` | `#F3FAEA` | `#FAF8E7` | `#FFF5EA` | `#FFF4F0` | `#FFF4F3` | `#FFF4F2` | `#FBFAF7` |
| **100** | `#D0DFF9` | `#CDEDF1` | `#F5D4E8` | `#D0E9D6` | `#D6EEAD` | `#F6EA9D` | `#F4E0CB` | `#FFD8C9` | `#FFD3D1` | `#FFD7CF` | `#F5F3EF` |
| **200** | `#B2C6EB` | `#B3DEE4`★ | `#E8B8D6` | `#B4D6BC` | `#B9E169`★ | `#F3DA31`★ | `#E6CCAF` | `#FBBDA5` | `#FEB1AE` | `#FDBAAD` | `#EAE7E2` |
| **300** | `#95AEDD` | `#9AC2C7` | `#DA9CC3` | `#99C4A3` | `#A0C555` | `#D5BD13` | `#D9B894` | `#F4A281` | `#F68F8E` | `#F69D8D` | `#D7D4CD` |
| **400** | `#7896CF` | `#82A6AB` | `#CB80B1` | `#7DB28B` | `#88A941` | `#B6A20C` | `#CBA578` | `#EC865D` | `#ED6C6E` | `#EE806D` | `#BBB7B0` |
| **500** | `#5C7FC1` | `#6A8B90` | `#BC639F` | `#61A073` | `#708E2E` | `#988702` | `#BE915C`★ | `#E26934`★ | `#E2444F`★ | `#E4614C` | `#8F8C85` |
| **600** | `#4167B2` | `#537175` | `#AC458D` | `#438E5B`★ | `#5A7419` | `#7C6D00` | `#9A7345` | `#BA5121` | `#BC313C` | `#D93C27`★ | `#6B6963` |
| **700** | `#264FA3`★ | `#3E585C` | `#9B227B`★ | `#2D6D42` | `#445B00` | `#605401` | `#77562E` | `#93390C` | `#971E2B` | `#AA2514` | `#4A4742` |
| **800** | `#1A3978` | `#294144` | `#6F1357` | `#194D2B` | `#314300` | `#463D00` | `#563B19` | `#6D2400` | `#73091A` | `#7C0E02` | `#2D2B27` |
| **900** | `#0E2350` | `#152A2D` | `#460535` | `#052F16` | `#1F2C00` | `#2D2700` | `#372104` | `#461400` | `#4F000C` | `#4F0200` | `#1B1916` |

*(به همراه دو رنگ قطبی: `ink: #100F0D` و `white: #FFFFFF`).*

### ۳.۲ جدول کامل توکن‌های معنایی (Semantic Tokens — Light & Dark)
کامپوننت‌ها **صرفاً** مجاز به استفاده از این توکن‌ها هستند:

| توکن معنایی | حالت روشن (Light) | حالت تاریک (Dark) | کنتراست و کاربرد |
|---|---|---|---|
| `bg.canvas` | `neutral-50 (#FBFAF7)` | `ink (#100F0D)` | پس‌زمینه اصلی صفحه |
| `bg.surface` | `white (#FFFFFF)` | `neutral-900 (#1B1916)` | سطح کارت، شیت، پنل، جدول |
| `bg.surface-hover` | `neutral-100 (#F5F3EF)` | `neutral-800 (#2D2B27)` | هاور روی کارت، ردیف جدول، دکمه ثانویه/شبح |
| `bg.surface-active` | `neutral-200 (#EAE7E2)` | `neutral-700 (#4A4742)` | حالت فشرده (Active) سطح و دکمه ثانویه |
| `bg.subtle` | `neutral-100 (#F5F3EF)` | `neutral-800 (#2D2B27)` | پس‌زمینه کاکپیت، ردیف‌های یک‌درمیان، بخش ثانویه |
| `bg.sunken` | `neutral-200 (#EAE7E2)` | `neutral-800 (#2D2B27)` | زمینه اسلایدر، تراك نوار پیشرفت، ورودی Read-only |
| `bg.calm` | `ice-100 (#CDEDF1)` | `ice-900 (#152A2D)` | کارت‌های پیام علمی کارشناس و آنبوردینگ |
| `bg.disabled` | `neutral-200 (#EAE7E2)` | `neutral-800 (#2D2B27)` | پس‌زمینه کنترل‌ها و دکمه‌های غیرفعال |
| `bg.backdrop` | `rgba(16, 15, 13, 0.56)` | `rgba(0, 0, 0, 0.72)` | لایه تاریک پشت Bottom Sheet و Modal |
| `border.subtle` | `neutral-200 (#EAE7E2)` | `neutral-800 (#2D2B27)` | خطوط جداکننده داخلی جدول و لیست |
| `border.default` | `neutral-300 (#D7D4CD)` | `neutral-700 (#4A4742)` | حاشیه کارت‌ها و باکس‌ها |
| `border.control` | `neutral-500 (#8F8C85)` | `neutral-400 (#BBB7B0)` | حاشیه فیلدهای ورودی و دکمه ثانویه (کنتراست ≥ 3.36:1) |
| `border.disabled` | `neutral-300 (#D7D4CD)` | `neutral-700 (#4A4742)` | حاشیه فیلد غیرفعال |
| `text.strong` | `ink (#100F0D)` | `neutral-50 (#FBFAF7)` | تیترها و اعداد کلیدی (کنتراست 18.35:1) |
| `text.default` | `neutral-800 (#2D2B27)` | `neutral-100 (#F5F3EF)` | متن بدنه اصلی (کنتراست ≥ 14.13:1) |
| `text.muted` | `neutral-700 (#4A4742)` | `neutral-300 (#D7D4CD)` | متن ثانویه و زیرنویس ماکروها (کنتراست ≥ 9.25:1) |
| `text.subtle` | `neutral-600 (#6B6963)` | `neutral-400 (#BBB7B0)` | Placeholder، واحد فیلد، زمان (کنتراست ≥ 4.95:1) |
| `text.disabled` | `neutral-500 (#8F8C85)` | `neutral-600 (#6B6963)` | متن کنترل غیرفعال |
| `text.inverse` | `white (#FFFFFF)` | `ink (#100F0D)` | متن روی سطوح معکوس (Tooltip) |
| `primary.fill` | `blue-700 (#264FA3)` | `blue-300 (#95AEDD)` | پرکننده دکمه اصلی و کنترل فعال |
| `primary.fill-hover` | `blue-800 (#1A3978)` | `blue-200 (#B2C6EB)` | هاور دکمه اصلی |
| `primary.fill-active`| `blue-900 (#0E2350)` | `blue-100 (#D0DFF9)` | فشردن دکمه اصلی |
| `primary.on` | `white (#FFFFFF)` | `ink (#100F0D)` | متن روی `primary.fill` (کنتراست ≥ 7.69:1) |
| `primary.subtle` | `blue-50 (#F3F7FF)` | `blue-900 (#0E2350)` | پس‌زمینه چیپ انتخاب‌شده و دکمه Tonal |
| `primary.subtle-hover`| `blue-100 (#D0DFF9)` | `blue-800 (#1A3978)` | هاور دکمه Tonal و چیپ فعال |
| `primary.text` | `blue-700 (#264FA3)` | `blue-300 (#95AEDD)` | لینک، متن دکمه Tonal، تب فعال (کنتراست ≥ 7.17:1) |
| `focus.ring` | `blue-700 (#264FA3)` | `blue-300 (#95AEDD)` | حلقه فوکوس کیبورد (`2px solid` + `2px offset`) |
| `success.fill` | `green-700 (#2D6D42)` | `green-300 (#99C4A3)` | پرکننده وضعیت موفق (با متن `primary.on`) |
| `success.text` | `green-700 (#2D6D42)` | `green-300 (#99C4A3)` | متن و آیکون موفقیت (کنتراست ≥ 5.81:1) |
| `success.subtle` | `green-50 (#ECFBF0)` | `green-900 (#052F16)` | پس‌زمینه بنر و نشان موفقیت |
| `warning.fill` | `yellow-200 (#F3DA31)` | `yellow-200 (#F3DA31)` | پرکننده هشدار (متن روی آن همیشه `ink` است) |
| `warning.text` | `yellow-800 (#463D00)` | `yellow-200 (#F3DA31)` | متن و آیکون هشدار (کنتراست ≥ 8.91:1) |
| `warning.subtle` | `yellow-100 (#F6EA9D)` | `yellow-900 (#2D2700)` | پس‌زمینه بنر و نشان هشدار / چیپ آلرژی |
| `danger.fill` | `vermilion-700 (#AA2514)`| `vermilion-300 (#F69D8D)`| دکمه حذف و خطر |
| `danger.fill-hover` | `vermilion-800 (#7C0E02)`| `vermilion-200 (#FDBAAD)`| هاور دکمه خطر |
| `danger.text` | `vermilion-700 (#AA2514)`| `vermilion-300 (#F69D8D)`| پیام خطای فرم و پرچم پزشکی (کنتراست ≥ 6.53:1) |
| `danger.subtle` | `vermilion-50 (#FFF4F2)` | `vermilion-900 (#4F0200)`| پس‌زمینه بنر خطا و فیلد دارای خطا |
| `info.text` | `blue-800 (#1A3978)` | `blue-200 (#B2C6EB)` | متن اطلاعات و راهنما |
| `info.subtle` | `ice-100 (#CDEDF1)` | `ice-900 (#152A2D)` | پس‌زمینه بنر و نشان اطلاعات |
| `accent.fill` | `orange-500 (#E26934)` | `orange-400 (#EC865D)` | دکمه نقطه عطف، چیت‌دی و کافه |
| `accent.fill-hover` | `orange-600 (#BA5121)` | `orange-300 (#F4A281)` | هاور دکمه Accent |
| `accent.on` | `ink (#100F0D)` | `ink (#100F0D)` | متن روی `accent.fill` (کنتراست ≥ 5.75:1) |
| `luxe.fill` | `plum-700 (#9B227B)` | `plum-300 (#DA9CC3)` | کارت و دکمه باشگاه مشتریان و VIP |
| `luxe.on` | `white (#FFFFFF)` | `ink (#100F0D)` | متن روی `luxe.fill` (کنتراست ≥ 7.22:1) |
| `luxe.subtle` | `plum-100 (#F5D4E8)` | `plum-900 (#460535)` | پس‌زمینه نشان مشترک ویژه |
| `luxe.text` | `plum-800 (#6F1357)` | `plum-200 (#E8B8D6)` | متن روی `luxe.subtle` (کنتراست ≥ 8.11:1) |
| `notify.fill` | `coral-600 (#BC313C)` | `coral-300 (#F68F8E)` | بج شمارنده اعلان‌ها |

---

## ۴. تایپوگرافی (Typography) [BB + HK+]

### ۴.۱ معماری فونت
- **فونت اصلی و ارقام (`IRANSansFaNum`):** تمام متون فارسی و تمام اعداد در کل سیستم با نسخه فارسی‌نامبر رندر می‌شوند.
- **فونت مکمل لاتین (`Montserrat-Latin`):** از طریق `unicode-range` (فقط حروف الفبای انگلیسی بدون اعداد) و با `size-adjust: 93%` بارگذاری می‌شود تا هم‌ارتفاع فونت فارسی باشد.

### ۴.۲ مقیاس تایپ واکنش‌گرا (Mobile-First Type Scale)
نسبت مقیاس `1.25` (Major Third) با پایه `16px`. مقادیر پیش‌فرض برای موبایل (`<744px`) هستند و در تبلت/دسکتاپ (`≥744px`) چهار تیتر اول ارتقا می‌یابند:

| توکن | موبایل (`<744px`) | دسکتاپ (`≥744px`) | وزن | کاربرد |
|---|---|---|---|---|
| `type.display-xl` | `36px / 50px` | `48px / 64px` | `700` | هیرو لندینگ، صفحه جشن رسیدن به هدف |
| `type.display` | `30px / 44px` | `38px / 54px` | `700` | عنوان صفحات عاطفی و کمپین |
| `type.h1` | `26px / 40px` | `30px / 44px` | `700` | عنوان اصلی صفحه (`<h1>`) |
| `type.h2` | `22px / 34px` | `24px / 36px` | `700` | عنوان بخش‌های اصلی (`<h2>`) |
| `type.h3` | `20px / 32px` | `20px / 32px` | `700` | عنوان کارت وعده و دیالوگ (`<h3>`) |
| `type.title` | `18px / 30px` | `18px / 30px` | `500` | عنوان ردیف لیست و آیتم منو |
| `type.body-lg` | `18px / 32px` | `18px / 32px` | `400` | لید، متن توضیحی مهم در آنبوردینگ |
| `type.body` | `16px / 28px` | `16px / 28px` | `400` | متن بدنه اصلی و **فیلدهای ورودی اپ مشتری** |
| `type.body-sm` | `14px / 24px` | `14px / 24px` | `400` | متن جداول، پنل‌های عملیاتی و کارت‌های فشرده |
| `type.label` | `14px / 20px` | `14px / 20px` | `500` | متن دکمه‌ها، برچسب بالای فیلد، تب‌ها |
| `type.caption` | `13px / 22px` | `13px / 22px` | `400` | زیرنویس ماکروها، زمان، متادیتا (حداقل سایز مجاز) |
| `type.num-xl` | `40px / 48px` | `48px / 56px` | `900` | عدد ستاره شمالی کاکپیت و نتیجه وزن |
| `type.num-lg` | `28px / 36px` | `32px / 40px` | `700` | عدد اصلی کارت‌های خلاصه و تعرفه |

### ۴.۳ قوانین سخت تایپوگرافی
1. **ممنوعیت `letter-spacing` در فارسی:** مقدار `letter-spacing` برای کل عناصر فارسی باید `0` (یا `normal`) باشد تا اتصال حروف نشکند.
2. **طول خط خوانا (Measure):** عرض بلوک‌های متنی حداکثر `65ch` (`--hk-measure-body`) است.
3. **قالب‌بندی استاندارد داده‌ها:**
   - کالری: `۱٬۸۰۰ کیلوکالری`
   - وزن و سایز: یک رقم اعشار با ممیز فارسی (`۷۲٫۵ کیلوگرم`، `۸۴٫۰ سانتی‌متر`)
   - مبالغ مالی: جداکننده هزارگان فارسی (`۱۲۰٬۰۰۰ تومان`) با استفاده از `Intl.NumberFormat('fa-IR')`.

---

## ۵. فضا، گرید، تراکم و شکل (Layout, Density & Shape) [HK+]

### ۵.۱ مقیاس فضا (Spacing Scale — 4pt Grid)
- `--hk-space-0`: `0px`
- `--hk-space-1`: `2px` (فقط برای فواصل میکرو داخلی)
- `--hk-space-2`: `4px` (فاصله برچسب تا فیلد)
- `--hk-space-3`: `8px` (فاصله آیکون تا متن، فاصله دو دکمه هم‌جوار)
- `--hk-space-4`: `12px` (فاصله کارت‌های فشرده، پدینگ داخلی کوچک)
- `--hk-space-5`: `16px` (پدینگ کارت موبایل، حاشیه صفحه موبایل)
- `--hk-space-6`: `20px` (پدینگ افقی دکمه)
- `--hk-space-7`: `24px` (پدینگ کارت دسکتاپ، گاتر گرید تبلت/دسکتاپ)
- `--hk-space-8`: `32px` (فاصله بین بخش‌ها در موبایل، حاشیه دسکتاپ)
- `--hk-space-9`: `40px` | `--hk-space-10`: `48px` | `--hk-space-11`: `64px` | `--hk-space-12`: `80px` | `--hk-space-13`: `96px`

### ۵.۲ سیستم تراکم دوگانه و قانون فیتس (`data-density`)
برای پاسخگویی همزمان به تجربه لمسی مشتری و پنل‌های پرجزئیات کارشناس/آشپزخانه:

| پارامتر | `comfortable` (اپ مشتری و وب‌سایت) | `compact` (پنل کارشناس، آشپزخانه، کاکپیت) |
|---|---|---|
| ارتفاع بصری کنترل پیش‌فرض (`--hk-control-h`) | `52px` | `40px` |
| ارتفاع بصری کنترل کوچک (`--hk-control-h-sm`) | `44px` | `32px` |
| **حداقل ناحیه قابل لمس/کلیک (`--hk-hit-min`)** | **`48×48px`** | **`44×44px`** *(الزامی طبق Fitts' Law و WCAG)* |
| ارتفاع ردیف جدول (`--hk-table-row-h`) | `56px` | `44px` |

> **قانون پیاده‌سازی Hit Target در حالت Compact:** وقتی دکمه یا آیکون در پنل دارای ارتفاع بصری `32px` است، باید یک شبهعنصر نامرئی (`::after` با `inset: -6px`) دور آن قرار گیرد تا ناحیه لمس در تبلت‌های آشپزخانه و کافه دقیقاً `44×44px` باشد.

### ۵.۳ نقاط شکست و گرید (Breakpoints & Grid)
- **Mobile (`360px` تا `743px`):** ۴ ستون، حاشیه کناری `16px`، گاتر `16px`، نوار ناوبری پایین (`56px + safe-area-inset-bottom`).
- **Tablet (`744px` تا `1023px`):** ۸ ستون، حاشیه کناری `24px`، گاتر `24px`، سایدبار جمع‌شونده (`72px`).
- **Desktop (`1024px` به بالا):** ۱۲ ستون، حاشیه کناری `32px`، گاتر `24px`، حداکثر عرض محتوا `--hk-container-max: 1200px`، سایدبار راست `264px`.

### ۵.۴ شعاع گوشه‌ها و امضای «گوشه برگ» (Radius & Leaf Signature)
- `radius.xs`: `4px` (نوار پیشرفت، چک‌باکس)
- `radius.sm`: `8px` (فیلد و چیپ در پنل Compact، توست)
- `radius.md`: `12px` (فیلد اپ مشتری، دکمه پنل، تصویر داخل کارت)
- `radius.lg`: `20px` (کارت‌های استاندارد)
- `radius.xl`: `28px` (لبه بالای Bottom Sheet و دیالوگ)
- `radius.pill`: `999px` (دکمه‌های اپ مشتری، چیپ‌های انتخاب، نشان‌های وضعیت)
- **امضای `radius.leaf`:** دو گوشه مقابل تیز و دو گوشه مقابل گرد (`20px`) با استفاده از ویژگی‌های منطقی CSS. **قانون:** حداکثر **یک** کارت برگی در هر نما (مختص کارت هدف ماهانه، کارت دستاورد یا کارت باشگاه مشتریان).

---

## ۶. حرکت و انیمیشن (Motion System) [HK+]

حرکت‌ها ترجمه مهندسی سه ویژگی لوگوی حس خوب (**Flow, Movement, Happy**) در بازه استاندارد تعاملی (`80ms` تا `280ms`) هستند:

| توکن | مقدار | کاربرد |
|---|---|---|
| `--hk-duration-instant` | `80ms` | فشردن دکمه (`active` scale) |
| `--hk-duration-fast` | `140ms` | تغییر رنگ Hover، فوکوس، تغییر وضعیت چک‌باکس و سوییچ |
| `--hk-duration-base` | `220ms` | تغییر تب، باز شدن منوی بازشو، جایگزینی گزینه غذا در کارت |
| `--hk-duration-slow` | `280ms` | باز شدن Bottom Sheet، انتقال بین مراحل فرم آنبوردینگ |
| `--hk-duration-celebrate`| `500ms` | انیمیشن غیرمسدودکننده تیک موفقیت چک‌این یا نقطه عطف |
| `--hk-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | تغییرات وضعیت عمومی و رنگ |
| `--hk-ease-flow` | `cubic-bezier(0.22, 1, 0.36, 1)` | ورود شیت، حرکت جهت‌دار در RTL، پر شدن نوار پیشرفت |
| `--hk-ease-happy` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | فنریت ملایم (Overshoot) فقط روی آیکون تیک ثبت چک‌این |

---

## ۷. آیکون‌ها و تصویرسازی (Icons & Illustration) [HK+]

- **مشخصات آیکون‌های کاربردی:** شبکه `24×24px` (ناحیه زنده `20×20px`)، ضخامت خط `1.75px`، سر و اتصالات کاملاً گرد (`stroke-linecap: round; stroke-linejoin: round`)، رنگ ارث‌بری‌شده از متن (`currentColor`).
- **قانون آینه‌شدن در RTL (Mirroring):** آیکون‌های جهت‌دار (فلش بازگشت، مرحله بعد، ارسال، خروج، نمودار پیشرفت افقی) با کلاس `.hk-rtl-flip { transform: scaleX(-1); }` آینه می‌شوند. آیکون‌های تقارن‌دار، ساعت، تیک، ذره‌بین و لوگو هرگز آینه نمی‌شوند.

---

## ۸. کد مرجع توکن‌ها و کانفیگ‌ها (Production Code) [HK+]

### ۸.۱ فایل کامل متغیرهای CSS (`tokens.css`)

```css
/* ==========================================================================
   1. FONTS (@font-face)
   ========================================================================== */
@font-face {
  font-family: "IRANSansFaNum";
  src: url("/fonts/iransans-fanum-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "IRANSansFaNum";
  src: url("/fonts/iransans-fanum-medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "IRANSansFaNum";
  src: url("/fonts/iransans-fanum-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "IRANSansFaNum";
  src: url("/fonts/iransans-fanum-black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: optional; /* بارگذاری فقط در صورت نیاز برای حفظ بودجه ۹۵ کیلوبایتی */
}

/* فونت لاتین: فقط حروف انگلیسی (بدون اعداد تا ارقام همیشه فارسی بمانند) */
@font-face {
  font-family: "Montserrat-Latin";
  src: url("/fonts/montserrat-latin-var.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
  size-adjust: 93%;
  unicode-range: U+0041-005A, U+0061-007A, U+00C0-00FF, U+0131, U+0152-0153;
}

/* ==========================================================================
   2. PRIMITIVE TOKENS (OKLab Scales & Base Dimensions)
   ========================================================================== */
:root {
  /* Primitives: Blue */
  --hk-blue-50: #F3F7FF;  --hk-blue-100: #D0DFF9; --hk-blue-200: #B2C6EB;
  --hk-blue-300: #95AEDD; --hk-blue-400: #7896CF; --hk-blue-500: #5C7FC1;
  --hk-blue-600: #4167B2; --hk-blue-700: #264FA3; --hk-blue-800: #1A3978;
  --hk-blue-900: #0E2350;

  /* Primitives: Ice */
  --hk-ice-50: #E7FBFE;   --hk-ice-100: #CDEDF1;  --hk-ice-200: #B3DEE4;
  --hk-ice-300: #9AC2C7;  --hk-ice-400: #82A6AB;  --hk-ice-500: #6A8B90;
  --hk-ice-600: #537175;  --hk-ice-700: #3E585C;  --hk-ice-800: #294144;
  --hk-ice-900: #152A2D;

  /* Primitives: Plum */
  --hk-plum-50: #FFF3FA;  --hk-plum-100: #F5D4E8; --hk-plum-200: #E8B8D6;
  --hk-plum-300: #DA9CC3; --hk-plum-400: #CB80B1; --hk-plum-500: #BC639F;
  --hk-plum-600: #AC458D; --hk-plum-700: #9B227B; --hk-plum-800: #6F1357;
  --hk-plum-900: #460535;

  /* Primitives: Green */
  --hk-green-50: #ECFBF0;  --hk-green-100: #D0E9D6; --hk-green-200: #B4D6BC;
  --hk-green-300: #99C4A3; --hk-green-400: #7DB28B; --hk-green-500: #61A073;
  --hk-green-600: #438E5B; --hk-green-700: #2D6D42; --hk-green-800: #194D2B;
  --hk-green-900: #052F16;

  /* Primitives: Lime */
  --hk-lime-50: #F3FAEA;  --hk-lime-100: #D6EEAD; --hk-lime-200: #B9E169;
  --hk-lime-300: #A0C555; --hk-lime-400: #88A941; --hk-lime-500: #708E2E;
  --hk-lime-600: #5A7419; --hk-lime-700: #445B00; --hk-lime-800: #314300;
  --hk-lime-900: #1F2C00;

  /* Primitives: Yellow */
  --hk-yellow-50: #FAF8E7;  --hk-yellow-100: #F6EA9D; --hk-yellow-200: #F3DA31;
  --hk-yellow-300: #D5BD13; --hk-yellow-400: #B6A20C; --hk-yellow-500: #988702;
  --hk-yellow-600: #7C6D00; --hk-yellow-700: #605401; --hk-yellow-800: #463D00;
  --hk-yellow-900: #2D2700;

  /* Primitives: Tan */
  --hk-tan-50: #FFF5EA;   --hk-tan-100: #F4E0CB;  --hk-tan-200: #E6CCAF;
  --hk-tan-300: #D9B894;  --hk-tan-400: #CBA578;  --hk-tan-500: #BE915C;
  --hk-tan-600: #9A7345;  --hk-tan-700: #77562E;  --hk-tan-800: #563B19;
  --hk-tan-900: #372104;

  /* Primitives: Orange */
  --hk-orange-50: #FFF4F0;  --hk-orange-100: #FFD8C9; --hk-orange-200: #FBBDA5;
  --hk-orange-300: #F4A281; --hk-orange-400: #EC865D; --hk-orange-500: #E26934;
  --hk-orange-600: #BA5121; --hk-orange-700: #93390C; --hk-orange-800: #6D2400;
  --hk-orange-900: #461400;

  /* Primitives: Coral */
  --hk-coral-50: #FFF4F3;  --hk-coral-100: #FFD3D1; --hk-coral-200: #FEB1AE;
  --hk-coral-300: #F68F8E; --hk-coral-400: #ED6C6E; --hk-coral-500: #E2444F;
  --hk-coral-600: #BC313C; --hk-coral-700: #971E2B; --hk-coral-800: #73091A;
  --hk-coral-900: #4F000C;

  /* Primitives: Vermilion */
  --hk-vermilion-50: #FFF4F2;  --hk-vermilion-100: #FFD7CF; --hk-vermilion-200: #FDBAAD;
  --hk-vermilion-300: #F69D8D; --hk-vermilion-400: #EE806D; --hk-vermilion-500: #E4614C;
  --hk-vermilion-600: #D93C27; --hk-vermilion-700: #AA2514; --hk-vermilion-800: #7C0E02;
  --hk-vermilion-900: #4F0200;

  /* Primitives: Warm Neutral */
  --hk-neutral-50: #FBFAF7;  --hk-neutral-100: #F5F3EF; --hk-neutral-200: #EAE7E2;
  --hk-neutral-300: #D7D4CD; --hk-neutral-400: #BBB7B0; --hk-neutral-500: #8F8C85;
  --hk-neutral-600: #6B6963; --hk-neutral-700: #4A4742; --hk-neutral-800: #2D2B27;
  --hk-neutral-900: #1B1916;

  --hk-ink: #100F0D;
  --hk-white: #FFFFFF;

  /* Typography Stack & Mobile-First Scale (<744px) */
  --hk-font-sans: "Montserrat-Latin", "IRANSansFaNum", system-ui, -apple-system, sans-serif;
  --hk-type-display-xl: 700 36px/50px var(--hk-font-sans);
  --hk-type-display:    700 30px/44px var(--hk-font-sans);
  --hk-type-h1:         700 26px/40px var(--hk-font-sans);
  --hk-type-h2:         700 22px/34px var(--hk-font-sans);
  --hk-type-h3:         700 20px/32px var(--hk-font-sans);
  --hk-type-title:      500 18px/30px var(--hk-font-sans);
  --hk-type-body-lg:    400 18px/32px var(--hk-font-sans);
  --hk-type-body:       400 16px/28px var(--hk-font-sans);
  --hk-type-body-sm:    400 14px/24px var(--hk-font-sans);
  --hk-type-label:      500 14px/20px var(--hk-font-sans);
  --hk-type-caption:    400 13px/22px var(--hk-font-sans);
  --hk-type-num-xl:     900 40px/48px var(--hk-font-sans);
  --hk-type-num-lg:     700 28px/36px var(--hk-font-sans);

  /* Spacing & Layout */
  --hk-space-0: 0px;   --hk-space-1: 2px;   --hk-space-2: 4px;   --hk-space-3: 8px;
  --hk-space-4: 12px;  --hk-space-5: 16px;  --hk-space-6: 20px;  --hk-space-7: 24px;
  --hk-space-8: 32px;  --hk-space-9: 40px;  --hk-space-10: 48px; --hk-space-11: 64px;
  --hk-space-12: 80px; --hk-space-13: 96px;
  --hk-container-max: 1200px;
  --hk-measure-body: 65ch;

  /* Radius */
  --hk-radius-xs: 4px;  --hk-radius-sm: 8px;  --hk-radius-md: 12px;
  --hk-radius-lg: 20px; --hk-radius-xl: 28px; --hk-radius-pill: 999px;

  /* Motion */
  --hk-duration-instant: 80ms;
  --hk-duration-fast: 140ms;
  --hk-duration-base: 220ms;
  --hk-duration-slow: 280ms;
  --hk-duration-celebrate: 500ms;
  --hk-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --hk-ease-flow:     cubic-bezier(0.22, 1, 0.36, 1);
  --hk-ease-happy:    cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-Index Scale */
  --hk-z-sticky: 100; --hk-z-dropdown: 200; --hk-z-sheet: 300;
  --hk-z-modal: 400;  --hk-z-toast: 500;    --hk-z-tooltip: 600;

  /* Density: Comfortable (Default) */
  --hk-control-h: 52px;
  --hk-control-h-sm: 44px;
  --hk-hit-min: 48px;
  --hk-table-row-h: 56px;
}

/* Responsive Type Scale Upgrade (Tablet & Desktop >= 744px) */
@media (min-width: 744px) {
  :root {
    --hk-type-display-xl: 700 48px/64px var(--hk-font-sans);
    --hk-type-display:    700 38px/54px var(--hk-font-sans);
    --hk-type-h1:         700 30px/44px var(--hk-font-sans);
    --hk-type-h2:         700 24px/36px var(--hk-font-sans);
    --hk-type-num-xl:     900 48px/56px var(--hk-font-sans);
    --hk-type-num-lg:     700 32px/40px var(--hk-font-sans);
  }
}

/* Density: Compact (Panels) — Visual height compact, Hit target 44px */
[data-density="compact"] {
  --hk-control-h: 40px;
  --hk-control-h-sm: 32px;
  --hk-hit-min: 44px;
  --hk-table-row-h: 44px;
}

/* ==========================================================================
   3. SEMANTIC TOKENS (Light & Dark Modes)
   ========================================================================== */
:root, [data-theme="light"] {
  color-scheme: light;
  --hk-bg-canvas: var(--hk-neutral-50);
  --hk-bg-surface: var(--hk-white);
  --hk-bg-surface-hover: var(--hk-neutral-100);
  --hk-bg-surface-active: var(--hk-neutral-200);
  --hk-bg-subtle: var(--hk-neutral-100);
  --hk-bg-sunken: var(--hk-neutral-200);
  --hk-bg-calm: var(--hk-ice-100);
  --hk-bg-disabled: var(--hk-neutral-200);
  --hk-bg-backdrop: rgba(16, 15, 13, 0.56);

  --hk-border-subtle: var(--hk-neutral-200);
  --hk-border-default: var(--hk-neutral-300);
  --hk-border-control: var(--hk-neutral-500);
  --hk-border-disabled: var(--hk-neutral-300);

  --hk-text-strong: var(--hk-ink);
  --hk-text-default: var(--hk-neutral-800);
  --hk-text-muted: var(--hk-neutral-700);
  --hk-text-subtle: var(--hk-neutral-600);
  --hk-text-disabled: var(--hk-neutral-500);
  --hk-text-inverse: var(--hk-white);

  --hk-primary-fill: var(--hk-blue-700);
  --hk-primary-fill-hover: var(--hk-blue-800);
  --hk-primary-fill-active: var(--hk-blue-900);
  --hk-primary-on: var(--hk-white);
  --hk-primary-subtle: var(--hk-blue-50);
  --hk-primary-subtle-hover: var(--hk-blue-100);
  --hk-primary-text: var(--hk-blue-700);
  --hk-focus-ring: var(--hk-blue-700);

  --hk-success-fill: var(--hk-green-700);
  --hk-success-text: var(--hk-green-700);
  --hk-success-subtle: var(--hk-green-50);

  --hk-warning-fill: var(--hk-yellow-200);
  --hk-warning-text: var(--hk-yellow-800);
  --hk-warning-subtle: var(--hk-yellow-100);

  --hk-danger-fill: var(--hk-vermilion-700);
  --hk-danger-fill-hover: var(--hk-vermilion-800);
  --hk-danger-text: var(--hk-vermilion-700);
  --hk-danger-subtle: var(--hk-vermilion-50);

  --hk-info-text: var(--hk-blue-800);
  --hk-info-subtle: var(--hk-ice-100);

  --hk-accent-fill: var(--hk-orange-500);
  --hk-accent-fill-hover: var(--hk-orange-600);
  --hk-accent-on: var(--hk-ink);

  --hk-luxe-fill: var(--hk-plum-700);
  --hk-luxe-on: var(--hk-white);
  --hk-luxe-subtle: var(--hk-plum-100);
  --hk-luxe-text: var(--hk-plum-800);

  --hk-notify-fill: var(--hk-coral-600);

  /* Elevations (Light) */
  --hk-elevation-1: 0 1px 2px rgba(16, 15, 13, 0.06);
  --hk-elevation-2: 0 4px 12px rgba(16, 15, 13, 0.08);
  --hk-elevation-3: 0 12px 32px rgba(16, 15, 13, 0.12);

  /* Data Viz & Charts (Light) */
  --hk-chart-1: var(--hk-blue-700);
  --hk-chart-2: var(--hk-orange-500);
  --hk-chart-3: var(--hk-green-600);
  --hk-chart-4: var(--hk-plum-700);
  --hk-chart-5: var(--hk-ice-500);
  --hk-chart-ref: var(--hk-neutral-500);
  --hk-chart-raw-point: var(--hk-neutral-400);
  --hk-chart-secondary-line: var(--hk-plum-600);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --hk-bg-canvas: var(--hk-ink);
    --hk-bg-surface: var(--hk-neutral-900);
    --hk-bg-surface-hover: var(--hk-neutral-800);
    --hk-bg-surface-active: var(--hk-neutral-700);
    --hk-bg-subtle: var(--hk-neutral-800);
    --hk-bg-sunken: var(--hk-neutral-800);
    --hk-bg-calm: var(--hk-ice-900);
    --hk-bg-disabled: var(--hk-neutral-800);
    --hk-bg-backdrop: rgba(0, 0, 0, 0.72);

    --hk-border-subtle: var(--hk-neutral-800);
    --hk-border-default: var(--hk-neutral-700);
    --hk-border-control: var(--hk-neutral-400);
    --hk-border-disabled: var(--hk-neutral-700);

    --hk-text-strong: var(--hk-neutral-50);
    --hk-text-default: var(--hk-neutral-100);
    --hk-text-muted: var(--hk-neutral-300);
    --hk-text-subtle: var(--hk-neutral-400);
    --hk-text-disabled: var(--hk-neutral-600);
    --hk-text-inverse: var(--hk-ink);

    --hk-primary-fill: var(--hk-blue-300);
    --hk-primary-fill-hover: var(--hk-blue-200);
    --hk-primary-fill-active: var(--hk-blue-100);
    --hk-primary-on: var(--hk-ink);
    --hk-primary-subtle: var(--hk-blue-900);
    --hk-primary-subtle-hover: var(--hk-blue-800);
    --hk-primary-text: var(--hk-blue-300);
    --hk-focus-ring: var(--hk-blue-300);

    --hk-success-fill: var(--hk-green-300);
    --hk-success-text: var(--hk-green-300);
    --hk-success-subtle: var(--hk-green-900);

    --hk-warning-fill: var(--hk-yellow-200);
    --hk-warning-text: var(--hk-yellow-200);
    --hk-warning-subtle: var(--hk-yellow-900);

    --hk-danger-fill: var(--hk-vermilion-300);
    --hk-danger-fill-hover: var(--hk-vermilion-200);
    --hk-danger-text: var(--hk-vermilion-300);
    --hk-danger-subtle: var(--hk-vermilion-900);

    --hk-info-text: var(--hk-blue-200);
    --hk-info-subtle: var(--hk-ice-900);

    --hk-accent-fill: var(--hk-orange-400);
    --hk-accent-fill-hover: var(--hk-orange-300);
    --hk-accent-on: var(--hk-ink);

    --hk-luxe-fill: var(--hk-plum-300);
    --hk-luxe-on: var(--hk-ink);
    --hk-luxe-subtle: var(--hk-plum-900);
    --hk-luxe-text: var(--hk-plum-200);

    --hk-notify-fill: var(--hk-coral-300);

    /* Elevations (Dark — deeper shadow + subtle 1px border ring) */
    --hk-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--hk-border-subtle);
    --hk-elevation-2: 0 6px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--hk-border-default);
    --hk-elevation-3: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px var(--hk-border-default);

    /* Data Viz & Charts (Dark — WCAG AA Verified >= 6.5:1 on #1B1916) */
    --hk-chart-1: var(--hk-blue-300);
    --hk-chart-2: var(--hk-orange-400);
    --hk-chart-3: var(--hk-green-300);
    --hk-chart-4: var(--hk-plum-300);
    --hk-chart-5: var(--hk-ice-300);
    --hk-chart-ref: var(--hk-neutral-400);
    --hk-chart-raw-point: var(--hk-neutral-500);
    --hk-chart-secondary-line: var(--hk-plum-300);
  }
}

/* Manual Dark Mode Override */
:root[data-theme="dark"] {
  color-scheme: dark;
  --hk-bg-canvas: var(--hk-ink);
  --hk-bg-surface: var(--hk-neutral-900);
  --hk-bg-surface-hover: var(--hk-neutral-800);
  --hk-bg-surface-active: var(--hk-neutral-700);
  --hk-bg-subtle: var(--hk-neutral-800);
  --hk-bg-sunken: var(--hk-neutral-800);
  --hk-bg-calm: var(--hk-ice-900);
  --hk-bg-disabled: var(--hk-neutral-800);
  --hk-bg-backdrop: rgba(0, 0, 0, 0.72);
  --hk-border-subtle: var(--hk-neutral-800);
  --hk-border-default: var(--hk-neutral-700);
  --hk-border-control: var(--hk-neutral-400);
  --hk-border-disabled: var(--hk-neutral-700);
  --hk-text-strong: var(--hk-neutral-50);
  --hk-text-default: var(--hk-neutral-100);
  --hk-text-muted: var(--hk-neutral-300);
  --hk-text-subtle: var(--hk-neutral-400);
  --hk-text-disabled: var(--hk-neutral-600);
  --hk-text-inverse: var(--hk-ink);
  --hk-primary-fill: var(--hk-blue-300);
  --hk-primary-fill-hover: var(--hk-blue-200);
  --hk-primary-fill-active: var(--hk-blue-100);
  --hk-primary-on: var(--hk-ink);
  --hk-primary-subtle: var(--hk-blue-900);
  --hk-primary-subtle-hover: var(--hk-blue-800);
  --hk-primary-text: var(--hk-blue-300);
  --hk-focus-ring: var(--hk-blue-300);
  --hk-success-fill: var(--hk-green-300);
  --hk-success-text: var(--hk-green-300);
  --hk-success-subtle: var(--hk-green-900);
  --hk-warning-fill: var(--hk-yellow-200);
  --hk-warning-text: var(--hk-yellow-200);
  --hk-warning-subtle: var(--hk-yellow-900);
  --hk-danger-fill: var(--hk-vermilion-300);
  --hk-danger-fill-hover: var(--hk-vermilion-200);
  --hk-danger-text: var(--hk-vermilion-300);
  --hk-danger-subtle: var(--hk-vermilion-900);
  --hk-info-text: var(--hk-blue-200);
  --hk-info-subtle: var(--hk-ice-900);
  --hk-accent-fill: var(--hk-orange-400);
  --hk-accent-fill-hover: var(--hk-orange-300);
  --hk-accent-on: var(--hk-ink);
  --hk-luxe-fill: var(--hk-plum-300);
  --hk-luxe-on: var(--hk-ink);
  --hk-luxe-subtle: var(--hk-plum-900);
  --hk-luxe-text: var(--hk-plum-200);
  --hk-notify-fill: var(--hk-coral-300);
  --hk-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--hk-border-subtle);
  --hk-elevation-2: 0 6px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--hk-border-default);
  --hk-elevation-3: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px var(--hk-border-default);
  --hk-chart-1: var(--hk-blue-300);
  --hk-chart-2: var(--hk-orange-400);
  --hk-chart-3: var(--hk-green-300);
  --hk-chart-4: var(--hk-plum-300);
  --hk-chart-5: var(--hk-ice-300);
  --hk-chart-ref: var(--hk-neutral-400);
  --hk-chart-raw-point: var(--hk-neutral-500);
  --hk-chart-secondary-line: var(--hk-plum-300);
}

/* ==========================================================================
   4. BASE UTILITIES & REDUCED MOTION
   ========================================================================== */
html {
  direction: rtl;
  font: var(--hk-type-body);
  color: var(--hk-text-default);
  background-color: var(--hk-bg-canvas);
  -webkit-font-smoothing: antialiased;
}

.hk-leaf-card {
  border-start-start-radius: var(--hk-space-0);
  border-start-end-radius: var(--hk-radius-lg);
  border-end-end-radius: var(--hk-space-0);
  border-end-start-radius: var(--hk-radius-lg);
}

.hk-scrim::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(16, 15, 13, 0.76) 0%,
    rgba(16, 15, 13, 0.60) 38%,
    rgba(16, 15, 13, 0) 72%
  );
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  *:not([data-loading-spinner]),
  *:not([data-loading-spinner])::before,
  *:not([data-loading-spinner])::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 120ms !important;
    scroll-behavior: auto !important;
  }
}

---

## ۹. مشخصات کامل کامپوننت‌های هسته و وضعیت‌های نه‌گانه [HK+]

تمام کامپوننت‌ها دارای API واحد برای اندازه‌ها (`size: "md" | "sm"`) و پشتیبانی کامل از وضعیت‌های تعاملی هستند:

### ۹.۱ دکمه (Button)

- **شعاع گوشه:** در اپ مشتری (`comfortable`) برابر `radius.pill` (۹۹۹px)؛ در پنل‌ها (`compact`) برابر `radius.md` (۱۲px).
- **ناحیه لمس (Hit Target):** حداقل ۴۸×۴۸px در اپ و ۴۴×۴۴px در پنل‌ها.

#### جدول کامل وضعیت‌ها و واریانت‌ها:

| واریانت | Default | Hover | Active (Press) | Disabled | Loading |
|---|---|---|---|---|---|
| **primary** | bg: `primary.fill`<br>text: `primary.on` | bg: `primary.fill-hover` | bg: `primary.fill-active`<br>`scale(0.98)` | bg: `bg.disabled`<br>text: `text.disabled` | اسپینر 20px در مرکز، `aria-busy="true"` |
| **secondary** | bg: `bg.surface`<br>text: `text.strong`<br>border: `border.control` | bg: `bg.surface-hover` | bg: `bg.surface-active`<br>`scale(0.98)` | bg: `bg.disabled`<br>border: `border.disabled`<br>text: `text.disabled` | اسپینر 20px با رنگ `text.strong` |
| **tonal** | bg: `primary.subtle`<br>text: `primary.text` | bg: `primary.subtle-hover` | `scale(0.98)` | bg: `bg.disabled`<br>text: `text.disabled` | اسپینر 20px با رنگ `primary.text` |
| **accent** | bg: `accent.fill`<br>text: `accent.on` | bg: `accent.fill-hover` | `scale(0.98)` | bg: `bg.disabled`<br>text: `text.disabled` | اسپینر 20px با رنگ `accent.on` |
| **ghost** | bg: `transparent`<br>text: `text.default` | bg: `bg.surface-hover` | bg: `bg.surface-active` | text: `text.disabled` | اسپینر 20px |
| **danger** | bg: `danger.fill`<br>text: `primary.on` | bg: `danger.fill-hover` | `scale(0.98)` | bg: `bg.disabled`<br>text: `text.disabled` | اسپینر 20px |

> **Focus-visible (مشترک همه واریانت‌ها):** `outline: 2px solid var(--hk-focus-ring); outline-offset: 2px;`

---

### ۹.۲ فیلد ورودی متنی و عددی (TextField & NumberField)

**ساختار:** `[Label بالای فیلد با فاصله space.2]` + `[Input Container با ارتفاع --hk-control-h]` + `[Helper / Error Text در پایین با فاصله space.2]`.

#### وضعیت‌های نه‌گانه فیلد:
1. **Default:** پس‌زمینه `bg.surface`، حاشیه `1px solid var(--hk-border-control)`، متن `text.strong`، Placeholder با رنگ `text.subtle`.
2. **Hover:** حاشیه `text.muted`.
3. **Focus-visible:** حاشیه `2px solid var(--hk-primary-fill)`، حلقه بیرونی ملایم `0 0 0 3px var(--hk-primary-subtle)`.
4. **Filled / Active:** متن با فونت `type.body` (۱۶px در اپ) و تبدیل خودکار ارقام انگلیسی به فارسی در لحظه تایپ.
5. **Read-only:** پس‌زمینه `bg.sunken`، حاشیه `border.default`، متن قابل کپی شدن اما غیرقابل ویرایش.
6. **Disabled:** پس‌زمینه `bg.disabled`، حاشیه `border.disabled`، متن `text.disabled`، `cursor: not-allowed`.
7. **Error:** پس‌زمینه `danger.subtle`، حاشیه `2px solid var(--hk-danger-fill)`، پیام خطا در زیر فیلد با آیکون هشدار ۱۶px و رنگ `danger.text` (`aria-invalid="true"` و متصل با `aria-describedby`).
8. **Success (تأیید آنی مثل کد تخفیف):** حاشیه `1.5px solid var(--hk-success-fill)` همراه با آیکون تیک سبز در انتهای منطقی فیلد.
9. **Loading (بررسی غیرهمزمان کد معرف):** اسپینر ۱۶px در انتهای منطقی داخل فیلد (`inset-inline-end: 12px`).

---

### ۹.۳ چک‌باکس، رادیوباتن و سوییچ (Checkbox, Radio, Switch)

- **ابعاد بصری:** چک‌باکس و رادیو ۲۰×۲۰px (شعاع چک‌باکس `radius.xs` برابر ۴px، رادیو `radius.pill`)؛ سوییچ ۴۴×۲۴px.
- **ناحیه لمس (Hit Area):** همواره حداقل `--hk-hit-min` (۴۸×۴۸px در اپ و ۴۴×۴۴px در پنل).
- **وضعیت انتخاب‌شده (Checked):** پس‌زمینه `primary.fill`، علامت تیک/نقطه به رنگ `primary.on` با انیمیشن `duration.fast`. در سوییچ در وضعیت RTL، دایره داخلی در حالت روشن به سمت چپ (انتهای منطقی) با قرارداد واحد حرکت می‌کند.

---

### ۹.۴ اسلایدر ثبت وزن و سایز (RangeSlider — ویژه چک‌این جمعه)

- **ساختار:** ترک افقی به ارتفاع ۸px با پس‌زمینه `bg.sunken` و شعاع `radius.pill`؛ بخش پرشده به رنگ `primary.fill`.
- **دستگیره (Thumb):** دایره ۲۸×۲۸px (ناحیه لمس ۴۸×۴۸px) با پس‌زمینه `bg.surface`، حاشیه `3px solid var(--hk-primary-fill)` و سایه `elevation.2`.
- **تعامل دوطرفه:** تغییر اسلایدر بلافاصله عدد داخل فیلد ورودی بالای آن را با گام ۰٫۱ کیلوگرم تغییر می‌دهد و تایپ در فیلد نیز موقعیت اسلایدر را آپدیت می‌کند (`role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`).

---

### ۹.۵ جدول داده‌ها (DataTable — ویژه پنل کارشناس، آشپزخانه و کاکپیت)

- **ظاهر:** بدون سایه (`elevation.0`)، پس‌زمینه `bg.surface`، حاشیه دور `1px solid var(--hk-border-default)`، شعاع `radius.md`.
- **سرستون (Header):** پس‌زمینه `bg.subtle`، ارتفاع ۴۴px، چسبان (`sticky`)، متن `type.label` با رنگ `text.muted`، آیکون سورت ۱۶px در انتهای منطقی هر ستون قابل مرتب‌سازی.
- **ردیف‌ها:** ارتفاع دقیق ۴۴px (تراکم فشرده)، خط جداکننده `1px solid var(--hk-border-subtle)`، در وضعیت Hover تغییر پس‌زمینه به `bg.surface-hover`.
- **ردیف انتخاب‌شده (Selected):** پس‌زمینه `primary.subtle`، حاشیه راست (ابتدای منطقی) `3px solid var(--hk-primary-fill)`.
- **اعداد:** ارقام در ستون‌های وزن، کالری و زمان با فونت عددی فارسی و ویژگی `font-variant-numeric: tabular-nums` با تراز چپ/پایان رندر می‌شوند تا ممیزها دقیقاً زیر هم قرار گیرند.
- **وضعیت لودینگ و خالی:** پشتیبانی از ردیف‌های Skeleton Pulse (لودینگ) و وضعیت بدون داده (Empty Filter State).

---

### ۹.۶ تب‌های ناوبری (Tabs Navigation)

- **واریانت کپسولی (Segmented Pill Tabs — اپ مشتری):**
  - کانتینر با پس‌زمینه `bg.sunken` و شعاع `radius.pill`.
  - تب فعال دارای پس‌زمینه سفید `bg.surface`، سایه `elevation.1` و متن پررنگ `text.strong`.
- **واریانت خطی (Underline Tabs — پنل‌های مدیریتی):**
  - ارتفاع ۴۰px، مرز زیرین کلی با `border.default`.
  - تب فعال با مرز زیرین ۲ پیکسلی به رنگ `primary.fill` و متن `primary.text`.

---

### ۹.۷ بازخورد و وضعیت‌های خالی (Feedback, Toast & Empty States)

- **توست با قابلیت بازگشت (Toast with Undo):**
  - بنر تیره با پس‌زمینه `ink (#100F0D)` و سایه عمیق `elevation.3`.
  - حاوی آیکون تیک سبز، متن رویداد، دکمه بازگردانی عملیات (`بازگردانی / Undo`) و دکمه بستن.
- **اسکلتون بارگذاری (Skeleton Pulse Loading):**
  - بلوک‌های خاکستری با پس‌زمینه `bg.sunken` و انیمیشن محو و پدیدار شدن پیوسته.
- **صفحه خالی (Empty State):**
  - کانتینر متمرکز با گلیف برگی ۵۶px درون دایره یخی `ice-100`، تیتر واضح، متن راهنما و دکمه اقدام اولیه.

---

## ۱۰. قوانین خط قرمز طراحی و راهنمای مقایسه‌ای (Do's & Don'ts)

| حیطه | باید قطعی (DO) | نباید قطعی (DON'T) | دلیل معماری و تجربه کاربری |
|---|---|---|---|
| **۱. رنگ‌ها و تم‌ها** | استفاده ۱۰۰٪ از متغیرهای سمانتیک (مانند `bg.surface` یا `primary.fill`). | استفاده مستقیم از کدهای هگز خام (مانند `#1E4B8F`) درون کامپوننت. | شکست کامل دارک‌مود خودکار و عدم امکان نگهداری تم. |
| **۲. تایپوگرافی** | استفاده انحصاری از `IRANSansFaNum` با ارقام فارسی برای تمام داده‌ها و متون. | استفاده از ارقام لاتین (English Digits) یا فونت‌های ناهماهنگ در متون فارسی. | خدشه‌دار شدن هویت فارسی، ناهماهنگی در تراز و شکست خطوط. |
| **۳. حاشیه‌ها و سایه‌ها** | تفکیک لایه‌ها و کارت‌ها با خطوط ظریف `border.default` و سایه‌های ملایم. | سایه‌های سنگین چندلایه تیره و بلورهای شدید تزئینی زیر کارت‌ها. | ایجاد خستگی بصری، از بین رفتن آرامش لوکس (۸۰/۱۵/۵) و افت رندرینگ موبایل. |
| **۴. معماری راست‌به‌چپ (RTL)** | استفاده از CSS Logical Properties (`inset-inline-start`, `margin-inline`). | نوشتن ویژگی‌های فیزیکی چپ و راست (`left`, `right`, `margin-left`). | به هم ریختن چیدمان و شکست ناوبری در زبان‌های راست‌به‌چپ. |
| **۵. اندازه لمسی (Fitts' Law)** | حداقل ناحیه لمسی ۴۸×۴۸px در اپ و ۴۴×۴۴px در پنل‌ها (حتی برای آیکون‌های ۲۰px). | دکمه‌ها و پیوندهای متنی فشرده با ارتفاع کمتر از ۴۴px. | عدم امکان کلیک دقیق روی صفحات لمسی و نقض استاندارد WCAG 2.2 Target Size. |
| **۶. پوشش وضعیت‌ها** | طراحی و کدنویسی هر ۹ وضعیت استاندارد برای تمام فیلدها و کنترل‌ها. | رهاسازی کامپوننت تنها در حالت Default بدون در نظر گرفتن Error و Loading. | بلاک شدن کاربر در خطاهای اعتبارسنجی و ابهام در زمان تاخیر شبکه. |
| **۷. لحن بیومتریک و سلامت** | بازخورد پذیرنده، بدون قضاوت و آرامش‌بخش برای نوسانات شاخص‌های سلامتی. | رنگ قرمز تند، پیام‌های تنبیهی یا شرمنده‌سازی برای افزایش وزن یا استپ وزنی. | ایجاد اضطراب در کاربر و نقض آرکتایپ همراه و حکیم (Sage & Lover). |
| **۸. کنتراست دسترس‌پذیری** | رعایت نسبت کنتراست حداقل ۴٫۵:۱ برای متون عادی و ۳:۱ برای اجزای کنترل. | استفاده از رنگ‌های خاکستری بیش از حد روشن روی زمینه کرم برای زیبایی بصری. | عدم خوانایی برای افراد دارای ضعف بینایی و نقض استاندارد WCAG 2.2 AA. |

---

## ۱۱. چک‌لیست افزودن کامپوننت جدید به سیستم (Component Governance Checklist)

هر زمان که نیاز به ساخت یک کامپوننت جدید در پلتفرم حس خوب پیدا شد، پیش از Merge شدن Pull Request باید تمام موارد زیر تیک بخورند:

- [ ] **توجیه سیستماتیک:** آیا واقعاً کامپوننت جدیدی لازم است یا می‌توان آن را با ترکیب (Composition) کامپوننت‌های موجود ساخت؟
- [ ] **صفر بودن مقادیر Hard-code:** آیا ۱۰۰٪ رنگ‌ها، فاصله‌ها، شعاع‌ها، سایه‌ها و زمان‌های انیمیشن از توکن‌های معنایی (`--hk-*`) خوانده شده‌اند؟
- [ ] **پشتیبانی از تراکم دوگانه:** آیا کامپوننت در هر دو حالت comfortable (اپ مشتری) و compact (پنل‌ها) بدون شکستن متن رندر می‌شود و حداقل ناحیه لمس ۴۴×۴۴px را حفظ می‌کند؟
- [ ] **پشتیبانی از حالت تاریک (Dark Mode):** آیا کامپوننت در `[data-theme="dark"]` کنتراست حداقل ۴٫۵:۱ برای متن و ۳:۱ برای مرزها را دارد؟
- [ ] **پوشش کامل وضعیت‌ها (9 States):** آیا وضعیت‌های Default, Hover, Focus-visible, Active, Disabled, Loading, Error, Success و Empty طراحی و پیاده شده‌اند؟
- [ ] **معماری RTL و Logical CSS:** آیا کامپوننت بدون هیچ ویژگی فیزیکی (left/right) نوشته شده و آیکون‌های جهت‌دار آن در RTL آینه می‌شوند؟
- [ ] **دسترس‌پذیری و کیبورد:** آیا کامپوننت با کلیدهای Tab, Enter, Space, Escape و کلیدهای جهتی کار می‌کند و ویژگی‌های ARIA مناسب را دارد؟
- [ ] **تست در Storybook:** آیا استوری‌های کامپوننت در ۴ محیط (Light Comfortable, Dark Comfortable, Light Compact, 125% Text Zoom) ثبت و بررسی شده‌اند؟

---

## ۱۲. الگوهای اختصاصی دامنه حس خوب (Domain Patterns) [HK+]

این بخش ترجمه مستقیم نیازمندی‌های بریف محصول (نسخه ۲.۰) به الگوهای رابط کاربری است.

### ۱۸.۱ الگوی کارت وعده و انتخاب دوگزینه‌ای (Meal Selection Card — A-18, D-04)

برای پیاده‌سازی منوی چرخشی ماژولار بدون قفل کردن آشپزخانه:

**ساختار کارت وعده:**

- **تصویر غذا:** نسبت ۱۶:۹ یا ۴:۳ در بالای کارت (یا مربع ۸۸×۸۸ در نمای لیست فشرده)، گوشه گرد `radius.md`.
- **کپسول روی عکس (گوشه بالای راست):** نوع وعده («ناهار · گزینه ۱») روی scrim یا پس‌زمینه `bg.surface` با شفافیت ۹۰٪.
- **عنوان غذا:** `type.h3`، حداکثر ۲ خط.
- **نوار ماکروها (Macro Strip):** نمایش خطی و آرام به فرم: «۵۲۰ کیلوکالری · ۴۲ گرم پروتئین · ۴۸ گرم کربوهیدرات · ۱۴ گرم چربی» با فونت `type.caption` و رنگ `text.muted`.

**مقایسه و جابه‌جایی (Swap Interaction):** زیر وعده اصلی، یک نوار تعاملی با عنوان «ترجیح می‌دهی گزینه دوم را بگیری؟ (خوراک لوبیا و قارچ)» قرار دارد. با لمس آن، کارت با انیمیشن `ease.flow` گزینه دوم را جایگزین می‌کند.

**قفل ۴۸ ساعته:** وقتی کمتر از ۴۸ ساعت به زمان پخت می‌ماند، دکمه جابه‌جایی جای خود را به نشان آرام «در حال آماده‌سازی در آشپزخانه حس خوب» می‌دهد.

### ۱۸.۲ الگوی چک‌این جمعه و بازخورد علمی (Friday Check-in Flow — A-22, A-25, C-02)

چک‌این جمعه قلب ماندگاری مشتری و ستاره شمالی عملیاتی است. این جریان نباید شبیه امتحان پس دادن باشد:

- **گام ۱ (وزن و سایز):** اسلایدر خطی دقیق (گام ۱۰۰ گرم) + قابلیت تایپ مستقیم عدد. نمایش مقدار هفته قبل با رنگ `text.subtle` در زیر فیلد برای جلوگیری از خطای تایپی فاحش (مثلاً ثبت ۷۲۰ به جای ۷۲٫۰).
- **گام ۲ (سیگنال‌های فیزیولوژیک — C-02):** چهار چیپ لمسی سریع برای توضیح زمینه‌ای بدن: «خوابم کم بود»، «هفته پراسترسی داشتم»، «در سیکل ماهانه هستم»، «غذاهای خارج از برنامه خوردم».
- **گام ۳ (کارت پاسخ هوشمند — A-25):** بلافاصله پس از ثبت، به جای نمایش یک عدد خشک، یک کارت آرام (`bg.calm`) با امضای کارشناس تغذیه نمایش داده می‌شود که رابطه بین وزن و سایز دور شکم را به زبان ساده توضیح می‌دهد.

### ۱۸.۳ الگوی صف اولویت و تأیید کارشناس (Nutritionist Queue — B-01 تا B-04)

پنل کارشناس تغذیه با تراکم `data-density="compact"` طراحی می‌شود تا کارشناس بتواند در کمتر از ۳۰ ثانیه یک پرونده عادی را بررسی و تأیید کند:

**چیدمان Split-View در دسکتاپ (۱۰۲۴px به بالا):**

- **ستون راست (۳۲۰px):** لیست صف چک‌این‌ها، مرتب‌شده بر اساس پرچم‌ها (اول پرچم‌های قرمز پزشکی/افت شدید، بعد زرد استپ وزن/عدم چک‌این، در نهایت سبزهای آماده تأیید دسته‌ای).
- **بخش اصلی (چپ):** خلاصه ۳۶۰ درجه پرونده در یک نگاه (بدون نیاز به اسکرول برای تصمیم‌گیری): نمودار ۴ هفته اخیر وزن و دور شکم در کنار هم، درصد پایبندی، میانگین امتیاز غذاهای هفته، و جعبه تصمیم موتور (C-02) در بالای صفحه.

**میانبرهای صفحه‌کلید (Keyboard Shortcuts):** در پنل کارشناس، کلید `A` برای تأیید پیشنهاد سیستم، `E` برای ویرایش دستی کالری، و `J`/`K` برای حرکت بین مشتری بعدی و قبلی در صف فعال است.

> **یادداشت هماهنگی [؟]:** رنگ «قرمز/زرد/سبز» در اولویت‌بندی صف، فقط برای پرونده‌های داخلی کارشناس است (نه نمایش بدن مشتری) و طبق بخش ۱۴.۱ همیشه باید با آیکون و متن همراه شود.

### ۱۸.۴ الگوی کاکپیت محصول (Product Cockpit — ماژول I)

کاکپیت محصول در تم پیش‌فرض از پس‌زمینه `bg.subtle` با کارت‌های سفید بدون سایه (`elevation.0`) و حاشیه `border.default` استفاده می‌کند:

- **کارت ستاره شمالی دوگانه (I-18):** در بالاترین نقطه داشبورد، دو کارت کنار هم قرار می‌گیرند:
  - **کارت راست (Leading):** «نرخ هفته موفق (این جمعه)» با فونت `type.num-xl`، رنگ `primary.text`، به همراه اسپارک‌لاین ۸ هفته اخیر و تفکیک «تحویل بالای ۸۰٪» و «ثبت چک‌این».
  - **کارت چپ (Lagging):** «نرخ موفقیت پایدار (۸ هفته در نگهداری)» با فونت `type.num-xl` و رنگ `luxe.fill` (plum-700).
- **کارت آزمایش (Experiment Card — I-13):** نمایش وضعیت آزمون (پیش‌نویس، در حال اجرا، معنادار شد، رد شد)، نوار پیشرفت حجم نمونه (مثلاً ۱۴۲ از ۲۰۰ نمونه)، و دکمه مستقیم «ثبت در دفتر تصمیم‌ها (I-15)».

---

## ۱۳. تجسم داده و نمودارها (Data Visualization) [HK+]

در پلتفرم حس خوب، نمودارها هم در اپ مشتری (روند وزن و سایز) و هم در کاکپیت محصول (قیف‌ها، کوهورت، اقتصاد واحد) حضور دارند.

### ۱۷.۱ قواعد روانشناختی نمودار سلامت (اپ مشتری — A-23)

- **خط اصلی همیشه میانگین متحرک (Moving Average) است:** وزن روزانه و هفتگی نوسان آب دارد. در نمودار مشتری، نقطه‌های خام وزن با دایره‌های کوچک توخالی به رنگ neutral-400 نمایش داده می‌شوند و خط اصلی، ضخیم (۳px) و پیوسته به رنگ blue-700 (`primary.fill`)، میانگین متحرک است.
- **نمایش همزمان دور شکم:** در زیر یا روی همان نمودار، خط روند دور شکم با خط‌چین منظم به رنگ plum-600 قابل روشن/خاموش شدن است تا وقتی وزن ثابت است اما سایز کم شده، مشتری پیشرفت واقعی را ببیند.
- **باند هدف (Target Band):** محدوده وزن هدف به‌صورت یک نوار افقی نرم با رنگ ice-100 (در حالت تاریک ice-900) در پس‌زمینه نمودار کشیده می‌شود.
- **ممنوعیت رنگ قرمز در نمودار بدن:** اگر وزن در یک هفته بالا رفت، نقطه یا خط هرگز قرمز (vermilion) نمی‌شود. همه نقاط بخشی از مسیر طبیعی بدن هستند.

### ۱۷.۲ پالت رنگ نمودارها در کاکپیت محصول و پنل‌ها

برای نمودارهای چندسری (مقایسه تیپ‌های پکیج، کانال‌های جذب، دلایل ریزش)، ترتیب رنگ‌ها به گونه‌ای انتخاب شده که برای افراد دارای کوررنگی (Deuteranopia / Protanopia) نیز از نظر روشنایی قابل تفکیک باشد:

| ترتیب سری | نام توکن | کد هگز (روشن) | کاربرد پیشنهادی در کاکپیت |
|---|---|---|---|
| سری ۱ (اصلی) | `--hk-chart-1` | `#264FA3` (Blue 700) | کل مشترکان فعال / پکیج کامل |
| سری ۲ | `--hk-chart-2` | `#E26934` (Orange 500) | پکیج روز کاری / کانال کافه |
| سری ۳ | `--hk-chart-3` | `#438E5B` (Green 600) | فاز نگهداری / رسیده به هدف |
| سری ۴ | `--hk-chart-4` | `#9B227B` (Plum 700) | باشگاه مشتریان / معرفی دوستان |
| سری ۵ | `--hk-chart-5` | `#82A6AB` (Ice 400) | پکیج تست ۳ روزه / سایر |
| خط مرجع / میانگین | `--hk-chart-ref` | `#8F8C85` (Neutral 500، خط‌چین) | خط پایه فاز ۰ (Baseline) |

**جهت محور زمان در RTL:** در نمودارهای علمی و سری زمانی (Time-series)، محور افقی زمان طبق استاندارد ریاضی و مالی ایران از چپ (گذشته) به راست (امروز/آینده) رسم می‌شود، اما برچسب‌های فارسی، اعداد و راهنما (Legend) کاملاً راست‌چین و با فونت فارسی هستند.

---

## ۱۴. نوشتار تجربه کاربری و لحن (UX Writing & Microcopy) [BB + HK+]

برندبوک سه ارزش کلامی تعیین کرده است: صمیمانه، همراهانه، حکیمانه و جایگاه لحن را «دوستانه نزدیک به رسمی (محترمانه و جوان)» قرار داده است. همچنین تأکید کرده که در لایه اول از اصطلاحات پیچیده علمی پرهیز شود و توضیحات علمی در لایه دوم بیاید.

### ۱۸.۱ قواعد نگارش در رابط کاربری [HK+]

- **ضمیر خطاب:** در اپ مشتری با مشتری مفرد صمیمی و محترمانه صحبت می‌کنیم («برنامه امروزت آماده است»، «وزن ناشتایت را ثبت کن»)، اما از افعال شکسته و عامیانه افراطی («ثبتش کن»، «می‌خوای عوضش کنی؟») پرهیز می‌کنیم؛ معادل درست: «می‌خواهی وعده‌ات را تغییر دهی؟» (صمیمیِ معیار). در پنل‌های سازمانی و پیام‌های رسمی مالی/حقوقی، ضمیر جمع محترمانه («شما») استفاده می‌شود.
- **ساختار دولایه‌ای (بر اساس قانون برندبوک):**
  - **لایه اول (عنوان کارت / اعلان):** کوتاه، صریح، ملموس و انسانی (حداکثر ۸ کلمه).
  - **لایه دوم (توضیح زیرین):** دلیل علمی به زبان ساده (حکم آرکتایپ حکیم).

### ۱۸.۲ جدول تبدیل ادبیات (گذر از ادبیات کلینیکی زرد به برنامه نتیجه)

| موقعیت | ❌ ادبیات ممنوع (سرزنش‌گر / زرد / کلینیکی) | ✅ ادبیات استاندارد حس خوب (همراهانه و حکیمانه) |
|---|---|---|
| پیام ارزش برند | هر ماه یک سایز کمتر با حذف چربی احشایی! | بدنی سبک‌تر و پرانرژی‌تر، با برنامه‌ای که با زندگی تو تنظیم می‌شود. |
| فراموشی چک‌این جمعه | شما وزن خود را ثبت نکردید. برنامه هفته بعد صادر نمی‌شود. | نوبت چک‌این جمعه است. با ثبت وزن ناشتا، کالری هفته بعدت دقیق‌تر تنظیم می‌شود (کمتر از ۱ دقیقه). |
| ثبات وزن در چک‌این | متأسفانه این هفته کاهش وزن نداشتید (۰ کیلوگرم). | وزن ترازو ثابت ماند، اما سایز دور شکمت ۱ سانتی‌متر کم شد. بدنت در حال جایگزینی چربی با آب و عضله است؛ با همین فرمان ادامه می‌دهیم. |
| افزایش وزن بعد از چیت‌دی | هشدار! وزن شما ۸۰۰ گرم اضافه شده است. | نوسان طبیعی بعد از روز آزاد. این افزایش وزن ناشی از ذخیره موقت آب و گلیکوژن است و تا سه‌شنبه به روند عادی برمی‌گردد. |
| تمام شدن مهلت تغییر غذا | امکان تعویض غذا بسته شده است (خطای ۴۰۳). | آشپزخانه در حال آماده‌سازی مواد تازه برای فردای توست. انتخاب وعده‌های پس‌فردا هنوز باز است. |
| پیشنهاد فاز نگهداری | اشتراک شما تمام شد. برای تمدید کلیک کنید. | به هدفت رسیدی! برای اینکه این نتیجه بدون زحمت حفظ شود، برنامه‌ی سبک‌ترِ «فاز نگهداری» برایت آماده است. |

---

## ۱۵. طراحی فیزیکی-دیجیتال: لیبل بسته‌بندی و کافه (Phygital Touchpoints) [HK+]

بسته‌بندی غذا و منوی کافه، پرتکرارترین نقاط تماس روزانه مشتری با برند هستند. لیبل دایره‌ای سبز شبیه توپ تنیس در برندبوک هیچ اطلاعات کاربردی به مشتری و آشپزخانه نمی‌دهد و در بخش D-11 بریف محصول با یک سیستم لیبل‌زنی ساختارمند جایگزین شد.

### ۱۷.۱ معماری اطلاعات لیبل بسته‌بندی (Smart Packaging Label — D-11)

لیبل روی ظروف پکیج باید قابلیت چاپ با لیبل‌پرینتر حرارتی مستقیم (تک‌رنگ مشکی ink روی کاغذ مات کرم/سفید یا کاغذ کرافت روشن با نوار رنگی وعده) را در کف آشپزخانه داشته باشد:

```
┌──────────────────────────────────────────────────────┐
│ [نشان حس خوب]                        شنبه ۱۲ آبان ۱۴۰۵ │
│                                                      │
│ ناهار · گزینه ۱                        تیپ ۱٬۸۰۰ کالری │
│ ──────────────────────────────────────────────────── │
│ سینه مرغ گریل با کینوا و سبزیجات تنوری               │
│                                                      │
│ ┌──────────┬──────────┬────────────┬──────────┐      │
│ │ کالری    │ پروتئین  │ کربوهیدرات │ چربی     │      │
│ │ ۵۴۰ kcal │ ۴۶ گرم   │ ۴۸ گرم     │ ۱۸ گرم   │      │
│ └──────────┴──────────┴────────────┴──────────┘      │
│                                                      │
│ مشتری: بهراد مهدوی                   منطقه: سجاد (۱) │
│ حساسیت ثبت‌شده: بدون بادام‌زمینی                     │
│                                           ┌────────┐ │
│ چطور بود؟ اسکن کن و در ۳ ثانیه امتیاز بده ◄ │ [ QR ] │ │
│ گرم کردن: ۲ دقیقه در مایکروویو (بدون درپوش) └────────┘ │
└──────────────────────────────────────────────────────┘
```

**قواعد اجرایی لیبل:**

- **سلسله‌مراتب تایپوگرافی:** نام غذا با IRANSans Bold (۱۴pt)، جدول ماکروها با ارقام فارسی درشت و واضح، نام مشتری و منطقه در پایین برای سرعت تفکیک توسط بسته‌بند و پیک.
- **کد QR پویا:** شامل توکن یکتای همان وعده (`meal_assignment_id`) است. مشتری با اسکن آن با دوربین گوشی، مستقیماً به شیت امتیازدهی ۱ لمسی (A-19) همان غذا هدایت می‌شود (بدون نیاز به گشتن در اپ).

### ۱۷.۲ سیستم بصری کافه بوتیک (F-01 تا F-06)

طبق قاعده ۳.۵ (بند ۷)، در محیط دیجیتال و فیزیکی کافه، رنگ‌های گرم خانواده tan (`#BE915C`) و orange (`#E26934`) در کنار ink و neutral-50 نقش اول را بازی می‌کنند تا اتمسفر «کافه‌بوتیک سلامتی» از فضای کلینیکی متمایز شود:

- در منوی QR کافه (F-02)، اگر کاربر با همان مرورگر PWA لاگین باشد (F-05)، بالای هر آیتم منوی کافه یک نشان کوچک آبی (`primary.subtle`) نمایش داده می‌شود: «متناسب با بودجه کالری امروزت (۳۸۰ کالری باقی‌مانده)».

---

## ۱۶. دسترسی‌پذیری، کارایی و کیفیت اجرایی (a11y & Performance) [HK+]

### ۱۸.۱ چک‌لیست الزامی دسترسی‌پذیری (WCAG 2.2 سطح AA)

- **کنتراست تاییدشده:** فقط جفت‌رنگ‌های جدول ۳.۴ مجازند. هیچ متنی با کنتراست زیر ۴٫۵:۱ و هیچ حاشیه فیلد یا آیکون کنترلی با کنتراست زیر ۳:۱ منتشر نمی‌شود.
- **اندازه هدف لمسی (Target Size):** در اپ مشتری حداقل ۴۸×۴۸px و در پنل‌های متراکم حداقل ۳۲×۳۲px (فاصله امن حداقل ۸px بین دو دکمه مجاور).
- **ناوبری صفحه‌کلید و صفحه‌خوان:** تمام کنترل‌های سفارشی (چیپ‌های انتخاب غذا، اسلایدر وزن، تب‌ها) باید دارای نقش‌های استاندارد ARIA (`role="radiogroup"`، `aria-checked`، `aria-live="polite"` برای اعلام تغییر کالری) باشند.
- **استقلال از رنگ:** در نمودارها از ترکیب خط پر و خط‌چین، و در نشان‌های وضعیت از ترکیب رنگ + آیکون + متن استفاده می‌شود.

### ۱۸.۲ بودجه کارایی و حالت آفلاین (Performance Budget — A-35, A-36)

| شاخص | سقف مجاز (روی شبکه 4G متوسط ایران) | راهکار در سیستم دیزاین |
|---|---|---|
| حجم کل فونت‌ها در بارگذاری اول | حداکثر ۹۵ کیلوبایت | زیرمجموعه‌سازی (Subsetting) فونت IRANSans فقط به گلیف‌های فارسی و بارگذاری تنها ۳ وزن (۴۰۰، ۵۰۰، ۷۰۰) در صفحه اول با woff2 |
| LCP (بزرگ‌ترین عنصر محتوایی) | زیر ۲٫۲ ثانیه | فرمت AVIF/WebP برای عکس وعده‌ها، ابعاد صریح width/height برای جلوگیری از پرش صفحه (CLS < 0.05) |
| جاوااسکریپت اولیه (First Load JS) | زیر ۱۴۰ کیلوبایت (فشرده) | لود تنبل (Lazy Load) برای کتابخانه نمودار و ماژول‌های خارج از نمای اول |
| تجربه آفلاین (Offline Fallback) | نمایش کامل صفحه «امروز» و «منوی هفته» | ذخیره JSON برنامه هفته جاری در IndexedDB؛ اگر کاربر در آسانسور یا بدون اینترنت چک‌این جمعه را ثبت کرد، نمایش نشان در صف ارسال خودکار به محض اتصال به جای خطای قرمز شبکه |

---

## ۱۷. حاکمیت دیزاین و تحویل به تیم فنی (Governance & Handoff) [HK+]

برای اینکه این سند روی کاغذ نماند و بین دیزاینر، فرانت‌اند و بک‌اند واگرایی ایجاد نشود:

- **منبع حقیقت واحد (Single Source of Truth):** فایل JSON توکن‌ها (بخش ۸.۷) در مخزن گیت پروژه (`packages/design-tokens`) نگهداری می‌شود. متغیرهای Figma و فایل `tokens.css` و `tailwind.config.js` همگی از روی این فایل تولید می‌شوند.
- **قانون بازبینی کد (PR Lint Rule):** یک قانون Stylelint/ESLint در CI/CD قرار می‌گیرد که هرگونه کد هگز خام (`#...`)، واحد پیکسلی خارج از توکن‌های فضا، و کلاس‌های جهت‌دار فیزیکی (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-left`, `text-right`) را در کامپوننت‌ها مسدود می‌کند (استفاده اجباری از ویژگی‌های منطقی `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`).
- **تست بصری در Storybook:** هر کامپوننت در Storybook باید در ۴ حالت به‌صورت همزمان رندر و تست شود:
  1. Light + Comfortable (RTL) (اپ مشتری)
  2. Dark + Comfortable (RTL) (اپ مشتری در شب)
  3. Light + Compact (RTL) (پنل کارشناس و آشپزخانه)
  4. Large Text (125% Zoom) (آزمون نشکستن چیدمان با فونت بزرگ گوشی کاربران)

---

## ۱۸. چک‌لیست ممیزی پیش از انتشار هر صفحه (Design QA Checklist)

قبل از اینکه هر فیچر از فاز طراحی و توسعه خارج شود، باید از این ۱۰ فیلتر عبور کند:

- [ ] **قانون ۸۰/۱۵/۵:** آیا حداقل ۸۰٪ سطح صفحه از رنگ‌های خنثی گرم (canvas, surface, subtle) تشکیل شده و حداکثر ۲ رنگ لهجه در صفحه وجود دارد؟
- [ ] **یک صفحه، یک کار:** آیا اقدام اصلی صفحه (`primary.fill`) در کمتر از ۲ ثانیه بدون ابهام مشخص است؟
- [ ] **احترام به بدن:** آیا در تمام پیام‌ها، نمودارها و برچسب‌ها، از رنگ قرمز و ادبیات سرزنش‌گر برای وزن و غذا پرهیز شده است؟
- [ ] **فارسی اول و RTL:** آیا تمام اعداد با `Intl.NumberFormat('fa-IR')` فارسی شده‌اند، هیچ `letter-spacing` روی متن فارسی نیست و آیکون‌های جهت‌دار در RTL آینه شده‌اند؟
- [ ] **تضاد متن روی رنگ:** آیا روی تمام پس‌زمینه‌های yellow, lime, ice, tan و orange-500 از متن تیره (ink) استفاده شده است؟
- [ ] **گوشه برگ کنترل‌شده:** آیا حداکثر یک کارت با شعاع `radius.leaf` در صفحه وجود دارد؟
- [ ] **گلیف در برابر آیکون:** آیا گلیف‌های ۱۷گانه برند فقط در لحظه‌های عاطفی/تزئینی به کار رفته‌اند و در کنترل‌های کاربردی فقط از آیکون‌های خطی ۲۴×۲۴ استفاده شده است؟
- [ ] **موبایل و لمس:** آیا صفحه در عرض ۳۶۰px بدون اسکرول افقی کار می‌کند، فونت فیلدهای ورودی حداقل ۱۶px است و ناحیه لمس دکمه‌ها حداقل ۴۸×۴۸px است؟
- [ ] **حالت‌های کامل داده:** آیا علاوه بر حالت ایده‌آل (Happy Path)، حالت‌های خالی (Empty State با گلیف و اقدام)، در حال بارگذاری (Skeleton)، آفلاین و خطای طولانی‌شدن متن طراحی شده‌اند؟
- [ ] **ردیابی کاکپیت:** آیا رویدادهای تحلیلی صفحه طبق طرح رویداد (I-01) به کنش‌های کاربری متصل شده‌اند؟
