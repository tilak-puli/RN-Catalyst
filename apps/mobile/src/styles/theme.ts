import {createTheme} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#F2811D',
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
