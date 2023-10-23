/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import useBem, {IBem} from '@steroidsjs/core/hooks/useBem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Button} from '@steroidsjs/core/ui/form';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import _take from 'lodash-es/take';
import _slice from 'lodash-es/slice';
import _isEmpty from 'lodash-es/isEmpty';
import _get from 'lodash-es/get';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import useExpandClickAway from '@steroidsjs/core/ui/content/CalendarSystem/hooks/useExpandClickAway';
import {getFormattedExpandRestLabel} from '../../../../../utils/getFormattedExpandLabel';

import './WeekHour.scss';

const FOURTH_ELEMENT_INDEX = 3;
const THREE_ELEMENTS_IN_ARRAY = 3;

interface IWeekHourProps {
    dayOfWeek: IDay,
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    hour: string,
    parentBem: IBem;
    openEventModal: (event: IEvent) => void;
}

export default function WeekHour(props: IWeekHourProps) {
    const bem = useBem('WeekHour');
    const {parentBem} = props;

    const {isExpanded, setIsExpanded, triggerRef: weekHourRef} = useExpandClickAway();

    const {
        eventsFromHour: events,
        restEventsFromHour: restEvents,
        hasOneEvent,
        hasTwoEvents,
        hasTreeEvents,
        hasMoreThanFourEvents,
    } = React.useMemo(() => {
        const callingDate = new Date(props.dayOfWeek.date);
        let restEventsFromHour: IEvent[];

        const timeArray = props.hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        let events = props.getEventsFromDate(callingDate, CalendarEnum.WEEK);

        const hasOneEvent = events.length === 1;
        const hasTwoEvents = events.length === 2;
        const hasMoreThanTreeEvents = events.length >= 3;
        const hasMoreThanFourEvents = events.length > 3;

        if (hasMoreThanFourEvents) {
            restEventsFromHour = _slice([...events], FOURTH_ELEMENT_INDEX);
            events = _take([...events], THREE_ELEMENTS_IN_ARRAY);
        }

        return {
            eventsFromHour: events,
            restEventsFromHour: restEventsFromHour ?? [],
            hasOneEvent,
            hasTwoEvents,
            hasTreeEvents: hasMoreThanTreeEvents,
            hasMoreThanFourEvents,
        };
    }, [props]);

    const renderEvent = React.useCallback((event: IEvent, eventIndex: number) => (
        <Tooltip
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
        >
            <div
                key={event.id}
                className={parentBem.element('hour-event')}
                style={{backgroundColor: event.color}}
                title={event.title}
                data-eventid={event.id}
            >
                <span className={parentBem.element('hour-event-title')}>
                    {event.title}
                </span>
                <span className={parentBem.element('hour-event-time')}>
                    {convertDate(event.date, null, 'HH:mm')}
                </span>
            </div>
        </Tooltip>
    ), [bem, parentBem]);

    const formattedExpandLabel = React.useMemo(() => getFormattedExpandRestLabel(restEvents), [restEvents]);

    const handleHourClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        const eventFromHour = event.target as HTMLDivElement;
        const eventId: number = _get(eventFromHour, 'dataset.eventid');

        if (!eventId) {
            return;
        }

        const [requiredEvent] = events.filter(hourEvent => hourEvent.id === Number(eventId));

        props.openEventModal(requiredEvent);
    }, [events, props]);

    return (
        <div
            className={parentBem.element('hour', {
                isToday: props.dayOfWeek.isToday,
                hasOneEvent,
                hasTwoEvents,
                hasTreeEvents,
                isExpanded,
            })}
            ref={weekHourRef}
            onClick={handleHourClick}
        >
            {events.map(renderEvent)}
            {isExpanded && !_isEmpty(restEvents) && restEvents.map(renderEvent)}
            {hasMoreThanFourEvents && !isExpanded && (
                <Button
                    link
                    className={bem.element('expand-button')}
                    onClick={() => setIsExpanded(true)}
                >
                    {formattedExpandLabel}
                </Button>
            )}
        </div>
    );
}
