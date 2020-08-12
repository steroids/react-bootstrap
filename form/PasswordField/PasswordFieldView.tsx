import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IPasswordFieldViewProps} from '@steroidsjs/core/ui/form/PasswordField/PasswordField';

@bem('PasswordFieldView')
export default class PasswordFieldView extends React.PureComponent<IPasswordFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <div className={bem.element('input-container')}>
                    <input
                        className={bem(
                            bem.element('input', {
                                size: this.props.size,
                            }),
                            'form-control',
                            'form-control-' + this.props.size,
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
                            remove_red_eye
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
