import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';

export default function TimeFieldView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimeFieldView');
    return (
        <input
            className={bem(
                bem.block({
                    size: props.size,
                }),
                'form-control',
                'form-control-' + props.size,
                props.isInvalid && 'is-invalid',
                props.className,
            )}
            {...props.inputProps}
            onChange={e => props.inputProps.onChange(e.target.value)}
            type={props.type || 'time'}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
        />
    );
}
