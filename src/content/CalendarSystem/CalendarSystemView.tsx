import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/enums/CalendarType';
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
                    calendarGroups={props.calendarGroups}
                    calendarsTitle={props.calendarGroupsTitle}
                    selectedCalendarGroupsIds={props.selectedCalendarGroups}
                    onChangeCalendarGroupsIds={props.onChangeCalendarGroupsIds}
                />
            </aside>
            <div className={bem.element('content')}>
                <ContentHeader
                    dateToDisplay={props.dateToDisplay}
                    onChangeType={props.onChangeType}
                    onClickControls={props.onClickControls}
                />
                {props.calendarType === CalendarEnum.MONTH
                    ? (
                        <MonthGrid
                            monthCalendarDays={props.monthCalendarDays}
                            getEventsFromDate={props.getEventsFromDate}
                        />
                    )
                    : (
                        <WeekGrid
                            getEventsFromDate={props.getEventsFromDate}
                            onClickHour={props.onClickHour}
                            currentWeekDays={props.currentWeekDays}
                        />
                    )}
            </div>
        </div>
    );
}
