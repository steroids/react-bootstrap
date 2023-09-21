import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {HOURS, IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './WeekGrid.scss';

interface IWeekGridProps {
    onClickHour: () => void,
    currentWeek: IDay[]
    getEventsFromDate: (dateFromDay: Date, isMonth: boolean) => IEvent[],
}

function WeekGrid(props: IWeekGridProps) {
    const bem = useBem('WeekGrid');

    const {currentWeek, onClickHour, getEventsFromDate} = props;

    const renderHours = (date: Date, weekDayIndex: number) => HOURS.map((hour, hourIndex) => {
        const callingDate = new Date(date);

        const timeArray = hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        const events = getEventsFromDate(callingDate, false);

        return (
            <div
                key={hourIndex}
                className={bem.element('hour')}
                data-weekday={weekDayIndex}
                data-hour={hourIndex}
            >
                {events.map((event, eventIndex) => <div key={eventIndex}>{event.title}</div>)}
            </div>
        );
    });

    return (
        <div className={bem.block()}>
            <div className={bem.element('content')}>
                <div className={bem.element('hours-time')}>
                    {HOURS.map((hour, hourIndex) => (
                        <div
                            key={hourIndex}
                            className={bem.element('hours-time-item')}
                        >
                            {hour}
                        </div>
                    ))}
                </div>
                <div className={bem.element('table')}>
                    {currentWeek.map((weekDay, weekDayIndex) => (
                        <div
                            key={weekDayIndex}
                            className={bem.element('column', {
                                isToday: weekDay.isToday,
                            })}
                            onClick={onClickHour}
                        >
                            <Text className={bem.element('day')}>
                                <span className={bem.element('day-wrapper')}>
                                    {weekDay.formattedDisplay}
                                </span>
                            </Text>
                            <div
                                key={weekDay.dayNumber}
                                className={bem.element('day-hours')}
                            >
                                {renderHours(weekDay.date, weekDayIndex)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(WeekGrid);
