import React from 'react';
import PropTypes from 'prop-types';
import Nav from '@steroidsjs/core/ui/nav/Nav';

import {bem} from '@steroidsjs/core/hoc';

@bem('ActionColumnView')
export default class ActionColumnView extends React.PureComponent {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
            ]),
            icon: PropTypes.string,
            label: PropTypes.string,
        })),
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <Nav
                    {...this.props}
                    layout='icon'
                    items={this.props.items}
                />
            </div>
        );
    }
}