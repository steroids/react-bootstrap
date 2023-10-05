import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';

import './MonthGrid.scss';

interface IMonthGridProps {
    monthCalendarDays: IDay[];
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    weekDays: string[],
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
                    <div
                        key={dayIndex}
                        className={bem.element('day', {
                            outOfRange: day.outOfRange,
                            isToday: day.isToday,
                        })}
                    >
                        <div className={bem.element('day-wrapper')}>
                            <span className={bem.element('day-number')}>{day.dayNumber.toString()}</span>
                            <div className={bem.element('day-content')}>
                                {props.getEventsFromDate(day.date, CalendarEnum.MONTH)?.map((event, eventIndex) => (
                                    <span
                                        key={eventIndex}
                                        className={bem.element('day-event')}
                                        title={event.title}
                                    >
                                        <span
                                            className={bem.element('day-event-dot')}
                                            style={{backgroundColor: event.color}}
                                        />
                                        {event.title}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(MonthGrid);
