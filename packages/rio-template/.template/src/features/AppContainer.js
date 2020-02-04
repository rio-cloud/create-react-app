import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import { DefaultUserMenu } from 'rio-user-menu';
import { SessionExpiredDialog } from 'rio-session-expired-info';
import { ApplicationHeader, NotificationsContainer, ApplicationLayout, ActionBarItem } from 'rio-uikit';
import IframeResizer from '@rio-cloud/iframe-resizer';

// Import language configuration
import {
    DEFAULT_LOCALE,
    getLanguageData,
    getLocale,
    getIdToken,
    isUserSessionExpired,
} from '../configuration';
import { hideSessionExpiredDialog } from './app/actions';
import { getSessionExpiredAcknowledged } from './app/selectors';

// Import some service containers
import { Intro } from './app/Intro';
import { More } from './app/More';

// Import application style
import './app/styles.css';

import { config } from '../config';

// Define the navigation items of the current application
const navItems = [
    {
        key: 'intro',
        route: (
            <NavLink to="/intro">
                <FormattedMessage id="starterTemplate.sublink.intro" />
            </NavLink>
        ),
    },
    {
        key: 'more',
        route: (
            <NavLink to="/more">
                <FormattedMessage id="starterTemplate.sublink.more" />
            </NavLink>
        ),
    },
];

const ServiceInfo = () => (
    <div>
        <div className="line-height-largest">
            <a onClick={() => {}}>
                <span>{'Release notes'}</span>
            </a>
        </div>
        <div className="line-height-largest">
            <Link to={'/abcd'}>{'Link'}</Link>
        </div>
    </div>
);

const title = (
    <div>
        <span>{'Service XYZ'}</span>
        <span className="text-color-gray margin-left-10">{'v1.1.0'}</span>
    </div>
);

const serviceInfoItem = (
    <ActionBarItem id="serviceInfo" className="myItem">
        <ActionBarItem.Icon>
            <span className="icon rioglyph rioglyph-info-sign" />
            <span className="badge bg-primary">{'1'}</span>
        </ActionBarItem.Icon>
        <ActionBarItem.Popover className="myItemPopover" title={title}>
            <ServiceInfo />
        </ActionBarItem.Popover>
    </ActionBarItem>
);

export const AppContainer = props => {
    const { hideSessionDialog, homeRoute, idToken, languageData, showSessionExpired, userLocale } = props;
    const appTitle = <FormattedMessage id={'starterTemplate.moduleName'} />;
    const environment = process.env.NODE_ENV === 'production' ? 'production': 'local';
    const userMenu = (
        <DefaultUserMenu
            idToken={idToken}
            environment={environment}
        />
    );
    const menuUrl = config.backend.MENU_SERVICE;
    const appNavigator = <IframeResizer url={menuUrl} />;

    const homeLink = <a href={homeRoute} />;

    return (
        <IntlProvider defaultLocale={DEFAULT_LOCALE} key={userLocale} locale={userLocale} messages={languageData}>
            <ApplicationLayout className={'StarterTemplate'}>
                <ApplicationLayout.Header>
                    <ApplicationHeader
                        label={appTitle}
                        appNavigator={appNavigator}
                        homeRoute={homeLink}
                        navItems={navItems}
                        actionBarItems={[serviceInfoItem, userMenu]}
                    />
                </ApplicationLayout.Header>
                <ApplicationLayout.Body>
                    <NotificationsContainer />
                    <SessionExpiredDialog locale={userLocale} onClose={hideSessionDialog} show={showSessionExpired} />
                    <Switch>
                        <Route path="/intro" component={Intro} />
                        <Route path="/more" component={More} />
                        <Redirect to="/intro" />
                    </Switch>
                </ApplicationLayout.Body>
            </ApplicationLayout>
        </IntlProvider>
    );
};

export const mapDispatchToProps = dispatch => ({
    hideSessionDialog: () => dispatch(hideSessionExpiredDialog()),
});

export const mapStateToProps = state => {
    return {
        homeRoute: config.homeRoute,
        idToken: getIdToken(state),
        languageData: getLanguageData(state),
        showSessionExpired: isUserSessionExpired(state) && !getSessionExpiredAcknowledged(state),
        userLocale: getLocale(state),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
