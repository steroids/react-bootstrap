import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';

@bem('NotificationsView')
export default class NavBarView extends React.Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.children}
            </div>
        );
    }

}