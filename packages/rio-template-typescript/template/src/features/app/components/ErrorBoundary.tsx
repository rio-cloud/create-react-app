import React, { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/browser';

export class ErrorBoundary extends React.Component<{ children?: ReactNode }, {}> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        Sentry.withScope(scope => {
            scope.setExtra('componentStack', errorInfo.componentStack);
            Sentry.captureException(error);
        });
    }

    render() {
        return this.props.children;
    }
}
