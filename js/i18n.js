// i18next Setup for Baby Care Website
const i18n = {
  currentLang: 'ar',
  translations: {},

  // Initialize i18n
  async init() {
    // Detect saved language or default to Arabic
    const savedLang = localStorage.getItem('lang') || 'ar';
    this.currentLang = savedLang;

    // Load translations
    await this.loadTranslations();

    // Apply initial language
    this.changeLanguage(savedLang);

    console.log('i18n initialized with language:', savedLang);
  },

  // Load translation files
  async loadTranslations() {
    try {
      const [arRes, enRes] = await Promise.all([
        fetch('local/ar.json'),
        fetch('local/en.json')
      ]);

      this.translations = {
        ar: await arRes.json(),
        en: await enRes.json()
      };
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  },

  // Get translation by key (supports nested keys like "nav.home")
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    // If translation not found, try English, then return key
    if (!value) {
      value = this.translations['en'];
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
    }

    if (!value) return key;

    // Handle interpolation {{param}}
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  },

  // Change language
  changeLanguage(lang) {
    if (!['ar', 'en'].includes(lang)) return;

    this.currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update body class for font switching
    document.body.classList.remove('ar', 'en');
    document.body.classList.add(lang);

    // Update all elements with data-i18n attribute
    this.updateContent();

    // Update lang switcher button
    this.updateLangSwitcher();

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  // Update all translated content
  updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);

      // Check if element has HTML content or just text
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update title
    const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
    if (titleKey) {
      document.title = this.t(titleKey);
    }
  },

  // Update language switcher button state
  updateLangSwitcher() {
    const btn = document.getElementById('lang-switcher');
    if (btn) {
      const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
      btn.textContent = this.t(`lang.${nextLang}`);
      btn.setAttribute('data-next-lang', nextLang);
    }
  },

  // Toggle language
  toggle() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.changeLanguage(newLang);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
});

// Global function for onclick handlers
function changeLang(lang) {
  i18n.changeLanguage(lang);
}

function toggleLang() {
  i18n.toggle();
}
