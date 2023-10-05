import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {HOURS, IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import WeekHour from './views/WeekHour';

import './WeekGrid.scss';

interface IWeekGridProps {
    onClickHour: () => void,
    currentWeekDays: IDay[]
    getEventsFromDate: (dateFromDay: Date, isMonth: boolean) => IEvent[],
}

function WeekGrid(props: IWeekGridProps) {
    const bem = useBem('WeekGrid');

    const {currentWeekDays, onClickHour, getEventsFromDate} = props;

    const renderWeekHours = React.useCallback(
        (hour) => currentWeekDays.map((dayOfWeek, dayOfWeekIndex) => (
            <WeekHour
                parentBem={bem}
                hour={hour}
                getEventsFromDate={getEventsFromDate}
                key={dayOfWeekIndex}
                dayOfWeek={dayOfWeek}
            />
        )),
        [bem, currentWeekDays, getEventsFromDate],
    );

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
                    <div className={bem.element('table-heading')}>
                        {currentWeekDays.map((weekDay, weekDayIndex) => (
                            <Text
                                key={weekDayIndex}
                                className={bem.element('day', {
                                    isToday: weekDay.isToday,
                                })}
                            >
                                <span className={bem.element('day-wrapper')}>
                                    {weekDay.formattedDisplay}
                                </span>
                            </Text>
                        ))}
                    </div>
                    <div className={bem.element('table-grid')}>
                        {HOURS.map((hour, hourIndex) => (
                            <div
                                key={hourIndex}
                                className={bem.element('table-grid-row')}
                            >
                                {renderWeekHours(hour)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(WeekGrid);
