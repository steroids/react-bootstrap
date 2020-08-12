import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';

@bem('NavTabsView')
export default class NavTabsView extends React.Component<INavViewProps & IBemHocOutput> {

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
                                    item.isActive && 'active',
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
