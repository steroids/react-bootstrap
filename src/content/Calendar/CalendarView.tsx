import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import DayPicker, {DateUtils} from 'react-day-picker';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import {ICalendarViewProps} from '@steroidsjs/core/ui/content/Calendar/Calendar';
import CaptionElement from './CaptionElement';

import './CalendarView.scss';

export default function CalendarView(props: ICalendarViewProps) {
    const bem = useBem('CalendarView');

    const {
        month,
        toYear,
        fromYear,
        showFooter,
        onDaySelect,
        selectedDates,
        onMonthSelect,
        numberOfMonths,
        toggleCaptionPanel,
        isCaptionPanelVisible,
    } = props;

    const isRange = !!selectedDates[1];
    const {selectedDays, modifiers} = useMemo(() => {
        const from = selectedDates[0];
        const to = selectedDates[1];
        const inRange = (day) => DateUtils.isDayAfter(day, from) && DateUtils.isDayBefore(day, to);
        const outRange = (day) => DateUtils.isDayBefore(day, from);
        return {
            selectedDays: isRange
                ? [from, { from, to }]
                : from,
            modifiers: isRange
                ? {
                    start: from,
                    end: to,
                    inRange,
                    outRange,
                }
                : undefined,
        };
    }, [isRange, selectedDates]);

    return (
        <DayPicker
            className={bem.block({
                ranged: isRange,
            })}
            captionElement={useCallback(({classNames, date, localeUtils, locale}: CaptionElementProps) => (
                <CaptionElement
                    date={date}
                    locale={locale}
                    toYear={toYear}
                    fromYear={fromYear}
                    classNames={classNames}
                    onChange={onMonthSelect}
                    localeUtils={localeUtils}
                    toggleCaptionPanel={toggleCaptionPanel}
                    isCaptionPanelVisible={isCaptionPanelVisible}
                />
            ), [fromYear, isCaptionPanelVisible, onMonthSelect, toYear, toggleCaptionPanel])}
            todayButton={showFooter && (isCaptionPanelVisible ? __('Close') : __('Today'))}
            onTodayButtonClick={(day) => {
                if (isCaptionPanelVisible) {
                    toggleCaptionPanel();
                } else {
                    onDaySelect(day);
                }
            }}
            selectedDays={selectedDays}
            onDayClick={onDaySelect}
            canChangeMonth={false}
            modifiers={modifiers}
            firstDayOfWeek={1}
            month={month}
            fixedWeeks
            numberOfMonths={numberOfMonths}
            renderDay={(day) => {
                const date = day.getDate();
                return (
                    <div className={bem.element('day')}>
                        {date}
                    </div>
                );
            }}
        />
    );
}
