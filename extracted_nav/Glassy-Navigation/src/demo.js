/* Demo composition. Replace the callbacks with your own app's router/auth. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const translations = {
    skip:['Skip to the navigation','رفتن به نوار ناوبری'],eyebrow:['THE GLASS COLLECTION','مجموعهٔ شیشه‌ای'],reset:['Reset','بازنشانی'],
    navbar:['Navbar','نوبار'],sidebar:['Sidebar','سایدبار'],together:['Together','ترکیبی'],interactive:['Interactive','تعاملی'],
    searchHint:['to search','برای جست‌وجو'],closeHint:['to close','برای بستن'],download:['Download source','دانلود سورس'],
    workspace:['YOUR WORKSPACE','فضای کار شما'],preview:['DEMO','نمایشی'],welcome:['Welcome back.','خوش آمدید.'],
    loginNote:['Try the sign-in interface. No account is created and nothing is sent.','رابط ورود را امتحان کنید. حسابی ساخته نمی‌شود و اطلاعاتی ارسال نمی‌شود.'],
    email:['Email address','آدرس ایمیل'],password:['Password','رمز عبور'],signInDemo:['Try demo sign-in','امتحان ورود نمایشی'],
    localNote:['For this preview, use sample details.','در این پیش‌نمایش از اطلاعات نمونه استفاده کنید.'],
  };
  const catalog = [
    {id:'home',en:'Home',fa:'خانه',keywords:'overview نمای کلی'}, {id:'activity',en:'Recent activity',fa:'فعالیت‌های اخیر'},
    {id:'design',en:'Design studio',fa:'استودیوی طراحی',keywords:'services خدمات'}, {id:'development',en:'Development',fa:'توسعه',keywords:'services خدمات'},
    {id:'consulting',en:'Consulting',fa:'مشاوره',keywords:'services خدمات'}, {id:'about',en:'About',fa:'دربارهٔ ما'},
    {id:'team',en:'Our team',fa:'تیم ما'}, {id:'post',en:'Post',fa:'نوشته‌ها'}, {id:'messages',en:'Messages',fa:'پیام‌ها'},
    {id:'friends',en:'Friends',fa:'دوستان'}, {id:'notifications',en:'Notifications',fa:'اعلان‌ها'}, {id:'group',en:'Group',fa:'گروه'},
    {id:'pages',en:'Pages',fa:'صفحه‌ها'}, {id:'games',en:'Games',fa:'بازی‌ها'}, {id:'settings',en:'Setting',fa:'تنظیمات'},
    {id:'contact',en:'Contact',fa:'تماس با ما'}, {id:'support',en:'Support',fa:'پشتیبانی'}, {id:'account',en:'Account',fa:'حساب کاربری'},
  ];
  const storage = {
    get(key) { try { return localStorage.getItem('glassy-demo:' + key); } catch { return null; } },
    set(key,value) { try { localStorage.setItem('glassy-demo:' + key,String(value)); return true; } catch { return false; } },
    remove(key) { try { localStorage.removeItem('glassy-demo:' + key); } catch {} },
  };
  let lang = storage.get('lang') === 'fa' ? 'fa' : 'en';
  let view = ['navbar','sidebar','combined'].includes(new URLSearchParams(location.search).get('view')) ? new URLSearchParams(location.search).get('view') : 'navbar';
  let section = null;
  let toastTimer;
  let drawerOpen = false;
  let drawerPreviousFocus = null;
  let signedIn = false;
  let draft = storage.get('draft') || '';
  let unread = 2;
  let clickCount = 0;
  const mobile = window.matchMedia('(max-width:540px)');
  const t = (en,fa) => lang === 'fa' ? fa : en;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const sidebar = new window.GlassySidebar($('sidebar-mount'), {
    collapsed:storage.get('collapsed') === 'true',lang,
    onNavigate(id) { navigate(id, 'sidebar'); },
    onCollapseChange(collapsed) {
      storage.set('collapsed',collapsed);
      updateDockWidth();
    },
  });
  const navbar = new window.GlassyNavbar($('navbar-mount'), {
    lang, searchItems:catalog, onNavigate:navigate, onToggleSidebar:toggleSidebar,
    onLogin() {
      if (signedIn) navigate('account');
      else openLogin();
    },
  });

  function announce(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').hidden = false;
    toastTimer = setTimeout(() => { $('toast').hidden = true; },3200);
  }

  function updateDockWidth() {
    const expanded = window.matchMedia('(max-width:1050px)').matches ? 260 : 280;
    $('showcase').style.setProperty('--dock-width',(sidebar.collapsed ? 80 : expanded) + 'px');
  }

  function setView(next) {
    if (!['navbar','sidebar','combined'].includes(next)) return;
    if (drawerOpen) closeDrawer(false);
    navbar.closePanels();
    view = next;
    $('showcase').dataset.view = next;
    $('sidebar-dock').hidden = next === 'navbar';
    $('sidebar-dock').inert = next === 'navbar';
    $('navbar-position').inert = next === 'sidebar';
    navbar.setSidebarExpanded(next === 'combined');
    document.querySelectorAll('[data-view][aria-pressed]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.view === next)));
    const titles = {navbar:[t('Glassy Navbar','نوبار شیشه‌ای'),'UI'],sidebar:[t('Glassy Sidebar','سایدبار شیشه‌ای'),'V3'],combined:[t('Glassy Navigation','ناوبری شیشه‌ای'),'UI']};
    $('demo-title').innerHTML = esc(titles[next][0]) + '<span class="title-accent">' + titles[next][1] + '</span>';
    const hints = {
      navbar:t('Hover to explore. Click Nav for the sidebar.','روی گزینه‌ها حرکت کن؛ برای سایدبار روی Nav بزن.'),
      sidebar:t('Click the round arrow to collapse the sidebar.','برای جمع کردن سایدبار، فلش دایره‌ای را بزن.'),
      combined:t('Everything in one place. Choose a destination.','هر دو منو کنار هم؛ یکی از بخش‌ها را انتخاب کن.'),
    };
    $('viewer-hint').textContent = hints[next];
    $('stage-caption').textContent = {navbar:'01 / GLASSY NAVBAR',sidebar:'02 / GLASSY SIDEBAR',combined:'01 + 02 / GLASSY NAVIGATION'}[next];
    document.querySelector('.shortcut-note').hidden = next === 'sidebar';
    $('section-panel').hidden = true;
    $('combined-caption').hidden = false;
    section = null;
    updateDockWidth();
  }

  function openDrawer() {
    drawerPreviousFocus = document.activeElement;
    drawerOpen = true;
    $('showcase').dataset.drawer = 'true';
    $('sidebar-dock').hidden = false;
    $('sidebar-dock').inert = false;
    $('sidebar-dock').setAttribute('role','dialog');
    $('sidebar-dock').setAttribute('aria-modal','true');
    $('sidebar-dock').setAttribute('aria-label',t('Sidebar navigation','ناوبری کناری'));
    $('drawer-scrim').hidden = false;
    $('navbar-position').inert = true;
    $('view-tabs').inert = true;
    document.querySelector('.demo-header').inert = true;
    document.querySelector('.demo-footer').inert = true;
    $('section-panel').inert = true;
    document.body.style.overflow = 'hidden';
    navbar.setSidebarExpanded(true);
    $('drawer-close').focus();
  }

  function closeDrawer(restoreFocus = true) {
    drawerOpen = false;
    delete $('showcase').dataset.drawer;
    $('sidebar-dock').removeAttribute('role');
    $('sidebar-dock').removeAttribute('aria-modal');
    $('sidebar-dock').removeAttribute('aria-label');
    $('drawer-scrim').hidden = true;
    $('sidebar-dock').hidden = view === 'navbar';
    $('sidebar-dock').inert = view === 'navbar';
    $('navbar-position').inert = view === 'sidebar';
    $('view-tabs').inert = false;
    document.querySelector('.demo-header').inert = false;
    document.querySelector('.demo-footer').inert = false;
    $('section-panel').inert = false;
    document.body.style.overflow = '';
    navbar.setSidebarExpanded(view === 'combined');
    if (restoreFocus && drawerPreviousFocus?.isConnected) drawerPreviousFocus.focus();
  }

  function toggleSidebar() {
    if (mobile.matches) { drawerOpen ? closeDrawer() : openDrawer(); }
    else { setView(view === 'combined' ? 'navbar' : 'combined'); }
  }

  function row(label,id,note='') {
    return `<button class="section-row" type="button" data-route="${esc(id)}"><span>${esc(label)}${note ? '<br><small>' + esc(note) + '</small>' : ''}</span><span class="row-arrow" aria-hidden="true">↗</span></button>`;
  }

  function navigate(id, source = 'navbar') {
    if (id === 'logout') {
      signedIn = false;
      navbar.setLoggedIn(false);
      $('login-form').reset();
      if (drawerOpen) closeDrawer();
      announce(t('Demo session signed out.','از نشست نمایشی خارج شدی.'));
      if (section === 'account') renderSection('account');
      return;
    }
    if (!catalog.some(item => item.id === id)) return;
    if (view === 'sidebar' && source === 'sidebar') {
      sidebar.setActive(id);
      announce(catalog.find(item => item.id === id)[lang]);
      return;
    }
    if (drawerOpen) closeDrawer(false);
    if (view !== 'combined') setView('combined');
    section = id;
    sidebar.setActive(id);
    if (id === 'home') navbar.setActive('home');
    renderSection(id);
  }

  function renderSection(id) {
    const item = catalog.find(value => value.id === id);
    if (!item) return;
    section = id;
    $('section-title').textContent = item[lang];
    $('section-panel').hidden = false;
    $('combined-caption').hidden = true;
    const descriptions = {
      home:t('A place for everything. Where would you like to go?','هر چیزی سر جای خودش؛ می‌خواهی به کدام بخش بروی؟'),
      post:t('A small space for your next idea. Your draft stays in this browser.','جایی برای ایدهٔ بعدی تو. پیش‌نویس در همین مرورگر ذخیره می‌شود.'),
      messages:t('A couple of sample messages to try the navigation.','چند پیام نمونه برای امتحان کردن ناوبری.'),
      notifications:t('Your latest updates, together.','آخرین اعلان‌های تو در یک جا.'),
      settings:t('Make the interface feel at home.','رابط را با سلیقهٔ خودت هماهنگ کن.'),
      games:t('A tiny click counter. Just for a quick break.','یک شمارندهٔ کوچک کلیک، برای یک استراحت کوتاه.'),
      account:t('This is a local preview account.','این یک حساب نمایشی محلی است.'),
    };
    $('section-description').textContent = descriptions[id] || t('This destination is open. Explore another part of your workspace.','این بخش باز شده است. قسمت‌های دیگر فضای کار را هم ببین.');
    let content = '';
    if (id === 'home') content = row(t('Design studio','استودیوی طراحی'),'design') + row(t('Your messages','پیام‌های تو'),'messages') + row(t('Preferences','تنظیمات'),'settings');
    else if (id === 'post') content = `<form class="section-form" id="draft-form"><label for="draft-text">${t('Your draft','پیش‌نویس تو')}</label><textarea id="draft-text" maxlength="10000" placeholder="${t('Start writing…','شروع به نوشتن کن…')}">${esc(draft)}</textarea><button class="secondary-button" type="submit">${t('Save draft','ذخیرهٔ پیش‌نویس')}</button></form>`;
    else if (id === 'notifications' || id === 'messages') {
      content = `<button class="section-row ${unread ? 'unread' : 'is-read'}" type="button" data-read-message><span>${t('Welcome to your workspace','به فضای کار خودت خوش آمدی')}<br><small>${t('Sample message','پیام نمونه')}</small></span></button><button class="section-row ${unread > 1 ? 'unread' : 'is-read'}" type="button" data-read-message><span>${t('Your navigation is ready','منوی تو آماده است')}<br><small>${t('Sample update','اعلان نمونه')}</small></span></button><button class="secondary-button" type="button" id="mark-read">${t('Mark all as read','خواندن همهٔ اعلان‌ها')}</button>`;
    } else if (id === 'settings') {
      content = `<label class="section-row"><span>${t('Reduce motion','کاهش حرکت‌ها')}</span><input type="checkbox" id="motion-setting" ${document.documentElement.dataset.reduceMotion === 'true' ? 'checked' : ''}></label><button class="section-row" type="button" data-change-language><span>${t('Switch to Persian / RTL','تغییر به انگلیسی / چپ‌به‌راست')}</span><span class="row-arrow">↗</span></button><button class="section-row" type="button" id="collapse-setting"><span>${t('Collapse / expand sidebar','جمع یا باز کردن سایدبار')}</span><span class="row-arrow">↗</span></button>`;
    } else if (id === 'games') {
      content = `<button class="section-row" type="button" id="click-counter"><span>${t('Click to play','برای بازی کلیک کن')}</span><strong>${clickCount.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')}</strong></button><button class="secondary-button" type="button" id="counter-reset">${t('Start again','شروع دوباره')}</button>`;
    } else if (id === 'account') {
      content = `<div class="section-row"><span dir="ltr">softysta.com</span><small>${signedIn ? t('Demo signed in','ورود نمایشی') : t('Preview profile','پروفایل نمایشی')}</small></div><button class="secondary-button" type="button" id="account-action">${signedIn ? t('Log out','خروج') : t('Open sign-in','باز کردن فرم ورود')}</button>`;
    } else if (id === 'friends' || id === 'group' || id === 'team') {
      content = row(t('Messages','پیام‌ها'),'messages') + row(t('Group','گروه'),'group') + row(t('Account','حساب کاربری'),'account');
    } else if (id === 'pages' || id === 'activity') {
      content = row(t('Overview','نمای کلی'),'home') + row(t('Your draft','پیش‌نویس تو'),'post') + row(t('Recent notifications','اعلان‌های اخیر'),'notifications');
    } else if (id === 'contact' || id === 'support') {
      content = row(t('Messages','پیام‌ها'),'messages') + row(t('Get to know the team','آشنایی با تیم'),'team');
    } else {
      content = row(t('Explore the studio','دیدن استودیو'),'design') + row(t('Get in touch','ارتباط با ما'),'contact') + row(t('Back to your home','بازگشت به خانه'),'home');
    }
    $('section-content').innerHTML = content;
    $('section-title').focus({preventScroll:true});
  }

  function changeLanguage() {
    lang = lang === 'en' ? 'fa' : 'en';
    storage.set('lang',lang);
    applyLanguage();
  }

  function applyLanguage() {
    const previousSection = section;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    navbar.setLanguage(lang);
    sidebar.setLanguage(lang);
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const pair = translations[element.dataset.i18n];
      if (pair) element.textContent = pair[lang === 'fa' ? 1 : 0];
    });
    $('language-switch').innerHTML = `<span lang="${lang === 'fa' ? 'en' : 'fa'}">${lang === 'fa' ? 'English' : 'فارسی'}</span><span class="language-symbol" aria-hidden="true">A<span>文</span></span>`;
    $('language-switch').setAttribute('aria-label',t('Switch to Persian','تغییر به انگلیسی'));
    $('view-tabs').setAttribute('aria-label',t('Navigation view','حالت نمایش منو'));
    $('showcase').setAttribute('aria-label',t('Interactive navigation preview','پیش‌نمایش تعاملی ناوبری'));
    $('drawer-close').setAttribute('aria-label',t('Close sidebar','بستن سایدبار'));
    $('drawer-scrim').setAttribute('aria-label',t('Close sidebar','بستن سایدبار'));
    $('panel-close').setAttribute('aria-label',t('Close panel','بستن بخش'));
    $('login-close').setAttribute('aria-label',t('Close dialog','بستن پنجره'));
    $('password-toggle').setAttribute('aria-label',t('Show password','نمایش رمز عبور'));
    setView(view);
    if (previousSection) renderSection(previousSection);
  }

  function openLogin() {
    if (drawerOpen) closeDrawer(false);
    navbar.closePanels();
    $('login-password').type = 'password';
    $('password-toggle').setAttribute('aria-pressed','false');
    $('password-toggle').setAttribute('aria-label',t('Show password','نمایش رمز عبور'));
    $('login-dialog').showModal();
    $('login-email').focus();
  }

  function closeLogin() {
    $('login-dialog').close();
    $('login-form').reset();
    $('login-password').type = 'password';
    $('password-toggle').setAttribute('aria-pressed','false');
  }

  $('view-tabs').addEventListener('click', event => { const button = event.target.closest('button[data-view]'); if (button) setView(button.dataset.view); });
  $('language-switch').addEventListener('click', changeLanguage);
  $('drawer-close').addEventListener('click', () => closeDrawer());
  $('drawer-scrim').addEventListener('click', () => closeDrawer());
  $('panel-close').addEventListener('click', () => { section = null; $('section-panel').hidden = true; $('combined-caption').hidden = false; });
  $('login-close').addEventListener('click',closeLogin);
  $('login-dialog').addEventListener('click', event => { if (event.target === $('login-dialog')) { const r = $('login-dialog').getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeLogin(); } });
  $('login-dialog').addEventListener('close', () => { $('login-form').reset(); });
  $('password-toggle').addEventListener('click', () => { const show = $('login-password').type === 'password'; $('login-password').type = show ? 'text' : 'password'; $('password-toggle').setAttribute('aria-pressed',String(show)); $('password-toggle').setAttribute('aria-label',show ? t('Hide password','پنهان کردن رمز عبور') : t('Show password','نمایش رمز عبور')); });
  $('login-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!$('login-form').reportValidity()) return;
    signedIn = true;
    navbar.setLoggedIn(true);
    closeLogin();
    announce(t('Demo signed in. No data was sent.','ورود نمایشی انجام شد. اطلاعاتی ارسال نشد.'));
    if (section === 'account') renderSection('account');
  });

  $('section-content').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.route) navigate(button.dataset.route);
    else if (button.hasAttribute('data-change-language')) changeLanguage();
    else if (button.id === 'collapse-setting') sidebar.setCollapsed(!sidebar.collapsed);
    else if (button.id === 'mark-read') { unread = 0; sidebar.setNotifications(0); renderSection(section); announce(t('All caught up.','همهٔ اعلان‌ها خوانده شد.')); }
    else if (button.hasAttribute('data-read-message')) { button.classList.remove('unread'); button.classList.add('is-read'); announce(t('Sample message opened.','پیام نمونه باز شد.')); }
    else if (button.id === 'click-counter') { clickCount++; button.querySelector('strong').textContent = clickCount.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US'); }
    else if (button.id === 'counter-reset') { clickCount = 0; renderSection('games'); }
    else if (button.id === 'account-action') { signedIn ? navigate('logout') : openLogin(); }
  });
  $('section-content').addEventListener('change', event => {
    if (event.target.id === 'motion-setting') {
      const reduced = event.target.checked;
      document.documentElement.dataset.reduceMotion = String(reduced);
      storage.set('reduce-motion',reduced);
      navbar.resetTilt();
    }
  });
  $('section-content').addEventListener('input', event => { if (event.target.id === 'draft-text') draft = event.target.value; });
  $('section-content').addEventListener('submit', event => { if (event.target.id === 'draft-form') { event.preventDefault(); const saved = storage.set('draft',draft); announce(saved ? t('Draft saved in this browser.','پیش‌نویس در همین مرورگر ذخیره شد.') : t('Browser storage is unavailable. Your draft stays in this tab.','ذخیره‌سازی مرورگر در دسترس نیست؛ پیش‌نویس در همین تب باقی می‌ماند.')); } });
  $('reset-button').addEventListener('click', () => {
    if (drawerOpen) closeDrawer(false);
    for (const key of ['collapsed','reduce-motion','lang']) storage.remove(key);
    lang = 'en'; unread = 2; clickCount = 0; signedIn = false; navbar.setLoggedIn(false); sidebar.setNotifications(2); sidebar.setCollapsed(false); sidebar.setActive('home'); navbar.setActive(null);
    document.documentElement.dataset.reduceMotion = 'false';
    section = null; view = 'navbar';
    applyLanguage();
    announce('View reset.');
  });

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented) return;
    if (drawerOpen && event.key === 'Escape') { event.preventDefault(); closeDrawer(); return; }
    if (drawerOpen && event.key === 'Tab') {
      const elements = [...$('sidebar-dock').querySelectorAll('button,a,input,[tabindex="0"]')].filter(element => !element.disabled && !element.closest('[hidden]') && element.getClientRects().length);
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  mobile.addEventListener('change', () => { if (drawerOpen) closeDrawer(false); updateDockWidth(); });
  window.addEventListener('resize',updateDockWidth,{passive:true});
  document.documentElement.dataset.reduceMotion = storage.get('reduce-motion') === 'true' ? 'true' : 'false';
  applyLanguage();

  // Explicit integration hook, useful for your app and for deterministic smoke checks.
  window.glassyDemo = Object.freeze({navbar,sidebar,navigate,setView,get language(){return lang;},get view(){return view;}});
})();
