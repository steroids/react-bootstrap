import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IInputFieldViewProps} from '@steroidsjs/core/ui/form/InputField/InputField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function InputFieldView(props: IInputFieldViewProps & IBemHocOutput) {
    const bem = useBem('InputFieldView');

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClearHandler = () => {
        if (props.input.onChange && !props.maskProps) {
            props.input.onChange('');
            inputRef.current.value = '';
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.input.onChange) {
            props.input.onChange(e.target.value);
        }
    };

    const renderLeadIcon = React.useCallback(() => {
        if (!props.leadIcon) {
            return null;
        }

        const className = bem.element('lead-icon');

        return typeof props.leadIcon === 'string'
            ? <Icon name={props.leadIcon} className={className} />
            : <span className={className}>{props.leadIcon}</span>;
    }, [bem, props.leadIcon]);

    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                    size: props.size,
                    hasError: !!props.errors,
                    successful: props.successful,
                    hasLeadIcon: !!props.leadIcon,
                    hasClearIcon: props.showClear && !props.disabled,
                    filled: !!inputRef.current?.value,
                    hasAddonAfter: !!props.addonAfter,
                    hasAddonBefore: !!props.addonBefore,
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
            {props.leadIcon && renderLeadIcon()}
            {props.maskProps
                ? (
                    <input
                        ref={inputRef}
                        onBlur={props.onBlur}
                        onFocus={props.onFocus}
                        onMouseDown={props.onMouseDown}
                        className={bem(
                            bem.element('input'),
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
                        ref={inputRef}
                        className={bem(
                            bem.element('input'),
                        )}
                        {...props.inputProps}
                        onChange={e => onChangeHandler(e)}
                        type={props.type}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        required={props.required}
                    />
                )}
            {!props.disabled && props.showClear && !props.maskProps && (
                <Icon name="field-close" className={bem.element('icon-clear')} onClick={onClearHandler} />
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
