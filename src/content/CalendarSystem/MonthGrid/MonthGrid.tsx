import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Day} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './MonthGrid.scss';

const WEEK_DAYS = [
    __('Mo'),
    __('Tu'),
    __('We'),
    __('Th'),
    __('Fr'),
    __('Sa'),
    __('Su'),
];

interface IMonthGridProps {
    monthCalendar: Day[];
}

function MonthGrid(props: IMonthGridProps) {
    const bem = useBem('MonthGrid');

    return (
        <div className={bem.block()}>
            <div className={bem.element('week-days')}>
                {WEEK_DAYS.map((day, dayIndex) => (
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
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(MonthGrid);
