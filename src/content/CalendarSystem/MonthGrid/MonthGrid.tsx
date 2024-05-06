/* eslint-disable max-len */
import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps, IDay} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import MonthDay from './views/MonthDay';

import './MonthGrid.scss';

type IMonthGridProps = Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate'
> & ICalendarSystemViewProps['monthGridProps']

function MonthGrid(props: IMonthGridProps) {
    const bem = useBem('MonthGrid');

    return (
        <div className={bem.block()}>
            <div className={bem.element('week-days')}>
                {props.monthGridWeekDays.map((day, dayIndex) => (
                    <span
                        key={dayIndex}
                        className={bem.element('week-days-day')}
                    >
                        {day}
                    </span>
                ))}
            </div>
            <div className={bem.element('grid')}>
                {props.monthGridCalendarDays.map((day, dayIndex) => (
                    <React.Fragment key={dayIndex}>
                        {props.renderHourView({
                            openEditModal: props.openEditModal,
                            openCreateModal: props.openCreateModal,
                            getEventsFromDate: props.getEventsFromDate,
                            renderEventView: props.renderEventView,
                            day,
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default memo(MonthGrid);
