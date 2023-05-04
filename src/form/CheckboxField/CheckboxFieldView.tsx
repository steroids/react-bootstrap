import * as React from 'react';

import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps) {
    const bem = useBem('CheckboxFieldView');
    const id = useUniqueId('checkbox');

    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                    hasErrors: !!props.errors,
                }),
                props.className,
            )}
            style={props.style}
            onClick={props.onChange}
        >
            <input
                className={bem.element('input')}
                id={props.id || id}
                {...props.inputProps}
                disabled={props.disabled}
                required={props.required}
            />
            <label
                className={bem.element('label')}
                htmlFor={props.id || id}
            >
                {props.label && (
                    <span className={bem.element('label-text', {required: props.required})}>
                        {props.label}
                    </span>
                )}
            </label>
        </div>
    );
}
