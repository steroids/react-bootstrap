import * as React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';

@bem('TimeFieldView')
export default class TimeFieldView extends React.Component<ITimeFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <input
                className={bem(
                    bem.block({
                        size: this.props.size,
                    }),
                    'form-control',
                    'form-control-' + this.props.size,
                    this.props.isInvalid && 'is-invalid',
                    this.props.className
                )}
                {...this.props.inputProps}
                onChange={e => this.props.inputProps.onChange(e.target.value)}
                type={this.props.type || 'time'}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                required={this.props.required}
            />
        );
    }
}
