import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';

@bem('CheckboxFieldView')
export default class CheckboxFieldView extends React.PureComponent<ICheckboxFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block(),
                'custom-control',
                'custom-checkbox'
            )}>
                <input
                    className={bem(
                        bem.element('input'),
                        'custom-control-input',
                        this.props.isInvalid && 'is-invalid',
                        this.props.className
                    )}
                    id={this.props.fieldId + '_' + 'checkbox'}
                    {...this.props.inputProps}
                    disabled={this.props.disabled}
                    required={this.props.required}
                />
                <label
                    className={bem(
                        bem.element('label'),
                        'custom-control-label'
                    )}
                    htmlFor={this.props.fieldId + '_' + 'checkbox'}
                >
                    <span className={bem.element('label-text', {required: this.props.required})}>
                        {this.props.label}
                    </span>
                </label>
            </div>
        );
    }
}
