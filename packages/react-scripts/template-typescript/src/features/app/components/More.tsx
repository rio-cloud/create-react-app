import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class More extends React.Component<{}, {}> {
    render() {
        return (
            <div className="more container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>
                            <FormattedMessage id={'starterTemplate.sublink.more'} />
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}
