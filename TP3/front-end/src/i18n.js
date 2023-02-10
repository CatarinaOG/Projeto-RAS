import i18n from "i18next";

import Backend from "i18next-xhr-backend";

import { initReactI18next } from "react-i18next";

import translationEN from "../src/assets/en.json";
import translationPT from "../src/assets/pt.json";


const resources = {
    en: {
      translation: translationEN
    },
    pt: {
      translation: translationPT  
    }
  };


i18n

  .use(Backend)

  .use(initReactI18next)


  .init({

    resources,
    fallbackLng: "en",
    debug: true,
    lng: "en",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }

  });


export default i18n;