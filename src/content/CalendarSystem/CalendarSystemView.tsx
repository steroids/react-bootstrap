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
import DayGrid from './DayGrid';

export default function CalendarSystemView(props: ICalendarSystemViewProps) {
    const bem = useBem('CalendarSystemView');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sharedFunctions = {
        getEventsFromDate: props.getEventsFromDate,
        openEditModal: props.openEditModal,
        openCreateModal: props.openCreateModal,
    };

    const calendarTypeGrids = React.useMemo(() => ({
        [CalendarEnum.MONTH]: <MonthGrid
            {...props.monthGridProps}
            {...sharedFunctions}
        />,
        [CalendarEnum.WEEK]: <WeekGrid
            {...props.weekGridProps}
            {...sharedFunctions}
        />,
        [CalendarEnum.DAY]: <DayGrid
            users={props.users}
            {...props.dayGridProps}
            {...sharedFunctions}
        />,
    }), [props.dayGridProps, props.monthGridProps, props.users, props.weekGridProps, sharedFunctions]);

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
                    openCreateModal={props.openCreateModal}
                    className={bem.element('aside-header')}
                />
                <Calendar
                    showFooter={false}
                    onMonthChange={props.onInnerCalendarChangeMonth}
                />
                <AsideCalendars
                    eventGroups={props.eventGroups}
                    eventGroupsTitle={props.eventGroupsTitle}
                    onChangeEventGroupsIds={props.onChangeEventGroupsIds}
                    openCreateEventGroupModal={props.openCreateEventGroupModal}
                />
            </aside>
            <div className={bem.element('content')}>
                <ContentHeader
                    dateToDisplay={props.dateToDisplay}
                    handleCalendarTypeChange={props.handleCalendarTypeChange}
                    handleControlClick={props.handleControlClick}
                />
                {calendarTypeGrids[props.calendarType as string]}
            </div>
        </div>
    );
}
