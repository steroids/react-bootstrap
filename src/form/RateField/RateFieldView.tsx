/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {IRateFieldViewProps} from '@steroidsjs/core/ui/form/RateField/RateField';
import * as React from 'react';

export default function RateFieldView(props: IRateFieldViewProps) {
    const bem = useBem('RateFieldView');
    return (
        <div
            className={bem(bem.block({
                size: props.size,
                disabled: props.disabled,
            }), props.className)}
            style={props.style}
        >
            <ul className={bem.element('rate-list')}>
                {props.items.map((item, index) => (
                    <div
                        key={index}
                        className={bem.element('rate-item', {
                            'is-full': item.value <= props.inputProps.value,
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            props.onItemClick(item);
                        }}
                    >
                        <span className={bem.element('rate-value-first')}>
                            <Icon
                                className={bem.element('rate-icon')}
                                name='star'
                            />
                        </span>
                        <span className={bem.element('rate-value-second')}>
                            <Icon
                                className={bem.element('rate-icon')}
                                name='star'
                            />
                        </span>
                    </div>
                ))}
            </ul>
            {props.badge && (
                <span className={bem.element('badge')}>
                    {props.badge?.title}
                </span>
            )}
        </div>
    );
}
