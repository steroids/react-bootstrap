import * as React from 'react';
import _uniqueId from 'lodash-es/uniqueId';

import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { IRadioListFieldViewProps } from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import { useBem } from '@steroidsjs/core/hooks';
import {useMemo} from 'react';

export default function RadioListFieldView(props: IRadioListFieldViewProps & IBemHocOutput) {
    const bem = useBem('RadioListFieldView');
    const checkboxId = useMemo(() => _uniqueId('checkbox'), []);
    return (
        <div className={bem.block()}>
            {props.items.map((item) => (
                <div
                    key={typeof item.id !== 'boolean' ? item.id : (item.id ? 'true' : 'false')}
                    className='custom-control custom-radio'
                >
                    <input
                        {...props.inputProps}
                        id={checkboxId}
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
                        htmlFor={checkboxId}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
