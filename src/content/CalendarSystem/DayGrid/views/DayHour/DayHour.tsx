import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps, ICalendarUser, IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import _cloneDeep from 'lodash-es/cloneDeep';
import useExpandClickAway from '@steroidsjs/core/ui/content/CalendarSystem/hooks/useExpandClickAway';
import _slice from 'lodash-es/slice';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';

import './DayHour.scss';

interface IDayHourProps extends Pick<ICalendarSystemViewProps, 'openEditModal' | 'openCreateModal' | 'getEventsFromDate'> {
    hour: string,
    user: ICalendarUser,
}

export default function DayHour(props: IDayHourProps) {
    const bem = useBem('DayHour');
    const {isExpanded, setIsExpanded, triggerRef: dayHourRef} = useExpandClickAway();
    const {
        events,
    } = React.useMemo(() => {
        const eventIds = props.user.eventIds;

        const timeArray = props.hour.replace(':', '').split('');

        return {
            events: [],
        };
    }, [props]);

    const renderEvent = React.useCallback((event: IEvent, eventIndex: number) => (
        <Tooltip
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
            key={eventIndex}
        >
            <div
                className={bem.element('hour-event')}
                style={{backgroundColor: event.color}}
                title={event.title}
                data-eventid={event.id}
            >
                <span className={bem.element('hour-event-title')}>
                    {event.title}
                </span>
                <span className={bem.element('hour-event-time')}>
                    {convertDate(event.date, null, 'HH:mm')}
                </span>
            </div>
        </Tooltip>
    ), [bem]);

    return (
        <div
            className={bem.element('hour')}
            ref={dayHourRef}
        >
            {events.map(renderEvent)}
        </div>
    );
}
