import store from '../store';
import { Theme, UserConfig } from '../reducers/config';

export const getTheme = (): Theme => store.getState().configReducer.theme;

export const getUserConfig = (): UserConfig => store.getState().configReducer;
