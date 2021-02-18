import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IInputFieldViewProps} from '@steroidsjs/core/ui/form/InputField/InputField';
import {useBem} from '@steroidsjs/core/hooks';

export default function InputFieldView(props: IInputFieldViewProps & IBemHocOutput) {
    const bem = useBem('InputFieldView');
    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                }),
                'form-control',
                'form-control-' + props.size,
                props.isInvalid && 'is-invalid',
                props.className,
            )}
        >
            {props.addonBefore && (
                <span className={bem.element('addon-before')}>
                    {props.addonBefore}
                </span>
            )}
            {props.textBefore && (
                <span className={bem.element('text-before')}>
                    {props.textBefore}
                </span>
            )}
            {props.maskProps
                ? (
                    <input
                        onBlur={props.onBlur}
                        onFocus={props.onFocus}
                        onMouseDown={props.onMouseDown}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        {...props.inputProps}
                        type={props.type}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        required={props.required}
                    />
                )
                : (
                    <input
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        {...props.inputProps}
                        onChange={e => props.input.onChange(e.target.value)}
                        type={props.type}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        required={props.required}
                    />
                )}
            {props.textAfter && (
                <span className={bem.element('text-after')}>
                    {props.textAfter}
                </span>
            )}
            {props.addonAfter && (
                <span className={bem.element('addon-after')}>
                    {props.addonAfter}
                </span>
            )}
        </div>
    );
}
