import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import _isString from 'lodash/isString';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';

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
                            bem.element('input'),
                            'form-control',
                            'form-control-' + this.props.size,
                            this.props.isInvalid && 'is-invalid',
                        ),
                        disabled: this.props.disabled,
                        required: this.props.required,
                    }}
                    component={React.forwardRef((props, ref) => (
                        <div
                            className={bem(
                                bem.block({
                                    size: this.props.size,
                                    'has-icon': !!this.props.icon,
                                    'is-invalid': !!this.props.isInvalid
                                }),
                                this.props.className
                            )}
                        >
                            <input {...props} />
                            {this.props.icon && (
                                <Icon
                                    className={bem.element('icon', {
                                        default: !_isString(this.props.icon),
                                    })}
                                    name={_isString(this.props.icon) ? this.props.icon : 'calendar-alt'}
                                />
                            )}
                        </div>
                    ))}
                />
            </div>
        );
    }

}
