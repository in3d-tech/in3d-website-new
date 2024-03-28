import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from "./common/textEn.json";
import heJSON from "./common/textHe.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    he: { ...heJSON },
  }, // Where we're gonna put translations' files
  lng: "en", // Set the initial language of the App
});
