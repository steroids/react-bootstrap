import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/enums/CalendarType';
import AsideHeader from './AsideHeader';
import AsideCalendars from './AsideCalendars';
import ContentHeader from './ContentHeader';
import MonthGrid from './MonthGrid';

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
                    onClick={props.onCreateHandler}
                    className={bem.element('aside-header')}
                />
                <Calendar showFooter={false} />
                <AsideCalendars
                    calendars={props.calendars}
                    calendarsTitle={props.calendarsTitle}
                />
            </aside>
            <div className={bem.element('content')}>
                <ContentHeader
                    allDateInfo={props.allDateInfo}
                    onChangeType={props.onChangeType}
                />
                {props.calendarType === CalendarEnum.Month
                    ? <MonthGrid monthCalendar={props.monthCalendar} />
                    : null}
            </div>
        </div>
    );
}
