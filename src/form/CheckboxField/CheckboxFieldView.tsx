import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxFieldView');
    const id = useUniqueId('checkbox');

    return (
        <div
            className={
                `${bem.block()} 
                 ${bem(props.className)}
                 ${props.errors ? 'has-errors' : ''}`
            }
            style={props.style}
            onClick={props.onChange}
        >
            <input
                className={bem.element('input')}
                id={id}
                {...props.inputProps}
                disabled={props.disabled}
                required={props.required}
            />
            <label
                className={bem.element('label')}
                htmlFor={id}
            >
                <span className={bem.element('label-text', {required: props.required})}>
                    {props.label}
                </span>
            </label>
        </div>
    );
}
