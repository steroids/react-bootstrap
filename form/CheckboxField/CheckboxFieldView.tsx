import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '../../../react/hooks/useUniqueId';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxFieldView');
    const id = useUniqueId('checkbox');
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
                id={id}
                {...props.inputProps}
                disabled={props.disabled}
                required={props.required}
            />
            <label
                className={bem(
                    bem.element('label'),
                    'custom-control-label',
                )}
                htmlFor={id}
            >
                <span className={bem.element('label-text', {required: props.required})}>
                    {props.label}
                </span>
            </label>
        </div>
    );
}
