import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  container: {
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.white1,
    backgroundColor: theme.colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
  },
}));

export default useStyles;
