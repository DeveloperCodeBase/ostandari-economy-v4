# سند جامع شاهکار معماری، طراحی شیشه مایع نئونی (Liquid-Neon Glassmorphism) و پلن پیاده‌سازی خط‌به‌خط در Google AI Studio (نسخه ۲.۰ — بدون هیچ‌گونه تکرار چیدمان یا داده)
## پلتفرم «مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران» (برند رسمی: «فرمانِ اقتصاد تهران | TEHRAN ECON-COMMAND»)
**طراحی، معماری سامانه و توسعه هوش مصنوعی توسط: «شرکت شبکه هوشمند ابتکار ویستا» (Vista Innovation Smart Network Co.)**

---

## ۰. قوانین طلایی و خط قرمزهای مطلق برای Google AI Studio (پرامپت ضدتکرار و ضدتمپلیت ساده)

> **⚠️ دستورالعمل فوق‌العاده حیاتی و اجباری برای هوش مصنوعی سازنده کد در Google AI Studio (حتماً در ابتدای System Instructions قرار گیرد):**
>
> ۱. **ممنوعیت مطلق یکسان‌سازی صفحات (ZERO-DUPLICATION MANDATE)**:
> اکیداً ممنوع است که یک کامپوننت تکراری (مثلاً ۴ کارت KPI بالا و ۱ نمودار پایین) بسازی و برای هر ۱۱ منوی سایدبار همان چیدمان یا همان اطلاعات را تکرار کنی! **هر یک از ۱۱ بخش اصلی سامانه باید یک کامپوننت مستقل با ساختار گرید (CSS Grid) کاملاً متفاوت، ویجت‌های کنترلی اختصاصی، جداول اختصاصی، نمودارهای متفاوت، ایجنت هوش مصنوعی تخصصی همان حوزه، سناریوهای اختصاصی و داده‌های ۱۰۰٪ واقعی و متمایز مربوط به استان تهران باشد.**
>
> ۲. **الزام مطلق به تم «شیشه مایع و نئونی» (Liquid-Neon Glassmorphism) در دو حالت تیره (Dark Mode) و روشن (Light Mode) رسمی**:
> تم سامانه باید دقیقاً بر اساس کدهای مرجع `liquid-glass.css`، `Glassy-Navigation`، `Glassy-Sidebar` و `Glassy-Carousel` پیاده‌سازی شود. تمام پنل‌ها و کارت‌ها باید دارای شفافیت چندلایه (`backdrop-filter: blur(28px) saturate(145%)`)، لبه نورانی منشوری (`::after` با `mask-composite: exclude`)، گوی‌های نوری شناور در پس‌زمینه (`.liquid-orbs`)، دنبال‌کننده نور ماوس روی کارت‌ها (`--spot-x` و `--spot-y`) و شیب سه‌بعدی نوار ابزار بالا (`--shine-x`، `--tilt-x`، `--tilt-y`) باشند. هر دو حالت **تیره رسمی (سرمه‌ای کهکشانی `#071321` با نئون بنفش `#b5a5ff`، فیروزه‌ای `#8bd9ff` و زمردی `#7ee3bc`)** و **روشن رسمی (مرواریدی نقره‌ای `#e9eff8` با شیشه مات `#ffffffa6`، بنفش سلطنتی `#6944c8` و آبی یاقوتی `#146a9c`)** باید با دکمه خورشید/ماه (`#theme-button`) در لحظه تغییر کنند.
>
> ۳. **سایدبار شیشه‌ای جمع‌شونده در سمت راست صفحه (`RTL Right-Docked Sidebar`)**:
> کل پلتفرم راست‌به‌چپ (`dir="rtl" lang="fa"`) است. سایدبار شیشه‌ای (`.sidebar.glass` / `.gs-root`) **حتماً و لزوماً در سمت راست صفحه** قرار می‌گیرد، دارای دکمه گرد جمع‌کننده روی لبه چپ سایدبار (`inset-inline-end: -13px`) است که در ۳۴۰ میلی‌ثانیه بین حالت باز (`280px` با برند کامل `فرمانِ اقتصاد تهران`) و حالت جمع‌شده (`80px` با برند خلاصه `ف‌ات` و تولتیپ شناور) تغییر وضعیت می‌دهد و هر آیتم منو با کلیک، صفحه متناظر را بدون رفرش و با انیمیشن `card-in` باز می‌کند.
>
> ۴. **نقشه ماهواره‌ای سه‌بعدی واقعی (Google Earth / Satellite 3D GIS)**:
> ماژول GIS و نقشه‌های داخل صفحات نباید یک شکل ساده یا خالی باشند؛ باید از موتور **Leaflet + تایل‌های ماهواره‌ای با وضوح بالای Esri World Imagery و برچسب‌های هیبریدی گوگل + زاویه دید سه‌بعدی (`perspective(1200px) rotateX(28deg)`)** استفاده کنند و مختصات واقعی هر **۱۶ شهرستان استان تهران، ۲۲ شهرک صنعتی، ۵ سد بزرگ تامین آب (لار، لتیان، امیرکبیر/کرج، طالقان، ماملو)، ۶ گمرک و پایانه لجستیکی و ۳۰۵ میدان تره‌بار** را با مارکرهای نئونی تپنده و پاپ‌آپ‌های شیشه‌ای نمایش دهند.
>
> ۵. **چت‌بات‌های هوشمند و ایجنت‌های فعال در تمام صفحات**:
> چت‌بات‌ها باید هم به SDK رسمی `@google/genai` (`gemini-2.5-flash` با ابزار جستجوی زنده `tools: [{ googleSearch: {} }]`) متصل باشند و هم دارای **موتور پاسخگویی تحلیلی داخلی (Deterministic Domain Intelligence Engine)** باشند تا در هر شرایطی (حتی بدون کلید API یا قطعی اینترنت) به صورت فوری، دقیق و مستند بر اساس داده‌های واقعی همان صفحه، نقش کاربر و شهرستان انتخاب‌شده پاسخ دهند، جدول و سناریو تولید کنند و روی نمودارها زوم کنند.
>
> ۶. **کپی‌رایت و امضای رسمی طراح در فوتر تمام صفحات**:
> در پایین لندینگ پیج، صفحه لاگین، فوتر شیشه‌ای داشبورد و پایین سایدبار، جمله رسمی زیر با طراحی شیشه‌ای و نشان نئونی درج شود:
> **«طراحی، معماری سامانه و توسعه هوش مصنوعی توسط شرکت شبکه هوشمند ابتکار ویستا | کلیه حقوق مادی، معنوی و مالکیت فکری این پلتفرم محفوظ و متعلق به شرکت شبکه هوشمند ابتکار ویستا می‌باشد © ۱۴۰۵»**

---

## ۱. سیستم طراحی شیشه مایع و نئونی (Liquid-Neon Glassmorphic Design System) — کد کامل و آماده کپی

این بخش شامل **کد دقیق CSS و متغیرهای رنگی** استخراج‌شده و بهینه‌شده از سه بسته مرجع (`Glassy-CRM-Dashboard`، `Glassy-Navigation-Source` و `Glassy-Carousel`) است که باید مستقیماً در فایل استایل سراسری پروژه (`src/styles/liquid-glass.css`) قرار گیرد.

### ۱.۱. کد کامل `src/styles/liquid-glass.css` (پشتیبانی کامل از Dark Mode، Light Mode، RTL، سایدبار راست، نوبار سه‌بعدی و کروسل شیشه‌ای)

