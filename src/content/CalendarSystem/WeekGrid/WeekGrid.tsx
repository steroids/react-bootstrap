import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import React from 'react';

import './WeekGrid.scss';

type IWeekGridProps = Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate'
> & ICalendarSystemViewProps['weekGridProps']

function WeekGrid(props: IWeekGridProps) {
    const bem = useBem('WeekGrid');

    const {weekGridCurrentWeekDays} = props;

    const renderWeekHours = React.useCallback(
        (hour) => weekGridCurrentWeekDays.map((dayOfWeek, dayOfWeekIndex) => (
            <React.Fragment key={dayOfWeekIndex}>
                {props.renderHourView({
                    openEditModal: props.openEditModal,
                    openCreateModal: props.openCreateModal,
                    getEventsFromDate: props.getEventsFromDate,
                    renderEventView: props.renderEventView,
                    dayOfWeek,
                    hour,
                })}
            </React.Fragment>
        )),
        [weekGridCurrentWeekDays, props],
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
