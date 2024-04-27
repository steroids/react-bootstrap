import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {formatEventTime, getProportionFromEvent, getTopMarginFromEvent} from '@steroidsjs/core/ui/content/CalendarSystem/utils/utils';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';

import './WeekEvent.scss';

interface IWeekEventProps {
    event: IEvent,
}

export default function WeekEvent({event}: IWeekEventProps) {
    const bem = useBem('WeekEvent');

    return (
        <Tooltip
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
            key={event.id}
        >
            <div
                className={bem.element('event')}
                style={{
                    backgroundColor: event.color,
                    height: `${getProportionFromEvent(event)}%`,
                    ...getTopMarginFromEvent(event),
                }}
                title={event.title}
                data-eventid={event.id}
            >
                <span className={bem.element('event-time')}>
                    {`${formatEventTime(event.startDate)} - ${formatEventTime(event.endDate)}`}
                </span>
                <span className={bem.element('event-title')}>
                    {event.title}
                </span>
            </div>
        </Tooltip>
    );
}