```css
/* ==========================================================================
   TEHRAN ECON-COMMAND · LIQUID-NEON GLASSMORPHIC MATERIAL SYSTEM (V2.0)
   Architected by: شرکت شبکه هوشمند ابتکار ویستا (Vista Innovation Smart Network Co.)
   ========================================================================== */

@import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');

/* 01 · Official Sovereign Dark Theme (Default) & Executive Pearl Light Theme */
:root,
html[data-theme="dark"],
body[data-theme="dark"] {
  color-scheme: dark;
  --font-sans: 'Vazirmatn', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --radius: 24px;
  --radius-lg: 32px;
  --sidebar-width: 280px;
  --ease: cubic-bezier(.22, .72, .18, 1);

  /* Core Ink & Accents */
  --text: #f3f7ff;
  --muted: #b7c3d9;
  --faint: #98aac4;
  --purple: #b3a1ff;
  --cyan: #71d8ff;
  --mint: #70dec0;
  --coral: #ff9eb5;
  --yellow: #f7d686;

  /* Liquid Glass Tokens (Dark) */
  --lg-canvas: #071321;
  --lg-ink: #f3f7ff;
  --lg-secondary: #d2dbea;
  --lg-muted: #b7c3d9;
  --lg-faint: #98aac4;
  --lg-accent: #b5a5ff;
  --lg-blue: #8bd9ff;
  --lg-success: #7ee3bc;
  --lg-warning: #f6d48a;
  --lg-danger: #ffa4ba;
  --lg-success-bg: #31aa7825;
  --lg-warning-bg: #d49b1926;
  --lg-danger-bg: #df507025;
  --lg-accent-bg: #ac95ff24;
  --lg-blue-bg: #299ed32b;
  --lg-border: #dae9ff28;
  --lg-border-strong: #e7f1ff52;
  --lg-divider: #dbe8ff18;
  --lg-edge: #ffffff82;
  --lg-edge-soft: #dbedff22;
  --lg-panel: linear-gradient(132deg, #d2e4ff13 0%, #9dafd008 38%, #0d1e3547 100%);
  --lg-sidebar: linear-gradient(142deg, #cfdaff1c, #25355d28 38%, #10273b40);
  --lg-card: linear-gradient(145deg, #e3eeff17 0%, #becce00a 37%, #0a182744 100%);
  --lg-inner: linear-gradient(125deg, #eef4ff0d, #aac4ec07);
  --lg-input: #091c304a;
  --lg-hover: #d1e6ff14;
  --lg-selected: linear-gradient(115deg, #d4c6ff34, #afbfff17);
  --lg-popup: linear-gradient(134deg, #273b51f2, #132439f5 65%, #142f42f2);
  --lg-solid: #16283b;
  --lg-shadow: 0 26px 75px #0107144f, 0 7px 19px #0108132b;
  --lg-card-shadow: 0 12px 32px #00091829, 0 3px 9px #00081017;
  --lg-card-hover-shadow: 0 21px 38px #00091d40, 0 6px 16px #0014272b;
  --lg-sheen: #ffffff10;
  --lg-spot: #c9ddff16;
  --lg-track: #ccdef417;
  --lg-grid: #dbeaff12;
  --lg-overlay: #040d2080;
  --lg-tooltip: #eff6ff;
  --lg-tooltip-ink: #182a43;
  --lg-orb-one: #7576ff52;
  --lg-orb-two: #37c3e13b;
  --lg-orb-three: #a66cea2b;
}

/* Official Executive Light Mode */
html[data-theme="light"],
body[data-theme="light"] {
  color-scheme: light;
  --text: #1f2b48;
  --muted: #596780;
  --faint: #65758e;
  --purple: #7151d4;
  --cyan: #187bae;
  --mint: #128266;
  --coral: #bc4263;
  --yellow: #9d6a0d;
  --lg-canvas: #e9eff8;
  --lg-ink: #1f2b48;
  --lg-secondary: #354761;
  --lg-muted: #596780;
  --lg-faint: #65758e;
  --lg-accent: #6944c8;
  --lg-blue: #146a9c;
  --lg-success: #126d55;
  --lg-warning: #885b08;
  --lg-danger: #ac3456;
  --lg-success-bg: #30b68a16;
  --lg-warning-bg: #dda3271c;
  --lg-danger-bg: #db54781b;
  --lg-accent-bg: #9171eb1a;
  --lg-blue-bg: #419cc91a;
  --lg-border: #7386ab30;
  --lg-border-strong: #7d89bb58;
  --lg-divider: #7185ab23;
  --lg-edge: #ffffffef;
  --lg-edge-soft: #ffffffa6;
  --lg-panel: linear-gradient(135deg, #ffffff80 0%, #ffffff38 43%, #e6efff61 100%);
  --lg-sidebar: linear-gradient(140deg, #ffffffba, #edf0ff65 50%, #e4f6ff91);
  --lg-card: linear-gradient(145deg, #ffffffa6 0%, #ffffff5c 40%, #eef5ff85 100%);
  --lg-inner: linear-gradient(128deg, #ffffff78, #ffffff3b);
  --lg-input: #ffffff66;
  --lg-hover: #ffffff8c;
  --lg-selected: linear-gradient(115deg, #ffffffdd, #e8e1ffa6);
  --lg-popup: linear-gradient(135deg, #fafbffed, #eff6fff7 60%, #e9f6fff2);
  --lg-solid: #f2f6fd;
  --lg-shadow: 0 26px 65px #46537b1b, 0 6px 18px #5061830c;
  --lg-card-shadow: 0 11px 28px #5e76a10d, 0 3px 8px #7388b30a;
  --lg-card-hover-shadow: 0 18px 35px #54678e1c, 0 6px 14px #6981b314;
  --lg-sheen: #ffffff52;
  --lg-spot: #ffffff69;
  --lg-track: #8c9dbc23;
  --lg-grid: #526a931e;
  --lg-overlay: #24395f2b;
  --lg-tooltip: #23344e;
  --lg-tooltip-ink: #f7faff;
  --lg-orb-one: #aaa0ff30;
  --lg-orb-two: #80d9f23b;
  --lg-orb-three: #e6b3fa2b;
}

* { box-sizing: border-box; }
html {
  direction: rtl;
  lang: fa;
  min-height: 100%;
  font-family: var(--font-sans);
  scrollbar-color: var(--lg-border-strong) transparent;
  scrollbar-width: thin;
}
body {
  margin: 0;
  min-height: 100dvh;
  direction: rtl;
  color: var(--lg-ink);
  background-color: var(--lg-canvas);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  transition: color .24s ease, background-color .24s ease;
  overflow-x: hidden;
}

/* 02 · Animated Liquid Orbs & Ambient Volumetric Lighting */
.ambient-light {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 12% 18%, #99abff14, transparent 58%),
    radial-gradient(ellipse at 88% 82%, #66e0fa12, transparent 60%),
    linear-gradient(120deg, #07132608, #07152c28);
}
body[data-theme="light"] .ambient-light {
  background:
    radial-gradient(ellipse at 10% 16%, #ffffff65, transparent 63%),
    linear-gradient(125deg, #ffffff20, #dce8ff35);
}
.liquid-orbs {
  position: fixed;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
}
.liquid-orb {
  position: absolute;
  width: 42vw;
  aspect-ratio: 1;
  border-radius: 50%;
  opacity: .56;
  background: radial-gradient(circle, var(--lg-orb-one), transparent 66%);
  animation: liquid-drift 20s ease-in-out infinite alternate;
}
.liquid-orb--one { inset: -15% -12% auto auto; }
.liquid-orb--two {
  width: 48vw;
  inset: auto auto -29% -13%;
  background: radial-gradient(circle, var(--lg-orb-two), transparent 66%);
  animation-duration: 25s;
  animation-delay: -7s;
}
.liquid-orb--three {
  width: 36vw;
  inset: 34% 43% auto auto;
  background: radial-gradient(circle, var(--lg-orb-three), transparent 68%);
  animation-duration: 28s;
  animation-delay: -12s;
}
@keyframes liquid-drift {
  from { transform: translate3d(-2%, -2%, 0) scale(1); }
  to { transform: translate3d(7%, 5%, 0) scale(1.08); }
}

/* 03 · Three-Layer Optical Liquid Glass (.glass & .card) */
.glass {
  position: relative;
  isolation: isolate;
  color: var(--lg-ink);
  border: 1px solid var(--lg-border);
  background: var(--lg-panel);
  box-shadow:
    inset 1px 1px 1px var(--lg-edge),
    inset -1px -1px 1px var(--lg-edge-soft),
    var(--lg-shadow);
  -webkit-backdrop-filter: blur(28px) saturate(145%);
  backdrop-filter: blur(28px) saturate(145%);
}
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(125deg, #ffffff0f, transparent 11%, var(--lg-sheen) 16%, transparent 29%, transparent 69%, #e0f4ff05 100%);
}
.glass::after, .card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 1px 0 var(--lg-edge), inset 1px 0 0 var(--lg-edge-soft), inset 0 -1px 0 var(--lg-edge-soft);
}
@supports ((-webkit-mask-composite: xor) or (mask-composite: exclude)) {
  .glass::after, .card::after {
    padding: 1px;
    background: linear-gradient(135deg, var(--lg-edge), transparent 24%, transparent 46%, var(--lg-edge-soft) 76%, var(--lg-edge));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
}

.card {
  position: relative;
  isolation: isolate;
  min-width: 0;
  padding: 18px;
  color: var(--lg-ink);
  border-radius: var(--radius);
  border: 1px solid var(--lg-border);
  border-block-start-color: var(--lg-border-strong);
  background: var(--lg-card);
  box-shadow:
    inset 1px 1px 1px var(--lg-edge-soft),
    inset 0 -1px 1px var(--lg-edge-soft),
    var(--lg-card-shadow);
  -webkit-backdrop-filter: blur(18px) saturate(138%);
  backdrop-filter: blur(18px) saturate(138%);
  transition: transform .28s var(--ease), box-shadow .28s ease, border-color .28s ease;
  overflow: hidden;
}
.card::before {
  content: "";
  position: absolute;
  z-index: -1;
  pointer-events: none;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(320px circle at var(--spot-x, 85%) var(--spot-y, 0%), var(--lg-spot), transparent 67%),
    linear-gradient(122deg, var(--lg-sheen), transparent 17%, #ffffff03 33%, transparent 53%);
}
.card:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 1px 1px 1px var(--lg-edge),
    inset 0 -1px 1px var(--lg-edge-soft),
    var(--lg-card-hover-shadow);
  border-block-start-color: var(--lg-edge);
}

/* Featured Violet Hero Lens Card (From Glassy-CRM) */
.card.featured {
  color: #fff;
  background:
    radial-gradient(ellipse at 82% -8%, #cbbbff70, transparent 70%),
    linear-gradient(126deg, #8973e9cc, #6450cde6 48%, #594cc6c9);
  border-color: #cec2ff75;
  border-block-start-color: #e8deffbf;
  box-shadow:
    inset 1px 1px 1px #ffffff8f,
    inset 0 -1px 1px #c9c8ff4d,
    0 15px 32px #5740be35,
    0 5px 12px #1a124a24;
}

/* 04 · RTL Workspace Shell with RIGHT-DOCKED Glassy Sidebar */
.workspace {
  direction: rtl;
  width: min(1840px, calc(100% - 32px));
  margin: 16px auto;
  min-height: calc(100dvh - 32px);
  display: grid;
  /* Because direction is RTL, Column 1 (--sidebar-width) is placed on the RIGHT! */
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  transition: grid-template-columns .34s var(--ease), gap .34s var(--ease);
}
.workspace[data-collapsed="true"] {
  --sidebar-width: 82px;
}

.sidebar {
  position: sticky;
  top: 16px;
  height: calc(100dvh - 32px);
  border-radius: var(--radius-lg);
  padding: 20px 14px 16px;
  background: var(--lg-sidebar);
  display: flex;
  flex-direction: column;
  z-index: 40;
}

/* Collapse Button on the INNER LEFT edge of the Right Sidebar */
.sidebar-toggle {
  position: absolute !important;
  inset-inline-end: -14px; /* In RTL, inline-end is the LEFT edge of the right sidebar */
  inset-block-start: 48px;
  z-index: 50;
  width: 30px !important;
  height: 30px !important;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--lg-secondary);
  background: var(--lg-solid) !important;
  border: 1px solid var(--lg-border-strong) !important;
  box-shadow: inset 0 1px 0 var(--lg-edge), 0 4px 12px #06122b35 !important;
  cursor: pointer;
  transition: transform .25s var(--ease), background .2s ease;
}
.sidebar-toggle:hover {
  background: var(--lg-selected) !important;
  color: var(--lg-ink);
  box-shadow: 0 0 14px var(--lg-accent) !important;
}

/* Active Nav Item with Neon Right Indicator Bar */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 14px;
  color: var(--lg-secondary);
  font-size: 13.5px;
  font-weight: 500;
  text-align: right;
  cursor: pointer;
  transition: all .18s var(--ease);
}
.nav-item:hover {
  color: var(--lg-ink);
  background: var(--lg-hover);
  border-color: var(--lg-border);
  box-shadow: inset 0 1px 0 var(--lg-edge-soft);
}
.nav-item.active {
  color: var(--lg-ink);
  background: var(--lg-selected);
  border-color: var(--lg-border-strong);
  box-shadow: inset 0 1px 1px var(--lg-edge), 0 5px 15px #06102b18;
  font-weight: 700;
}
.nav-item.active::after {
  content: "";
  position: absolute;
  inset-inline-start: 0; /* Right edge in RTL */
  width: 3px;
  height: 20px;
  background: var(--lg-accent);
  box-shadow: 0 0 12px var(--lg-accent);
  border-radius: 4px;
}

/* 05 · Glassy 3D Perspective Top Navbar (.gn-bar) */
.gn-bar {
  --shine-x: 50%;
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  min-height: 64px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  border: 1px solid var(--lg-border-strong);
  border-radius: 20px;
  background: var(--lg-panel);
  box-shadow: 0 15px 35px -23px #0008, inset 0 1px 0 var(--lg-edge);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  backdrop-filter: blur(22px) saturate(140%);
  transform: perspective(1100px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transition: transform 180ms ease, background 180ms ease;
  margin-bottom: 16px;
}
.gn-bar::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: -1px 16px auto;
  height: 1.5px;
  background: radial-gradient(ellipse 110px 2px at var(--shine-x) 50%, var(--lg-edge), rgba(181,165,255,.35) 56%, transparent 100%);
  filter: drop-shadow(0 0 4px var(--lg-accent));
}

/* 06 · 3D Glassy Fan Carousel (.gc-stage, .gc-deck, .gc-card) */
.gc-stage {
  position: relative;
  width: 100%;
  height: 410px;
  perspective: 1200px;
  overflow: hidden;
  border-radius: var(--radius);
}
.gc-deck {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 45%;
  transition: transform 700ms var(--ease);
}
.gc-card {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 250px;
  height: 330px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(255,255,255,.15), rgba(255,255,255,.06));
  box-shadow: inset 0 1px 2px rgba(255,255,255,.28), 0 22px 45px -24px rgba(0,0,0,.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transform-style: preserve-3d;
  transition: transform 680ms var(--ease), opacity 520ms ease, filter 520ms ease, border-color 350ms ease;
  cursor: pointer;
}
.gc-card.is-active {
  border-color: var(--lg-accent);
  box-shadow: inset 0 1px 2px #fff8, 0 0 28px rgba(181,165,255,.35), 0 25px 48px -22px rgba(0,0,0,.9);
}

/* 07 · Official Vista Innovation Smart Network Footer */
.vista-official-footer {
  margin-top: 20px;
  padding: 14px 22px;
  border-radius: 18px;
  border: 1px solid var(--lg-border);
  background: var(--lg-inner);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 11.5px;
  color: var(--lg-secondary);
  box-shadow: inset 0 1px 0 var(--lg-edge-soft);
}
.vista-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 99px;
  background: var(--lg-accent-bg);
  border: 1px solid var(--lg-border-strong);
  color: var(--lg-accent);
  font-weight: 700;
}
```

### ۱.۲. کد جاوااسکریپت/ری‌اکت دنبال‌کننده نور ماوس (Mouse Spotlight) و شیب سه‌بعدی نوبار (از `Glassy-CRM` و `Glassy-Navigation`)

در فایل `App.tsx` یک `useEffect` سراسری قرار دهید تا هنگام حرکت ماوس روی هر `.card`، `.sidebar` و `.gn-bar`، افکت نوری شیشه‌ای مایع دقیقاً زیر نشانگر ماوس حرکت کند:

```tsx
useEffect(() => {
  const handlePointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    // 1. Update Card & Sidebar Liquid Spotlight (--spot-x, --spot-y)
    const targetCard = (e.target as Element)?.closest?.('.card, .sidebar') as HTMLElement | null;
    if (targetCard) {
      const rect = targetCard.getBoundingClientRect();
      targetCard.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      targetCard.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    }
    // 2. Update Top Glassy Navbar 3D Tilt & Specular Shine (--shine-x, --tilt-x, --tilt-y)
    const navBar = (e.target as Element)?.closest?.('.gn-bar') as HTMLElement | null;
    if (navBar) {
      const rect = navBar.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      navBar.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
      navBar.style.setProperty('--tilt-y', `${((x - 0.5) * 1.25).toFixed(2)}deg`);
      navBar.style.setProperty('--tilt-x', `${((0.5 - y) * 1.3).toFixed(2)}deg`);
    }
  };
  document.addEventListener('pointermove', handlePointerMove, { passive: true });
  return () => document.removeEventListener('pointermove', handlePointerMove);
}, []);
```

---

## ۲. معماری ضدتکرار ۱۱ بخش اصلی سامانه (هر بخش = یک چیدمان منحصربه‌فرد + دیتای اختصاصی تهران + سیمولاتور و ایجنت اختصاصی)

> **🚨 دستور اکید به Google AI Studio**:
> در سایدبار سمت راست، ۱۱ ماژول زیر قرار دارند. **هیچ دو ماژولی نباید شبیه هم باشند!** جدول زیر، نقشه معماری بصری هر یک از ۱۱ صفحه را مشخص می‌کند که بر اساس الگوهای متمایز `Glassy-CRM-Dashboard` (`overview-view`, `orders-view`, `ecosystem-view`, `customers-view`, `performance-view`) و `Glassy-Carousel` طراحی شده‌اند:

