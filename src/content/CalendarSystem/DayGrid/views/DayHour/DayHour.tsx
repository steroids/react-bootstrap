/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendarSystemViewProps, ICalendarUser, IDay} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import _cloneDeep from 'lodash-es/cloneDeep';
import _slice from 'lodash-es/slice';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import _get from 'lodash-es/get';

import './DayHour.scss';

interface IDayHourProps extends Pick<ICalendarSystemViewProps, 'openEditModal' | 'openCreateModal' | 'getEventsFromDate'> {
    hour: string,
    user: ICalendarUser,
    currentDay: IDay,
    renderEventView: <T>(componentProps: T) => React.FunctionComponent<T>,
}

export default function DayHour(props: IDayHourProps) {
    const bem = useBem('DayHour');

    const {
        events,
    } = React.useMemo(() => {
        const eventsIds = props.user.eventsIds;

        const callingDate = new Date(props.currentDay.date);

        const timeArray = props.hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        const _events = props.getEventsFromDate(callingDate, CalendarEnum.DAY)
            .filter(event => eventsIds.includes(event.id));

        return {
            events: _events,
        };
    }, [props]);

    const handleEventClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        const eventFromHour = event.target as HTMLDivElement;
        const eventId: number = _get(eventFromHour, 'dataset.eventid');

        if (!eventId) {
            return;
        }

        const [requiredEvent] = events.filter(hourEvent => hourEvent.id === Number(eventId));

        props.openEditModal(requiredEvent);
    }, [events, props]);

    const handleOnContextMenuCreateClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        const day: IDay = _cloneDeep(props.currentDay);
        day.date.setHours(Number(convertDate(props.hour, 'HH:mm', 'H')), 0, 0, 0);
        props.openCreateModal(day);
    }, [props]);

    return (
        <div
            className={bem.element('hour', {
                moreEvents: events.length > 1,
            })}
            onClick={handleEventClick}
            onContextMenu={handleOnContextMenuCreateClick}
        >
            {events.map((event) => props.renderEventView({
                event,
            }))}
        </div>
    );
}
