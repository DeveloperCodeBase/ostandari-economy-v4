# Glassy Navigation — نوبار و سایدبار شیشه‌ای

این پروژه، نوبار کلیپ `navbar.mp4` و سایدبار کلیپ `sidebar.mp4` را به دو کامپوننت مستقل و قابل استفاده در وب‌سایت تبدیل می‌کند. نسخهٔ آمادهٔ اجرا، سورس قابل ویرایش و یک فایل HTML مستقل همراه پروژه ارائه می‌شود.

پیاده‌سازی با **HTML، CSS و JavaScript خالص** است؛ وابستگی اجرایی، آیکون‌فونت، CDN، کلید API یا نصب پکیج لازم ندارد. Node.js فقط برای ساخت دوبارهٔ خروجی و اجرای سرور فایل‌های استاتیک استفاده می‌شود.

## ۱. اجرای سریع

### ساده‌ترین روش: باز کردن فایل آماده

یکی از این دو فایل را با مرورگر باز کنید:

- **`Glassy-Navigation.html`**: فایل مستقلِ تحویلی با استایل‌ها، کدها و پس‌زمینه‌های داخل همان فایل؛ مناسب جابه‌جایی و اجرای آفلاین با دوبار کلیک.
- **`dist/index.html`**: نسخهٔ پوشه‌ای؛ پوشهٔ `dist` و فایل‌های داخل آن را کنار هم نگه دارید.

برای این دو روش، نصب Node.js و اجرای فرمان لازم نیست. داخل بستهٔ ZIP سورس، نسخهٔ آمادهٔ `dist/index.html` قرار دارد. فایل HTML مستقل و بستهٔ ZIP جداگانه تحویل داده می‌شوند. نسخهٔ HTML مستقل و نسخهٔ پوشه‌ای داخل ZIP، دکمهٔ دانلود دوبارهٔ سورس ندارند.

با اجرای `npm run build`، خروجی‌های مستقل دوباره در مسیرهای `dist/downloads/Glassy-Navigation.html` و `dist/downloads/Glassy-Navigation-Source.zip` ساخته می‌شوند.

در رابط، سه حالت **Navbar / Sidebar / Together** وجود دارد. با دکمهٔ **فارسی / English** زبان عوض می‌شود. روی نوشتهٔ `Nav` یا دکمهٔ منوی موبایل بزنید تا سایدبار در ترکیب با نوبار نمایش داده شود؛ فلش دایره‌ای کنار سایدبار حالت باز و جمع‌شده را تغییر می‌دهد.

### اجرای پروژه برای توسعه

**پیش‌نیاز: Node.js 18 یا بالاتر.** ترمینال را داخل پوشه‌ای باز کنید که `package.json` در آن قرار دارد:

```bash
npm run build
npm start
```

