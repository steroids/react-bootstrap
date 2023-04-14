import React from 'react';
import {IMenuViewProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import {DropDown, Icon} from '@steroidsjs/core/ui/content';
import {useBem} from '@steroidsjs/core/hooks';
import renderIcon from '../../utils/renderIcon';

export default function MenuView(props: IMenuViewProps) {
    const bem = useBem('MenuView');

    const {icon, items, className, children, ...dropDownProps} = props;

    return (
        <DropDown
            {...dropDownProps}
            className={bem(bem.block(), props.className)}
            content={props.renderMenuItems}
        >
            <span className={bem.element('button')}>
                {props.icon
                    ? renderIcon(props.icon, {className: bem.element('icon')})
                    : (
                        <Icon
                            name='dots'
                            className={bem.element('icon')}
                        />
                    )}
            </span>
        </DropDown>
    );
}
