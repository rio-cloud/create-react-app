import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    getIdToken,
    getDisplayMessages,
    getLocale,
    isUserSessionExpired,
    IdToken,
    DisplayMessagesInterface
} from '../../configuration';
import { config } from '../../config';
import App from './App';
import { hideSessionExpiredDialog } from './App.actions';
import { getSessionExpiredAcknowledged } from './App.selector';
import {State} from "../../reducers";

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

const mapDispatchToProps = (dispatch: Dispatch): AppPropertiesFromDispatch => {
    return {
        hideSessionDialog: () => dispatch(hideSessionExpiredDialog()),
    };
};

const mapStateToProps = (state: State): AppPropertiesFromState => {
    return {
        idToken: getIdToken(state),
        homeRoute: config.homeRoute as string,
        displayMessages: getDisplayMessages(state),
        showSessionExpired: isUserSessionExpired(state) && !getSessionExpiredAcknowledged(state),
        userLocale: getLocale(state),
    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
