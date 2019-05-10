import React from 'react';
import { FormattedMessage } from 'react-intl';

export const More = () => {
    return (
        <div className='more container'>
            <div className='row'>
                <div className='col-xs-12'>
                    <h1><FormattedMessage id={'starterTemplate.sublink.more'} /></h1>
                </div>
            </div>
        </div>
    );
};
