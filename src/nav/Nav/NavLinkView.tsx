/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import Button from '@steroidsjs/core/ui/form/Button';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavLinkView(props: INavViewProps) {
    const bem = useBem('NavLinkView');
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
                        onClick={() => props.onClick(item, index)}
                    >
                        <Button
                            link
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
