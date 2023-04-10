import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavTabsView(props: INavViewProps & IBemHocOutput) {
    const bem = useBem('NavTabsView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <div className={bem('nav nav-tabs', !props.children && 'mb-3')}>
                {props.items.map((item, index) => (
                    <li
                        key={item.id || index}
                        className='nav-item'
                    >
                        <Button
                            link
                            onClick={() => props.onClick(item, index)}
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
            {props.children}
        </div>
    );
}
