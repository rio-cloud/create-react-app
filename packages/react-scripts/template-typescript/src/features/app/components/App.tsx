import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';

import { DefaultAccountMenu } from 'rio-accountmenu';
import { DefaultAppNavigator } from 'rio-appnavigator';
import { SessionExpiredDialog } from 'rio-session-expired-info';
import { ApplicationHeader, NotificationsContainer, ApplicationLayout, ActionBarItem } from 'rio-uikit';

import { DEFAULT_LOCALE } from '../../../configuration';
import Intro from './Intro';
import More from './More';

import './App.css';
import { Config } from '../../../config';
import { AppProperties } from './types';

class ServiceInfo extends React.Component<{}, {}> {
    render() {
        const handleClick = () => {};

        return (
            <div>
                <div className="line-height-largest">
                    <a href={'/'} onClick={handleClick}>
                        <span>{'Release notes'}</span>
                    </a>
                </div>
                <div className="line-height-largest">
                    <Link to={'/abcd'}>{'Link'}</Link>
                </div>
            </div>
        );
    }
}

export default class App extends React.Component<AppProperties, {}> {
    render() {
        const { accessToken, hideSessionDialog, homeRoute, idToken, languageData, showSessionExpired, userLocale: locale } = this.props;

        const { APP_REGISTRY, USER_SETTINGS_SERVICE } = Config.backend;

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

        const appTitle = <FormattedMessage id={'starterTemplate.moduleName'} />;
        const accountMenu = (
            <DefaultAccountMenu accessToken={accessToken} idToken={idToken} userSettingsEndpoint={USER_SETTINGS_SERVICE} />
        );
        const appNavigator = (
            <DefaultAppNavigator accessToken={accessToken} appsEndpoint={`${APP_REGISTRY}/apps`} locale={locale} />
        );

        // eslint-disable-next-line jsx-a11y/anchor-has-content
        const homeLink = <a href={homeRoute} />;

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
                        <SessionExpiredDialog locale={locale} onClose={hideSessionDialog} show={showSessionExpired} />
                        <Switch>
                            <Route path="/intro" component={Intro} />
                            <Route path="/more" component={More} />
                            <Redirect to="/intro" />
                        </Switch>
                    </ApplicationLayout.Body>
                </ApplicationLayout>
            </IntlProvider>
        );
    }
}
