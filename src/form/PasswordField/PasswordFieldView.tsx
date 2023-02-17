import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IPasswordFieldViewProps} from '@steroidsjs/core/ui/form/PasswordField/PasswordField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function PasswordFieldView(props: IPasswordFieldViewProps & IBemHocOutput) {
    const bem = useBem('PasswordFieldView');
    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
        >
            <div
                className={bem(
                    bem.element('container', {
                        disabled: props.inputProps.disabled,
                    }),
                    'form-control',
                    'form-control-' + props.size,
                    !!props.errors && 'is-invalid',
                )}
            >
                <input
                    className={bem(
                        bem.element('input', {
                            size: props.size,
                        }),
                        !!props.errors && 'is-invalid',
                        props.className,
                    )}
                    {...props.inputProps}
                />
                {props.security && (
                    <button
                        className={bem(bem.element('icon-eye'))}
                        onMouseDown={props.onShowPassword}
                        onMouseUp={props.onHidePassword}
                    >
                        <Icon
                            name={props.inputProps.type === 'password' ? 'securityEye' : 'securityEyeSlash'}
                        />
                    </button>
                )}
            </div>
            {props.security && (
                <div className={bem.element('security-bar', props.securityLevel)} />
            )}
        </div>
    );
}
