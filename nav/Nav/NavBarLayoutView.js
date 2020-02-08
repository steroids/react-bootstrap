import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavBarLayoutView')
export default class NavBarLayoutView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className='navbar-nav px-3'>
                    {this.props.items.map((item, index) => (
                        <li
                            key={index}
                            className='nav-item text-nowrap'
                        >
                            <Button
                                link
                                className={bem(
                                    'nav-link',
                                    item.isActive && 'active',
                                )}
                                onClick={() => this.props.onClick(item, index)}
                                {...item}
                            />
                        </li>
                    ))}
                </div>
                {this.props.children}
            </div>
        );
    }

}