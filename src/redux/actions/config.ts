import { bindActionCreators } from 'redux';
import store from '../store';
import { ConfigAction, Theme, UserConfig } from '../reducers/config';

const setThemeCreator = (payload: Theme): ConfigAction => ({ type: 'SET_THEME', payload });

const setUserConfigCreator = (payload: UserConfig): ConfigAction => ({
  type: 'SET_USER_CONFIG',
  payload,
});

const boundActions = bindActionCreators(
  {
    setTheme: setThemeCreator,
    setUserConfig: setUserConfigCreator,
  },
  store.dispatch,
);

export const { setTheme, setUserConfig } = boundActions;