| کد مسیر (`route`) | عنوان رسمی در سایدبار راست | الگوی چیدمان منحصربه‌فرد (Unique Grid Layout) | ویجت تعاملی اختصاصی (فقط در همین صفحه) | ایجنت هوش مصنوعی مقیم صفحه |
| :--- | :--- | :--- | :--- | :--- |
| **`#overview`** | **۱. اتاق فرمان کلان و نبض اقتصاد تهران** | **الگوی `overview-view` + کروسل سه‌بعدی `GlassyCarousel`**: بالا راست ۴ کارت متریک (کارت اول بنفش نئونی `featured`)، بالا چپ نمودار میله‌ای درخشان درآمد و رشد اقتصادی، وسط **کروسل شیشه‌ای سه‌بعدی ۱۶ شهرستان استان تهران**، پایین ۳ کارت خلاصه و دونات سهم بخش‌ها (`C.donut`) | **انتخابگر سه‌بعدی ۱۶ شهرستان** با افکت نور پس‌زمینه (`--glow`) و باز شدن کشوی شناسنامه شهرستان (`gc-morph`) | **ایجنت ۱: استراتژیست ارشد کلان (Macro Strategist)** |
| **`#treasury`** | **۲. خزانه‌داری، مالیات، بودجه و مولدسازی** | **الگوی `performance-view` (ماتریس مالی و حسابرسی)**: هدر اجرایی انتخاب فصل (`Q1` تا `Q4`)، ۴ شاخص کلان خزانه، وسط راست **نمودار کپسولی هدف‌گذاری مالیاتی (`C.capsules`)**، وسط چپ **دفتر کل تراز بودجه و تملک دارایی (`ledger-card`)**، پایین ۴ نشان انطباق قانونی و مولدسازی | **ماشین‌حساب تعاملی ماده ۱۰۰ (نشان‌دار کردن مالیات)** و بازتوزیع ۷۳ همت مالیات ارزش افزوده بین ۱۶ شهرستان | **ایجنت ۲: ممیز هوشمند مالیاتی و خزانه (Fiscal Auditor)** |
| **`#banking`** | **۳. شبکه بانکی، تسهیلات و هدایت اعتبار** | **الگوی `telemetry-matrix` (حلقه‌های تله‌متری + جدول ۲۸ بانک)**: بالا ۳ حلقه متحدالمرکز نئونی (`C.telemetry` برای نسبت مصارف به منابع، کفایت سرمایه و مطالبات غیرجاری)، وسط نمودار دوطرفه ورودی سپرده/خروجی تسهیلات (`C.throughput`)، پایین جدول زنده ۲۸ بانک عامل استان تهران | **تست استرس مطالبات غیرجاری (NPL Stress Tester)** و اهرم جابه‌جایی اعتبار از خدمات کاذب به صنعت | **ایجنت ۳: بازرس شبکه بانکی و اعتبارات (Credit Inspector)** |
| **`#industry`** | **۴. شهرک‌های صنعتی، معادن و تولید (صمت)** | **الگوی `ecosystem-view` + کروسل شهرک‌ها**: شبکه ۶ کارتی دارای **کلید روشن/خاموش زنده (`role="switch"`)** برای پایش زیرساخت‌های ۲۲ شهرک صنعتی (شمس‌آباد، عباس‌آباد، پرند، پایتخت، صفادشت، چرمشهر و...) + جدول واحدهای راکد کاندیدای احیا | **کنترلر کلیدهای زیرساختی شهرک‌های صنعتی** و فیلتر کلینیک صنعت برای ۱,۲۸۰ واحد نیمه‌فعال | **ایجنت ۴: دیده‌بان تولید و احیای صنایع (Industrial Reviver)** |
| **`#bread`** | **۵. زنجیره گندم، سیلوها، آرد و نان (نانینو)** | **الگوی `orders-view` (ترمینال زنده توزیع و صف نانینو)**: ستون راست **ترمینال زنده پایش ۱۰,۴۲۰ نانوایی و حواله‌های آرد** با تب‌های فیلتر (`همه`، `سهمیه نوع ۱`، `هشدار تراکنش نانینو`) و دکمه «آزادسازی سهمیه فوق‌العاده»، ستون وسط **منحنی سرعت پخت و مصرف آرد (`C.fulfillment`)**، ستون چپ **ظرفیت ۱۷ سیلوی گندم استان (`carrier-card`)** | **شبیه‌ساز هوشمند سهمیه آرد نانینو** و تخصیص آرد اضطراری به مناطق پرتراکم (تهران، شهریار، اسلامشهر، ملارد) | **ایجنت ۵: نگهبان امنیت غذایی و نانینو (Bread Chain Guardian)** |
| **`#bazaar`** | **۶. تنظیم بازار، میادین تره‌بار و اصناف** | **الگوی `customers-view` (تابلوی نرخنامه + گیج التهاب بازار)**: ستون راست کارت ویژه **میدان مرکزی و ۳۰۵ میدان میوه و تره‌بار شهرداری تهران (۱۷,۰۰۰ تن ورودی روزانه)**، وسط جدول زنده اختلاف قیمت مصوب/تره‌بار/بازار آزاد برای ۱۸ کالای اساسی، پایین **گیج ۱۸۰ درجه رضایت و آرامش بازار (`C.gauge`)** | **دکمه عملیاتی «تزریق ذخایر سردخانه‌ای مرغ، گوشت و میوه»** و صدور گشت مشترک تعزیرات و اتاق اصناف | **ایجنت ۶: رادار ضداحتکار و تنظیم بازار (Market Stabilizer)** |
| **`#agriculture`** | **۷. جهاد کشاورزی، گلخانه‌ها و دامپروری** | **الگوی `agri-cohort-view` (منحنی دوقطبی `C.cohort` + قطب‌های کشت)**: بالا نمودار مقایسه بهره‌وری کشت گلخانه‌ای در برابر کشت سنتی (`C.cohort`)، وسط ماتریس قطب‌های تخصصی (پاکدشت گل و گیاه، پیشوا گلخانه صیفی، اسلامشهر و ری گندم و شیر، دماوند باغات، فیروزکوه دام)، پایین پنل توزیع نهاده‌های دامی | **شبیه‌ساز تغییر الگوی کشت و تخصیص کنجاله سویا و ذرت دامی** به دامداری‌های صنعتی استان تهران | **ایجنت ۷: معمار کشاورزی مدرن و گلخانه (Agri-Tech Advisor)** |
| **`#customs`** | **۸. گمرکات ۶گانه، صادرات، واردات و لجستیک** | **الگوی `customs-hub-view` (داشبورد ۶ گمرک و بندر خشک آپرین)**: ۶ کارت شیشه‌ای زنده برای **گمرک شهریار، گمرک غرب تهران، گمرک فرودگاه امام (IKA)، گمرک مهرآباد، گمرک پستی و بندر خشک آپرین (ری)** با نوارهای ظرفیت انبار و زمان ترخیص + جدول کالاهای رسوبی | **اهرم مسیر سبز گمرکی (Green Channel Trigger)** برای ترخیص ۲۴ ساعته مواد اولیه کارخانجات و دارو | **ایجنت ۸: فرمانده لجستیک و تجارت خارجی (Customs Navigator)** |
| **`#labor`** | **۹. اشتغال، بازار کار، تامین اجتماعی و رفاه** | **الگوی `labor-welfare-view` (برش دهک‌ها و سامانه رصد اشتغال)**: کارت رهگیری **تعهد ۱۸۰,۰۰۰ شغل جدید استان تهران** به تفکیک شهرستان و دستگاه اجرایی، نمودار نرخ بیکاری (۴.۸٪ کل، جوانان و زنان) و بیمه‌شدگان تامین اجتماعی، پایین ماتریس مسکن کارگری (پردیس، پرند، اندیشه) | **تخصیص‌گر هوشمند تسهیلات اشتغال تبصره ۱۸** بر اساس نرخ بیکاری و ظرفیت جذب هر شهرستان | **ایجنت ۹: تحلیلگر اشتغال و رفاه اجتماعی (Labor Economist)** |
| **`#energy`** | **۱۰. ناترازی انرژی، برق منطقه‌ای و ۵ سد تهران** | **الگوی `scada-dams-energy-view` (اسکادای ۵ سد + شبکه برق)**: ردیف اول **۵ استوانه شیشه‌ای متحرک آب برای سدهای امیرکبیر (کرج)، لتیان، لار، طالقان و ماملو** با حجم دقیق میلیون مترمکعب، ردیف دوم پایش پیک بار شرکت برق منطقه‌ای تهران و پروژه ۱۲۰ مگاوات پنل خورشیدی پشت‌بامی و شهرک‌های صنعتی | **مدیریت هوشمند شیفت برق شهرک‌های صنعتی و تخصیص پساب تصفیه‌خانه‌ها** به صنعت و کشاورزی | **ایجنت ۱۰: کنترلگر تاب‌آوری آب و انرژی (Energy & Hydro Grid AI)** |
| **`#gis`** | **۱۱. نقشه ماهواره‌ای سه‌بعدی (Google Earth 3D GIS) و اتاق جنگ سناریو** | **الگوی تمام‌صفحه ماهواره‌ای سه‌بعدی + کابین ۱۲ اسلایدر اتاق جنگ**: بالا نقشه ماهواره‌ای واقعی Esri World Imagery با زاویه دید سه‌بعدی Google Earth و لایه‌های ۱۶ شهرستان/۲۲ شهرک/۵ سد/۶ گمرک، پایین **موتور سناریوسازی دوگانه (دستی + تولید خودکار هوش مصنوعی)** و میزگرد مناظره زنده ایجنت‌ها | **کنترلر ۱۲ اهرم سیاستی و شوک اقتصادی («اگر چنین کنیم چه می‌شود؟»)** با نمایش موج اول تا سوم روی نقشه ماهواره‌ای | **شورای ۱۰ ایجنت (Multi-Agent Council War Room)** |

---

## ۳. بانک جامع داده‌های ۱۰۰٪ واقعی و مستند استان تهران (`src/data/tehranMasterData.ts`)

> **🔥 بسیار مهم برای Google AI Studio**:
> تمام داده‌های زیر از منابع رسمی (مرکز آمار ایران، استانداری تهران، اداره‌کل امور اقتصادی و دارایی، سازمان مدیریت و برنامه‌ریزی، شرکت شهرک‌های صنعتی، شرکت آب منطقه‌ای، برق منطقه‌ای، گمرک تهران، جهاد کشاورزی و سازمان میادین میوه و تره‌بار) استخراج شده‌اند. **حتماً کل این فایل داده را عیناً در پروژه بساز تا هیچ صفحه‌ای دیتای تکراری یا خالی نداشته باشد!**

