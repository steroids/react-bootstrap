import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './DayGrid.scss';
import {Text} from '@steroidsjs/core/ui/typography';
import DayHour from './views/DayHour';

type IDayGridProps = Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate' | 'users'
> & ICalendarSystemViewProps['dayGridProps']

function DayGrid(props: IDayGridProps) {
    const bem = useBem('DayGrid');

    const renderDayHour = React.useCallback(
        (hour) => props.users.map((user, userIndex) => (
            <DayHour
                hour={hour}
                getEventsFromDate={props.getEventsFromDate}
                key={userIndex}
                user={user}
                openEditModal={props.openEditModal}
                openCreateModal={props.openCreateModal}
            />
        )),
        [props.users, props.getEventsFromDate, props.openEditModal, props.openCreateModal],
    );

    return (
        <div className={bem.block()}>
            <div className={bem.element('content')}>
                <div className={bem.element('hours-time')}>
                    {props.dayGridTwentyFourHoursArray.map((hour, hourIndex) => (
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
                        {props.users?.map((user, userIndex) => (
                            <Text
                                key={userIndex}
                                className={bem.element('header')}
                            >
                                <span className={bem.element('header-wrapper')}>
                                    <span
                                        className={bem.element('header-label')}
                                    >
                                        {user.name}
                                    </span>
                                    <span
                                        className={bem.element('header-caption')}
                                    >
                                        {user.caption}
                                    </span>
                                </span>
                            </Text>
                        ))}
                    </div>
                    <div className={bem.element('table-grid')}>
                        {props.dayGridTwentyFourHoursArray.map((hour, hourIndex) => (
                            <div
                                key={hourIndex}
                                className={bem.element('table-grid-row')}
                            >
                                {renderDayHour(hour)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default React.memo(DayGrid);
