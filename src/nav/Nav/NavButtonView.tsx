import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';

import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavButtonView(props: INavViewProps) {
    const bem = useBem('NavButtonView');
    return (
        <div className={bem(bem.block({
            size: props.size,
        }), props.className)}
        >
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
                            size={props.size}
                            color='secondary'
                            outline={!item.isActive}
                            disabled={item.disabled}
                            onClick={() => props.onClick(item, index)}
                            {...item}
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
