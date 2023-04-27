import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {act, fireEvent, render, screen} from '../../utilities/test-util';
import LanguageSelector from './LanguageSelector';
import {languages} from '../../i18n/languages';

const enlishResource = {
  JEST_WELCOME: 'welcome',
};
const hindiResource = {
  JEST_WELCOME: 'स्वागत हे',
};
const languageTextTestID = 'jest-language-text';

const ExampleScreen = () => {
  const {t, i18n} = useTranslation();
  i18n.addResourceBundle('en', 'translation', enlishResource);
  i18n.addResourceBundle('hi', 'translation', hindiResource);
  return (
    <View>
      <LanguageSelector />
      <Text testID={languageTextTestID}>{t('JEST_WELCOME')}</Text>
    </View>
  );
};

describe('[Component] - [LanguageSelector]', () => {
  const selectorTestId = 'language-selector';

  test('should show all language options on language selector', async () => {
    render(<ExampleScreen />);
    const selector = screen.getByTestId(selectorTestId);
    const selectorItems = selector.props.items;
    expect(selectorItems.length).toBe(languages.length);
  });

  test('should change translation text when language is changed', async () => {
    render(<ExampleScreen />);
    const selector = screen.getByTestId(selectorTestId);

    const optionToSelectIndex = languages.findIndex(({code}) => code === 'hi');
    const optionToSelect = languages[optionToSelectIndex];
    act(() => {
      fireEvent(
        selector,
        'onValueChange',
        optionToSelect.code,
        optionToSelectIndex,
      );
    });
    const languageText = screen.getByTestId(languageTextTestID);
    expect(languageText.props.children).toBe(hindiResource.JEST_WELCOME);
  });
});
