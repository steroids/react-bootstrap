import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavButtonView')
export default class NavButtonView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className={bem(this.props.children && 'mb-3', bem.element('nav'))}>
                    {this.props.items.map((item, index) => (
                        <Button
                            key={index}
                            color='secondary'
                            outline={!item.isActive}
                            onClick={() => this.props.onClick(item, index)}
                            className={bem.element('nav-item')}
                            {...item}
                        />
                    ))}
                </div>
                <div className={bem.element('content')}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
