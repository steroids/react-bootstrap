import {useBem} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';
import {IButtonGroupViewProps} from '@steroidsjs/core/ui/nav/ButtonGroup/ButtonGroup';
import React from 'react';

export default function ButtonGroupView(props: IButtonGroupViewProps) {
    const bem = useBem('ButtonGroupView');

    return (
        <ul
            className={bem(
                bem.block({
                    size: props.size,
                }),
                props.className,
            )}
            style={props.style}
        >
            {props.items.map((item, index) => {
                const isActive = props.activeButton === item.id;

                return (
                    <li
                        key={index}
                        className={item.className ? item.className as string : null}
                    >
                        <Button
                            className={bem.element('button', {
                                default: !isActive,
                                active: isActive,
                            })}
                            label={item.label}
                            onClick={() => props.onClick(item.id)}
                            {...props.buttonProps}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
