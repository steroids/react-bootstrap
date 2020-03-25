import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import {bem} from '@steroidsjs/core/hoc';
import MomentLocaleUtils from "react-day-picker/moment";

@bem('DateFieldView')
export default class DateFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        disabled: PropTypes.bool,
        pickerProps: PropTypes.object,
        className: PropTypes.string,
        isInvalid: PropTypes.bool,
    };

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
