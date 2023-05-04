import * as React from 'react';

import Link from '@steroidsjs/core/ui/nav/Link';

import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavListView(props: INavViewProps) {
    const bem = useBem('NavListView');

    const renderItems = (items) => {
        if (!items || items.length === 0) {
            return null;
        }
        return items.map((item, index) => (
            <li
                key={index}
                className={bem('nav-item', bem.element('item'), props.navClassName)}
            >
                <Link
                    onClick={() => props.onClick(item, index)}
                    {...item}
                    key={item.id || index}
                    className={bem(
                        item.isActive && 'active',
                        bem.element('item-link'),
                        item.className,
                    )}
                />
                {item.items && item.items.length > 0 && (
                    <ul className={bem('nav flex-column', bem.element('sub-list'))}>
                        {renderItems(item.items)}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <ul className={bem('nav flex-column', bem.block(), props.className)}>
            {renderItems(props.items)}
            {props.children}
        </ul>
    );
}
