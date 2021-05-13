import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import DayPicker from 'react-day-picker';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDownField from '@steroidsjs/core/ui/form/DropDownField';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import {IDateRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateRangeField/DateRangeField';
import _isString from 'lodash-es/isString';
import _upperFirst from 'lodash-es/upperFirst';

import './DateRangeFieldView.scss';

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

export default function DateRangeFieldView(props: IDateRangeFieldViewProps) {
    const bem = useBem('DateRangeFieldView');
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
            onChange={props.handleYearMonthChange}
            fromYear={props.fromYear}
            toYear={props.toYear}
        />
    ), []);
    const from = props.selectedRange.from;
    const to = props.selectedRange.to;
    const modifiers = {
        start: from,
        end: to,
    };
    return (
        <DropDown
            content={() =>
                <DayPicker
                    className={bem.element('day-picker')}
                    captionElement={captionElement}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
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
                        'disabled': props.disabled,
                        'no-border': props.noBorder,
                    }),
                    props.className,
                )}
                onFocus={(e) => {
                    e.preventDefault();
                    props.openPanel();
                }}
                onBlur={(e) => {
                    e.preventDefault();
                    props.onBlur();
                }}
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
                        value={props.state.from}
                        onChange={e => props.inputProps.onChange({from: e.target.value})}
                    />
                    <span className={bem.element('divider')}>
                    -
                </span>
                    <input
                        {...props.inputProps}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        value={props.state.to}
                        onChange={e => props.inputProps.onChange({to: e.target.value})}
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
