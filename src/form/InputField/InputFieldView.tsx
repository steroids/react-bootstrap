import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IInputFieldViewProps} from '@steroidsjs/core/ui/form/InputField/InputField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function InputFieldView(props: IInputFieldViewProps & IBemHocOutput) {
    const bem = useBem('InputFieldView');

    const renderLeadIcon = React.useCallback(() => {
        const className = bem.element('lead-icon');

        return typeof props.leadIcon === 'string'
            ? (
                <Icon
                    name={props.leadIcon}
                    className={className}
                    tabIndex={-1}
                />
            )
            : <span className={className}>{props.leadIcon}</span>;
    }, [bem, props.leadIcon]);

    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                    size: props.size,
                    hasError: !!props.errors,
                    hasLeadIcon: !!props.leadIcon,
                    hasClearIcon: props.showClear && !props.disabled,
                    filled: !!props.inputProps.value,
                    hasAddonAfter: !!props.addonAfter,
                    hasAddonBefore: !!props.addonBefore,
                    hasAddon: !!props.addonAfter || !!props.addonBefore,
                    hasTextAddon: !!props.textAfter || !!props.textBefore,
                    hasTextAddonBefore: !!props.textBefore,
                    hasTextAddonAfter: !!props.textAfter,
                }),
                props.className,
            )}
            style={props.style}
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
            <div className={bem.element('input-wrapper')}>
                {props.leadIcon && renderLeadIcon()}
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
                            )}
                            {...props.inputProps}
                            type={props.type}
                            placeholder={props.placeholder}
                            disabled={props.disabled}
                            required={props.required}
                            id={props.id}
                        />
                    )
                    : (
                        <input
                            className={bem(
                                bem.element('input', {
                                    size: props.size,
                                }),
                            )}
                            {...props.inputProps}
                            onChange={e => props.input.onChange(e.target.value)}
                            type={props.type}
                            placeholder={props.placeholder}
                            disabled={props.disabled}
                            required={props.required}
                            id={props.id}
                        />
                    )}
                {!props.disabled && props.showClear && !props.maskProps && (
                    <Icon
                        name="field-close"
                        className={bem.element('icon-clear')}
                        tabIndex={-1}
                        onClick={props.onClear}
                    />
                )}
            </div>
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