```typescript
// src/data/tehranMasterData.ts
// بانک جامع و اختصاصی داده‌های واقعی استان تهران — طراحی شده توسط شرکت شبکه هوشمند ابتکار ویستا

export interface CountyEconomicProfile {
  id: string;
  name: string;
  governorateType: 'فرمانداری مرکز استان' | 'فرمانداری ویژه' | 'فرمانداری عادی';
  governorRoleTitle: string;
  lat: number;
  lng: number;
  population1395: number;
  estimatedPopulation1405: number;
  gdpSharePercent: number;
  taxRevenue5M_Hemmat: number; // از کل ۳۹۳ همت ۵ ماهه
  vatShare_BillionToman: number;
  unemploymentRate: number;
  employmentTarget1405: number; // از کل ۱۸۰,۰۰۰ شغل هدف‌گذاری شده استان
  employmentRealizedPercent: number;
  activeIndustrialUnits: number;
  stagnantIndustrialUnits: number;
  bakeriesCount: number; // از کل ۱۰,۴۲۰ نانوایی استان
  dailyFlourQuota_Sacks: number;
  greenhouseArea_Hectares: number;
  agriculturalOutput_Tons: number;
  powerImbalance_MW: number;
  waterStressIndex: number; // 0 to 100
  keyEconomicPoles: string[];
  industrialEstates: string[];
  topCrisisAlert: string;
  glowColor: string;
  washColor: string;
}

export const TEHRAN_16_COUNTIES: CountyEconomicProfile[] = [
  {
    id: 'tehran',
    name: 'تهران (کلان‌شهر و حومه)',
    governorateType: 'فرمانداری مرکز استان',
    governorRoleTitle: 'معاون استاندار و فرماندار تهران',
    lat: 35.6892,
    lng: 51.3890,
    population1395: 8737510,
    estimatedPopulation1405: 9650000,
    gdpSharePercent: 68.4,
    taxRevenue5M_Hemmat: 312.5,
    vatShare_BillionToman: 48500,
    unemploymentRate: 4.5,
    employmentTarget1405: 88000,
    employmentRealizedPercent: 79,
    activeIndustrialUnits: 4250,
    stagnantIndustrialUnits: 310,
    bakeriesCount: 5240,
    dailyFlourQuota_Sacks: 62800,
    greenhouseArea_Hectares: 45,
    agriculturalOutput_Tons: 185000,
    powerImbalance_MW: 1420,
    waterStressIndex: 84,
    keyEconomicPoles: ['مالی و بانکداری مرکزی (۶۰.۵٪ سپرده کشور)', 'بازار بزرگ تهران', 'پارک فناوری و اقتصاد دیجیتال', '۳۰۵ میدان میوه و تره‌بار'],
    industrialEstates: ['شهرک صنعتی شمس‌آباد (بخش مرکزی/ری)', 'منطقه صنعتی اتحاد و سازمان آب', 'منطقه صنعتی جاده مخصوص (لشگری)'],
    topCrisisAlert: 'تورم نقطه به نقطه اجاره‌بها (۴۶.۲٪) و ناترازی ۱,۴۲۰ مگاواتی برق در پیک تابستان',
    glowColor: '#6d5dfc',
    washColor: '#1e1b4b'
  },
  {
    id: 'shahriar',
    name: 'شهریار',
    governorateType: 'فرمانداری ویژه',
    governorRoleTitle: 'معاون استاندار و فرماندار ویژه شهریار',
    lat: 35.6597,
    lng: 51.0592,
    population1395: 744210,
    estimatedPopulation1405: 920000,
    gdpSharePercent: 5.2,
    taxRevenue5M_Hemmat: 14.8,
    vatShare_BillionToman: 3420,
    unemploymentRate: 5.1,
    employmentTarget1405: 14500,
    employmentRealizedPercent: 74,
    activeIndustrialUnits: 1180,
    stagnantIndustrialUnits: 145,
    bakeriesCount: 890,
    dailyFlourQuota_Sacks: 10680,
    greenhouseArea_Hectares: 92,
    agriculturalOutput_Tons: 640000,
    powerImbalance_MW: 210,
    waterStressIndex: 78,
    keyEconomicPoles: ['گمرک شهریار (بزرگ‌ترین گمرک زمینی استان)', 'باغات میوه و صنایع تبدیلی غذایی', 'شهر جدید اندیشه'],
    industrialEstates: ['ناحیه صنعتی دهک', 'منطقه صنعتی گلگون', 'قطب لجستیک و انبارهای عمومی شهریار'],
    topCrisisAlert: 'رسوب ۱,۸۵۰ کانتینر مواد اولیه تولید در گمرک شهریار و تنش آبی باغات',
    glowColor: '#38bdf8',
    washColor: '#0c4a6e'
  },
  {
    id: 'eslamshahr',
    name: 'اسلامشهر',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار اسلامشهر',
    lat: 35.5446,
    lng: 51.2350,
    population1395: 548620,
    estimatedPopulation1405: 675000,
    gdpSharePercent: 4.1,
    taxRevenue5M_Hemmat: 11.2,
    vatShare_BillionToman: 2680,
    unemploymentRate: 5.4,
    employmentTarget1405: 11200,
    employmentRealizedPercent: 76,
    activeIndustrialUnits: 960,
    stagnantIndustrialUnits: 112,
    bakeriesCount: 680,
    dailyFlourQuota_Sacks: 8160,
    greenhouseArea_Hectares: 68,
    agriculturalOutput_Tons: 495000,
    powerImbalance_MW: 175,
    waterStressIndex: 76,
    keyEconomicPoles: ['بندر خشک و پایانه ریلی آپرین', 'قطب تولید گندم و لبنیات غرب/جنوب تهران', 'بازار مبل چهاردانگه'],
    industrialEstates: ['شهرک صنفی و صنعتی چهاردانگه', 'منطقه صنعتی شاطره', 'بندر خشک آپرین'],
    topCrisisAlert: 'نیاز فوری به تکمیل زیرساخت برق و گمرک اختصاصی بندر خشک آپرین',
    glowColor: '#34d399',
    washColor: '#064e3b'
  },
  {
    id: 'baharestan',
    name: 'بهارستان',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار بهارستان',
    lat: 35.5152,
    lng: 51.1610,
    population1395: 536329,
    estimatedPopulation1405: 660000,
    gdpSharePercent: 2.8,
    taxRevenue5M_Hemmat: 6.4,
    vatShare_BillionToman: 1950,
    unemploymentRate: 5.9,
    employmentTarget1405: 9800,
    employmentRealizedPercent: 68,
    activeIndustrialUnits: 740,
    stagnantIndustrialUnits: 98,
    bakeriesCount: 640,
    dailyFlourQuota_Sacks: 7850,
    greenhouseArea_Hectares: 24,
    agriculturalOutput_Tons: 120000,
    powerImbalance_MW: 130,
    waterStressIndex: 82,
    keyEconomicPoles: ['شهرک صنعتی نصیرآباد', 'خوشه بزرگ تولید کفش، کیف و پوشاک', 'صنایع چوب و فلز'],
    industrialEstates: ['شهرک صنعتی نصیرآباد', 'لکه‌های صنعتی گلستان و صالحیه'],
    topCrisisAlert: 'تراکم بالای جمعیتی در نسیم‌شهر و گلستان و نیاز به افزایش ۱۵٪ سهمیه آرد یارانه‌ای',
    glowColor: '#f472b6',
    washColor: '#500724'
  },
  {
    id: 'malard',
    name: 'ملارد',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار ملارد',
    lat: 35.6659,
    lng: 50.9767,
    population1395: 377292,
    estimatedPopulation1405: 470000,
    gdpSharePercent: 2.5,
    taxRevenue5M_Hemmat: 5.8,
    vatShare_BillionToman: 1620,
    unemploymentRate: 5.6,
    employmentTarget1405: 7600,
    employmentRealizedPercent: 71,
    activeIndustrialUnits: 620,
    stagnantIndustrialUnits: 84,
    bakeriesCount: 490,
    dailyFlourQuota_Sacks: 5880,
    greenhouseArea_Hectares: 85,
    agriculturalOutput_Tons: 510000,
    powerImbalance_MW: 115,
    waterStressIndex: 85,
    keyEconomicPoles: ['شهرک صنعتی غیردولتی صفادشت (۵۶۲ واحد صنعتی)', 'قطب دامپروری و قارچ خوراکی', 'صنایع غذایی و لبنی'],
    industrialEstates: ['شهرک صنعتی صفادشت (۵۰۰ هکتار)'],
    topCrisisAlert: 'فرونشست دشت ملارد و افت فشار گاز و برق در شهرک صنعتی صفادشت',
    glowColor: '#fbbf24',
    washColor: '#451a03'
  },
  {
    id: 'pakdasht',
    name: 'پاکدشت',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار پاکدشت',
    lat: 35.4817,
    lng: 51.6806,
    population1395: 350966,
    estimatedPopulation1405: 445000,
    gdpSharePercent: 4.6,
    taxRevenue5M_Hemmat: 13.5,
    vatShare_BillionToman: 2890,
    unemploymentRate: 4.2,
    employmentTarget1405: 10500,
    employmentRealizedPercent: 86,
    activeIndustrialUnits: 2150,
    stagnantIndustrialUnits: 165,
    bakeriesCount: 450,
    dailyFlourQuota_Sacks: 5400,
    greenhouseArea_Hectares: 1013, // رتبه اول گل و گیاه کشور از ۱,۲۵۸ هکتار استان
    agriculturalOutput_Tons: 580000,
    powerImbalance_MW: 310,
    waterStressIndex: 79,
    keyEconomicPoles: ['شهرک صنعتی عباس‌آباد (۱,۵۰۰ کارخانه)', 'شهرک صنعتی پایتخت و خوارزمی', 'رتبه ۱ تولید گل و گیاه گلخانه‌ای کشور (۱,۰۱۳ هکتار)', 'سیلوی ۴۰ هزار تنی گندم شریف‌آباد'],
    industrialEstates: ['شهرک صنعتی عباس‌آباد (۱,۰۰۰+ هکتار)', 'شهرک صنعتی پایتخت', 'شهرک صنعتی خوارزمی', 'منطقه صنعتی خاتون‌آباد'],
    topCrisisAlert: 'ناترازی ۳۱۰ مگاواتی برق در شهرک‌های صنعتی عباس‌آباد و پایتخت در ساعات اوج بار',
    glowColor: '#a78bfa',
    washColor: '#2e1065'
  },
  {
    id: 'rey',
    name: 'ری',
    governorateType: 'فرمانداری ویژه',
    governorRoleTitle: 'معاون استاندار و فرماندار ویژه شهرستان ری',
    lat: 35.5935,
    lng: 51.4344,
    population1395: 349700,
    estimatedPopulation1405: 440000,
    gdpSharePercent: 4.8,
    taxRevenue5M_Hemmat: 14.1,
    vatShare_BillionToman: 3100,
    unemploymentRate: 4.6,
    employmentTarget1405: 9500,
    employmentRealizedPercent: 83,
    activeIndustrialUnits: 1890,
    stagnantIndustrialUnits: 140,
    bakeriesCount: 460,
    dailyFlourQuota_Sacks: 5520,
    greenhouseArea_Hectares: 74,
    agriculturalOutput_Tons: 720000,
    powerImbalance_MW: 340,
    waterStressIndex: 81,
    keyEconomicPoles: ['شهرک صنعتی شمس‌آباد (بزرگ‌ترین شهرک صنعتی خاورمیانه با ۳,۰۰۰ هکتار)', 'پالایشگاه نفت تهران و انبارهای نفت ری', 'گمرک فرودگاه بین‌المللی امام خمینی (IKA)'],
    industrialEstates: ['شهرک صنعتی شمس‌آباد (۱,۴۰۰+ واحد بهره‌بردار)', 'ناحیه صنعتی سنگبری‌های شمس‌آباد'],
    topCrisisAlert: 'تأمین آب صنعتی پایدار برای شهرک صنعتی شمس‌آباد و مدیریت پساب جنوب تهران',
    glowColor: '#2dd4bf',
    washColor: '#134e4a'
  },
  {
    id: 'qods',
    name: 'قدس',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار شهرستان قدس',
    lat: 35.7114,
    lng: 51.1128,
    population1395: 316636,
    estimatedPopulation1405: 395000,
    gdpSharePercent: 1.9,
    taxRevenue5M_Hemmat: 4.9,
    vatShare_BillionToman: 1480,
    unemploymentRate: 5.0,
    employmentTarget1405: 6200,
    employmentRealizedPercent: 75,
    activeIndustrialUnits: 580,
    stagnantIndustrialUnits: 62,
    bakeriesCount: 380,
    dailyFlourQuota_Sacks: 4560,
    greenhouseArea_Hectares: 18,
    agriculturalOutput_Tons: 95000,
    powerImbalance_MW: 110,
    waterStressIndex: 77,
    keyEconomicPoles: ['قطب قطعه‌سازی خودرو و فلزکاری محور فتح و مخصوص', 'گمرک غرب تهران', 'پایانه‌های انبارداری غرب'],
    industrialEstates: ['منطقه صنعتی زاگرس و گلبرگ', 'لکه صنعتی قلعه حسن‌خان'],
    topCrisisAlert: 'نیاز به ساماندهی لکه‌های صنعتی غیرمجاز و ارتقای پست برق ۶۳ کیلوولت قدس',
    glowColor: '#60a5fa',
    washColor: '#172554'
  },
  {
    id: 'robatkarim',
    name: 'رباط‌کریم (و شهر جدید پرند)',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار رباط‌کریم',
    lat: 35.4769,
    lng: 51.0828,
    population1395: 291516,
    estimatedPopulation1405: 520000, // رشد شدید به واسطه مسکن مهر و نهضت ملی پرند
    gdpSharePercent: 2.1,
    taxRevenue5M_Hemmat: 4.6,
    vatShare_BillionToman: 1550,
    unemploymentRate: 5.3,
    employmentTarget1405: 8400,
    employmentRealizedPercent: 77,
    activeIndustrialUnits: 540,
    stagnantIndustrialUnits: 70,
    bakeriesCount: 410,
    dailyFlourQuota_Sacks: 5120,
    greenhouseArea_Hectares: 35,
    agriculturalOutput_Tons: 190000,
    powerImbalance_MW: 125,
    waterStressIndex: 80,
    keyEconomicPoles: ['شهرک صنعتی پرند (۳۵۸ هکتار و ۳۵۰+ کارخانه)', 'شهر جدید پرند (قطب مسکن کارگری و نهضت ملی)', 'شهرک صنفی-صنعتی زواره ای'],
    industrialEstates: ['شهرک صنعتی پرند', 'شهرک صنعتی نصیرشهر/رباط‌کریم'],
    topCrisisAlert: 'عدم توازن رشد جمعیت شهر جدید پرند با تعداد نانوایی‌ها، میادین تره‌بار و سرانه درمانی/رفاهی',
    glowColor: '#fb7185',
    washColor: '#4c0519'
  },
  {
    id: 'varamin',
    name: 'ورامین',
    governorateType: 'فرمانداری ویژه',
    governorRoleTitle: 'معاون استاندار و فرماندار ویژه ورامین',
    lat: 35.3252,
    lng: 51.6472,
    population1395: 283742,
    estimatedPopulation1405: 345000,
    gdpSharePercent: 1.4,
    taxRevenue5M_Hemmat: 2.9,
    vatShare_BillionToman: 1120,
    unemploymentRate: 5.2,
    employmentTarget1405: 5400,
    employmentRealizedPercent: 73,
    activeIndustrialUnits: 610,
    stagnantIndustrialUnits: 95,
    bakeriesCount: 360,
    dailyFlourQuota_Sacks: 4320,
    greenhouseArea_Hectares: 165,
    agriculturalOutput_Tons: 680000,
    powerImbalance_MW: 95,
    waterStressIndex: 88,
    keyEconomicPoles: ['شهرک صنعتی چرمشهر و سالاریه', 'قطب استراتژیک گندم، جو، پسته و دامپروری جنوب شرق', 'کارخانجات قند و روغن ورامین'],
    industrialEstates: ['شهرک صنعتی چرمشهر (قطب چرم کشور)', 'شهرک صنعتی سالاریه', 'ناحیه صنعتی ملاآقایی'],
    topCrisisAlert: 'نیاز مبرم به نوسازی تصفیه‌خانه پساب شهرک صنعتی چرمشهر و حق‌آبه دشت ورامین از سد ماملو',
    glowColor: '#f59e0b',
    washColor: '#422006'
  },
  {
    id: 'qarchak',
    name: 'قرچک',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار قرچک',
    lat: 35.4422,
    lng: 51.5708,
    population1395: 269138,
    estimatedPopulation1405: 330000,
    gdpSharePercent: 0.9,
    taxRevenue5M_Hemmat: 1.8,
    vatShare_BillionToman: 980,
    unemploymentRate: 5.8,
    employmentTarget1405: 4800,
    employmentRealizedPercent: 70,
    activeIndustrialUnits: 340,
    stagnantIndustrialUnits: 55,
    bakeriesCount: 320,
    dailyFlourQuota_Sacks: 3950,
    greenhouseArea_Hectares: 42,
    agriculturalOutput_Tons: 145000,
    powerImbalance_MW: 70,
    waterStressIndex: 83,
    keyEconomicPoles: ['شهرک صنعتی قرچک (تولید پوشاک، نساجی و مصنوعات پلاستیکی)', 'کوره‌های آجرپزی و سفال'],
    industrialEstates: ['شهرک صنعتی قرچک'],
    topCrisisAlert: 'لزوم تکمیل فاز توسعه شهرک صنعتی قرچک و تخصیص تسهیلات سرمایه در گردش به کارگاه‌های پوشاک',
    glowColor: '#c084fc',
    washColor: '#3b0764'
  },
  {
    id: 'pardis',
    name: 'پردیس',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار پردیس',
    lat: 35.7417,
    lng: 51.7783,
    population1395: 169060,
    estimatedPopulation1405: 515000, // عبور جمعیت از ۵۰۰ هزار نفر طبق گزارش رسمی ۱۴۰۵
    gdpSharePercent: 1.5,
    taxRevenue5M_Hemmat: 3.8,
    vatShare_BillionToman: 1350,
    unemploymentRate: 4.7,
    employmentTarget1405: 6800,
    employmentRealizedPercent: 84,
    activeIndustrialUnits: 820,
    stagnantIndustrialUnits: 68,
    bakeriesCount: 290,
    dailyFlourQuota_Sacks: 3650,
    greenhouseArea_Hectares: 12,
    agriculturalOutput_Tons: 42000,
    powerImbalance_MW: 85,
    waterStressIndex: 74,
    keyEconomicPoles: ['پارک فناوری پردیس (بزرگ‌ترین بهشت شرکت‌های دانش‌بنیان کشور با ۴۰۰+ شرکت)', 'ناحیه صنعتی کمرد و سیاهسنگ (قطب مبل و دکوراسیون)'],
    industrialEstates: ['پارک فناوری پردیس', 'منطقه صنعتی کمرد', 'منطقه صنعتی سیاهسنگ و خرمدشت'],
    topCrisisAlert: 'جهش جمعیت بالای ۵۰۰ هزار نفر در فازهای ۵، ۸ و ۱۱ مسکن مهر و کمبود شدید میادین تره‌بار و نانوایی',
    glowColor: '#38bdf8',
    washColor: '#082f49'
  },
  {
    id: 'damavand',
    name: 'دماوند',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار دماوند',
    lat: 35.7183,
    lng: 52.0650,
    population1395: 125480,
    estimatedPopulation1405: 158000,
    gdpSharePercent: 0.7,
    taxRevenue5M_Hemmat: 1.5,
    vatShare_BillionToman: 690,
    unemploymentRate: 4.9,
    employmentTarget1405: 2900,
    employmentRealizedPercent: 78,
    activeIndustrialUnits: 230,
    stagnantIndustrialUnits: 38,
    bakeriesCount: 185,
    dailyFlourQuota_Sacks: 2220,
    greenhouseArea_Hectares: 28,
    agriculturalOutput_Tons: 310000,
    powerImbalance_MW: 45,
    waterStressIndex: 62,
    keyEconomicPoles: ['قطب اول تولید سیب درختی، گیلاس و عسل ممتاز استان', 'شهرک صنعتی دماوند ۲', 'معادن شن، ماسه و آب معدنی'],
    industrialEstates: ['شهرک صنعتی دماوند ۲'],
    topCrisisAlert: 'نیاز به سردخانه‌های اتمسفریک استاندارد برای جلوگیری از ضایعات ۲۵ درصدی سیب دماوند و جلوگیری از تغییر کاربری باغات',
    glowColor: '#4ade80',
    washColor: '#052e16'
  },
  {
    id: 'pishva',
    name: 'پیشوا',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار پیشوا',
    lat: 35.3081,
    lng: 51.7267,
    population1395: 86601,
    estimatedPopulation1405: 108000,
    gdpSharePercent: 0.5,
    taxRevenue5M_Hemmat: 0.9,
    vatShare_BillionToman: 480,
    unemploymentRate: 4.4,
    employmentTarget1405: 2500,
    employmentRealizedPercent: 85,
    activeIndustrialUnits: 190,
    stagnantIndustrialUnits: 29,
    bakeriesCount: 115,
    dailyFlourQuota_Sacks: 1380,
    greenhouseArea_Hectares: 340, // قطب اول تولید سبزی و صیفی گلخانه‌ای صادراتی
    agriculturalOutput_Tons: 420000,
    powerImbalance_MW: 40,
    waterStressIndex: 86,
    keyEconomicPoles: ['قطب اول گلخانه‌های سبزی و صیفی صادراتی (روسیه و حاشیه خلیج فارس)', 'شهرک صنعتی پیشوا (۱,۴۰۰ هکتار ظرفیت)'],
    industrialEstates: ['شهرک صنعتی پیشوا'],
    topCrisisAlert: 'تأمین پایدار گاز زمستانی برای ۳۴۰ هکتار گلخانه صادراتی و پایانه صادرات محصولات گلخانه‌ای',
    glowColor: '#10b981',
    washColor: '#064e3b'
  },
  {
    id: 'shemiranat',
    name: 'شمیرانات',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار شمیرانات',
    lat: 35.8069,
    lng: 51.4286,
    population1395: 47279,
    estimatedPopulation1405: 62000,
    gdpSharePercent: 0.4,
    taxRevenue5M_Hemmat: 3.1, // مالیات مشاغل لوکس، مستغلات و گردشگری
    vatShare_BillionToman: 740,
    unemploymentRate: 4.1,
    employmentTarget1405: 1300,
    employmentRealizedPercent: 81,
    activeIndustrialUnits: 45,
    stagnantIndustrialUnits: 8,
    bakeriesCount: 75,
    dailyFlourQuota_Sacks: 900,
    greenhouseArea_Hectares: 5,
    agriculturalOutput_Tons: 65000,
    powerImbalance_MW: 35,
    waterStressIndex: 55,
    keyEconomicPoles: ['حوضه آبریز سد لتیان و رودخانه جاجرود', 'گردشگری کوهستانی (توچال، دیزین، دربند، لواسان، فشم)', 'باغات گیلاس و گردو'],
    industrialEstates: ['فاقد شهرک صنعتی آلاینده (زون حفاظت آبخیزداری)'],
    topCrisisAlert: 'صیانت از حریم کیفی سد لتیان و وصول مالیات خانه‌های لوکس خالی و اصناف گردشگری لواسانات و رودبار قصران',
    glowColor: '#818cf8',
    washColor: '#1e1b4b'
  },
  {
    id: 'firuzkuh',
    name: 'فیروزکوه',
    governorateType: 'فرمانداری عادی',
    governorRoleTitle: 'فرماندار فیروزکوه',
    lat: 35.7556,
    lng: 52.7722,
    population1395: 33558,
    estimatedPopulation1405: 42000,
    gdpSharePercent: 0.2,
    taxRevenue5M_Hemmat: 1.2, // شامل ۱۱۴ میلیارد تومان مالیات نشان‌دار کارخانه سیمان فیروزکوه برای بیمارستان
    vatShare_BillionToman: 450,
    unemploymentRate: 5.5,
    employmentTarget1405: 1000,
    employmentRealizedPercent: 72,
    activeIndustrialUnits: 115,
    stagnantIndustrialUnits: 24,
    bakeriesCount: 55,
    dailyFlourQuota_Sacks: 660,
    greenhouseArea_Hectares: 8,
    agriculturalOutput_Tons: 175000,
    powerImbalance_MW: 25,
    waterStressIndex: 48,
    keyEconomicPoles: ['کارخانه سیمان فیروزکوه (مالیات نشان‌دار ۱۱۴ میلیارد تومانی)', 'شهرک صنعتی فیروزکوه', 'قطب دامپروری ییلاقی و سیب‌زمینی بذری'],
    industrialEstates: ['شهرک صنعتی فیروزکوه (بخش ارجمند و مرکزی)'],
    topCrisisAlert: 'تکمیل پروژه بیمارستان فیروزکوه از محل مالیات نشان‌دار سیمان و توسعه صنایع فرآوری لبنی و معدنی',
    glowColor: '#34d399',
    washColor: '#022c22'
  }
];
```

