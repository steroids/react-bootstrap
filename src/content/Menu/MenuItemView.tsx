import {useBem} from '@steroidsjs/core/hooks';
import {IMenuItem} from '@steroidsjs/core/ui/content/Menu/Menu';
import React from 'react';
import renderIcon from '../../utils/renderIcon';

export default function MenuItemView(props: IMenuItem) {
    const bem = useBem('MenuItemView');
    return (
        <div
            onClick={props.onClick}
            className={bem.block({hasBorder: props.hasBorder, noneIcon: !props.icon})}
        >
            {props.icon && renderIcon(props.icon, {className: bem.element('icon')})}

            <span className={bem.element('label')}>
                {props.label}
            </span>
        </div>
    );
}
