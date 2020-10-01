import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import _isString from 'lodash/isString';
import _upperFirst from 'lodash/upperFirst';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDownField from '@steroidsjs/core/ui/form/DropDownField';

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
                        captionElement: ({ date, localeUtils, classNames, locale}) => (
                            <YearMonthForm
                                date={date}
                                localeUtils={localeUtils}
                                locale={locale}
                                classNames={classNames}
                                customClassNames={{
                                    caption: bem.element('caption'),
                                    yearSelect: bem.element('caption-year'),
                                    monthSelect: bem.element('caption-month'),
                                }}
                                onChange={this.props.pickerProps.onYearMonthChange}
                                fromMonth={this.props.pickerProps.dayPickerProps.fromMonth}
                                toMonth={this.props.pickerProps.dayPickerProps.toMonth}
                            />
                        ),
                        locale: this.props.locale.language,
                        localeUtils: this.props.localeUtils,
                        ...this.props.pickerProps.dayPickerProps,
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

interface IYearMonthFormProps extends CaptionElementProps {
    customClassNames: {
        [key: string]: string,
    },
    onChange: (value) => void
    fromMonth: Date,
    toMonth: Date,
}

class YearMonthForm extends React.PureComponent<IYearMonthFormProps> {
    constructor(props) {
        super(props);

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    handleYearChange(year) {
        this.props.onChange(new Date(year, this.props.date.getMonth()));
    };

    handleMonthChange(month) {
        this.props.onChange(new Date(this.props.date.getFullYear(), month));
    };

    render() {
        const {localeUtils, locale, fromMonth, toMonth, classNames, customClassNames, date} = this.props;

        const months = localeUtils.getMonths(locale).map((item, index) => ({
            id: index,
            label: _upperFirst(item),
        }));

        const years = [];
        for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
            years.push(i);
        }

        return (
            <div className={classNames.caption}>
                <div className={customClassNames.caption}>
                    <div className={customClassNames.yearSelect}>
                        <DropDownField
                            size='md'
                            layout={false}
                            noBorder
                            items={months}
                            input={{
                                value: date.getMonth(),
                                onChange: this.handleMonthChange,
                            }}
                        />
                    </div>
                    <div className={customClassNames.monthSelect}>
                        <DropDownField
                            size='md'
                            layout={false}
                            className={customClassNames.monthSelect}
                            noBorder
                            items={years}
                            input={{
                                value: date.getFullYear(),
                                onChange: this.handleYearChange,
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
