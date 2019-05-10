import { LanguageDataInterface } from '../../lang/types';
import { IdToken } from '../../tokenHandling/types';

export interface AppPropertiesFromDispatch {
    hideSessionDialog: () => void;
}

export interface AppPropertiesFromState {
    accessToken: string;
    idToken: IdToken;
    homeRoute: string;
    languageData: LanguageDataInterface;
    showSessionExpired: boolean;
    userLocale: string;
}
