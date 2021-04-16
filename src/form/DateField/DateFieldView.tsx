import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import _isString from 'lodash-es/isString';
import _upperFirst from 'lodash-es/upperFirst';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDownField from '@steroidsjs/core/ui/form/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import {useCallback, useMemo} from 'react';

interface IYearMonthFormProps extends CaptionElementProps {
    customClassNames: {
        [key: string]: string,
    },
    onChange: (value) => void
    fromMonth: Date,
    toMonth: Date,
}

function YearMonthForm(props: IYearMonthFormProps) {
    const {localeUtils, locale, fromMonth, toMonth, classNames, customClassNames, date} = props;

    const month = date.getMonth();
    const year = date.getFullYear();

    const handleYearChange = useCallback(year => {
        props.onChange(new Date(year, month));
    }, [props.onChange, month]);

    const handleMonthChange = useCallback(month => {
        props.onChange(new Date(year, month));
    }, [props.onChange, year]);

    const months = useMemo(() => (
        localeUtils.getMonths(locale).map((item, index) => ({
            id: index,
            label: _upperFirst(item),
        }))
    ), [localeUtils, locale]);

    const years = useMemo(() => {
        const result = [];
        for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
            result.push(i);
        }

        return result;
    }, [fromMonth, toMonth]);

    return (
        <div className={classNames.caption}>
            <div className={customClassNames.caption}>
                <div className={customClassNames.yearSelect}>
                    <DropDownField
                        attribute='month'
                        size='md'
                        layout={false}
                        noBorder
                        items={months}
                        input={{onChange: handleMonthChange}}
                        selectedIds={[month]}
                    />
                </div>
                <div className={customClassNames.monthSelect}>
                    <DropDownField
                        attribute='year'
                        size='md'
                        layout={false}
                        className={customClassNames.monthSelect}
                        noBorder
                        items={years}
                        input={{onChange: handleYearChange}}
                        selectedIds={[year]}
                    />
                </div>
            </div>
        </div>
    );
}

export default function DateFieldView(props: IDateFieldViewProps & IBemHocOutput) {
    const bem = useBem('DateFieldView');

    const captionElement = useCallback(({date, localeUtils, classNames, locale}: CaptionElementProps) => (
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
            onChange={props.pickerProps.onYearMonthChange}
            fromMonth={props.pickerProps.dayPickerProps.fromMonth}
            toMonth={props.pickerProps.dayPickerProps.toMonth}
        />
    ), [
        props.pickerProps.onYearMonthChange,
        props.pickerProps.dayPickerProps.fromMonth,
        props.pickerProps.dayPickerProps.toMonth
    ]);

    return (
        <div>
            <DayPickerInput
                {...props.pickerProps}
                name={props.input.name}
                placeholder={props.placeholder || props.displayFormat}
                value={props.parseDate(props.input.value)}
                parseDate={props.parseDate}
                formatDate={props.formatDate}
                onDayChange={(value) => props.onChange(value)}
                dayPickerProps={{
                    captionElement,
                    locale: props.locale.language,
                    localeUtils: props.localeUtils,
                    ...props.pickerProps.dayPickerProps,
                }}
                inputProps={{
                    ...(props.pickerProps && props.pickerProps.inputProps),
                    className: bem(
                        bem.element('input'),
                        'form-control',
                        'form-control-' + props.size,
                        props.isInvalid && 'is-invalid',
                    ),
                    disabled: props.disabled,
                    required: props.required,
                }}
                component={React.forwardRef<HTMLDivElement, any>((inputProps, ref) => (
                    <div
                        ref={ref}
                        className={bem(
                            bem.block({
                                size: props.size,
                                'has-icon': !!props.icon,
                                'is-invalid': !!props.isInvalid,
                            }),
                            props.className,
                            inputProps.className,
                        )}
                    >
                        <input {...inputProps} />
                        {props.icon && (
                            <Icon
                                className={bem.element('icon', {
                                    default: !_isString(props.icon),
                                })}
                                name={_isString(props.icon) ? props.icon as string : 'calendar-alt'}
                            />
                        )}
                    </div>
                ))}
            />
        </div>
    );
}
