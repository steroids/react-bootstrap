import {IPasswordFieldViewProps, InputType} from '@steroidsjs/core/ui/form/PasswordField/PasswordField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function PasswordFieldView(props: IPasswordFieldViewProps) {
    const bem = useBem('PasswordFieldView');

    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                    filled: !!props.input.value,
                    disabled: props.disabled,
                    hasError: !!props.errors,

                }),
                props.className,
            )}
            style={props.style}
        >
            <div
                className={bem.element('container', {
                    disabled: props.inputProps.disabled,
                })}
            >
                <input
                    className={bem(
                        bem.element('input', {
                            size: props.size,
                        }),
                    )}
                    {...props.inputProps}
                    disabled={props.disabled}
                    required={props.required}
                    id={props.id}
                    ref={props.inputRef}
                />
                {props.showSecurityIcon && (
                    <span
                        className={bem(bem.element('icon-eye', {
                            viewHide: props.inputProps.type === InputType.PASSWORD,
                        }))}
                        onClick={props.onShowButtonClick}
                    >
                        <Icon
                            name={props.inputProps.type === 'password' ? 'view_hide' : 'view'}
                        />
                    </span>
                )}
            </div>
            {props.showSecurityBar && (
                <div className={bem.element('security-bar', props.securityLevel)} />
            )}
        </div>
    );
}
