import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';

@bem('LoaderView')
export default class LoaderView extends React.Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <div className={bem.element('loader')}/>
            </div>
        );
    }

}