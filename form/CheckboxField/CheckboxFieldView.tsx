import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxFieldView');
    return (
        <div
            className={bem(
                bem.block(),
                'custom-control',
                'custom-checkbox',
            )}
        >
            <input
                className={bem(
                    bem.element('input'),
                    'custom-control-input',
                    props.isInvalid && 'is-invalid',
                    props.className,
                )}
                id={props.fieldId + '_checkbox'}
                {...props.inputProps}
                disabled={props.disabled}
                required={props.required}
            />
            <label
                className={bem(
                    bem.element('label'),
                    'custom-control-label',
                )}
                htmlFor={props.fieldId + '_checkbox'}
            >
                <span className={bem.element('label-text', {required: props.required})}>
                    {props.label}
                </span>
            </label>
        </div>
    );
}
