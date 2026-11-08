/* GlassySidebar — standalone, dependency-free sidebar controller. */
(function (global) {
  'use strict';

  let instanceNumber = 0;

  const WORDS = {
    en: {
      sidebar: 'Sidebar navigation', navigation: 'Main navigation', menu: 'MENU',
      home: 'Home', post: 'Post', messages: 'Messages', friends: 'Friends',
      notifications: 'Notifications', group: 'Group', pages: 'Pages',
      games: 'Games', settings: 'Setting', logout: 'Log Out',
      account: 'Account', role: 'Super Admin', expand: 'Expand sidebar',
      collapse: 'Collapse sidebar', unread: 'unread'
    },
    fa: {
      sidebar: 'نوار کناری', navigation: 'پیمایش اصلی', menu: 'فهرست',
      home: 'خانه', post: 'پست‌ها', messages: 'پیام‌ها', friends: 'دوستان',
      notifications: 'اعلان‌ها', group: 'گروه', pages: 'صفحه‌ها',
      games: 'بازی‌ها', settings: 'تنظیمات', logout: 'خروج',
      account: 'حساب کاربری', role: 'مدیر کل', expand: 'باز کردن نوار کناری',
      collapse: 'بستن نوار کناری', unread: 'خوانده‌نشده'
    },
    ar: {
      sidebar: 'الشريط الجانبي', navigation: 'التنقل الرئيسي', menu: 'القائمة',
      home: 'الرئيسية', post: 'المنشورات', messages: 'الرسائل', friends: 'الأصدقاء',
      notifications: 'الإشعارات', group: 'المجموعات', pages: 'الصفحات',
      games: 'الألعاب', settings: 'الإعدادات', logout: 'تسجيل الخروج',
      account: 'الحساب', role: 'المشرف العام', expand: 'توسيع الشريط الجانبي',
      collapse: 'طي الشريط الجانبي', unread: 'غير مقروءة'
    }
  };

  // Deliberately inline: the component needs no icon font or remote assets.
  const ICONS = {
    home: '<path d="m3 10 9-7.5 9 7.5v11H3Z"/>',
    post: '<path d="M13 3H5a1 1 0 0 0-1 1v17h15V11M8 8h5M8 12h7M8 16h5M18 2v6M15 5h6"/>',
    messages: '<path fill="currentColor" stroke="none" d="M3 5h18v2l-9 6.6L3 7V5Zm0 4.45 8.4 6.15a1 1 0 0 0 1.2 0L21 9.45V19H3V9.45Z"/>',
    friends: '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M21 21v-2a4 4 0 0 0-3-3.87M16 3.2a4 4 0 0 1 0 7.6"/><circle cx="9.5" cy="7" r="4"/>',
    notifications: '<path fill="currentColor" stroke="none" d="M12 2a6 6 0 0 0-6 6v4.2c0 1.8-.8 3.3-2.1 4.5-.7.6-.3 1.8.7 1.8h14.8c1 0 1.4-1.2.7-1.8C18.8 15.5 18 14 18 12.2V8a6 6 0 0 0-6-6Zm-2.3 18a2.4 2.4 0 0 0 4.6 0H9.7Z"/>',
    group: '<g fill="currentColor" stroke="none"><circle cx="12" cy="7" r="3"/><circle cx="4.5" cy="8.5" r="2.25"/><circle cx="19.5" cy="8.5" r="2.25"/><path d="M7 20v-3a5 5 0 0 1 10 0v3H7ZM1 19v-2a3.5 3.5 0 0 1 4.7-3.3A7 7 0 0 0 5 17v2H1Zm18 0v-2c0-1.2-.2-2.3-.7-3.3A3.5 3.5 0 0 1 23 17v2h-4Z"/></g>',
    pages: '<path d="M14 21H4V3h15v10M8 7h7M8 11h5M14 17l5-5 3 3-5 5-4 1Z"/>',
    games: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M6 6h12c2.2 0 3.2 2.2 3.8 5.7l.8 4.8c.4 2.4-2 3.6-3.5 1.8L16.8 16H7.2l-2.3 2.3C3.4 20.1 1 18.9 1.4 16.5l.8-4.8C2.8 8.2 3.8 6 6 6Zm-.3 3v2H3.8v1.5h1.9v2h1.5v-2h1.9V11H7.2V9H5.7Zm10.8 1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm3 2.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/>',
    settings: '<path d="m9.5 3-.6 2.5-1.6.9-2.4-.8L3 9l1.9 1.7v2.6L3 15l1.9 3.4 2.4-.8 1.6.9.6 2.5h5l.6-2.5 1.6-.9 2.4.8L21 15l-1.9-1.7v-2.6L21 9l-1.9-3.4-2.4.8-1.6-.9-.6-2.5Z"/><circle cx="12" cy="12" r="3.25"/>',
    logout: '<path d="M12 2v10M6.3 5.7a8 8 0 1 0 11.4 0"/>',
    chevron: '<path d="m14.5 6-6 6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>'
  };

  const PRIMARY = ['home', 'post', 'messages', 'friends', 'notifications', 'group'];
  const SECONDARY = ['pages', 'games', 'settings'];
  const ROUTES = PRIMARY.concat(SECONDARY);

  function icon(name, className) {
    return '<svg class="' + (className || 'gs-icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
  }

  function item(id) {
    return '<li class="gs-list-item"><button class="gs-item" type="button" data-gs-action="' + id + '" data-gs-tooltip="">' +
      icon(id) + '<span class="gs-label" data-gs-text="' + id + '" aria-hidden="true"></span>' +
      (id === 'notifications' ? '<span class="gs-badge" aria-hidden="true"></span>' : '') +
      '</button></li>';
  }

  class GlassySidebar {
    constructor(root, options) {
      if (!root || root.nodeType !== 1) {
        throw new TypeError('GlassySidebar requires a root element.');
      }

      const config = options || {};
      this.root = root;
      this.collapsed = Boolean(config.collapsed);
      this.lang = Object.prototype.hasOwnProperty.call(WORDS, config.lang) ? config.lang : 'en';
      this.active = 'home';
      this.notifications = 2;
      this.onNavigate = typeof config.onNavigate === 'function' ? config.onNavigate : function () {};
      this.onCollapseChange = typeof config.onCollapseChange === 'function' ? config.onCollapseChange : function () {};
      this._uid = 'gs-' + (++instanceNumber);
      this._destroyed = false;
      this._listeners = [];
      this._tooltipTarget = null;
      this._focusedTarget = null;
      this._hoveredTarget = null;
      this._originalChildren = Array.from(root.childNodes);
      this._originalAttributes = {};
      ['role', 'aria-label', 'dir', 'lang', 'data-gs-collapsed'].forEach((name) => {
        this._originalAttributes[name] = root.getAttribute(name);
      });
      this._originalClasses = {
        root: root.classList.contains('gs-root'),
        collapsed: root.classList.contains('gs-is-collapsed')
      };

      this._render();
      this._bind();
      this._syncLanguage();
      this._syncCollapse();
      this.setActive(this.active);
      this.setNotifications(this.notifications);
    }

    _render() {
      this.root.classList.add('gs-root');
      this.root.setAttribute('role', 'complementary');
      this.root.innerHTML =
        '<button class="gs-collapse" type="button" aria-controls="' + this._uid + '-content">' + icon('chevron', 'gs-collapse-icon') + '</button>' +
        '<div class="gs-content" id="' + this._uid + '-content">' +
          '<div class="gs-header">' +
            '<div class="gs-traffic" aria-hidden="true"><span></span><span></span><span></span></div>' +
            '<div class="gs-brand" dir="ltr"><span class="gs-brand-full">CODEXR</span><span class="gs-brand-short" aria-hidden="true">CXR</span></div>' +
          '</div>' +
          '<button class="gs-account" type="button" data-gs-action="account" data-gs-tooltip="">' +
            '<span class="gs-avatar" aria-hidden="true">S</span>' +
            '<span class="gs-account-copy"><bdi class="gs-account-name" dir="ltr">softysta.com</bdi><span class="gs-role" data-gs-text="role"></span></span>' +
            icon('down', 'gs-account-chevron') +
          '</button>' +
          '<nav class="gs-nav">' +
            '<p class="gs-menu-label" data-gs-text="menu"></p>' +
            '<ul class="gs-list">' + PRIMARY.map(item).join('') + '</ul>' +
            '<hr class="gs-separator">' +
            '<ul class="gs-list">' + SECONDARY.map(item).join('') + '</ul>' +
          '</nav>' +
          '<div class="gs-footer"><button class="gs-item" type="button" data-gs-action="logout" data-gs-tooltip="">' + icon('logout') + '<span class="gs-label" data-gs-text="logout" aria-hidden="true"></span></button></div>' +
        '</div>';

      this._collapseButton = this.root.querySelector('.gs-collapse');
      this._nav = this.root.querySelector('.gs-nav');
      this._account = this.root.querySelector('.gs-account');
      this._badge = this.root.querySelector('.gs-badge');
      this._buttons = new Map();
      this.root.querySelectorAll('[data-gs-action]').forEach((button) => {
        this._buttons.set(button.dataset.gsAction, button);
      });

      // A body-level tooltip stays visible outside the independently scrolling rail.
      this._tooltip = this.root.ownerDocument.createElement('div');
      this._tooltip.id = this._uid + '-tooltip';
      this._tooltip.className = 'gs-tooltip';
      this._tooltip.setAttribute('role', 'tooltip');
      this._tooltip.hidden = true;
      this.root.ownerDocument.body.appendChild(this._tooltip);
    }

    _listen(target, type, listener, options) {
      target.addEventListener(type, listener, options);
      this._listeners.push([target, type, listener, options]);
    }

    _ownedButton(target) {
      if (!target || target.nodeType !== 1) return null;
      const button = target.closest('[data-gs-action]');
      return button && this._buttons.get(button.dataset.gsAction) === button ? button : null;
    }

    _bind() {
      this._listen(this._collapseButton, 'click', () => this.setCollapsed(!this.collapsed));
      this._listen(this.root, 'click', (event) => {
        const button = this._ownedButton(event.target);
        if (!button) return;
        const id = button.dataset.gsAction;
        this._hideTooltip();
        if (ROUTES.includes(id)) this.setActive(id);
        this.onNavigate(id);
      });
      this._listen(this.root, 'pointerover', (event) => {
        if (event.pointerType === 'touch') return;
        const button = this._ownedButton(event.target);
        if (!button) return;
        this._hoveredTarget = button;
        this._showTooltip(button);
      });
      this._listen(this.root, 'pointerout', (event) => {
        const button = this._ownedButton(event.target);
        if (!button || (event.relatedTarget && button.contains(event.relatedTarget))) return;
        this._hoveredTarget = null;
        if (this._focusedTarget) this._showTooltip(this._focusedTarget);
        else this._hideTooltip();
      });
      this._listen(this.root, 'focusin', (event) => {
        this._focusedTarget = this._ownedButton(event.target);
        if (this._focusedTarget) this._showTooltip(this._focusedTarget);
        else this._hideTooltip();
      });
      this._listen(this.root, 'focusout', (event) => {
        if (event.relatedTarget && event.target.contains(event.relatedTarget)) return;
        this._focusedTarget = null;
        if (this._hoveredTarget) this._showTooltip(this._hoveredTarget);
        else this._hideTooltip();
      });
      this._listen(this.root, 'keydown', (event) => {
        if (event.key === 'Escape') this._hideTooltip();
      });
      this._listen(this._nav, 'scroll', () => this._hideTooltip(), { passive: true });
      const view = this.root.ownerDocument.defaultView;
      this._listen(view, 'resize', () => this._hideTooltip(), { passive: true });
      this._listen(view, 'scroll', () => this._hideTooltip(), { passive: true });
    }

    _syncLanguage() {
      const words = WORDS[this.lang];
      this.root.dir = this.lang === 'en' ? 'ltr' : 'rtl';
      this.root.lang = this.lang;
      this.root.setAttribute('aria-label', words.sidebar);
      this._nav.setAttribute('aria-label', words.navigation);
      this.root.querySelectorAll('[data-gs-text]').forEach((element) => {
        element.textContent = words[element.dataset.gsText];
      });
      this._buttons.forEach((button, id) => {
        const label = id === 'account' ? words.account + ' · softysta.com' : words[id];
        button.setAttribute('aria-label', label);
        button.dataset.gsTooltip = id === 'account' ? 'softysta.com · ' + words.role : label;
      });
      this._syncCollapse();
      this._syncNotifications();
    }

    _syncCollapse() {
      this.root.classList.toggle('gs-is-collapsed', this.collapsed);
      this.root.dataset.gsCollapsed = String(this.collapsed);
      this._collapseButton.setAttribute('aria-expanded', String(!this.collapsed));
      this._collapseButton.setAttribute('aria-label', WORDS[this.lang][this.collapsed ? 'expand' : 'collapse']);
    }

    _syncNotifications() {
      const words = WORDS[this.lang];
      const count = this.notifications;
      const formatter = new Intl.NumberFormat(this.lang === 'fa' ? 'fa-IR' : this.lang === 'ar' ? 'ar' : 'en-US');
      this._badge.hidden = count === 0;
      this._badge.textContent = count > 99 ? formatter.format(99) + '+' : formatter.format(count);
      const label = words.notifications + (count ? ', ' + formatter.format(count) + ' ' + words.unread : '');
      const button = this._buttons.get('notifications');
      button.setAttribute('aria-label', label);
      button.dataset.gsTooltip = label;
      if (this._tooltipTarget === button) this._showTooltip(button);
    }

    _showTooltip(button) {
      if (!this.collapsed || this._destroyed || !button) return;
      this._hideTooltip();
      this._tooltipTarget = button;
      this._tooltip.textContent = button.dataset.gsTooltip;
      this._tooltip.dir = this.root.dir;
      this._tooltip.lang = this.lang;
      this._tooltip.hidden = false;
      button.setAttribute('aria-describedby', this._tooltip.id);

      const bounds = button.getBoundingClientRect();
      const tip = this._tooltip.getBoundingClientRect();
      const view = this.root.ownerDocument.defaultView;
      const gap = 12;
      let left = this.root.dir === 'rtl' ? bounds.left - tip.width - gap : bounds.right + gap;
      if (left + tip.width > view.innerWidth - 8) left = bounds.left - tip.width - gap;
      if (left < 8) left = bounds.right + gap;
      left = Math.max(8, Math.min(left, view.innerWidth - tip.width - 8));
      const top = Math.max(8, Math.min(bounds.top + (bounds.height - tip.height) / 2, view.innerHeight - tip.height - 8));
      this._tooltip.style.left = left + 'px';
      this._tooltip.style.top = top + 'px';
    }

    _hideTooltip() {
      if (this._tooltipTarget) this._tooltipTarget.removeAttribute('aria-describedby');
      this._tooltipTarget = null;
      if (this._tooltip) this._tooltip.hidden = true;
    }

    setCollapsed(value) {
      if (this._destroyed) return this;
      const next = Boolean(value);
      if (next === this.collapsed) return this;
      this.collapsed = next;
      this._hideTooltip();
      this._hoveredTarget = null;
      this._syncCollapse();
      this.onCollapseChange(this.collapsed);
      return this;
    }

    setLanguage(language) {
      if (this._destroyed) return this;
      const next = Object.prototype.hasOwnProperty.call(WORDS, language) ? language : 'en';
      if (next === this.lang) return this;
      this.lang = next;
      this._hideTooltip();
      this._syncLanguage();
      return this;
    }

    setActive(id) {
      if (this._destroyed || !ROUTES.includes(id)) return this;
      this.active = id;
      this._buttons.forEach((button, buttonId) => {
        const selected = buttonId === id;
        button.classList.toggle('gs-is-active', selected);
        if (selected) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
      return this;
    }

    setNotifications(count) {
      if (this._destroyed) return this;
      const number = Number(count);
      this.notifications = Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
      this._syncNotifications();
      return this;
    }

    destroy() {
      if (this._destroyed) return;
      this._destroyed = true;
      this._hideTooltip();
      this._listeners.forEach(([target, type, listener, options]) => {
        target.removeEventListener(type, listener, options);
      });
      this._listeners = [];
      this._tooltip.remove();
      this.root.replaceChildren(...this._originalChildren);
      Object.keys(this._originalAttributes).forEach((name) => {
        const value = this._originalAttributes[name];
        if (value === null) this.root.removeAttribute(name);
        else this.root.setAttribute(name, value);
      });
      this.root.classList.toggle('gs-root', this._originalClasses.root);
      this.root.classList.toggle('gs-is-collapsed', this._originalClasses.collapsed);
      this._buttons.clear();
      this._originalChildren = [];
    }
  }

  global.GlassySidebar = GlassySidebar;
})(window);
