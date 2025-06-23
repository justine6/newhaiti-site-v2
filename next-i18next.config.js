// next-i18next.config.js

/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ht', 'es'],
    fallbackLng: 'en',
  },
  defaultNS: 'translation',
  fallbackNS: 'translation',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

module.exports = nextI18NextConfig;
