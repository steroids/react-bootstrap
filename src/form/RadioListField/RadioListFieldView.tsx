import * as React from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { IRadioListFieldViewProps } from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function RadioListFieldView(props: IRadioListFieldViewProps & IBemHocOutput) {
    const bem = useBem('RadioListFieldView');
    const prefix = useUniqueId('radio');
    return (
        <div className={bem.block()}>
            {props.items.map((item) => (
                <div
                    key={typeof item.id !== 'boolean' ? item.id : (item.id ? 'true' : 'false')}
                    className='custom-control custom-radio'
                >
                    <input
                        {...props.inputProps}
                        id={`${prefix}_${item.id}`}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            !!props.errors && 'is-invalid',
                        )}
                        checked={props.selectedIds.includes(item.id)}
                        disabled={props.disabled || item.disabled}
                        onChange={() => {
                            props.onItemSelect(item.id);
                        }}
                    />
                    <label
                        className='custom-control-label'
                        htmlFor={`${prefix}_${item.id}`}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
