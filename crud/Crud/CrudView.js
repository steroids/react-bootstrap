import React from 'react';
import PropTypes from 'prop-types';
import Controls from '@steroidsjs/core/ui/nav';

import {bem} from '@steroidsjs/core/hoc';

@bem('CrudView')
export default class CrudView extends React.Component {

    static propTypes = {
        controls: PropTypes.arrayOf(PropTypes.shape({
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
        navProps: PropTypes.object,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.controls && (
                    <Controls items={this.props.controls}/>
                )}
                {this.props.children}
            </div>
        );
    }

}
