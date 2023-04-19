import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: theme.colors.transparentBlack,
  },
}));

export default useStyles;
