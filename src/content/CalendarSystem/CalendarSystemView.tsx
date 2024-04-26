/* eslint-disable max-len */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import AsideHeader from './AsideHeader';
import AsideCalendars from './AsideCalendars';
import ContentHeader from './ContentHeader';

export default function CalendarSystemView(props: ICalendarSystemViewProps) {
    const bem = useBem('CalendarSystemView');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sharedFunctions = {
        getEventsFromDate: props.getEventsFromDate,
        openEditModal: props.openEditModal,
        openCreateModal: props.openCreateModal,
    };

    const {
        dayGridProps: {renderGridView: renderDayGrid},
        weekGridProps: {renderGridView: renderWeekGrid},
        monthGridProps: {renderGridView: renderMonthGrid},
    } = props;

    const calendarTypeGrids = React.useMemo(() => ({
        [CalendarEnum.MONTH]: (
            <>
                {renderMonthGrid({
                    ...props.monthGridProps,
                    ...sharedFunctions,
                })}
            </>
        ),
        [CalendarEnum.WEEK]: (
            <>
                {renderWeekGrid({
                    ...props.weekGridProps,
                    ...sharedFunctions,
                })}
            </>
        ),
        [CalendarEnum.DAY]: (
            <>
                {renderDayGrid({
                    ...props.dayGridProps,
                    ...sharedFunctions,
                    users: props.users,
                })}
            </>
        ),
    }), [props.dayGridProps, props.monthGridProps, props.users, props.weekGridProps, renderDayGrid, renderMonthGrid, renderWeekGrid, sharedFunctions]);

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
                    onMonthChange={props.onCalendarChangedMonth}
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
                    onClickControl={props.onClickControl}
                />
                {calendarTypeGrids[props.calendarType as string]}
            </div>
        </div>
    );
}
