import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Nav from '@steroidsjs/core/ui/nav/Nav';

@bem('ControlsView')
export default class ControlsView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.any,
            ]),
            url: PropTypes.string,
            onClick: PropTypes.func,
            className: PropTypes.string,
            view: PropTypes.elementType,
            visible: PropTypes.bool,
            content: PropTypes.oneOfType([
                PropTypes.node,
                PropTypes.elementType,
            ]),
            contentProps: PropTypes.object,
            position: PropTypes.oneOf(['left', 'right']),
        })),
        className: PropTypes.string,
        navProps: PropTypes.object,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.renderControls(this.props.items.filter(item => item.position !== 'right'))}
                {this.renderControls(this.props.items.filter(item => item.position === 'right'))}
            </div>
        );
    }

    renderControls(items) {
        if (items.length === 0) {
            return null;
        }
        return (
            <Nav
                layout='button'
                {...this.props.navProps}
                items={items}
            />
        );
    }

}
