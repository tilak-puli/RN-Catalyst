import i18next from 'i18next';
import {setAppLanguage} from './index';

describe('[i18n] - [Localisation]', () => {
  test('should return translation in Hindi when selected language is Hindi', () => {
    setAppLanguage('hi');

    expect(i18next.t('LOGIN')).toStrictEqual('लॉग इन');
  });
});

afterAll(() => {
  setAppLanguage('en');
});
