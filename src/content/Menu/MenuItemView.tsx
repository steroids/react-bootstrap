import {useBem} from '@steroidsjs/core/hooks';
import {IMenuItemProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import React from 'react';
import renderIcon from '../../utils/renderIcon';

export default function MenuItemView(props:IMenuItemProps) {
    const bem = useBem('MenuItemView');
    return (
        <div
            onClick={props.onClick}
            className={bem.block({hasBorder: props.hasBorder})}
        >
            {props.icon
                ? renderIcon(props.icon, {className: bem.element('icon')})
                : (<div className={bem(bem.element('none-icon'))} />)}

            <span className={bem.element('title')}>
                {props.label}
            </span>
        </div>
    );
}
