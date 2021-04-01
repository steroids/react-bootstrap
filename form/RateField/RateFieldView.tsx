import * as React from 'react';
import {useBem} from "../../../react/hooks";
import './RateFieldView.scss';
import {IRateFieldViewProps} from '../../../react/ui/form/RateField/RateField';


export default function RateFieldView(props: IRateFieldViewProps) {
    const bem = useBem('RateFieldView');
    return (
        <div
            className={bem(bem.block(), props.className)}
            role='radio'
        >
            {props.items.map((item, index) => (
                <div
                    key={index}
                    className={bem.element('rate-item', {
                        'is-full': item.id <= props.value,
                    })}
                    onClick={(e) => {
                        e.preventDefault();
                        props.handleItemClick(item.id);
                    }}
                >
                    <span className={bem.element('rate-value-first')} />
                    <span className={bem.element('rate-value-second')} />
                </div>
            ))}
        </div>
    )
}