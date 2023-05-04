import * as React from 'react';

import {IPasswordFieldViewProps} from '@steroidsjs/core/ui/form/PasswordField/PasswordField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function PasswordFieldView(props: IPasswordFieldViewProps) {
    const bem = useBem('PasswordFieldView');

    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                    filled: !!props.inputProps.value,
                    disabled: props.inputProps.disabled,
                }),
                props.className,
            )}
        >
            <div
                className={bem.element('container', {
                    disabled: props.inputProps.disabled,
                })}
            >
                <input
                    className={bem.element('input')}
                    {...props.inputProps}
                    id={props.id}
                />
                {props.showSecurityIcon && (
                    <span
                        className={bem(bem.element('icon-eye'))}
                        onMouseDown={props.onShowPassword}
                        onMouseUp={props.onHidePassword}
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
