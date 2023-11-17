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

    const calendarTypeGrids = React.useMemo(() => ({
        [CalendarEnum.MONTH]: <MonthGrid {...props.monthGridProps} />,
        [CalendarEnum.WEEK]: <WeekGrid {...props.weekGridProps} />,
    }), [props.monthGridProps, props.weekGridProps]);

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
                    onClick={props.openCreateModal}
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
                    onChangeCalendarType={props.handleCalendarTypeChange}
                    handleControlClick={props.handleControlClick}
                />
                {calendarTypeGrids[props.calendarType as string]}
            </div>
        </div>
    );
}