آدرس پیش‌فرض اجرای محلی: [http://localhost:4173](http://localhost:4173)

فرمان `npm install` لازم نیست. پس از ویرایش سورس، `npm run build` را دوباره اجرا و صفحهٔ مرورگر را تازه‌سازی کنید. سرور توسعه را با `Ctrl+C` ببندید.

`src/index.html` قالب ورودی ساخت است و به استایل ترکیب‌شدهٔ خروجی اشاره می‌کند؛ فایل پیشنهادی برای اجرای مستقیم، `dist/index.html` است.

## ۲. ساختار فایل‌ها

| مسیر | کاربرد |
| --- | --- |
| `src/index.html` | قالب صفحهٔ نمایش و محل نصب کامپوننت‌ها |
| `src/navbar.js` و `src/navbar.css` | رفتار و ظاهر کامپوننت مستقل `GlassyNavbar` |
| `src/sidebar.js` و `src/sidebar.css` | رفتار و ظاهر کامپوننت مستقل `GlassySidebar` |
| `src/demo.js` و `src/demo.css` | ترکیب دو کامپوننت، تغییر نما، زبان، صفحات نمونه و فرم ورود نمایشی |
| `assets/ribbons.svg` | پس‌زمینهٔ برداری با نوارهای خاکستری نوبار |
| `assets/aurora.svg` | پس‌زمینهٔ برداری بنفش و آبی سایدبار |
| `scripts/build.mjs` | ساخت خروجی از سورس و آماده‌سازی فایل‌های تحویلی |
| `scripts/serve.mjs` | سرور محلی فایل‌های استاتیک |
| `dist/index.html` و فایل‌های همراه | خروجی پوشه‌ای آمادهٔ اجرا |
| `dist/downloads/Glassy-Navigation.html` | خروجی HTML مستقل که با ساخت پروژه تولید می‌شود |
| `dist/downloads/Glassy-Navigation-Source.zip` | بستهٔ سورس، راهنما، اسکریپت‌ها و خروجی قابل اجرا که با ساخت پروژه تولید می‌شود |

فایل‌های داخل `src` و `assets` محل اصلی ویرایش هستند. خروجی `dist` را پس از تغییر سورس دوباره بسازید. برای انتقال کامپوننت‌ها به سایت موجود، فایل‌های مربوط به همان کامپوننت کافی‌اند؛ `demo.js` و `demo.css` مخصوص صفحهٔ نمایش این پروژه هستند.

## ۳. نسبت پیاده‌سازی با کلیپ‌های مرجع

در نوبار، ظاهر تیره و شیشه‌ای، حاشیه و نور لبه، لوگوی `Nav`، ترتیب منوها، خط متحرک زیر گزینه‌ها، واکنش ظریف سطح به حرکت اشاره‌گر، جست‌وجوی بازشونده و دکمهٔ ورود بازسازی شده‌اند.

در سایدبار، پنل شفاف، سه نقطهٔ رنگی بالا، برند آبی `CODEXR`، عنوان حساب `softysta.com` و `Super Admin`، ترتیب منوها، جداکننده‌ها، گزینهٔ فعال شیشه‌ای، شمارندهٔ اعلان و فلش دایره‌ای حفظ شده‌اند. عرض پیش‌فرض از **۲۸۰ به ۸۰ پیکسل** تغییر می‌کند؛ در حالت جمع‌شده، برند `CXR` و نقطهٔ سفید اعلان نمایش داده می‌شوند.

نام‌های **`Nav`، `CODEXR` و `softysta.com`** برای حفظ هویت بصری مرجع باقی مانده‌اند. نام حساب صرفاً متن نمایشی است و به سرویسی متصل نمی‌شود.

**پس‌زمینه‌ها بازسازی برداری و قابل ویرایش هستند؛ فایل‌های تصویری اصلی کلیپ‌ها در اختیار پروژه نیستند.** جزئیات تصویر و شکل حروف با فایل اصلی مرجع و فونت نصب‌شدهٔ دستگاه می‌توانند تفاوت داشته باشند. فونت از مجموعهٔ محلی `Inter`، `Segoe UI`، `Tahoma` و `Arial` انتخاب می‌شود.

کلیپ‌ها فقط بخشی از حالت‌های بصری را نشان می‌دهند. موارد زیر برای تکمیل اجرای تعاملی اضافه شده‌اند:

- محتوای زیرمنوهای نوبار و مسیرهای نمونهٔ آن‌ها.
- فهرست نتایج جست‌وجو و انتخاب نتیجه با صفحه‌کلید.
- کارت‌های مقصد، نوشتهٔ قابل ذخیره، پیام‌ها، اعلان‌ها و بازی سادهٔ شمارنده.
- فرم ورود نمایشی و تغییر برچسب ورود به حساب.
- نمای ترکیبی، رفتار موبایل، زبان فارسی، چیدمان RTL و کنترل کاهش حرکت.

## ۴. اتصال به وب‌سایت موجود

استایل‌ها و اسکریپت‌های مورد نیاز را در صفحه بارگذاری کنید. فایل‌های جاوااسکریپت، اسکریپت معمولی مرورگر هستند و به `import` یا bundler نیاز ندارند:

```html
<link rel="stylesheet" href="./src/navbar.css">
<link rel="stylesheet" href="./src/sidebar.css">

<div id="site-navbar"></div>
<aside class="site-sidebar-frame">
  <div id="site-sidebar"></div>
</aside>

<style>
  .site-sidebar-frame { height: 620px; }
  #site-sidebar { height: 100%; }
</style>

<script src="./src/navbar.js"></script>
<script src="./src/sidebar.js"></script>
<!-- کد نصب را بعد از این دو اسکریپت قرار دهید. -->
```

مسیر فایل‌ها را با محل واقعی آن‌ها در سایت هماهنگ کنید. کانتینر سایدبار باید ارتفاع مشخص داشته باشد؛ در سایت اصلی می‌تواند ارتفاع در دسترس داشبورد باشد. خود کامپوننت ارتفاع `100%` می‌گیرد و در ارتفاع کم، بخش میانی منو اسکرول می‌شود.

مثال زیر سه تابع از برنامهٔ شما می‌گیرد: `navigate` برای مسیریابی، `showLogin` برای رابط ورود فعلی، و `signOut` برای خروج واقعی. این توابع محل اتصال به روتر و سرویس احراز هویت سایت هستند:

```js
function connectGlassNavigation({
  navbarRoot,
  sidebarRoot,
  navigate,
  showLogin,
  signOut,
  language = 'fa'
}) {
  const navbarGroup = {
    home: 'home', activity: 'home',
    design: 'services', development: 'services', consulting: 'services',
    about: 'about', team: 'about',
    pages: 'tools', settings: 'tools',
    contact: 'contact', support: 'contact'
  };

  function onNavigate(id) {
    if (id === 'logout') {
      signOut();
      return;
    }
    navigate(id);
    navbar.setActive(navbarGroup[id] || null);
    sidebar.setActive(id);
  }

  const sidebar = new window.GlassySidebar(sidebarRoot, {
    lang: language,
    collapsed: false,
    onNavigate,
    onCollapseChange(collapsed) {
      navbar.setSidebarExpanded(!collapsed);
    }
  });

  const navbar = new window.GlassyNavbar(navbarRoot, {
    lang: language,
    onNavigate,
    onToggleSidebar() {
      sidebar.setCollapsed(!sidebar.collapsed);
    },
    onLogin: showLogin,
    searchItems: [
      { id: 'home', en: 'Home', fa: 'خانه', keywords: 'dashboard داشبورد' },
      { id: 'messages', en: 'Messages', fa: 'پیام‌ها', keywords: 'inbox صندوق' },
      { id: 'settings', en: 'Settings', fa: 'تنظیمات' }
    ],
    shortcuts: true
  });

  navbar.setSidebarExpanded(!sidebar.collapsed);

  return {
    navbar,
    sidebar,
    setLanguage(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
      navbar.setLanguage(lang);
      sidebar.setLanguage(lang);
    },
    updateSession(signedIn) {
      navbar.setLoggedIn(signedIn);
    },
    destroy() {
      navbar.destroy();
      sidebar.destroy();
    }
  };
}
```

در زمان نصب، `navbarRoot` و `sidebarRoot` را از `document.getElementById` بگیرید. `navigate(id)` را به مسیرهای برنامه متصل کنید؛ شناسهٔ `messages` می‌تواند مثلاً به مسیر داخلی `/messages` نگاشت شود. بعد از نتیجهٔ واقعی ورود یا خروج، `updateSession` را با وضعیت جلسه فراخوانی کنید.

این مثال، باز و جمع‌کردن دائمی سایدبار را نشان می‌دهد. برای استفاده از منوی کشویی موبایلِ صفحهٔ نمونه، منطق `openDrawer` و `closeDrawer` و استایل‌های مربوط به آن در `demo.js` و `demo.css` قرار دارند. در برنامهٔ اصلی، همین callbacks می‌توانند به Drawer موجود آن برنامه وصل شوند.

## ۵. API نوبار

```js
new GlassyNavbar(root, {
  lang: 'en',
  onNavigate: id => {},
  onToggleSidebar: () => {},
  onLogin: () => {},
  searchItems: [{ id: 'home', en: 'Home', fa: 'خانه', keywords: 'overview' }],
  shortcuts: true
});
```

| متد | رفتار |
| --- | --- |
| `setLanguage('en' \| 'fa')` | تغییر زبان و جهت داخلی نوبار؛ پنل‌های باز بسته می‌شوند |
| `setActive(groupId)` | تعیین گروه فعال: `home`، `services`، `about`، `tools` یا `contact`؛ مقدار `null` انتخاب را پاک می‌کند |
| `setSidebarExpanded(boolean)` | هماهنگی وضعیت دسترس‌پذیری دکمه‌های سایدبار؛ خود سایدبار را باز یا جمع نمی‌کند |
| `setLoggedIn(boolean)` | تغییر برچسب دکمهٔ ورود به حساب و برعکس؛ وضعیت احراز هویت ایجاد نمی‌کند |
| `openSearch()` | باز کردن جست‌وجو و انتقال فوکوس به ورودی |
| `closeSearch()` | بستن جست‌وجو و برگرداندن فوکوس به دکمهٔ جست‌وجو |
| `closePanels()` | بستن زیرمنو و نتایج جست‌وجو |
| `destroy()` | حذف محتوای کامپوننت، listenerها و observer مربوط به آن |

`onNavigate` **شناسهٔ مقصد** را می‌گیرد؛ `setActive` **شناسهٔ گروه بالای نوبار** را می‌گیرد. هنگام انتخاب مقصد از زیرمنو، گروه متناظر به‌صورت داخلی فعال می‌شود.

| گروه نوبار | مقصدهای فعلی زیرمنو |
| --- | --- |
| `home` — Home | `home`، `activity` |
| `services` — Services | `design`، `development`، `consulting` |
| `about` — About | `about`، `team` |
| `tools` — Tools | `search`، `pages`، `settings` |
| `contact` — Contact | `contact`، `support` |

شناسهٔ `search` ابزار جست‌وجو را باز می‌کند. برای تغییر ساختار زیرمنوها، آرایهٔ `groups` در ابتدای `navbar.js` را ویرایش کنید. محتوای جست‌وجو از گزینهٔ `searchItems` می‌آید؛ نتایج در همان مرورگر فیلتر می‌شوند. کلیدواژه‌های فارسی و انگلیسی را می‌توان در `keywords` کنار هم قرار داد.

رویداد DOM به نام `glassy:navigate` نیز از ریشهٔ نوبار منتشر می‌شود و شناسه در `event.detail.id` است. برای یک عملیات مسیریابی، از callback یا رویداد استفاده کنید تا مسیر دو بار اجرا نشود. اگر چند نوبار نصب می‌کنید، میان‌بر سراسری را فقط برای نمونهٔ اصلی فعال نگه دارید و به نمونه‌های دیگر `shortcuts: false` بدهید.

## ۶. API سایدبار

```js
const sidebar = new GlassySidebar(root, {
  collapsed: false,
  lang: 'en',
  onNavigate: id => {},
  onCollapseChange: collapsed => {}
});

sidebar.setActive('messages');
sidebar.setNotifications(4);
sidebar.setCollapsed(true);
```

| متد | رفتار |
| --- | --- |
| `setCollapsed(boolean)` | تغییر حالت باز و جمع‌شده؛ پس از تغییر، callback مربوط اجرا می‌شود |
| `setLanguage('en' \| 'fa')` | تغییر زبان و جهت؛ انتخاب فعال و حالت جمع‌شده حفظ می‌شوند |
| `setActive(id)` | فعال کردن یکی از ۹ مقصد اصلی سایدبار؛ شناسهٔ نامعتبر انتخاب قبلی را تغییر نمی‌دهد |
| `setNotifications(count)` | نمایش عدد صحیح نامنفی؛ صفر نشان اعلان را پنهان می‌کند و اعداد بیش از ۹۹ با `99+` نمایش داده می‌شوند |
| `destroy()` | پاک‌سازی listenerها و tooltip و بازگرداندن محتوای اولیهٔ محل نصب |

ویژگی‌های عمومی وضعیت: `collapsed`، `lang`، `active` و `notifications`. متدهای تنظیم سایدبار نمونه را برمی‌گردانند و قابل زنجیره‌کردن هستند. مقدار اولیهٔ مقصد فعال `home` و تعداد اعلان‌ها `2` است.

| شناسه | عنوان مرجع | عنوان فارسی |
| --- | --- | --- |
| `home` | Home | خانه |
| `post` | Post | پست‌ها |
| `messages` | Messages | پیام‌ها |
| `friends` | Friends | دوستان |
| `notifications` | Notifications | اعلان‌ها |
| `group` | Group | گروه |
| `pages` | Pages | صفحه‌ها |
| `games` | Games | بازی‌ها |
| `settings` | Setting | تنظیمات |
| `account` | softysta.com | حساب کاربری |
| `logout` | Log Out | خروج |

کلیک روی ۹ مقصد اصلی هم انتخاب فعال را عوض می‌کند و هم `onNavigate` را اجرا می‌کند. `account` و `logout` فقط به callback ارسال می‌شوند. خود کامپوننت هیچ ورود، خروج یا درخواست شبکه‌ای انجام نمی‌دهد.

سایدبار یک واژه‌نامهٔ عربی با مقدار `ar` نیز دارد. رابط کامل نمونه و نوبار دو زبان `en` و `fa` را پوشش می‌دهند.

## ۷. صفحه‌کلید، موبایل و راست‌به‌چپ

| ورودی | نتیجه |
| --- | --- |
| `Tab` و `Shift+Tab` | جابه‌جایی بین کنترل‌های قابل استفاده |
| `Enter` یا `Space` روی دکمه | اجرای همان عمل کلیک |
| `Ctrl+K` یا `⌘+K` | باز کردن جست‌وجوی نوبار |
| `Escape` | بستن پنل باز، جست‌وجو یا منوی کشویی موبایل؛ tooltip سایدبار نیز بسته می‌شود |
| چپ / راست روی عنوان‌های نوبار | حرکت بین گروه‌ها، هماهنگ با جهت زبان |
| پایین روی عنوان گروه | باز کردن زیرمنو و فوکوس روی اولین گزینه |
| بالا / پایین در زیرمنو یا نتایج | حرکت بین گزینه‌ها |
| `Home` و `End` در گروه‌ها یا زیرمنو | رفتن به اولین و آخرین گزینه |
| `Enter` در جست‌وجو | انتخاب نتیجهٔ مشخص‌شده |

در حالت جمع‌شده، نام گزینه‌های سایدبار با حرکت اشاره‌گر یا فوکوس صفحه‌کلید در tooltip ظاهر می‌شود. Tooltip بیرون از بخش اسکرول منو ساخته می‌شود. دکمه‌ها نام دسترس‌پذیر دارند؛ انتخاب فعال با `aria-current` و وضعیت بازشدن با `aria-expanded` مشخص می‌شود.

در صفحهٔ نمایش، سایدبار در حالت انگلیسی سمت چپ و در حالت فارسی سمت راست قرار می‌گیرد. فلش‌ها، فاصله‌های منطقی و چینش منوها نیز هماهنگ می‌شوند. نام برند و آدرس حساب با جهت مستقل خوانا می‌مانند. در پروژهٔ مقصد، جهت کلی سند یا پوستهٔ برنامه را نیز تنظیم کنید؛ `setLanguage` هر کامپوننت به‌تنهایی فقط ریشهٔ همان کامپوننت را تغییر می‌دهد.

نوبار در عرض کم چیدمان فشرده و دکمهٔ منو دارد. نمونهٔ موبایل سایدبار را روی لایهٔ جلویی باز می‌کند؛ پس‌زمینه هنگام بازبودن غیرفعال است، فوکوس در منوی باز می‌ماند و بعد از بستن به کنترل قبلی بازمی‌گردد. خود سایدبارِ مستقل محدودیت فوکوس ایجاد نمی‌کند.

## ۸. تنظیم ظاهر و حرکت

استایل کامپوننت نوبار در فضای نام `gn-*` و استایل سایدبار در `gs-*` قرار دارد. استایل عمومی صفحهٔ نمایش در `demo.css` جداست.

| متغیر CSS | مقدار پیش‌فرض | کاربرد |
| --- | --- | --- |
| `--gn-width` | `896px` | عرض پایهٔ نوبار، محدود به فضای موجود |
| `--gn-expanded-width` | `998px` | عرض نوبار هنگام بازشدن جست‌وجو |
| `--gn-height` | `64px` | ارتفاع نوبار؛ قانون موبایل مقدار را به `60px` می‌رساند |
| `--gn-ease` | `cubic-bezier(.22,.8,.24,1)` | منحنی حرکت اصلی نوبار |
| `--gs-expanded-width` | `280px` | عرض سایدبار باز |
| `--gs-collapsed-width` | `80px` | عرض سایدبار جمع‌شده |
| `--gs-blur` | `7px` | محوشدگی پس‌زمینهٔ پنل سایدبار |
| `--gs-ease` | `cubic-bezier(.4,0,.2,1)` | منحنی حرکت سایدبار |

نمونهٔ بازنویسی متغیرها، پس از فایل‌های استایل اصلی:

```css
#site-navbar.gn-root {
  --gn-width: 920px;
  --gn-expanded-width: 1020px;
}

#site-sidebar.gs-root {
  --gs-expanded-width: 280px;
  --gs-collapsed-width: 80px;
  --gs-blur: 7px;
}
```

عرض جمع‌شدهٔ ۸۰ پیکسل برای فاصله‌های دقیق آیکون‌ها طراحی شده است؛ در صورت تغییر زیاد آن، فاصله‌های داخلی ریل را هم تنظیم کنید. رنگ‌ها در قواعد CSS و فایل‌های SVG قابل تغییرند:

| بخش | رنگ یا مشخصهٔ پایه |
| --- | --- |
| زمینهٔ نمایش | `#08080a` |
| سطح نوبار | طیف `rgba(40,41,46,.82)` تا `rgba(27,28,32,.87)` |
| متن اصلی نوبار | `#f5f5f7` |
| برند سایدبار | `#5f99ef` |
| حاشیهٔ سایدبار | `rgba(235,232,255,.27)` |
| شمارندهٔ اعلان | زمینهٔ `#f1f6ff` و متن `#152b40` |
| گوشه‌های پنل | نوبار `16px`؛ سایدبار `24px` |

حرکت تغییر عرض نوبار حدود ۴۲۰ میلی‌ثانیه و سایدبار ۳۵۰ میلی‌ثانیه است. تنظیم `prefers-reduced-motion` سیستم رعایت می‌شود. برای کاهش حرکت از داخل برنامه نیز می‌توانید بنویسید:

```js
document.documentElement.dataset.reduceMotion = 'true';
// فعال‌سازی دوبارهٔ حرکت، در صورت مجاز بودن تنظیم سیستم:
document.documentElement.dataset.reduceMotion = 'false';
```

میزان شفافیت و محوشدگی پنل‌ها به تصویری که پشت آن‌ها قرار می‌گیرد وابسته است؛ پس‌زمینهٔ مناسب را در پوستهٔ سایت قرار دهید. کامپوننت سایدبار خودش تصویر پس‌زمینهٔ کل صفحه را اضافه نمی‌کند.

## ۹. ورود نمایشی و داده‌های محلی

**فرم ورود این پروژه صرفاً یک تعامل نمایشی است.** ثبت‌نام، حساب واقعی، جلسهٔ احراز هویت، API برنامه و پایگاه داده‌ای وجود ندارد. ارسال فرم فقط وضعیت نمایشی همان صفحه را تغییر می‌دهد. هیچ درخواست ورود ارسال نمی‌شود و رمز عبور در هیچ ذخیره‌سازی پایدار برنامه ثبت نمی‌شود؛ فرم هنگام بستن یا تکمیل پاک می‌شود.

سرور `npm start` فقط فایل‌های استاتیک را تحویل می‌دهد. برای ورود واقعی، `onLogin` و مسیر `logout` را به امکانات موجود سایت خود متصل کنید.

صفحهٔ نمایش، در صورت در دسترس بودن `localStorage`، موارد زیر را با پیشوند `glassy-demo:` نگه می‌دارد:

| کلید | محتوای ذخیره‌شده |
| --- | --- |
| `lang` | انتخاب فارسی یا انگلیسی |
| `collapsed` | حالت باز یا جمع‌شدهٔ سایدبار |
| `reduce-motion` | انتخاب کاهش حرکت |
| `draft` | نوشتهٔ نمونه، فقط بعد از فشردن ذخیرهٔ پیش‌نویس |

ذخیره‌سازی در `demo.js` قرار دارد؛ دو کلاس مستقل، تنظیمات یا داده‌های کاربر را در `localStorage` ذخیره نمی‌کنند. اگر مرورگر در حالت آفلاین یا خصوصی ذخیره‌سازی را نپذیرد، صفحه همچنان اجرا می‌شود و ماندگاری این انتخاب‌ها ممکن نیست.

وضعیت ورود نمایشی، شمارندهٔ بازی و وضعیت اعلان‌ها در حافظهٔ همان صفحه‌اند. دکمهٔ **Reset** تنظیمات نمایش را به پیش‌فرض برمی‌گرداند و پیش‌نویس ذخیره‌شده را حذف نمی‌کند.

## English appendix

This project recreates the supplied **navbar.mp4** and **sidebar.mp4** as dependency-free browser components. The reference names **Nav**, **CODEXR / CXR**, and **softysta.com** are preserved. Backgrounds are editable SVG recreations, not the original video image assets.

- **Offline:** open the separately delivered `Glassy-Navigation.html`, or keep the complete `dist` folder from the source ZIP and open `dist/index.html`. Detached copies do not include a source-download button; the source ZIP is supplied separately.
- **Development:** Node.js 18+, then `npm run build` and `npm start`. Default local address: `http://localhost:4173`. No `npm install` is required.
- **Components:** load `navbar.css` / `navbar.js` and `sidebar.css` / `sidebar.js`. Mount `window.GlassyNavbar` and `window.GlassySidebar` into DOM elements. Give the sidebar's parent an explicit height.
- **Integration:** connect navigation callbacks to your router and login/logout callbacks to your existing authentication. `setLoggedIn` changes the button label only; `setSidebarExpanded` updates navbar accessibility state only.
- **Localization:** the complete demo supports English and Persian with mirrored RTL layout. The sidebar additionally includes Arabic labels.
- **Interaction:** search supports `Ctrl/Cmd+K`, arrow keys, Enter and Escape. Buttons have visible keyboard focus. Collapsed sidebar labels appear on hover and focus. Both system and application reduced-motion settings are respected.
- **Data:** demo sign-in makes no authentication request and never persists a password. Optional local preferences and a saved draft live only in the demo wrapper. Dropdown content, destination cards, search results and responsive behavior extend the visual states shown in the clips.
- **Handoff:** edit `src` and `assets`, rebuild, and distribute `dist`. A build regenerates both standalone HTML and source ZIP under `dist/downloads`. The ZIP includes source, scripts, this guide and runnable output. Call each component's `destroy()` when removing it from your application.
