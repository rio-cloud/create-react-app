import { IdToken, DisplayMessagesInterface } from '../../../configuration';

export interface AppPropertiesFromDispatch {
    hideSessionDialog: () => void;
}

export interface AppPropertiesFromState {
    idToken: IdToken;
    homeRoute: string;
    displayMessages: DisplayMessagesInterface;
    showSessionExpired: boolean;
    userLocale: string;
}