### ۳.۲. داده‌های تخصصی زیرساخت‌های حیاتی استان تهران (سدهای ۵گانه، گمرکات ۶گانه، میادین تره‌بار و بانک‌ها)

```typescript
// ادامه src/data/tehranMasterData.ts

// ۱. سدهای پنجگانه تامین آب استان تهران (شرکت آب منطقه‌ای تهران)
export const TEHRAN_5_DAMS = [
  { id: 'amirkabir', name: 'سد امیرکبیر (کرج)', river: 'رودخانه کرج', totalCapacity_MCM: 205, currentVolume_MCM: 112, lastYearVolume_MCM: 138, fillPercent: 54.6, targetZones: 'غرب و مرکز کلان‌شهر تهران', lat: 35.9575, lng: 51.0897, status: 'هشدار زرد' },
  { id: 'latyan', name: 'سد لتیان', river: 'رودخانه جاجرود', totalCapacity_MCM: 95, currentVolume_MCM: 54, lastYearVolume_MCM: 62, fillPercent: 56.8, targetZones: 'شمال و شرق تهران، شمیرانات و پردیس', lat: 35.7889, lng: 51.6769, status: 'نرمال' },
  { id: 'lar', name: 'سد لار', river: 'رودخانه لار (دماوند)', totalCapacity_MCM: 960, currentVolume_MCM: 148, lastYearVolume_MCM: 195, fillPercent: 15.4, targetZones: 'تغذیه نیروگاه کلان و تصفیه‌خانه پنجم تهران', lat: 35.8872, lng: 51.9961, status: 'بحرانی (فرار آب کارستی)' },
  { id: 'taleghan', name: 'سد طالقان (خط انتقال به تهران)', river: 'شاهرود', totalCapacity_MCM: 420, currentVolume_MCM: 238, lastYearVolume_MCM: 265, fillPercent: 56.6, targetZones: 'غرب استان تهران، شهریار، ملارد و قدس', lat: 36.1856, lng: 50.6311, status: 'نرمال' },
  { id: 'mamlou', name: 'سد ماملو', river: 'جاجرود و دماوند', totalCapacity_MCM: 250, currentVolume_MCM: 72, lastYearVolume_MCM: 118, fillPercent: 28.8, targetZones: 'جنوب تهران، ری، پاکدشت، قرچک، ورامین و پیشوا (آب شرب و کشاورزی)', lat: 35.5786, lng: 51.7847, status: 'هشدار نارنجی' }
];

// ۲. گمرکات شش‌گانه و پایانه‌های لجستیکی استان تهران (اداره کل گمرکات تهران)
export const TEHRAN_6_CUSTOMS = [
  { id: 'shahriar_customs', name: 'گمرک شهریار (جنوب، غرب و نمایشگاه‌ها)', type: 'زمینی و ریلی', clearanceTime_Days: 4.2, containersInQueue: 1850, monthlyImport_MUSD: 680, monthlyExport_MUSD: 295, mainGoods: 'ماشین‌آلات صنعتی، مواد اولیه شیمیایی، قطعات خودرو، لوازم خانگی', lat: 35.6720, lng: 51.1340, capacityPercent: 89 },
  { id: 'west_tehran_customs', name: 'گمرک غرب تهران', type: 'زمینی (کامیونی)', clearanceTime_Days: 3.8, containersInQueue: 940, monthlyImport_MUSD: 490, monthlyExport_MUSD: 210, mainGoods: 'مواد اولیه دارویی، نساجی، چرم، تجهیزات الکترونیکی، فرش ماشینی', lat: 35.6940, lng: 51.2580, capacityPercent: 82 },
  { id: 'ika_customs', name: 'گمرک فرودگاه بین‌المللی امام خمینی (IKA)', type: 'هوایی (۹۰٪ کارگو هوایی کشور)', clearanceTime_Days: 1.9, containersInQueue: 420, monthlyImport_MUSD: 820, monthlyExport_MUSD: 185, mainGoods: 'داروهای حیاتی و واکسن، تلفن همراه، لپ‌تاپ، تجهیزات پزشکی، زعفران و خشکبار', lat: 35.4161, lng: 51.1522, capacityPercent: 76 },
  { id: 'mehrabad_customs', name: 'گمرک فرودگاه مهرآباد و حوزه نفت', type: 'هوایی و تخصصی انرژی', clearanceTime_Days: 2.1, containersInQueue: 180, monthlyImport_MUSD: 215, monthlyExport_MUSD: 95, mainGoods: 'قطعات هواپیما، کاتالیست‌های پالایشگاهی و پتروشیمی، کالاهای دیپلماتیک', lat: 35.6892, lng: 51.3134, capacityPercent: 64 },
  { id: 'postal_customs', name: 'گمرک امانات پستی تهران', type: 'پستی و تجارت الکترونیک فرامرزی', clearanceTime_Days: 1.5, containersInQueue: 95, monthlyImport_MUSD: 48, monthlyExport_MUSD: 32, mainGoods: 'مرسولات پستی بین‌المللی، نمونه کالاهای صنعتی و دانش‌بنیان، صنایع دستی', lat: 35.7210, lng: 51.4150, capacityPercent: 58 },
  { id: 'aprin_dryport', name: 'بندر خشک و دهکده لجستیک آپرین (اسلامشهر/ری)', type: 'هاب ریلی-گمرکی نسل جدید', clearanceTime_Days: 2.4, containersInQueue: 630, monthlyImport_MUSD: 310, monthlyExport_MUSD: 140, mainGoods: 'ترانزیت ریلی کریدور شرق به غرب، غلات، روغن خام، شمش فلزات', lat: 35.5580, lng: 51.2690, capacityPercent: 71 }
];

// ۳. نرخنامه زنده و موجودی ۱۸ کالای اساسی در میدان مرکزی و ۳۰۵ میدان تره‌بار استان تهران
export const TEHRAN_ESSENTIAL_GOODS_BAZAAR = [
  { id: 'beef_fresh', name: 'گوشت گوساله تنظیم بازار (کیلوگرم)', govApprovedPrice_Toman: 345000, tarabarPrice_Toman: 358000, freeMarketPrice_Toman: 695000, dailySupply_Tons: 185, strategicReserve_Days: 42, status: 'التهاب در بازار آزاد' },
  { id: 'chicken_fresh', name: 'مرغ کامل گرم (کیلوگرم)', govApprovedPrice_Toman: 89000, tarabarPrice_Toman: 89000, freeMarketPrice_Toman: 98500, dailySupply_Tons: 1450, strategicReserve_Days: 35, status: 'تعادل پایدار' },
  { id: 'eggs_tray', name: 'تخم‌مرغ شانه‌ای ۳۰ عددی (کیلوگرم)', govApprovedPrice_Toman: 62000, tarabarPrice_Toman: 61500, freeMarketPrice_Toman: 71000, dailySupply_Tons: 890, strategicReserve_Days: 28, status: 'مازاد تولید استانی' },
  { id: 'rice_iranian', name: 'برنج طارم و هاشمی درجه یک (کیلوگرم)', govApprovedPrice_Toman: 115000, tarabarPrice_Toman: 122000, freeMarketPrice_Toman: 158000, dailySupply_Tons: 920, strategicReserve_Days: 65, status: 'نیاز به عرضه برنج هندی/پاکستانی' },
  { id: 'oil_edible', name: 'روغن مایع خوراکی ۸۱۰ گرمی', govApprovedPrice_Toman: 68000, tarabarPrice_Toman: 65000, freeMarketPrice_Toman: 69000, dailySupply_Tons: 1100, strategicReserve_Days: 78, status: 'ذخیره عالی (کارخانجات ورامین و ری)' },
  { id: 'potato', name: 'سیب‌زمینی درجه یک (کیلوگرم)', govApprovedPrice_Toman: 29500, tarabarPrice_Toman: 29500, freeMarketPrice_Toman: 44000, dailySupply_Tons: 2100, strategicReserve_Days: 30, status: 'تزریق ذخایر فیروزکوه و همدان' },
  { id: 'onion', name: 'پیاز زرد و سفید (کیلوگرم)', govApprovedPrice_Toman: 26000, tarabarPrice_Toman: 27000, freeMarketPrice_Toman: 39000, dailySupply_Tons: 1650, strategicReserve_Days: 25, status: 'تعادل نسبی' },
  { id: 'cucumber_gh', name: 'خیار گلخانه‌ای پاکدشت و پیشوا (کیلوگرم)', govApprovedPrice_Toman: 72000, tarabarPrice_Toman: 79000, freeMarketPrice_Toman: 98000, dailySupply_Tons: 1200, strategicReserve_Days: 14, status: 'افزایش تقاضای صادراتی' },
  { id: 'apple_damavand', name: 'سیب زرد و قرمز دماوند (کیلوگرم)', govApprovedPrice_Toman: 88000, tarabarPrice_Toman: 95000, freeMarketPrice_Toman: 135000, dailySupply_Tons: 1800, strategicReserve_Days: 90, status: 'ذخیره سردخانه‌ای کامل' },
  { id: 'pomegranate', name: 'انار درجه یک (کیلوگرم)', govApprovedPrice_Toman: 110000, tarabarPrice_Toman: 120000, freeMarketPrice_Toman: 168000, dailySupply_Tons: 950, strategicReserve_Days: 45, status: 'عرضه فصلی پاییزی' }
];
```

