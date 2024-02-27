import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';

import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';
import {IRadioFieldViewProps} from '@steroidsjs/core/ui/form/RadioField/RadioField';

export default function RadioFieldView(props: IRadioFieldViewProps) {
    const bem = useBem('RadioFieldView');
    const id = useUniqueId('radio');

    return (
        <div
            className={bem(
                bem.block({
                    hasError: !!props.errors,
                    size: props.size,
                }),
                props.className,
            )}
            onClick={props.onChange}
        >
            <input
                className={bem(
                    bem.element('input', {
                        checked: props.checked,
                    }),
                )}
                id={props.id || id}
                {...props.inputProps}
                required={props.required}
            />
            <label
                className={bem.element('label')}
                htmlFor={props.id || id}
            >
                <span className={bem.element('ellipse')} />
                {props.label}
            </label>
        </div>
    );
}
