import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {useBem, useComponents} from '@steroidsjs/core/hooks';
import DayPickerSource, {DateUtils} from 'react-day-picker';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import {ICalendarViewProps} from '@steroidsjs/core/ui/content/Calendar/Calendar';
import {customLocaleUtils} from '@steroidsjs/core/utils/calendar';
import CaptionElement from './CaptionElement';

export default function CalendarView(props: ICalendarViewProps) {
    const bem = useBem('CalendarView');
    const {locale: localeComponent} = useComponents();

    //TODO Исправить тип, связано с yarn tsc в action publish.yml
    const DayPicker: any = DayPickerSource;

    const {
        month,
        toYear,
        fromYear,
        showFooter,
        showTodayButton,
        onDaySelect,
        selectedDates,
        onMonthSelect,
        numberOfMonths,
        toggleCaptionPanel,
        isCaptionPanelVisible,
    } = props;

    const isRange = !!selectedDates[0] && !!selectedDates[1];
    const {selectedDays, modifiers} = useMemo(() => {
        const from = selectedDates[0];
        const to = selectedDates[1];
        const inRange = (day) => DateUtils.isDayAfter(day, from) && DateUtils.isDayBefore(day, to);
        const outRange = (day) => DateUtils.isDayBefore(day, from);
        return {
            selectedDays: isRange
                ? [from, {
                    from,
                    to,
                }]
                : from,
            modifiers: isRange && !DateUtils.isSameDay(from, to)
                ? {
                    start: from,
                    end: to,
                    inRange,
                }
                : undefined,
        };
    }, [isRange, selectedDates]);

    const shouldShowFooter = useMemo(() => (
        // Показывать кнопку "закрыть", если открыто меню с выбором месяца, независимо от showTodayButton
        (showFooter && isCaptionPanelVisible)
        // Показывать кнопку "Сегодня"
        || (showFooter && showTodayButton)
    ), [isCaptionPanelVisible, showFooter, showTodayButton]);

    return (
        <DayPicker
            {...props}
            {...props.pickerProps}
            className={bem(bem.block({ranged: isRange}), props.className)}
            captionElement={useCallback(({classNames, date, localeUtils, locale}: CaptionElementProps) => (
                <CaptionElement
                    date={date}
                    locale={locale}
                    toYear={toYear}
                    fromYear={fromYear}
                    classNames={classNames}
                    onChange={onMonthSelect}
                    localeUtils={localeUtils}
                    showCalendarFooter={showFooter}
                    toggleCaptionPanel={toggleCaptionPanel}
                    isCaptionPanelVisible={isCaptionPanelVisible}
                />
            ), [fromYear, isCaptionPanelVisible, onMonthSelect, showFooter, toYear, toggleCaptionPanel])}
            renderDay={(day) => {
                const date = day.getDate();
                return (
                    <div
                        className={bem.element('day')}
                    >
                        {date}
                    </div>
                );
            }}
            todayButton={shouldShowFooter && (isCaptionPanelVisible ? __('Закрыть') : __('Сегодня'))}
            onTodayButtonClick={(day) => {
                if (isCaptionPanelVisible) {
                    toggleCaptionPanel();
                } else {
                    onDaySelect(day);
                }
            }}
            fixedWeeks
            month={month}
            firstDayOfWeek={1}
            modifiers={modifiers}
            canChangeMonth={false}
            onDayClick={onDaySelect}
            selectedDays={selectedDays}
            numberOfMonths={numberOfMonths}
            localeUtils={customLocaleUtils}
            locale={localeComponent.language}
        />
    );
}