---

## ۴. موتور نمودارهای اختصاصی SVG نئونی (`src/utils/liquidCharts.ts` — پورت مستقیم از `Glassy-CRM-Dashboard/dist/charts.js`)

برای اینکه نمودارهای سامانه دقیقاً همان درخشش نئونی، گرادینت شیشه‌ای و لیبل‌های شناور (`.chart-highlight`) موجود در فایل `Glassy-CRM-Dashboard` شما را داشته باشند، تابع‌های زیر را در فایل `src/utils/liquidCharts.ts` قرار دهید و در کامپوننت‌های ری‌اکت با `dangerouslySetInnerHTML={{ __html: LiquidCharts.revenue(...) }}` یا معادل JSX آن رندر کنید:

1. **`LiquidCharts.revenue(values, labels, unitLabel)`**: نمودار میله‌ای عمودی با گرادینت بنفش-نئون (`#b4a7ff` تا `#6254dc`)، لایه درخشش داخلی (`-shine`) و فیلتر بلور نئونی (`feGaussianBlur`) روی ستون منتخب.
2. **`LiquidCharts.fulfillment(values, labels, color)`**: منحنی اسپلاین نرم (`Cubic Bezier C`) با سایه گرادینت زیر نمودار و نقاط دایره‌ای درخشان برای نمایش روند مصرف آرد، برق یا تورم.
3. **`LiquidCharts.throughput(pairs, labels)`**: نمودار میله‌ای دوقلو (ورودی بنفش / خروجی فیروزه‌ای) برای مقایسه منابع و مصارف بانکی یا صادرات و واردات گمرکات ۶گانه.
4. **`LiquidCharts.cohort(seriesA, seriesB, labels)`**: نمودار دوخطی مقایسه‌ای برای مقایسه قیمت مصوب و بازار آزاد، یا رشد تولید گلخانه‌ای در برابر سنتی.
5. **`LiquidCharts.donut(values, labels)`**: نمودار حلقه‌ای چندبخشی برای سهم بخش‌های اقتصادی (خدمات، صنعت، کشاورزی) از GDP استان تهران.
6. **`LiquidCharts.telemetry(ring1, ring2, ring3, labels)`**: ۳ حلقه متحدالمرکز نئونی (`stroke-dasharray`) برای نمایش تله‌متری زنده شبکه بانکی، درصد تحقق بودجه و ظرفیت سیلوها.
7. **`LiquidCharts.gauge(value, label)`**: گیج نیم‌دایره ۱۸۰ درجه با گرادینت سه‌رنگی (`#45cdf2` -> `#848aff` -> `#62d7b0`) برای شاخص امنیت غذایی و آرامش بازار.
8. **`LiquidCharts.capsules(selectedQuarter, values, labels)`**: ماتریس کپسولی درخشان هدف‌گذاری فصلی (`Q1` تا `Q4`) با بازه حداقل-حداکثر و نقطه نئونی تحقق هدف (`Hit / Proj`).

---

## ۵. مشخصات فنی نقشه ماهواره‌ای سه‌بعدی (Google Earth / Satellite 3D GIS Engine)

برای برآورده کردن خواسته حیاتی شما («نقشه‌ها GIS میخوام حالت ماهواره عالی مثل گوگل ارث نشون بده ی چیز شیک و عالی»)، کامپوننت `src/components/gis/TehranSatellite3DGIS.tsx` باید دقیقاً با معماری زیر پیاده‌سازی شود:

### ۵.۱. لایه‌های تایل ماهواره‌ای واقعی بدون نیاز به کلید پولی مسدودشونده
* **لایه اول (تصویر ماهواره‌ای با وضوح بالا — Esri World Imagery)**:
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
* **لایه دوم (مرزها، جاده‌ها و نام‌های فارسی روی تصویر ماهواره‌ای — Google Hybrid Labels / Carto Dark Labels)**:
  `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=fa` (یا ترکیب Esri World Imagery با لایه برچسب و مرزهای نئونی GeoJSON).
* **لایه سوم (حالت دید سه‌بعدی ۴۵ درجه شبیه Google Earth Orbit)**:
  با یک دکمه شیشه‌ای `نمای سه‌بعدی ماهواره‌ای (3D Google Earth Tilt)` در بالای نقشه، ظرف نقشه با استایل زیر به حالت دید پرسپکتیو سه‌بعدی درمی‌آید و ساختمان‌ها/ستون‌های سه بعدی اقتصادی روی هر شهرستان بالا می‌آیند:
  ```css
  .gis-3d-orbit-active .leaflet-map-pane {
    transform: perspective(1400px) rotateX(34deg) rotateZ(-4deg) scale(1.08);
    transform-origin: 50% 60%;
    transition: transform 0.85s cubic-bezier(.22, .72, .18, 1);
  }
  ```

### ۵.۲. ۵ لایه نشانگر نئونی تپنده (Interactive GIS Layers) روی نقشه ماهواره‌ای تهران
کاربر در نوار ابزار شیشه‌ای بالای نقشه می‌تواند لایه‌های زیر را به صورت هم‌زمان یا تکی روشن کند:
1. **لایه ۱۶ فرمانداری استان تهران**: دایره‌های هولوگرافیک متناسب با سهم تولید ناخالص داخلی (GDP) و رنگ‌بندی بر اساس شاخص ریسک؛ با کلیک روی هر شهرستان، دوربین نقشه با انیمیشن پرواز (`map.flyTo([county.lat, county.lng], 12, { duration: 1.6 })`) روی تصویر ماهواره‌ای واقعی آن شهر زوم می‌کند و پنل شیشه‌ای اطلاعات کامل آن شهرستان باز می‌شود.
2. **لایه ۲۲ شهرک صنعتی**: آیکون‌های نئونی بنفش روی شمس‌آباد، عباس‌آباد، پرند، پایتخت، صفادشت، چرمشهر، نصیرآباد، خوارزمی، سالاریه، قرچک، پیشوا، دماوند ۲ و فیروزکوه (نمایش تعداد کارخانجات فعال/راکد و مصرف برق لحظه‌ای).
3. **لایه ۵ سد تامین آب استان تهران**: آیکون‌های آبی تپنده روی سدهای لار، لتیان، امیرکبیر (کرج)، طالقان و ماملو (نمایش حجم فعلی مخزن به میلیون مترمکعب و خط لوله‌های انتقال آب به تهران و دشت ورامین).
4. **لایه ۶ گمرک و بندر خشک**: آیکون‌های طلایی روی گمرک شهریار، غرب تهران، فرودگاه امام خمینی، مهرآباد، پستی و بندر خشک آپرین (نمایش تعداد کانتینرهای در صف ترخیص).
5. **لایه امنیت غذایی (سیلوهای گندم و میادین تره‌بار)**: نمایش ۱۷ سیلوی گندم و میدان مرکزی میوه و تره‌بار جنوب تهران با خطوط جریان توزیع متحرک (`stroke-dashoffset` انیمیشنی).

---

## ۶. معماری شبکه ۱۰ ایجنت هوش مصنوعی و چت‌بات‌های تخصصی دوگانه (`@google/genai` + موتور هوش داخلی)

برای اینکه چت‌بات‌ها و ایجنت‌ها در تمام صفحات ۱۰۰٪ کارآمد، سریع و بدون خطا کار کنند، فایل `src/services/tehranAiAgentService.ts` با معماری دوگانه (Hybrid AI Engine) زیر نوشته می‌شود:

### ۶.۱. کد کامل `src/services/tehranAiAgentService.ts`

```typescript
// src/services/tehranAiAgentService.ts
import { GoogleGenAI } from '@google/genai';
import { TEHRAN_16_COUNTIES, TEHRAN_5_DAMS, TEHRAN_6_CUSTOMS, TEHRAN_ESSENTIAL_GOODS_BAZAAR } from '../data/tehranMasterData';

export interface AgentContextPayload {
  activeRoute: string;
  activeModuleTitle: string;
  currentRoleName: string;
  selectedCountyId: string;
  scenarioLevers: Record<string, number>;
  userQuery: string;
}

export interface AgentResponsePayload {
  agentName: string;
  agentBadge: string;
  answerMarkdown: string;
  suggestedActions: { label: string; actionType: string; targetId?: string }[];
  sources: { title: string; url: string }[];
}

export async function askTehranEconomicAgent(payload: AgentContextPayload): Promise<AgentResponsePayload> {
  const county = TEHRAN_16_COUNTIES.find(c => c.id === payload.selectedCountyId) || TEHRAN_16_COUNTIES[0];

  // Map active route to its dedicated Specialist AI Agent
  const agentMap: Record<string, { name: string; badge: string }> = {
    overview: { name: 'ایجنت استراتژیست ارشد اقتصاد کلان تهران', badge: 'MACRO-AI' },
    treasury: { name: 'ایجنت ممیز هوشمند مالیاتی و خزانه‌داری', badge: 'TAX-AI' },
    banking: { name: 'ایجنت بازرس شبکه بانکی و هدایت اعتبار', badge: 'BANK-AI' },
    industry: { name: 'ایجنت دیده‌بان شهرک‌های صنعتی و احیای تولید', badge: 'IND-AI' },
    bread: { name: 'ایجنت نگهبان زنجیره گندم، آرد و نانینو', badge: 'BREAD-AI' },
    bazaar: { name: 'ایجنت تنظیم بازار، میادین تره‌بار و ضداحتکار', badge: 'BAZAAR-AI' },
    agriculture: { name: 'ایجنت کشاورزی مدرن، گلخانه و امنیت زیستی', badge: 'AGRI-AI' },
    customs: { name: 'ایجنت فرمانده گمرکات ۶گانه و لجستیک', badge: 'CUSTOMS-AI' },
    labor: { name: 'ایجنت تحلیلگر اشتغال، تامین اجتماعی و رفاه', badge: 'LABOR-AI' },
    energy: { name: 'ایجنت کنترلگر ناترازی انرژی و ۵ سد تهران', badge: 'ENERGY-AI' },
    gis: { name: 'ایجنت ژئواکونومیک و تحلیل فضایی ماهواره‌ای', badge: 'GIS-AI' },
    warroom: { name: 'شورای عالی ۱۰ ایجنت اتاق جنگ اقتصادی', badge: 'COUNCIL-AI' }
  };

  const activeAgent = agentMap[payload.activeRoute] || agentMap.overview;

  // Attempt live Gemini API call with Google Search Grounding if API_KEY is available
  const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemPrompt = `
شما «${activeAgent.name}» در پلتفرم رسمی «مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران (فرمانِ اقتصاد تهران)» هستید که توسط «شرکت شبکه هوشمند ابتکار ویستا» طراحی شده است.
کاربر فعلی: «${payload.currentRoleName}»
ماژول فعال فعلی: «${payload.activeModuleTitle}»
شهرستان منتخب فعلی: «${county.name}» (جمعیت برآوردی: ${county.estimatedPopulation1405.toLocaleString('fa-IR')} نفر، سهم GDP استانی: ${county.gdpSharePercent}٪، درآمد مالیاتی ۵ ماهه: ${county.taxRevenue5M_Hemmat} همت، نرخ بیکاری: ${county.unemploymentRate}٪، واحدهای صنعتی فعال: ${county.activeIndustrialUnits}، نانوایی‌ها: ${county.bakeriesCount}، ناترازی برق: ${county.powerImbalance_MW} مگاوات، هشدار اولویت‌دار: ${county.topCrisisAlert}).
وظیفه شما: پاسخگویی بسیار رسمی، دقیق، عددی، مبتنی بر داده‌های واقعی استان تهران، همراه با ارائه ۱) تحلیل وضعیت موجود، ۲) پیش‌بینی ریسک ۳۰ روز آینده، و ۳) پیشنهاد دستور اجرایی مشخص برای استاندار یا معاون اقتصادی.
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: payload.userQuery,
        config: {
          systemInstruction: systemPrompt,
          tools: [{ googleSearch: {} }]
        }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedSources = chunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => ({ title: c.web.title || 'منبع وب رسمی', url: c.web.uri }));

      if (response.text) {
        return {
          agentName: activeAgent.name,
          agentBadge: activeAgent.badge,
          answerMarkdown: response.text,
          suggestedActions: [
            { label: `تمرکز نقشه ماهواره‌ای روی ${county.name}`, actionType: 'FLY_TO_COUNTY', targetId: county.id },
            { label: 'اجرای شبیه‌سازی سناریو در اتاق جنگ', actionType: 'OPEN_WARROOM', targetId: payload.activeRoute }
          ],
          sources: extractedSources.length ? extractedSources : [
            { title: 'پورتال استانداری تهران - معاونت اقتصادی', url: 'https://ostan-th.ir/' },
            { title: 'آمارهای اقتصادی استان تهران - مرکز آمار', url: 'https://iranstatis.com/downloads/economy-statistics-tehran/' }
          ]
        };
      }
    } catch (err) {
      console.warn('Gemini live API fallback triggered:', err);
    }
  }

  // Deterministic High-Precision Domain Intelligence Engine (Always Works Offline/Instant)
  return generateDeterministicDomainAnswer(payload, county, activeAgent);
}

