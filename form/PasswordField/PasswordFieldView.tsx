import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IPasswordFieldViewProps} from '@steroidsjs/core/ui/form/PasswordField/PasswordField';
import Icon from '@steroidsjs/core/ui/icon/Icon';

@bem('PasswordFieldView')
export default class PasswordFieldView extends React.PureComponent<IPasswordFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(
                    bem.block(),
                    this.props.className
                )}
            >
                <div
                    className={bem(
                        bem.element('container', {
                            'disabled': this.props.inputProps.disabled,
                        }),
                        'form-control',
                        'form-control-' + this.props.size,
                        this.props.isInvalid && 'is-invalid',
                    )}
                >
                    <input
                        className={bem(
                            bem.element('input', {
                                size: this.props.size,
                            }),
                            this.props.isInvalid && 'is-invalid',
                            this.props.className
                        )}
                        {...this.props.inputProps}
                    />
                    {this.props.security && (
                        <span
                            className={bem(bem.element('icon-eye'), 'material-icons')}
                            onMouseDown={this.props.onShowPassword}
                            onMouseUp={this.props.onHidePassword}
                        >
                            <Icon
                                name={this.props.inputProps.type === 'password' ? 'securityEye' : 'securityEyeSlash'}
                            />
                        </span>
                    )}
                </div>
                {this.props.security && (
                    <div className={bem.element('security-bar', this.props.securityLevel)}/>
                )}
            </div>
        );
    }

}
