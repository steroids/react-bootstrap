import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';

@bem('EmptyView')
export default class EmptyView extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block(),
                'text-center p-5',
                this.props.className
            )}>
                {this.props.text}
            </div>
        );
    }

}