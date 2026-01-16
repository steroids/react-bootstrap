import useBem from '@steroidsjs/core/hooks/useBem';
import {IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import React from 'react';

import './MonthEvent.scss';

interface IMonthEventProps {
    event: IEvent,
}

export default function MonthEvent({event}: IMonthEventProps) {
    const bem = useBem('MonthEvent');

    return (
        <Tooltip
            key={event.id}
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
        >
            <span
                className={bem.element('event')}
                data-eventid={event.id}
            >
                <span
                    className={bem.element('event-dot')}
                    style={{backgroundColor: event.color}}
                />
                {event.title}
            </span>
        </Tooltip>
    );
}
