export type Theme = 'dark' | 'light';

interface ConfigState {
  language: string;
  logo: string;
  theme: Theme;
  userId: string;
}

export type UserConfig = ConfigState;

export interface ConfigAction {
  type: string;
  payload: Theme | UserConfig | Error;
  error: boolean;
}

const defaultConfigState: ConfigState = {
  language: 'en',
  logo: '',
  theme: 'light',
  userId: 'dummyUser',
};

export function configReducer(
  state: ConfigState = defaultConfigState,
  action: ConfigAction,
): ConfigState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_USER_CONFIG':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
