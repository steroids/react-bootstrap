import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {IRateFieldViewProps} from '@steroidsjs/core/ui/form/RateField/RateField';

export default function RateFieldView(props: IRateFieldViewProps) {
    const bem = useBem('RateFieldView');
    return (
        <div
            className={bem(bem.block(), props.className)}
        >
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
        </div>
    )
}