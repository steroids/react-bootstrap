import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {DAYS_OF_WEEK, IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './MonthGrid.scss';

interface IMonthGridProps {
    monthCalendar: IDay[];
    getEventsFromDate: (dateFromDay: Date, isMonth: boolean) => IEvent[];
}

function MonthGrid(props: IMonthGridProps) {
    const bem = useBem('MonthGrid');

    return (
        <div className={bem.block()}>
            <div className={bem.element('week-days')}>
                {DAYS_OF_WEEK.map((day, dayIndex) => (
                    <span
                        key={dayIndex}
                        className={bem.element('week-days-day')}
                    >
                        {day}
                    </span>
                ))}
            </div>
            <div className={bem.element('grid')}>
                {props.monthCalendar.map((day, dayIndex) => (
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
                                {props.getEventsFromDate(day.date, true).map((event, eventIndex) => (
                                    <span
                                        key={eventIndex}
                                        className={bem.element('day-event')}
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
