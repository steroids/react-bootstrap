import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavListView')
export default class NavListView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
        navClassName: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className={bem('list-group', this.props.navClassName, !this.props.children && 'mb-3')}>
                    {this.props.items.map((item, index) => (
                        <Button
                            link
                            onClick={() => this.props.onClick(item, index)}
                            layout={false}
                            {...item}
                            key={index}
                            className={bem(
                                'list-group-item list-group-item-action',
                                item.isActive && 'active',
                                item.className,
                            )}
                        />
                    ))}
                </div>
                {this.props.children}
            </div>
        );
    }

}
