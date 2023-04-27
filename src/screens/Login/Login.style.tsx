import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  safeAreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
}));

export default useStyles;
