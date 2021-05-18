import * as React from 'react';
import DayPicker from 'react-day-picker';
import {useBem} from '@steroidsjs/core/hooks';
import {ICalendarViewProps} from '@steroidsjs/core/ui/form/DateField/Calendar/Calendar';
import _upperFirst from 'lodash-es/upperFirst';

import './CalendarView.scss';
import {useCallback, useMemo} from "react";
import DropDownField from "@steroidsjs/core/ui/form/DropDownField";
import {CaptionElementProps} from "react-day-picker/types/Props";

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

export default function CalendarView(props: ICalendarViewProps) {
    const bem = useBem('CalendarView');

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

    return(
        <DayPicker
            className={bem.block()}
            captionElement={captionElement}
            selectedDays={props.selectedDay}
            onDayClick={props.onDayClick}
            month={props.month}
        />
    );
}
