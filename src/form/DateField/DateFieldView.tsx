import * as React from 'react';
import DayPicker from 'react-day-picker';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import _isString from 'lodash-es/isString';
import _upperFirst from 'lodash-es/upperFirst';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDownField from '@steroidsjs/core/ui/form/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import {useCallback, useMemo} from 'react';
import DropDown from "@steroidsjs/core/ui/content/DropDown";

import './DateFieldView.scss';

interface IYearMonthFormProps extends CaptionElementProps {
    customClassNames: {
        [key: string]: string,
    },
    onChange: (value) => void
    fromYear: Date,
    toYear: Date,
}

function YearMonthForm(props: IYearMonthFormProps) {
    const {localeUtils, locale, fromYear, toYear, classNames, customClassNames, date} = props;
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const handleYearChange = newYear => {
        if (newYear !== currentYear) {
            props.onChange(new Date(newYear, currentMonth));
        }
    };

    const handleMonthChange = newMonth => {
        if (newMonth !== currentMonth) {
            console.log('handleMonthChange', newMonth)
            props.onChange(new Date(currentYear, newMonth));
        }
    };

    const months = useMemo(() => (
        localeUtils.getMonths(locale).map((item, index) => ({
            id: index,
            label: _upperFirst(item),
        }))
    ), [localeUtils, locale]);

    const years = useMemo(() => {
        const result = [];
        for (let i = fromYear.getFullYear(); i <= toYear.getFullYear(); i += 1) {
            result.push(i);
        }

        return result;
    }, [fromYear, toYear]);
    return (
        <div className={classNames.caption}>
            <div className={customClassNames.caption}>
                <div className={customClassNames.monthSelect}>
                    <DropDownField
                        attribute='month'
                        size='md'
                        layout={false}
                        noBorder
                        items={months}
                        onChange={(month) => handleMonthChange(month)}
                        selectedIds={[currentMonth]}
                    />
                </div>
                <div className={customClassNames.yearSelect}>
                    <DropDownField
                        attribute='year'
                        size='md'
                        layout={false}
                        className={customClassNames.monthSelect}
                        noBorder
                        items={years}
                        onChange={(year) => handleYearChange(year)}
                        selectedIds={[currentYear]}
                    />
                </div>
            </div>
        </div>
    );
}

export default function DateFieldView(props: IDateFieldViewProps & IBemHocOutput) {
    const bem = useBem('DateFieldView');
    const captionElement = useCallback(({classNames, date, localeUtils, locale}: CaptionElementProps) => (
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
            onChange={props.updateMonth}
            fromYear={props.fromYear}
            toYear={props.toYear}
        />
    ), []);
    return (
        <DropDown
            content={() =>
                <DayPicker
                    captionElement={captionElement}
                    selectedDays={props.dateFrom}
                    onDayClick={props.onDayClick}
                    month={props.month}
                />
            }
            position='bottomLeft'
            visible={props.isPanelOpen}
            toggleVisibility={(value)  => value ? props.closePanel() : props.openPanel()}
        >
            <div
                className={bem(
                    bem.block({
                        size: props.size,
                        'has-icon': !!props.icon,
                        'is-invalid': !!props.isInvalid,
                    }),
                    props.className,
                )}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputProps}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        onChange={e => props.inputProps.onChange(e.target.value)}
                        onFocus={(e) => {
                            e.preventDefault();
                            props.openPanel();
                        }}
                        onBlur={(e) => {
                            e.preventDefault();
                            props.onBlur();
                        }}
                    />
                    <div className={bem.element('icon-container')}>
                        {props.icon && (
                            <Icon
                                className={bem.element('icon')}
                                name={_isString(props.icon) ? props.icon as string : 'calendar-alt'}
                            />
                        )}
                        {props.showRemove && props.input.value && (
                            <Icon
                                className={bem.element('icon', 'close')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.clearInput();
                                }}
                                name='times-circle'
                            />
                        )}
                    </div>
                </div>
            </div>
        </DropDown>
    );
}
