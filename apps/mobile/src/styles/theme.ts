import {createTheme} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#F2811D',
    white0: '#FAFAFA',
    white1: '#eaeaea',
    transparentBlack: 'rgba(0, 0, 0, 0.3)',
  },
  components: {
    Button: {
      buttonStyle: {
        backgroundColor: 'blue',
      },
    },
  },
});

export default theme;
