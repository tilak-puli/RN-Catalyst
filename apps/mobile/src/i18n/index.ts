import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Translation, translationGetters} from './languages';

export const defaultResource = {languageTag: 'en', isRTL: false};

// Is it a RTL language?
// export const isRTL = translationGetters.hi || translationGetters['ar'];

// Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: defaultResource.languageTag,
  lng: defaultResource.languageTag,
  resources: {
    en: {translation: translationGetters.en()},
  },
});

export const setAppLanguage = (language: Translation) => {
  i18n.addResourceBundle(
    language,
    'translation',
    translationGetters[language](),
  );
  i18n.changeLanguage(language);
};

export const getLanguage = () => i18n.language;
