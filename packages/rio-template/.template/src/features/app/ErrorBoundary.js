import React from 'react';
import * as Sentry from '@sentry/browser';

export class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        Sentry.withScope(scope => {
            scope.setExtra('componentStack', errorInfo.componentStack);
            Sentry.captureException(error);
        });
    }

    render() {
        return this.props.children;
    }
}
