import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';

import './MonthGrid.scss';
import MonthDay from './views/MonthDay';

interface IMonthGridProps {
    monthCalendarDays: IDay[];
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    weekDays: string[],
    openEventModal: (event: IEvent) => void,
    openCreateModal: () => void;
}

function MonthGrid(props: IMonthGridProps) {
    const bem = useBem('MonthGrid');

    return (
        <div className={bem.block()}>
            <div className={bem.element('week-days')}>
                {props.weekDays.map((day, dayIndex) => (
                    <span
                        key={dayIndex}
                        className={bem.element('week-days-day')}
                    >
                        {day}
                    </span>
                ))}
            </div>
            <div className={bem.element('grid')}>
                {props.monthCalendarDays.map((day, dayIndex) => (
                    <MonthDay
                        key={dayIndex}
                        openEventModal={props.openEventModal}
                        getEventsFromDate={props.getEventsFromDate}
                        openCreateModal={props.openCreateModal}
                        day={day}
                    />
                ))}
            </div>
        </div>
    );
}

export default memo(MonthGrid);
