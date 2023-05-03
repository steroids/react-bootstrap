import React from 'react';
import {IMenuViewProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import {DropDown, Icon} from '@steroidsjs/core/ui/content';
import {useBem} from '@steroidsjs/core/hooks';
import renderIcon from '../../utils/renderIcon';

export default function MenuView(props: IMenuViewProps) {
    const bem = useBem('MenuView');
    const MenuItemView = props.itemView;

    const renderMenuItems = React.useCallback(() => (
        <>
            {props.items.map((item, index) => (
                <MenuItemView
                    key={index}
                    {...item}
                />
            ))}
        </>
    ), [MenuItemView, props.items]);

    return (
        <DropDown
            {...props.dropDownProps}
            className={bem(bem.block(), props.className)}
            content={renderMenuItems}
        >
            <span className={bem.element('button')}>
                {props.icon
                    ? renderIcon(props.icon, {className: bem.element('icon')})
                    : (
                        <Icon
                            name='meatballs_menu_hor'
                            className={bem.element('icon')}
                        />
                    )}
            </span>
        </DropDown>
    );
}
