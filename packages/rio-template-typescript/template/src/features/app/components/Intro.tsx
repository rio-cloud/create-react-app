import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class Intro extends React.Component<{}, {}> {
    render() {
        return (
            <div className={'intro container'}>
                <div className={'row'}>
                    <div className={'col-xs-12'}>
                        <h1>
                            <FormattedMessage id={'starterTemplate.sublink.intro'} />
                        </h1>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-xs-12'}>
                        <div className={'panel panel-default'}>
                            <div className={'panel-body'}>{'Hello World'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
