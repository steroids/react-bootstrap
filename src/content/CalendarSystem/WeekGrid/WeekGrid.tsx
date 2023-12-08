import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import WeekHour from './views/WeekHour';

import './WeekGrid.scss';

interface IWeekGridProps {
    weekGridTwentyFourHoursArray: string[],
    weekGridCurrentWeekDays: IDay[]
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    openEditModal: (event: IEvent) => void,
    openCreateModal: (eventInitialDay?: IDay) => void;
}

function WeekGrid(props: IWeekGridProps) {
    const bem = useBem('WeekGrid');

    const {weekGridCurrentWeekDays, getEventsFromDate} = props;

    const renderWeekHours = React.useCallback(
        (hour) => weekGridCurrentWeekDays.map((dayOfWeek, dayOfWeekIndex) => (
            <WeekHour
                hour={hour}
                getEventsFromDate={getEventsFromDate}
                key={dayOfWeekIndex}
                dayOfWeek={dayOfWeek}
                openEditModal={props.openEditModal}
                openCreateModal={props.openCreateModal}
            />
        )),
        [weekGridCurrentWeekDays, getEventsFromDate, props.openCreateModal, props.openEditModal],
    );

    return (
        <div className={bem.block()}>
            <div className={bem.element('content')}>
                <div className={bem.element('hours-time')}>
                    {props.weekGridTwentyFourHoursArray.map((hour, hourIndex) => (
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
                        {weekGridCurrentWeekDays.map((weekDay, weekDayIndex) => (
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
                        {props.weekGridTwentyFourHoursArray.map((hour, hourIndex) => (
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
