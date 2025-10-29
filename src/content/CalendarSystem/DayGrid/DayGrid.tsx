import {memo, Fragment} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Text} from '@steroidsjs/core/ui/typography';

import './DayGrid.scss';

type IDayGridProps = Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate' | 'users'
> & ICalendarSystemViewProps['dayGridProps']

function DayGrid(props: IDayGridProps) {
    const bem = useBem('DayGrid');

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
                    <div
                        className={bem.element('table-heading')}
                        style={{
                            gridTemplateColumns: `repeat(${props.users?.length}, 200px)`,
                        }}
                    >
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
                                {props.users.map((user, userIndex) => (
                                    <Fragment key={userIndex}>
                                        {props.renderHourView({
                                            hour,
                                            getEventsFromDate: props.getEventsFromDate,
                                            user,
                                            openEditModal: props.openEditModal,
                                            openCreateModal: props.openCreateModal,
                                            currentDay: props.dayGridCurrentDay,
                                            renderEventView: props.renderEventView,
                                        })}
                                    </Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default memo(DayGrid);
