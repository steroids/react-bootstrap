import React from 'react';
import {IMenuItemViewProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import {useBem} from '@steroidsjs/core/hooks';
import renderIcon from '../../utils/renderIcon';

export default function MenuItemView(props: IMenuItemViewProps) {
    const bem = useBem('MenuItemView');

    return (
        <div className={bem.block({
            hasBorder: props.hasBorder,
        })}
        >
            <div className={bem(bem.element('icon-wrapper'))}>
                { props.icon
                    ? renderIcon(props.icon, {className: bem.element('icon')})
                    : (
                        <div className={bem(bem.element('none-icon'))} />
                    )}
            </div>
            <span className={bem.element('title')}>{props.label}</span>
        </div>
    );
}
