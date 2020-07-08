import { IdToken, LanguageDataInterface } from '../../../configuration';

export interface AppPropertiesFromDispatch {
    hideSessionDialog: () => void;
}

export interface AppPropertiesFromState {
    idToken: IdToken;
    homeRoute: string;
    languageData: LanguageDataInterface;
    showSessionExpired: boolean;
    userLocale: string;
}
