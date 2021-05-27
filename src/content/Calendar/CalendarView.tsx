import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import DayPicker from 'react-day-picker';
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
        onDaySelect,
        selectedDates,
        onMonthSelect,
        toggleCaptionPanel,
        isCaptionPanelVisible,
    } = props;

    const {selectedDays, modifiers} = useMemo(() => {
        const from = selectedDates[0];
        const to = selectedDates[1];

        return {
            selectedDays: to
                ? [from, { from, to }]
                : from,
            modifiers: to
                ? { start: from, end: to }
                : undefined,
        };
    }, [selectedDates]);

    return (
        <DayPicker
            className={bem.block({
                ranged: selectedDates.length > 1,
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
            todayButton={isCaptionPanelVisible ? __('Close') : __('Today')}
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
        />
    );
}
