import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';
import {IButtonGroupViewProps} from '@steroidsjs/core/ui/nav/ButtonGroup/ButtonGroup';

export default function ButtonGroupView(props: IButtonGroupViewProps) {
    const bem = useBem('ButtonGroupView');

    return (
        <div
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
                    <Button
                        key={index}
                        className={bem.element('button', {
                            default: !isActive,
                            active: isActive,
                        })}
                        label={item.label}
                        onClick={() => props.onClick(item.id)}
                        {...props.buttonProps}
                    />
                );
            })}
        </div>
    );
}
