import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from './locales/en.json'
import trTranslations from './locales/tr.json'
import enHomepage from './locales/homepage/en.json'
import trHomepage from './locales/homepage/tr.json'

// Get stored language or default to English
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en'
  }
  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
        homepage: enHomepage
      },
      tr: {
        translation: trTranslations,
        homepage: trHomepage
      }
    },
    lng: getInitialLanguage(), // Initialize with stored language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng)
  }
})

export default i18n 