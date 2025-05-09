import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from './locales/en.json'
import trTranslations from './locales/tr.json'
import enHomepage from './locales/homepage/en.json'
import trHomepage from './locales/homepage/tr.json'
import enProperties from './locales/properties/en.json'
import trProperties from './locales/properties/tr.json'
import enServices from './locales/services/en.json'
import trServices from './locales/services/tr.json'
import enAbout from './locales/about/en.json'
import trAbout from './locales/about/tr.json'
import enFooter from './locales/footer/en.json'
import trFooter from './locales/footer/tr.json'
import enContact from './locales/contact/en.json'
import trContact from './locales/contact/tr.json'
import enEvents from './locales/events/en.json'
import trEvents from './locales/events/tr.json'
import enPrivacy from './locales/privacy/en.json'
import trPrivacy from './locales/privacy/tr.json'
import enTerms from './locales/terms/en.json'
import trTerms from './locales/terms/tr.json'
import enPropertyDetails from './locales/property-details/en.json'
import trPropertyDetails from './locales/property-details/tr.json'
import enListEvent from './locales/list-event/en.json'
import trListEvent from './locales/list-event/tr.json'
import enChatbot from './locales/chatbot/en.json'
import trChatbot from './locales/chatbot/tr.json'

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
        homepage: enHomepage,
        properties: enProperties,
        services: enServices,
        about: enAbout,
        footer: enFooter,
        contact: enContact,
        events: enEvents,
        privacy: enPrivacy,
        terms: enTerms,
        'property-details': enPropertyDetails,
        'list-event': enListEvent,
        chatbot: enChatbot
      },
      tr: {
        translation: trTranslations,
        homepage: trHomepage,
        properties: trProperties,
        services: trServices,
        about: trAbout,
        footer: trFooter,
        contact: trContact,
        events: trEvents,
        privacy: trPrivacy,
        terms: trTerms,
        'property-details': trPropertyDetails,
        'list-event': trListEvent,
        chatbot: trChatbot
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