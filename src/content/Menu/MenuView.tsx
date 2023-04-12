import React from 'react';
import {IMenuProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import {DropDown} from '@steroidsjs/core/ui/content';
import {useBem} from '@steroidsjs/core/hooks';
import renderIcon from '../../utils/renderIcon';
import MenuItemView from './MenuItemView';

export default function MenuView(props: IMenuProps) {
    const bem = useBem('MenuView');

    const renderMenuItems = React.useCallback(() => (
        <>
            {props.items.map((item, index) => (
                <MenuItemView
                    key={index}
                    icon={item?.icon}
                    label={item.label}
                    onClick={item.onClick}
                    hasBorder={item?.hasBorder}
                />
            ))}
        </>
    ), [props.items]);

    return (
        <DropDown
            {...props}
            className="MenuView"
            closeMode={props.closeMode}
            content={renderMenuItems}
            position={props.position}

        >
            <span className={bem.element('button')}>
                {props.icon
                    ? renderIcon(props.icon, {className: bem.element('icon')})
                    : renderIcon('dots', {className: bem.element('icon')})}
            </span>
        </DropDown>
    );
}
