import {View} from 'react-native';
import {getLanguage, setAppLanguage} from '../../i18n';
import {languages, Translation} from '../../i18n/languages';
import Selector from '../Selector/Selector';

const options = languages.map(({nameInEnglish, code}) => ({
  label: nameInEnglish,
  value: code,
}));

const LanguageSelector = () => {
  const changeLanguage = (language: Translation) => {
    setAppLanguage(language);
  };
  return (
    <View>
      <Selector
        testID="language-selector"
        options={options}
        selectedValue={getLanguage()}
        onValueChange={value => changeLanguage(value as Translation)}
      />
    </View>
  );
};

export default LanguageSelector;
