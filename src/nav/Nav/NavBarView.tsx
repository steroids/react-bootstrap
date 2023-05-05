import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';

import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavBarView(props: INavViewProps) {
    const bem = useBem('NavBarView');
    return (
        <div
            className={bem(
                'navbar-expand-lg navbar-nav',
                props.dark && 'navbar-dark bg-dark',
                bem.block(),
                props.className,
            )}
        >
            <div className='navbar-nav px-3'>
                {props.items.map((item, index) => (
                    <li
                        key={item.id || index}
                        className={bem(
                            'nav-item text-nowrap',
                            item.isActive && 'active',
                        )}
                    >
                        <Button
                            link
                            className={bem(
                                'nav-link',
                                item.isActive && 'active',
                            )}
                            onClick={() => props.onClick(item, index)}
                            {...item}
                        />
                    </li>
                ))}
            </div>
            {props.children}
        </div>
    );
}
