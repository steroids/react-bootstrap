import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import DayPicker from 'react-day-picker';
import DropDownField from '@steroidsjs/core/ui/form/DropDownField';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import {ICalendarViewProps} from '@steroidsjs/core/ui/content/Calendar/Calendar';
import _upperFirst from 'lodash-es/upperFirst';

import './CalendarView.scss';

interface IYearMonthFormProps extends CaptionElementProps {
    onChange: (value) => void
    fromYear: Date,
    toYear: Date,
}

function YearMonthForm(props: IYearMonthFormProps) {
    const bem = useBem('CalendarView');

    const {localeUtils, locale, fromYear, toYear, classNames, date} = props;
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
            <div className={bem.element('caption')}>
                <div className={bem.element('caption-month')}>
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
                <div className={bem.element('caption-year')}>
                    <DropDownField
                        attribute='year'
                        size='md'
                        layout={false}
                        className={bem.element('caption-month')}
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

export default function CalendarView(props: ICalendarViewProps) {
    const bem = useBem('CalendarView');

    const {selectedDays, modifiers} = useMemo(() => {
        const from = props.selectedDates[0];
        const to = props.selectedDates[1];

        return {
            selectedDays: to
                ? [from, { from, to }]
                : from,
            modifiers: to
                ? { start: from, end: to }
                : undefined,
        };
    }, [props.selectedDates]);

    const captionElement = useCallback(({classNames, date, localeUtils, locale}: CaptionElementProps) => (
        <YearMonthForm
            date={date}
            localeUtils={localeUtils}
            locale={locale}
            classNames={classNames}
            onChange={props.onMonthSelect}
            fromYear={props.fromYear}
            toYear={props.toYear}
        />
    ), [props.fromYear, props.onMonthSelect, props.toYear]);

    return (
        <DayPicker
            className={bem.block({
                ranged: props.selectedDates.length > 1,
            })}
            captionElement={captionElement}
            selectedDays={selectedDays}
            onDayClick={props.onDaySelect}
            modifiers={modifiers}
            month={props.month}
        />
    );
}
