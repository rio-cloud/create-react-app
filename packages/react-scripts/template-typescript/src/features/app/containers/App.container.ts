import App from '../components/App';
import { connect } from 'react-redux';
import { getAccessToken, getIdToken } from '../../tokenHandling/selectors';
import { Config } from '../../../setup/config';
import { isUserSessionExpired } from '../../login/selectors';
import { getLanguageData, getLocale } from '../../lang/selectors';
import { hideSessionExpiredDialog } from '../actions/App.actions';
import { Dispatch } from 'redux';
import { AppPropertiesFromDispatch, AppPropertiesFromState } from './types';
import { State } from '../../../types';
import { getSessionExpiredAcknowledged } from '../selectors/App.selector';

function mapDispatchToProps(dispatch: Dispatch): AppPropertiesFromDispatch {
    return {
        hideSessionDialog: () => dispatch(hideSessionExpiredDialog()),
    };
}

function mapStateToProps(state: State): AppPropertiesFromState {
    return {
        accessToken: getAccessToken(state) as string,
        idToken: getIdToken(state),
        homeRoute: Config.homeRoute as string,
        languageData: getLanguageData(state),
        showSessionExpired: isUserSessionExpired(state) && !getSessionExpiredAcknowledged(state),
        userLocale: getLocale(state),
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
