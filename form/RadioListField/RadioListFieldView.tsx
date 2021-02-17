import * as React from 'react';
import {ReactText} from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IRadioListFieldViewProps} from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import {useBem} from '@steroidsjs/core/hooks';

export default function RadioListFieldView(props: IRadioListFieldViewProps & IBemHocOutput) {
    const bem = useBem('RadioListFieldView');
    return (
        <div className={bem.block()}>
            {props.items.map(item => (
                <div
                    key={item.id as ReactText}
                    className='custom-control custom-radio'
                >
                    <input
                        {...props.inputProps}
                        id={props.fieldId + '_' + item.id}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            props.isInvalid && 'is-invalid',
                        )}
                        checked={item.isSelected}
                        disabled={props.disabled}
                        onChange={() => props.onItemClick(item)}
                    />
                    <label
                        className='custom-control-label'
                        htmlFor={props.fieldId + '_' + item.id}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