function generateDeterministicDomainAnswer(
  payload: AgentContextPayload,
  county: CountyEconomicProfile,
  activeAgent: { name: string; badge: string }
): AgentResponsePayload {
  const q = payload.userQuery;
  let md = `### گزارش تحلیلی «${activeAgent.name}» ویژه **${county.name}**\n\n`;
  md += `**مخاطب گزارش:** ${payload.currentRoleName} | **ماژول فعال:** ${payload.activeModuleTitle}\n\n`;
  md += `#### ۱. وضعیت سنجه‌های کلیدی و واقعیت میدانی در ${county.name}\n`;
  md += `- **جمعیت تحت پوشش:** \`${county.estimatedPopulation1405.toLocaleString('fa-IR')}\` نفر (سهم از اقتصاد استان تهران: **${county.gdpSharePercent}٪**)\n`;
  md += `- **عملکرد درآمدهای عمومی و مالیاتی (۵ ماهه):** تحقق **${county.taxRevenue5M_Hemmat} همت** از کل ۳۹۳ همت استان تهران و تخصیص **${county.vatShare_BillionToman.toLocaleString('fa-IR')} میلیارد تومان** عوارض ارزش افزوده به مدیریت شهری و روستایی.\n`;
  md += `- **وضعیت تولید و صنعت:** **${county.activeIndustrialUnits.toLocaleString('fa-IR')}** واحد صنعتی فعال و **${county.stagnantIndustrialUnits}** واحد راکد/نیمه‌فعال در قطب‌های \`${county.industrialEstates.join('، ')}\`.\n`;
  md += `- **امنیت غذایی و انرژی:** **${county.bakeriesCount.toLocaleString('fa-IR')}** واحد نانوایی فعال با سهمیه روزانه **${county.dailyFlourQuota_Sacks.toLocaleString('fa-IR')}** کیسه آرد؛ ناترازی برق ثبت‌شده: **${county.powerImbalance_MW} مگاوات** و شاخص تنش آبی: **${county.waterStressIndex} از ۱۰۰**.\n\n`;
  md += `#### ۲. هشدار پیش‌بینانه هوش مصنوعی (Early Warning)\n`;
  md += `> ⚠️ **کانون ریسک شناسایی‌شده:** ${county.topCrisisAlert}\n\n`;
  md += `#### ۳. بسته پیشنهادی تصمیم‌یار برای صدور دستور اجرایی\n`;
  md += `1. **اقدام فوری (۷۲ ساعته):** تشکیل جلسه فوق‌العاده ستاد تسهیل و تنظیم بازار با فرماندار **${county.name}** و تخصیص خط اعتباری اضطراری از محل منابع بانکی استان.\n`;
  md += `2. **اقدام میان‌مدت (۳۰ روزه):** بازتوزیع هوشمند سهمیه انرژی و آرد بر اساس داده‌های واقعی تراکنش و استقرار پنل‌های خورشیدی صنعتی جهت جبران **${Math.round(county.powerImbalance_MW * 0.35)} مگاوات** از ناترازی شبکه.\n`;

  return {
    agentName: activeAgent.name,
    agentBadge: activeAgent.badge,
    answerMarkdown: md,
    suggestedActions: [
      { label: `پرواز ماهواره‌ای روی ${county.name}`, actionType: 'FLY_TO_COUNTY', targetId: county.id },
      { label: 'صدور پیش‌نویس دستور استاندار', actionType: 'ISSUE_DIRECTIVE', targetId: county.id },
      { label: 'تست سناریوی شوک در اتاق جنگ', actionType: 'OPEN_WARROOM', targetId: payload.activeRoute }
    ],
    sources: [
      { title: 'پورتال رسمی استانداری تهران', url: 'https://ostan-th.ir/' },
      { title: 'گزارش تحقق ۳۹۳ همت درآمد عمومی تهران (ایرنا)', url: 'https://www.irna.ir/news/86259838/' }
    ]
  };
}
```

---

## ۷. طراحی کروسل شیشه‌ای سه‌بعدی (`src/components/common/Glassy3DCarousel.tsx` — پورت مستقیم از `Glassy-Carousel.html`)

بر اساس فایل `Glassy-Carousel.html` که ارسال کردید، کامپوننت کروسل شیشه‌ای سه‌بعدی با فرمول ریاضی `cardPose` زیر در دو بخش کلیدی سامانه (۱. نمایش سه‌بعدی ۱۶ شهرستان و ۱۱ محور اقتصادی در صفحه اصلی و لندینگ پیج، ۲. نمایش کارت‌های سه‌بعدی سناریوهای بحران و ۱۰ ایجنت در اتاق جنگ) قرار می‌گیرد:

```tsx
// فرمول دقیق ریاضی چرخش سه‌بعدی کارت‌های شیشه‌ای از فایل Glassy-Carousel.html
export function computeGlassyCardPose(distance: number, scale = 1, gathered = false) {
  const depth = Math.abs(distance);
  const side = Math.sign(distance);
  if (gathered && depth > 0) {
    return {
      transform: `translate(-50%, -50%) translate3d(${side * 9 * scale}px, 0px, ${-60 * scale}px) rotateY(${side * -3}deg) scale(0.88)`,
      opacity: 0,
      filter: 'brightness(0.75)',
      zIndex: 10 - depth
    };
  }
  const x = side * (depth === 1 ? 156 : 156 + (depth - 1) * 98) * scale;
  const y = (depth ? 8 : 0) * scale;
  const z = -Math.min(depth, 5) * 78 * scale;
  const rotateY = side * -Math.min(27, 19 + depth * 3);
  const cardScale = depth ? Math.max(0.48, 1 - depth * 0.095) : 1;
  const opacity = depth > 3 ? 0 : depth === 0 ? 1 : depth === 1 ? 0.76 : depth === 2 ? 0.44 : 0.2;
  const brightness = depth === 0 ? 1 : depth === 1 ? 0.88 : 0.75;

  return {
    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${cardScale})`,
    opacity,
    filter: `brightness(${brightness})`,
    zIndex: 20 - Math.ceil(depth)
  };
}
```
هنگامی که کاربر روی کارت وسط کروسل کلیک می‌کند، پنجره مورف شیشه‌ای (`.gc-morph.is-expanded`) باز می‌شود و اطلاعات کامل شهرستان یا سناریو همراه با نمودار و ویدیو/نقشه ماهواره‌ای آن نمایش داده می‌شود و نور پس‌زمینه (`.gc-glow`) به رنگ اختصاصی همان کارت (`--glow` و `--wash`) تغییر می‌کند!

---

## ۸. متن رسمی و حقوقی کپی‌رایت «شرکت شبکه هوشمند ابتکار ویستا» (درج اجباری در ۴ نقطه)

در تمام صفحات سامانه (۱. فوتر لندینگ پیج، ۲. پایین کارت ورود و احراز هویت، ۳. فوتر شیشه‌ای داشبورد `.vista-official-footer` و ۴. پلاک پایین سایدبار راست)، کامپوننت زیر باید به صورت ثابت و با استایل شیشه‌ای نئونی نمایش داده شود:

```tsx
// src/components/layout/VistaCopyrightFooter.tsx
import React from 'react';

export const VistaCopyrightFooter: React.FC = () => (
  <footer className="vista-official-footer glass" role="contentinfo">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span className="vista-badge">
        <span className="status-led" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--lg-success)' }} />
        شرکت شبکه هوشمند ابتکار ویستا
      </span>
      <span>
        طراحی، معماری سامانه و توسعه هوش مصنوعی توسط <strong>«شرکت شبکه هوشمند ابتکار ویستا»</strong> — کلیه حقوق مادی، معنوی و مالکیت فکری این پلتفرم محفوظ و متعلق به شرکت شبکه هوشمند ابتکار ویستا می‌باشد © ۱۴۰۵
      </span>
    </div>
    <div dir="ltr" style={{ fontSize: '10.5px', color: 'var(--lg-muted)', fontWeight: 500 }}>
      Architected &amp; Powered by <strong>Vista Innovation Smart Network Co.</strong> · All Rights Reserved © 2026
    </div>
  </footer>
);
```

---

## ۹. پرامپت‌های اجرایی فوق‌حرفه‌ای و گام‌به‌گام برای کپی مستقیم در Google AI Studio

برای اینکه **Google AI Studio** دقیقاً همین شاهکار شیشه‌ای، نئونی، دارای سایدبار راست، ۱۱ صفحه کاملاً متفاوت، نقشه ماهواره‌ای سه‌بعدی Google Earth و چت‌بات‌های فعال را بدون جا انداختن هیچ بخشی بسازد، مراحل زیر را به ترتیب کپی و ارسال کنید:

### مرحله ۰: متن قرارگیری در بخش `System Instructions` در Google AI Studio

```text
You are a Principal Front-End Architect, UI/UX Glassmorphism Specialist, and Economic Intelligence Systems Engineer building the flagship executive platform «مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران (فرمانِ اقتصاد تهران | TEHRAN ECON-COMMAND)», architected and owned by «شرکت شبکه هوشمند ابتکار ویستا» (Vista Innovation Smart Network Co.).

STRICT ARCHITECTURAL MANDATES (ZERO TOLERANCE FOR VIOLATIONS):
1. LIQUID-NEON GLASSMORPHIC THEME (DARK & LIGHT MODES):
   - You MUST use the exact CSS variables and optical glass classes (`.glass`, `.card`, `.card.featured`, `.liquid-orbs`, `.gn-bar`, `.sidebar`, `.gc-stage`, `.gc-card`) from the provided `liquid-glass.css` specification.
   - Support instant 1-click switching between Official Sovereign Dark Mode (`data-theme="dark"`, `#071321` canvas, `#b5a5ff` violet, `#8bd9ff` cyan, `#7ee3bc` mint) and Official Executive Pearl Light Mode (`data-theme="light"`, `#e9eff8` canvas, `#ffffffa6` frosted cards, `#6944c8` royal purple, `#146a9c` sapphire), plus Wallpaper toggle (`Graphite` vs `Aurora`).
   - Implement pointer-tracking liquid spotlight (`--spot-x`, `--spot-y`) on all cards/sidebar and 3D perspective tilt (`--shine-x`, `--tilt-x`, `--tilt-y`) on the top glassy navbar (`.gn-bar`).

2. RIGHT-DOCKED RTL COLLAPSIBLE GLASSY SIDEBAR:
   - The entire app is Persian RTL (`dir="rtl" lang="fa"`).
   - The collapsible glassy sidebar MUST be docked on the RIGHT side of the viewport (`grid-template-columns: var(--sidebar-width) minmax(0, 1fr)` in RTL).
   - Include the circular collapse toggle button on the inner-left edge of the right sidebar (`inset-inline-end: -14px`), brand morphing (`فرمانِ اقتصاد تهران` <-> `ف‌ات`), executive role switcher (32 official Tehran roles), and active neon indicator bar.

3. ZERO-DUPLICATION ACROSS ALL 11 MODULES (CRITICAL):
   - NEVER render a generic reusable template across different sidebar tabs!
   - Each of the 11 sidebar routes (`overview`, `treasury`, `banking`, `industry`, `bread`, `bazaar`, `agriculture`, `customs`, `labor`, `energy`, `gis_warroom`) MUST have its own unique React View Component, its own distinct CSS Grid layout (modeled on the 5 distinct views of Glassy-CRM + Glassy-Carousel + Satellite GIS), its own real Tehran Province dataset from `tehranMasterData.ts`, its own interactive domain simulator/action terminal, and its own dedicated Specialist AI Agent.

4. GOOGLE EARTH / SATELLITE 3D GIS MAP:
   - Use Leaflet with Esri World Imagery high-resolution satellite tiles (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`) + hybrid Persian labels + a 3D Orbit Tilt toggle (`perspective(1400px) rotateX(34deg)`), plotting all 16 Tehran counties, 22 industrial estates, 5 major water dams, and 6 customs hubs with glowing neon markers and fly-to camera transitions.

5. WORKING AI AGENTS & CONTEXTUAL CHATBOTS:
   - Integrate `@google/genai` (`gemini-2.5-flash` with `tools: [{ googleSearch: {} }]`) paired with the deterministic domain intelligence engine so every chatbot and in-page agent responds immediately with real Tehran numbers, predictions, and interactive action buttons.

6. MANDATORY COPYRIGHT ATTRIBUTION:
   - Display the official attribution for «شرکت شبکه هوشمند ابتکار ویستا» (Vista Innovation Smart Network Co.) in the landing page, login screen, sidebar footer, and main dashboard footer.
```

---

### پرامپت گام ۱ (ارسال اول به Google AI Studio): ساخت هسته تم شیشه مایع (`liquid-glass.css`)، دیتابیس کامل استان تهران (`tehranMasterData.ts`) و موتور نمودارهای نئونی (`liquidCharts.ts`)

```text
گام ۱ را با دقت ۱۰۰٪ و بدون هیچ حذفی پیاده‌سازی کن:

۱. فایل استایل سراسری `src/styles/liquid-glass.css` را دقیقاً با تمام متغیرهای رنگی Dark Mode و Light Mode، کلاس‌های `.glass`، `.card`، `.card.featured`، `.liquid-orbs`، `.workspace` (با سایدبار در سمت راست در حالت RTL)، `.gn-bar` (نوبار شیشه‌ای سه‌بعدی)، `.gc-stage` و `.gc-card` (کروسل سه‌بعدی شیشه‌ای) و `.vista-official-footer` بساز.
۲. فایل `src/data/tehranMasterData.ts` را شامل اطلاعات کامل و واقعی هر ۱۶ شهرستان استان تهران (`تهران، شهریار، اسلامشهر، بهارستان، ملارد، پاکدشت، ری، قدس، رباط‌کریم، ورامین، قرچک، پردیس، دماوند، پیشوا، شمیرانات، فیروزکوه`)، ۵ سد تامین آب تهران (`امیرکبیر/کرج، لتیان، لار، طالقان، ماملو`)، ۶ گمرک و بندر خشک استان (`شهریار، غرب تهران، فرودگاه امام، مهرآباد، پستی، آپرین`)، ۱۸ کالای اساسی میادین میوه و تره‌بار و ۳۲ نقش سازمانی استانداری تهران (استاندار: محمدصادق معتمدیان، معاون اقتصادی: دکتر حشمت‌اله عسگری، ۱۱ مدیرکل اقتصادی و ۱۶ فرماندار) ایجاد کن.
۳. فایل `src/utils/liquidCharts.ts` را شامل هر ۸ تابع تولیدکننده نمودارهای نئونی SVG (`revenue`, `fulfillment`, `throughput`, `cohort`, `donut`, `telemetry`, `gauge`, `capsules`) بر اساس کدهای مرجع `Glassy-CRM-Dashboard` بساز.
۴. کامپوننت فوتر رسمی `src/components/layout/VistaCopyrightFooter.tsx` را با متن رسمی «طراحی، معماری سامانه و توسعه هوش مصنوعی توسط شرکت شبکه هوشمند ابتکار ویستا | کلیه حقوق مادی، معنوی و مالکیت فکری این پلتفرم محفوظ و متعلق به شرکت شبکه هوشمند ابتکار ویستا می‌باشد © ۱۴۰۵» ایجاد کن.
```

---

### پرامپت گام ۲ (ارسال دوم به Google AI Studio): ساخت پوسته اصلی، سایدبار شیشه‌ای سمت راست، نوبار سه‌بعدی، لندینگ پیج با کروسل سه‌بعدی و صفحه لاگین ۳۲ نقشی

```text
حالا گام ۲ را پیاده‌سازی کن:

۱. لندینگ پیج شاهکار (`src/components/landing/LandingPage.tsx`):
   - هدر شیشه‌ای نئونی با لوگوی استانداری تهران، عنوان رسمی «مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران (فرمانِ اقتصاد تهران)»، سوئیچر زنده تم تیره/روشن و والپیپر (Graphite/Aurora).
   - بخش Hero شامل تیکر زنده شاخص‌های کلان تهران (تحقق ۳۹۳ همت درآمد عمومی ۵ ماهه با رشد ۷۷٪، سهم ۶۰.۵٪ سپرده بانکی کشور، ۱۰,۴۲۰ نانوایی، ۲۲ شهرک صنعتی) و **کروسل شیشه‌ای سه‌بعدی (`Glassy3DCarousel`)** که ۱۱ محور اقتصادی و ۱۶ شهرستان استان تهران را به صورت کارت‌های شیشه‌ای سه‌بعدی با نور پس‌زمینه متغیر (`--glow`) و قابلیت باز شدن جزئیات (`gc-morph`) نمایش می‌دهد.
   - فوتر رسمی «شرکت شبکه هوشمند ابتکار ویستا».

۲. صفحه لاگین و انتخاب نقش شیشه‌ای (`src/components/auth/LoginModalOrPage.tsx`):
   - انتخابگر سریع و دسته‌بندی‌شده برای هر ۳۲ نقش رسمی استان تهران (۱. استاندار تهران، ۲. معاون هماهنگی امور اقتصادی، ۳. ۱۱ مدیرکل دستگاه‌های اقتصادی استان، ۴. ۱۶ فرماندار شهرستان‌های استان تهران) که با یک کلیک، داشبورد را با مجوزها و شهرستان اختصاصی همان مقام باز می‌کند.

۳. پوسته اصلی داشبورد (`src/components/layout/DashboardShell.tsx`):
   - **سایدبار شیشه‌ای در سمت راست صفحه (`RTL Right-Docked Sidebar`)** با دکمه جمع‌شونده روی لبه چپ سایدبار، تغییر برند بین حالت کامل و خلاصه، پروفایل مقام واردشده، ۱۱ منوی اصلی با شمارنده هشدار زنده و تولتیپ در حالت جمع‌شده.
   - **نوبار شیشه‌ای سه‌بعدی بالا (`.gn-bar`)** با افکت نور و شیب ماوس (`--shine-x`, `--tilt-x`, `--tilt-y`)، جستجوی سراسری بازشونده (`⌘K` / `Ctrl+K`)، انتخابگر دوره زمانی (`این ماه`، `فصل جاری`، `برش سال ۱۴۰۵`)، انتخابگر سریع ۱۶ شهرستان، دکمه تغییر تم تیره/روشن (`#theme-button`)، دکمه اعلان‌ها و دکمه باز کردن چت‌بات و اتاق جنگ.
```

---

### پرامپت گام ۳ (ارسال سوم به Google AI Studio): ساخت ۶ ماژول اول با چیدمان‌ها و دیتای ۱۰۰٪ متفاوت (بدون هیچ تکرار ظاهری یا محتوایی)

```text
حالا گام ۳ را پیاده‌سازی کن. دقت کن که هر یک از این ۶ صفحه باید چیدمان گرید (CSS Grid)، ویجت تعاملی، نمودارها و دیتای کاملاً متفاوتی داشته باشند:

۱. صفحه اول (`#overview` — اتاق فرمان کلان اقتصاد تهران):
   - چیدمان `overview-view`: ۴ کارت متریک بالا راست (کارت اول با کلاس `.card.featured` بنفش نئونی برای سهم ۲۰.۹۴٪ تا ۲۵٪ تهران از GDP کشور)، نمودار میله‌ای نئونی `LiquidCharts.revenue` بالا چپ، **کروسل سه‌بعدی ۱۶ شهرستان استان تهران (`Glassy3DCarousel`)** در میانه صفحه، و در پایین کارت‌های وضعیت مصوبات ستاد تسهیل و نمودار حلقه‌ای `LiquidCharts.donut` سهم بخش‌های خدمات، صنعت و کشاورزی.

۲. صفحه دوم (`#treasury` — خزانه‌داری، مالیات، بودجه و مولدسازی دارایی‌ها):
   - چیدمان `performance-view`: هدر اجرایی با تب‌های `Q1` تا `Q4` و دکمه خروجی گزارش رسمی، ۴ شاخص خزانه‌داری (۳۹۳ همت درآمد ۵ ماهه، ۷۳ همت مالیات ارزش افزوده، ۱۱۴ میلیارد تومان مالیات نشان‌دار شرق تهران و فیروزکوه، ۷۸ ملک دولتی در طرح مولدسازی)، وسط راست **ماتریس کپسولی درخشان `LiquidCharts.capsules`**، وسط چپ **دفتر کل تراز بودجه و اعتبارات تملک دارایی (`ledger-card`)** با نوارهای پیشرفت رنگی، و **ماشین‌حساب تعاملی بازتوزیع عوارض ارزش افزوده و ماده ۱۰۰ بین ۱۶ شهرستان**.

۳. صفحه سوم (`#banking` — شبکه بانکی، تسهیلات و هدایت اعتبار):
   - چیدمان `telemetry-matrix`: بالا راست **۳ حلقه متحدالمرکز تله‌متری `LiquidCharts.telemetry`** (سهم ۶۰.۵٪ سپرده‌های کشور معادل ۱۱,۴۵۰ همت، نسبت مصارف به منابع ۶۸.۹٪، نرخ مطالبات غیرجاری)، بالا چپ **نمودار دوقلوی ورودی/خروجی اعتبارات `LiquidCharts.throughput`**، پایین **جدول زنده ۲۸ بانک عامل استان تهران** و **ابزار تعاملی تست استرس مطالبات غیرجاری (NPL) و انتقال اعتبار به بخش تولید**.

۴. صفحه چهارم (`#industry` — شهرک‌های صنعتی، معادن و زنجیره تولید صمت):
   - چیدمان `ecosystem-view`: شبکه کارت‌های ۲۲ شهرک صنعتی استان تهران (شمس‌آباد، عباس‌آباد، پرند، پایتخت، صفادشت، چرمشهر، نصیرآباد، خوارزمی، قرچک، پیشوا، دماوند ۲، فیروزکوه) که هر کارت دارای **کلیدهای تعاملی روشن/خاموش (`role="switch"`)** برای وضعیت پایداری برق، آب، گاز و تصفیه‌خانه و نمایش واحدهای فعال/راکد است + پنل کلینیک صنعت برای احیای ۱,۲۸۰ واحد راکد.

۵. صفحه پنجم (`#bread` — زنجیره گندم، سیلوها، آرد و نانوایی‌های سامانه نانینو):
   - چیدمان `orders-view`: ستون راست **ترمینال زنده پایش ۱۰,۴۲۰ نانوایی استان تهران** با تب‌های فیلتر (`همه`، `عادی`، `هشدار تراکنش مشکوک نانینو`، `نیازمند سهمیه فوق‌العاده`) و دکمه عملیاتی «تخصیص فوری آرد احتیاطی»، ستون وسط **منحنی سرعت پخت و مصرف روزانه آرد (`LiquidCharts.fulfillment`)**، ستون چپ **وضعیت ذخیره ۱۷ سیلوی گندم استان (ورامین، پاکدشت ۴۰ هزار تنی، ری، شهریار و تهران)** با نوارهای ظرفیت (`carrier-card`).

۶. صفحه ششم (`#bazaar` — تنظیم بازار، میادین میوه و تره‌بار و بازرسی اصناف):
   - چیدمان `customers-view`: کارت ویژه **سازمان میادین میوه و تره‌بار (ورود روزانه ۱۷,۰۰۰ تن محصول به میدان مرکزی و توزیع در ۳۰۵ میدان با ۱ میلیون تراکنش روزانه)**، جدول زنده مقایسه قیمت مصوب دولتی، قیمت میادین تره‌بار و قیمت بازار آزاد برای ۱۸ کالای اساسی (گوشت، مرغ، تخم‌مرغ، برنج، روغن، سیب‌زمینی، میوه)، **گیج ۱۸۰ درجه آرامش بازار (`LiquidCharts.gauge`)** و دکمه عملیاتی «دستور تزریق ذخایر سردخانه‌ای و اعزام گشت مشترک تعزیرات».
```

---

### پرامپت گام ۴ (ارسال چهارم به Google AI Studio): ساخت ۵ ماژول دوم، نقشه ماهواره‌ای سه‌بعدی Google Earth GIS، اتاق جنگ سناریوسازی و چت‌بات‌های متصل به `@google/genai`

```text
حالا گام ۴ (تکمیل ۵ ماژول پایانی، نقشه ماهواره‌ای سه‌بعدی Google Earth، اتاق جنگ سناریوسازی و چت‌بات‌های هوشمند) را پیاده‌سازی کن:

۱. صفحه هفتم (`#agriculture` — جهاد کشاورزی، قطب‌های گلخانه‌ای و دامپروری):
   - نمودار مقایسه‌ای دوقطبی `LiquidCharts.cohort` برای رشد تولیدات گلخانه‌ای استان تهران (رتبه ۱ کشور با ۱,۲۵۸ هکتار گل و گیاه که ۱,۰۱۳ هکتار آن در پاکدشت است و ۳۴۰ هکتار گلخانه صیفی در پیشوا و ورامین)، کارت‌های قطب‌های کشاورزی ۱۶ شهرستان (اسلامشهر، ری، شهریار، ملارد، دماوند، فیروزکوه) و شبیه‌ساز تخصیص نهاده‌های دامی (ذرت و کنجاله سویا) و تغییر الگوی کشت.

۲. صفحه هشتم (`#customs` — گمرکات ۶گانه، صادرات، واردات و بندر خشک آپرین):
   - داشبورد اختصاصی ۶ گمرک استان تهران (`گمرک شهریار، گمرک غرب تهران، گمرک فرودگاه امام خمینی با ۹۰٪ بار هوایی کشور، گمرک مهرآباد، گمرک پستی و بندر خشک آپرین`)، نمایش تعداد کانتینرهای در صف، زمان ترخیص، ارزش صادرات و واردات ماهانه و ابزار تعاملی «فعال‌سازی مسیر سبز گمرکی برای مواد اولیه تولید و دارو».

۳. صفحه نهم (`#labor` — اشتغال، بازار کار، تامین اجتماعی و مسکن کارگری):
   - داشبورد پایش تعهد ایجاد **۱۸۰,۰۰۰ شغل جدید در استان تهران** به تفکیک ۱۶ شهرستان و دستگاه‌های اجرایی، نرخ بیکاری ۴.۸٪ استان، آمار بیمه‌شدگان تامین اجتماعی، وضعیت مسکن کارگری در پردیس، پرند و اندیشه، و شبیه‌ساز تخصیص تسهیلات اشتغال تبصره ۱۸.

۴. صفحه دهم (`#energy` — ناترازی انرژی، برق منطقه‌ای و اسکادای ۵ سد آب تهران):
   - نمایش ۵ استوانه شیشه‌ای متحرک برای **سدهای پنجگانه تهران (`امیرکبیر/کرج، لتیان، لار، طالقان، ماملو`)** با حجم دقیق مخزن به میلیون مترمکعب و مناطق تحت پوشش، پایش پیک بار شبکه برق منطقه‌ای تهران، پیشرفت پروژه نصب پنل‌های خورشیدی (۱۲۰ مگاوات پشت‌بامی شهر تهران + ۶۰ مگاوات شهرک‌های صنعتی) و کنترلر توزیع بار برق بین شهرک‌های صنعتی.

۵. صفحه یازدهم (`#gis` و `#warroom` — نقشه ماهواره‌ای سه‌بعدی Google Earth GIS + اتاق جنگ سناریوسازی دوگانه و شورای ۱۰ ایجنت):
   - نقشه ماهواره‌ای واقعی با تایل‌های `Esri World Imagery` (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`) + برچسب‌های فارسی + دکمه **نمای سه‌بعدی ۴۵ درجه (3D Google Earth Orbit)** + لایه‌های تعاملی ۱۶ شهرستان، ۲۲ شهرک صنعتی، ۵ سد و ۶ گمرک با پرواز دوربین (`flyTo`).
   - کابین شبیه‌ساز «چه می‌شود اگر... (What-If War Room)» با ۱۲ اسلایدر دستی و دکمه تولید سناریوی خودکار توسط هوش مصنوعی، نمایش موج اول (۷ روزه)، موج دوم (۳۰ روزه) و موج سوم (۶ ماهه) روی هر ۱۶ شهرستان، و میزگرد زنده مناظره ۱۰ ایجنت تخصصی.
   - اتصال کامل چت‌بات شناور و پنل ایجنت مقیم هر صفحه به `askTehranEconomicAgent` (`@google/genai` با `googleSearch` + موتور پاسخگویی تحلیلی داخلی) به همراه راهنمای تعاملی، پروفایل مقام و تنظیمات ۶گانه.
```
