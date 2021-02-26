import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';

import { DefaultUserMenu } from 'rio-user-menu';
import { SessionExpiredDialog } from 'rio-session-expired-info';
import { ApplicationHeader, NotificationsContainer, ApplicationLayout, ActionBarItem } from 'rio-uikit';
import IframeResizer from 'iframe-resizer-react';

import { DEFAULT_LOCALE } from '../../configuration';
import Intro from './Intro';
import More from './More';

import './App.css';
import {config} from "../../config";
import {AppPropertiesFromDispatch, AppPropertiesFromState} from "./App.container";

type AppProperties = AppPropertiesFromDispatch & AppPropertiesFromState;

const ServiceInfo = () => {
    const handleClick = () => {};

    return (
        <div>
            <div className={'line-height-largest'}>
                <a href={'/'} onClick={handleClick}>
                    <span>{'Release notes'}</span>
                </a>
            </div>
            <div className={'line-height-largest'}>
                <Link to={'/abcd'}>{'Link'}</Link>
            </div>
        </div>
    );
};

const App = (props: AppProperties) => {
    const { hideSessionDialog, homeRoute, displayMessages, showSessionExpired, userLocale } = props;

    if (!displayMessages) {
        return null;
    }

    const title = (
        <div>
            <span>{'Service XYZ'}</span>
            <span className={'text-color-gray margin-left-10'}>{'v1.1.0'}</span>
        </div>
    );

    const serviceInfoItem = (
        <ActionBarItem id={'serviceInfo'} className={'myItem'}>
            <ActionBarItem.Icon>
                <span className={'icon rioglyph rioglyph-info-sign'} />
                <span className={'badge bg-primary'}>{'1'}</span>
            </ActionBarItem.Icon>
            <ActionBarItem.Popover className={'myItemPopover'} title={title}>
                <ServiceInfo />
            </ActionBarItem.Popover>
        </ActionBarItem>
    );

    const navItems = [
        {
            key: 'intro',
            route: (
                <NavLink to={'/intro'}>
                    <FormattedMessage id={'starterTemplate.sublink.intro'} />
                </NavLink>
            ),
        },
        {
            key: 'more',
            route: (
                <NavLink to={'/more'}>
                    <FormattedMessage id={'starterTemplate.sublink.more'} />
                </NavLink>
            ),
        },
    ];

    const appTitle = <FormattedMessage id={'starterTemplate.moduleName'} />;
    const environment = process.env.NODE_ENV === 'production' ? 'production' : 'local';
    const userMenu = <DefaultUserMenu environment={environment} />;
    const menuUrl = config.backend.MENU_SERVICE as string;
    const appNavigator = <IframeResizer style={{ width: '1px', minWidth: '100%', border: '0' }} src={menuUrl} />;

    // eslint-disable-next-line jsx-a11y/anchor-has-content
    const homeLink = <a href={homeRoute} />;

    return (
        <IntlProvider
            defaultLocale={DEFAULT_LOCALE}
            key={userLocale}
            locale={userLocale}
            messages={displayMessages}
        >
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
                    <SessionExpiredDialog
                        locale={userLocale}
                        onClose={hideSessionDialog}
                        show={showSessionExpired}
                    />
                    <Switch>
                        <Route path={'/intro'} component={Intro} />
                        <Route path={'/more'} component={More} />
                        <Redirect to={'/intro'} />
                    </Switch>
                </ApplicationLayout.Body>
            </ApplicationLayout>
        </IntlProvider>
    );
};

export default App;
