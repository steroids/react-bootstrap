import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';

import './WeekGrid.scss';
import {HOURS, WEEK_DAYS} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import Text from '@steroidsjs/core/ui/typography/Text/Text';

interface IWeekGridProps {
    onClickHour: () => void,
}

function WeekGrid(props: IWeekGridProps) {
    const bem = useBem('WeekGrid');

    const renderHours = (weekDayIndex) => HOURS.map((_, hourIndex) => (
        <div
            key={hourIndex}
            className={bem.element('hour')}
            data-weekday={weekDayIndex}
            data-hour={hourIndex}
        />
    ));

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
                    {WEEK_DAYS.map((weekDay, weekDayIndex) => (
                        <div
                            key={weekDayIndex}
                            className={bem.element('column')}
                            onClick={props.onClickHour}
                        >
                            <Text className={bem.element('day')}>
                                {weekDay}
                            </Text>
                            <div
                                key={weekDay}
                                className={bem.element('day-hours')}
                            >
                                {renderHours(weekDayIndex)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(WeekGrid);
