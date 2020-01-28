import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavIconView')
export default class NavIconView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.items.map((item, index) => (
                    <Button
                        key={index}
                        link
                        onClick={() => this.props.onClick(item, index)}
                        {...item}
                        label={null}
                    />
                ))}
                {this.props.children}
            </div>
        );
    }

}