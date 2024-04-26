import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {formatEventTime, getProportionFromEvent} from '@steroidsjs/core/ui/content/CalendarSystem/utils/utils';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';

import './DayEvent.scss';

interface IDayEventProps {
    event: IEvent,
}

export default function DayEvent({event}: IDayEventProps) {
    const bem = useBem('DayEvent');

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
                    height: `${100 * getProportionFromEvent(event)}%`,
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
