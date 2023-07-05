import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';

import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

const DEFAULT_ICON = 'add';

export default function NavIconView(props: INavViewProps) {
    const bem = useBem('NavIconView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <ul className={bem.element('list')}>
                {props.items.map((item, index) => (
                    <li
                        key={item.id || index}
                        className={bem(bem.element('list-item', {
                            active: item.isActive,
                            disabled: item.disabled,
                        }), props.navClassName)}
                    >
                        <Button
                            icon={props.icon ? props.icon : DEFAULT_ICON}
                            link
                            onClick={() => props.onClick(item, index)}
                            {...item}
                            label={item.label}
                            hint={item.hint || item.label || null}
                        />
                    </li>
                ))}
            </ul>
            <div className={bem.element('content')}>
                {props.children}
            </div>
        </div>
    );
}
