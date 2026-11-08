/* GlassyNavbar: dependency-free, reusable navigation. No network requests. */
(function (global) {
  'use strict';

  const icons = {
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.7 4.7"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    page: '<path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5m-5 4h5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  };
  const icon = (name, className = '') => '<svg class="gn-icon ' + className + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[name] || icons.page) + '</svg>';
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/\u200c/g, ' ').trim();
  const groups = [
    {id:'home', en:'Home', fa:'خانه', children:[['home','Overview','نمای کلی'],['activity','Recent activity','فعالیت‌های اخیر']]},
    {id:'services', en:'Services', fa:'خدمات', children:[['design','Design studio','استودیوی طراحی'],['development','Development','توسعه'],['consulting','Consulting','مشاوره']]},
    {id:'about', en:'About', fa:'درباره', children:[['about','Our story','داستان ما'],['team','Our team','تیم ما']]},
    {id:'tools', en:'Tools', fa:'ابزارها', children:[['search','Quick search','جست‌وجوی سریع'],['pages','Pages','صفحه‌ها'],['settings','Preferences','تنظیمات']]},
    {id:'contact', en:'Contact', fa:'ارتباط', children:[['contact','Get in touch','تماس با ما'],['support','Support','پشتیبانی']]},
  ];
  let instanceNumber = 0;

  class GlassyNavbar {
    constructor(root, options = {}) {
      if (!(root instanceof Element)) throw new TypeError('GlassyNavbar requires a DOM element.');
      this.root = root;
      this.options = Object.assign({lang:'en', onNavigate:()=>{}, onToggleSidebar:()=>{}, onLogin:()=>{}, searchItems:[], shortcuts:true}, options);
      this.lang = this.options.lang === 'fa' ? 'fa' : 'en';
      this.id = 'gn-' + (++instanceNumber);
      this.activeId = null;
      this.openGroup = null;
      this.searchOpen = false;
      this.searchIndex = -1;
      this.results = [];
      this.loggedIn = false;
      this.raf = 0;
      this.controller = new AbortController();
      this.root.classList.add('gn-root');
      this.render();
      this.listen();
      if ('ResizeObserver' in global) {
        this.observer = new ResizeObserver(() => { this.updateSize(); this.updateIndicator(); if (this.openGroup) this.positionFlyout(); });
        this.observer.observe(this.root);
      }
      this.updateSize();
    }

    t(en, fa) { return this.lang === 'fa' ? fa : en; }

    render() {
      this.root.dir = this.lang === 'fa' ? 'rtl' : 'ltr';
      this.root.lang = this.lang;
      this.root.innerHTML = `
        <nav class="gn-bar" aria-label="${this.t('Main navigation','ناوبری اصلی')}">
          <button class="gn-brand" type="button" aria-label="${this.t('Toggle sidebar','باز و بسته کردن سایدبار')}" aria-expanded="false">
            <span class="gn-brandmark" aria-hidden="true"><i></i><i></i><i></i></span><span lang="en" dir="ltr">Nav</span>
          </button>
          <div class="gn-links" aria-label="${this.t('Sections','بخش‌ها')}">
            ${groups.map(group => `<button class="gn-link" type="button" data-group="${group.id}" aria-haspopup="menu" aria-expanded="false" aria-controls="${this.id}-flyout"><span class="gn-link-label">${escape(group[this.lang])}</span>${icon('chevron','gn-chevron')}</button>`).join('')}
            <span class="gn-indicator" aria-hidden="true"></span>
          </div>
          <div class="gn-actions">
            <div class="gn-search-box">
              <button class="gn-search-toggle" type="button" aria-label="${this.t('Open search','باز کردن جست‌وجو')}" aria-expanded="false" aria-controls="${this.id}-results">${icon('search')}</button>
              <input class="gn-search-input" id="${this.id}-input" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${this.id}-results" aria-label="${this.t('Search navigation','جست‌وجوی بخش‌ها')}" placeholder="${this.t('Search…','جست‌وجو…')}" autocomplete="off" spellcheck="false" hidden>
              <button class="gn-search-close" type="button" aria-label="${this.t('Close search','بستن جست‌وجو')}" hidden><kbd>ESC</kbd>${icon('close')}</button>
            </div>
            <button class="gn-login" type="button">${this.loggedIn ? this.t('Account','حساب') : this.t('Log in','ورود')}</button>
            <button class="gn-mobile-toggle" type="button" aria-expanded="false" aria-label="${this.t('Open sidebar menu','باز کردن منوی کناری')}">${icon('menu')}</button>
          </div>
        </nav>
        <div class="gn-flyout" id="${this.id}-flyout" role="menu" hidden></div>
        <div class="gn-search-results" id="${this.id}-results" role="listbox" aria-label="${this.t('Search results','نتایج جست‌وجو')}" hidden></div>
        <span class="gn-sr-only gn-search-status" role="status" aria-live="polite"></span>`;
      this.bar = this.root.querySelector('.gn-bar');
      this.links = this.root.querySelector('.gn-links');
      this.input = this.root.querySelector('.gn-search-input');
      this.flyout = this.root.querySelector('.gn-flyout');
      this.resultBox = this.root.querySelector('.gn-search-results');
      this.setActive(this.activeId);
      this.setSidebarExpanded(this.sidebarExpanded || false);
      this.root.dataset.searchOpen = 'false';
    }

    listen() {
      const signal = this.controller.signal;
      this.root.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button || !this.root.contains(button)) return;
        if (button.matches('.gn-brand,.gn-mobile-toggle')) { this.closePanels(); this.options.onToggleSidebar(); }
        if (button.matches('.gn-search-toggle')) this.openSearch();
        if (button.matches('.gn-search-close')) this.closeSearch();
        if (button.matches('.gn-login')) { this.closePanels(); this.options.onLogin(); }
        if (button.dataset.group) this.toggleGroup(button.dataset.group, event.detail === 0);
        if (button.dataset.route) this.navigate(button.dataset.route);
        if (button.dataset.result !== undefined) this.chooseResult(Number(button.dataset.result));
      }, {signal});
      this.root.addEventListener('input', event => { if (event.target.matches('.gn-search-input')) this.renderResults(); }, {signal});
      this.root.addEventListener('pointerover', event => {
        const button = event.target.closest('.gn-link');
        this.updateIndicator(button || undefined);
      }, {signal});
      this.root.addEventListener('pointerleave', () => { this.updateIndicator(); this.resetTilt(); }, {signal});
      this.root.addEventListener('focusin', event => {
        const button = event.target.closest('.gn-link');
        this.updateIndicator(button || undefined);
      }, {signal});
      this.root.addEventListener('focusout', event => {
        if (!this.root.contains(event.relatedTarget)) { this.closeGroup(false); this.updateIndicator(); }
      }, {signal});
      this.root.addEventListener('pointermove', event => this.handlePointer(event), {signal, passive:true});
      this.root.addEventListener('keydown', event => this.handleKeys(event), {signal});
      document.addEventListener('pointerdown', event => {
        if (!this.root.contains(event.target)) { this.closeGroup(false); if (this.searchOpen) this.closeSearch(false); }
      }, {signal});
      document.addEventListener('keydown', event => {
        const dialogOpen = document.querySelector('dialog[open]');
        if (event.defaultPrevented || dialogOpen || this.root.closest('[inert]')) return;
        if (this.options.shortcuts && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault(); this.openSearch();
        } else if (event.key === 'Escape' && (this.searchOpen || this.openGroup)) {
          event.preventDefault(); this.searchOpen ? this.closeSearch() : this.closeGroup(true);
        }
      }, {signal});
    }

    handleKeys(event) {
      if (event.target === this.input) {
        if (['ArrowDown','ArrowUp'].includes(event.key) && this.results.length) {
          event.preventDefault();
          this.searchIndex = this.searchIndex < 0 ? (event.key === 'ArrowDown' ? 0 : this.results.length - 1) : (this.searchIndex + (event.key === 'ArrowDown' ? 1 : -1) + this.results.length) % this.results.length;
          this.highlightResult();
        } else if (event.key === 'Enter' && this.results.length) { event.preventDefault(); this.chooseResult(Math.max(0,this.searchIndex)); }
        return;
      }
      const groupButton = event.target.closest('.gn-link');
      if (groupButton) {
        const buttons = [...this.links.querySelectorAll('.gn-link')];
        const index = buttons.indexOf(groupButton);
        if (event.key === 'ArrowDown') { event.preventDefault(); this.toggleGroup(groupButton.dataset.group, true, true); }
        if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
          event.preventDefault();
          const step = (event.key === 'ArrowRight' ? 1 : -1) * (this.lang === 'fa' ? -1 : 1);
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + step + buttons.length) % buttons.length;
          buttons[next].focus();
        }
      }
      if (this.flyout.contains(event.target) && ['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
        event.preventDefault();
        const items = [...this.flyout.querySelectorAll('[role="menuitem"]')];
        const index = items.indexOf(document.activeElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items[next]?.focus();
      }
    }

    toggleGroup(id, focusFirst = false, forceOpen = false) {
      if (this.openGroup === id && !forceOpen) return this.closeGroup(true);
      if (this.searchOpen) this.closeSearch(false);
      const group = groups.find(item => item.id === id);
      if (!group) return;
      this.openGroup = id;
      this.root.querySelectorAll('.gn-link').forEach(button => button.setAttribute('aria-expanded', String(button.dataset.group === id)));
      this.flyout.innerHTML = `<span class="gn-flyout-title" aria-hidden="true">${escape(group[this.lang])}</span>` + group.children.map(child => `<button type="button" role="menuitem" class="gn-flyout-link" data-route="${child[0]}"><span>${escape(child[this.lang === 'fa' ? 2 : 1])}</span>${icon('arrow')}</button>`).join('');
      this.flyout.hidden = false;
      this.positionFlyout();
      this.updateIndicator();
      if (focusFirst) this.flyout.querySelector('button')?.focus();
    }

    positionFlyout() {
      const button = this.root.querySelector(`[data-group="${this.openGroup}"]`);
      if (!button) return;
      const origin = this.root.getBoundingClientRect();
      const rect = button.getBoundingClientRect();
      const width = this.flyout.offsetWidth || 264;
      const position = this.lang === 'fa' ? rect.right - origin.left - width : rect.left - origin.left - 15;
      this.flyout.style.left = Math.max(8, Math.min(position, this.root.clientWidth - width - 8)) + 'px';
    }

    closeGroup(restoreFocus = false) {
      const id = this.openGroup;
      this.openGroup = null;
      this.flyout.hidden = true;
      this.root.querySelectorAll('.gn-link').forEach(button => button.setAttribute('aria-expanded','false'));
      this.updateIndicator();
      if (restoreFocus && id) this.root.querySelector(`[data-group="${id}"]`)?.focus();
    }

    openSearch() {
      this.closeGroup(false);
      this.searchOpen = true;
      this.root.dataset.searchOpen = 'true';
      this.input.hidden = false;
      this.root.querySelector('.gn-search-close').hidden = false;
      this.root.querySelector('.gn-search-toggle').setAttribute('aria-expanded','true');
      this.input.focus({preventScroll:true});
      this.renderResults();
    }

    closeSearch(restoreFocus = true) {
      this.searchOpen = false;
      this.root.dataset.searchOpen = 'false';
      this.input.value = '';
      this.input.hidden = true;
      this.input.setAttribute('aria-expanded','false');
      this.input.removeAttribute('aria-activedescendant');
      this.root.querySelector('.gn-search-close').hidden = true;
      this.root.querySelector('.gn-search-toggle').setAttribute('aria-expanded','false');
      this.resultBox.hidden = true;
      this.results = [];
      this.searchIndex = -1;
      this.root.querySelector('.gn-search-status').textContent = '';
      if (restoreFocus) this.root.querySelector('.gn-search-toggle').focus();
    }

    static search(items, query) {
      const text = normalize(query);
      if (!text) return [];
      return items.filter(item => normalize([item.id,item.en,item.fa,item.keywords || ''].join(' ')).includes(text)).slice(0,7);
    }

    renderResults() {
      const value = this.input.value.trim();
      this.results = GlassyNavbar.search(this.options.searchItems, value);
      this.searchIndex = -1;
      this.input.removeAttribute('aria-activedescendant');
      this.resultBox.hidden = !value;
      this.input.setAttribute('aria-expanded', String(Boolean(value)));
      if (!value) { this.root.querySelector('.gn-search-status').textContent = ''; return; }
      this.resultBox.innerHTML = this.results.length ? this.results.map((item,index) => `<button class="gn-result" type="button" role="option" id="${this.id}-result-${index}" aria-selected="false" data-result="${index}" tabindex="-1">${icon('page')}<span>${escape(item[this.lang] || item.en)}</span>${icon('arrow')}</button>`).join('') : `<p class="gn-no-results" role="presentation">${this.t('No matching pages.','صفحه‌ای پیدا نشد.')}</p>`;
      this.root.querySelector('.gn-search-status').textContent = this.t(this.results.length + ' results', this.results.length.toLocaleString('fa-IR') + ' نتیجه');
    }

    highlightResult() {
      this.resultBox.querySelectorAll('[role="option"]').forEach((button,index) => button.setAttribute('aria-selected',String(index === this.searchIndex)));
      const id = this.id + '-result-' + this.searchIndex;
      this.input.setAttribute('aria-activedescendant',id);
      document.getElementById(id)?.scrollIntoView({block:'nearest'});
    }

    chooseResult(index) {
      const item = this.results[index];
      if (item) { this.closeSearch(); this.navigate(item.id); }
    }

    navigate(id) {
      this.closeGroup(this.flyout.contains(document.activeElement));
      if (id === 'search') return this.openSearch();
      const group = groups.find(item => item.children.some(child => child[0] === id));
      this.setActive(group ? group.id : null);
      this.options.onNavigate(id);
      this.root.dispatchEvent(new CustomEvent('glassy:navigate',{detail:{id},bubbles:true}));
    }

    setActive(id) {
      this.activeId = groups.some(group => group.id === id) ? id : null;
      this.root.querySelectorAll('.gn-link').forEach(button => {
        if (button.dataset.group === this.activeId) button.setAttribute('aria-current','page');
        else button.removeAttribute('aria-current');
      });
      this.updateIndicator();
    }

    updateIndicator(button) {
      const chosen = button || this.root.querySelector(`[data-group="${this.openGroup || this.activeId}"]`);
      if (!chosen) { this.links.dataset.indicator = 'false'; return; }
      const label = chosen.querySelector('.gn-link-label');
      this.links.style.setProperty('--line-x', (chosen.offsetLeft + label.offsetLeft) + 'px');
      this.links.style.setProperty('--line-w', label.offsetWidth + 'px');
      this.links.dataset.indicator = 'true';
    }

    handlePointer(event) {
      if (event.pointerType === 'touch' || global.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.reduceMotion === 'true') return;
      const rect = this.bar.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => {
        this.bar.style.setProperty('--shine-x',(Math.min(1,Math.max(0,x)) * 100) + '%');
        this.bar.style.setProperty('--tilt-y', ((x - .5) * 1.25).toFixed(2) + 'deg');
        this.bar.style.setProperty('--tilt-x', ((.5 - Math.min(1,Math.max(0,y))) * 1.3).toFixed(2) + 'deg');
        this.raf = 0;
      });
    }

    updateSize() {
      const width = this.root.getBoundingClientRect().width;
      this.root.dataset.compact = String(width > 0 && width < 590);
      this.root.dataset.tiny = String(width > 0 && width < 280);
    }
    resetTilt() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; } this.bar.style.setProperty('--tilt-x','0deg'); this.bar.style.setProperty('--tilt-y','0deg'); }
    setSidebarExpanded(value) {
      this.sidebarExpanded = Boolean(value);
      this.root.querySelectorAll('.gn-brand,.gn-mobile-toggle').forEach(button => button.setAttribute('aria-expanded',String(this.sidebarExpanded)));
    }
    setLoggedIn(value) { this.loggedIn = Boolean(value); this.root.querySelector('.gn-login').textContent = this.loggedIn ? this.t('Account','حساب') : this.t('Log in','ورود'); }
    closePanels() { this.closeGroup(false); if (this.searchOpen) this.closeSearch(false); }
    setLanguage(lang) { this.closePanels(); this.lang = lang === 'fa' ? 'fa' : 'en'; this.render(); }
    destroy() { this.controller.abort(); this.observer?.disconnect(); if(this.raf)cancelAnimationFrame(this.raf); this.root.replaceChildren(); this.root.classList.remove('gn-root'); }
  }
  global.GlassyNavbar = GlassyNavbar;
})(window);
