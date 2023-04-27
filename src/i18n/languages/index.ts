import en from './en.json';
import hi from './hi.json';

export type Translation = 'en' | 'hi';

export type Language = {
  language: string;
  nameInEnglish: string;
  code: Translation;
};

// To show drop down for selecting language
export const languages: Language[] = [
  {language: 'English', nameInEnglish: 'English', code: 'en'},
  {language: 'हिंदी', nameInEnglish: 'Hindi', code: 'hi'},
];

export const translationGetters: Record<Translation, () => object> = {
  en: () => en,
  hi: () => hi,
};

export default languages;
