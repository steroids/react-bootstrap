import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavTabsView')
export default class NavTabsView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className={bem('nav nav-tabs', !this.props.children && 'mb-3')}>
                    {this.props.items.map((item, index) => (
                        <li
                            key={item.id || index}
                            className='nav-item'
                        >
                            <Button
                                link
                                onClick={() => this.props.onClick(item, index)}
                                layout={false}
                                {...item}
                                className={bem(
                                    'nav-link',
                                    item.active && 'active',
                                    item.className,
                                )}
                            />
                        </li>
                    ))}
                </div>
                {this.props.children}
            </div>
        );
    }

}
