/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import {ICalendarSystemViewProps, IDay} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import _take from 'lodash-es/take';
import _slice from 'lodash-es/slice';
import _isEmpty from 'lodash-es/isEmpty';
import _get from 'lodash-es/get';
import _cloneDeep from 'lodash-es/cloneDeep';

import './WeekHour.scss';

interface IWeekHourProps extends Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate'
> {
    dayOfWeek: IDay,
    hour: string,
    renderEventView: (componentProps: any) => JSX.Element,
}

export default function WeekHour(props: IWeekHourProps) {
    const bem = useBem('WeekHour');

    const {
        events,
    } = React.useMemo(() => {
        const callingDate = new Date(props.dayOfWeek.date);

        const timeArray = props.hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        const events = props.getEventsFromDate(callingDate, CalendarEnum.WEEK);

        return {
            events,
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

        const day: IDay = _cloneDeep(props.dayOfWeek);
        day.date.setHours(Number(convertDate(props.hour, 'HH:mm', 'H')), 0, 0, 0);
        props.openCreateModal(day);
    }, [props]);

    return (
        <div
            className={bem.element('hour', {
                isToday: props.dayOfWeek.isToday,
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
