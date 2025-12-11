import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "en",             
    fallbackLng: "en",      // fallback is English text
    supportedLngs: ["en", "he"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
