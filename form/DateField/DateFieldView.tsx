import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';

@bem('DateFieldView')
export default class DateFieldView extends React.PureComponent<IDateFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div>
                <DayPickerInput
                    {...this.props.pickerProps}
                    name={this.props.input.name}
                    placeholder={this.props.placeholder || this.props.displayFormat}
                    value={this.props.parseDate(this.props.input.value)}
                    parseDate={this.props.parseDate}
                    formatDate={this.props.formatDate}
                    onDayChange={(value) => this.props.onChange(value)}
                    dayPickerProps={{
                        locale: this.props.locale.language,
                        localeUtils: this.props.localeUtils,
                        ...(this.props.pickerProps && this.props.pickerProps.dayPickerProps)
                    }}
                    inputProps={{
                        ...(this.props.pickerProps && this.props.pickerProps.inputProps),
                        className: bem(
                            bem.block({
                                size: this.props.size,
                            }),
                            'form-control',
                            'form-control-' + this.props.size,
                            this.props.isInvalid && 'is-invalid',
                            this.props.className,
                        ),
                        disabled: this.props.disabled,
                        required: this.props.required,
                    }}
                />
            </div>
        );
    }

}