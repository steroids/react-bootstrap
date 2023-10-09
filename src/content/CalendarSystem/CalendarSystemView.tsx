import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import AsideHeader from './AsideHeader';
import AsideCalendars from './AsideCalendars';
import ContentHeader from './ContentHeader';
import MonthGrid from './MonthGrid';
import WeekGrid from './WeekGrid';

export default function CalendarSystemView(props: ICalendarSystemViewProps) {
    const bem = useBem('CalendarSystemView');

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            <aside className={bem.element('aside')}>
                <AsideHeader
                    onClick={props.onClickCreate}
                    className={bem.element('aside-header')}
                />
                <Calendar
                    showFooter={false}
                    onMonthChange={props.onMonthChange}
                />
                <AsideCalendars
                    eventGroups={props.eventGroups}
                    eventGroupsTitle={props.eventGroupsTitle}
                    selectedCalendarGroupsIds={props.selectedCalendarGroups}
                    onChangeEventGroupsIds={props.onChangeEventGroupsIds}
                />
            </aside>
            <div className={bem.element('content')}>
                <ContentHeader
                    dateToDisplay={props.dateToDisplay}
                    onChangeCalendarType={props.onChangeCalendarType}
                    applyControl={props.applyControl}
                />
                {props.calendarType === CalendarEnum.MONTH
                    ? (
                        <MonthGrid
                            monthCalendarDays={props.monthCalendarDays}
                            getEventsFromDate={props.getEventsFromDate}
                            weekDays={props.weekDays}
                        />
                    )
                    : (
                        <WeekGrid
                            allHours={props.allHours}
                            getEventsFromDate={props.getEventsFromDate}
                            onClickHour={props.onClickHour}
                            currentWeekDays={props.currentWeekDays}
                        />
                    )}
            </div>
        </div>
    );
}
