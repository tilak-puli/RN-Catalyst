import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  text: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.white1,
    backgroundColor: theme.colors.white0,
    paddingLeft: 10,
    marginVertical: 5,
  },
}));

export default useStyles;
