import * as React from 'react';
import _uniqueId from 'lodash-es/uniqueId';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';
import {useMemo} from 'react';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxFieldView');
    const checkboxId = useMemo(() => _uniqueId('checkbox'), []);
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
                id={checkboxId}
                {...props.inputProps}
                disabled={props.disabled}
                required={props.required}
            />
            <label
                className={bem(
                    bem.element('label'),
                    'custom-control-label',
                )}
                htmlFor={checkboxId}
            >
                <span className={bem.element('label-text', {required: props.required})}>
                    {props.label}
                </span>
            </label>
        </div>
    );
}
