import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IInputFieldViewProps} from '@steroidsjs/core/ui/form/InputField/InputField';

@bem('InputFieldView')
export default class InputFieldView extends React.Component<IInputFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(
                    bem.block({
                        disabled: this.props.inputProps.disabled
                    }),
                    'form-control',
                    'form-control-' + this.props.size,
                    this.props.isInvalid && 'is-invalid',
                    this.props.className
                )}
            >
                {this.props.addonBefore && (
                    <span className={bem.element('addon-before')}>
                        {this.props.addonBefore}
                    </span>
                )}
                {this.props.textBefore && (
                    <span className={bem.element('text-before')}>
                        {this.props.textBefore}
                    </span>
                )}
                {this.props.maskProps && (
                    <input
                        //@ts-ignore //TODO fix type
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        onMouseDown={this.props.onMouseDown}

                        className={bem(
                            bem.element('input', {
                                size: this.props.size,
                            }),
                            this.props.isInvalid && 'is-invalid',
                        )}
                        {...this.props.inputProps}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled}
                        required={this.props.required}
                    />
                ) || (
                    <input
                        className={bem(
                            bem.element('input', {
                                size: this.props.size,
                            }),
                            this.props.isInvalid && 'is-invalid',
                        )}
                        {...this.props.inputProps}
                        onChange={e => this.props.input.onChange(e.target.value)}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled}
                        required={this.props.required}
                    />
                )}
                {this.props.textAfter && (
                    <span className={bem.element('text-after')}>
                            {this.props.textAfter}
                    </span>
                )}
                {this.props.addonAfter && (
                    <span className={bem.element('addon-after')}>
                        {this.props.addonAfter}
                    </span>
                )}
            </div>

        );
    }

}
