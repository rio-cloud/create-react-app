import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import { DefaultAccountMenu } from 'rio-accountmenu';
import { DefaultAppNavigator } from 'rio-appnavigator';
import { SessionExpiredDialog } from 'rio-session-expired-info';
import { ApplicationHeader, NotificationsContainer, ApplicationLayout, ActionBarItem } from 'rio-uikit';

// Import language configuration
import { DEFAULT_LOCALE, getLanguageData, getLocale, getAccessToken, getIdToken, isUserSessionExpired } from '../../../configuration';
import { hideSessionExpiredDialog } from './app/actions';
import { getSessionExpiredAcknowledged } from './app/selectors';

// Import some service containers
import { Intro } from './app/Intro';
import { More } from './app/More';

// Import application style
import './app/styles.css';

import { Config } from '../config';

const {
    APP_REGISTRY,
    USER_SETTINGS_SERVICE,
} = Config.backend;

// Define the navigation items of the current application
const navItems = [
    {
        key: 'intro',
        route: <NavLink to='/intro'><FormattedMessage id='starterTemplate.sublink.intro'/></NavLink>,
    },
    {
        key: 'more',
        route: <NavLink to='/more'><FormattedMessage id='starterTemplate.sublink.more'/></NavLink>,
    },
];

const ServiceInfo = () => (
    <div>
        <div className='line-height-largest'>
            <a onClick={() => {}}>
                <span>{'Release notes'}</span>
            </a>
        </div>
        <div className='line-height-largest'>
            <Link to={'/abcd'}>{'Link'}</Link>
        </div>
    </div>
);

const title = (
    <div>
        <span>{'Service XYZ'}</span>
        <span className='text-color-gray margin-left-10'>{'v1.1.0'}</span>
    </div>
);

const serviceInfoItem = (
    <ActionBarItem id='serviceInfo' className='myItem'>
        <ActionBarItem.Icon>
            <span className='icon rioglyph rioglyph-info-sign'></span>
            <span className='badge bg-primary'>{'1'}</span>
        </ActionBarItem.Icon>
        <ActionBarItem.Popover className='myItemPopover' title={title}>
            <ServiceInfo />
        </ActionBarItem.Popover>
    </ActionBarItem>
);

export const AppContainer = (props) => {
    const {
        accessToken,
        hideSessionDialog,
        homeRoute,
        idToken,
        languageData,
        showSessionExpired,
        userLocale: locale,
    } = props;
    const appTitle = <FormattedMessage id={'starterTemplate.moduleName'} />;
    const accountMenu = (
        <DefaultAccountMenu
            accessToken={accessToken}
            idToken={idToken}
            userSettingsEndpoint={USER_SETTINGS_SERVICE}
        />
    );
    const appNavigator = (
        <DefaultAppNavigator
            accessToken={accessToken}
            appsEndpoint={`${APP_REGISTRY}/apps`}
            locale={locale}
        />
    );

    const homeLink = <a href={homeRoute}></a>;

    return (
        <IntlProvider locale={locale} messages={languageData} defaultLocale={DEFAULT_LOCALE}>
            <ApplicationLayout className={'StarterTemplate'}>
                <ApplicationLayout.Header>
                    <ApplicationHeader
                        label={appTitle}
                        appNavigator={appNavigator}
                        homeRoute={homeLink}
                        navItems={navItems}
                        actionBarItems={[serviceInfoItem, accountMenu]}
                    />
                </ApplicationLayout.Header>
                <ApplicationLayout.Body>
                    <NotificationsContainer />
                    <SessionExpiredDialog
                        locale={locale}
                        onClose={hideSessionDialog}
                        show={showSessionExpired}
                    />
                    <Switch>
                        <Route path='/intro' component={Intro} />
                        <Route path='/more' component={More} />
                        <Redirect to='/intro'/>
                    </Switch>
                </ApplicationLayout.Body>
            </ApplicationLayout>
        </IntlProvider>
    );
};

export const mapDispatchToProps = (dispatch) => ({
    hideSessionDialog: () => dispatch(hideSessionExpiredDialog()),
});

export const mapStateToProps = (state) => {
    return {
        accessToken: getAccessToken(state),
        homeRoute: Config.homeRoute,
        idToken: getIdToken(state),
        languageData: getLanguageData(state),
        showSessionExpired: isUserSessionExpired(state) && !getSessionExpiredAcknowledged(state),
        userLocale: getLocale(state),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
