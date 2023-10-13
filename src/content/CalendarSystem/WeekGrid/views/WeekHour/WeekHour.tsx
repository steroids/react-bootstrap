import React from 'react';
import useBem, {IBem} from '@steroidsjs/core/hooks/useBem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Button} from '@steroidsjs/core/ui/form';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import _take from 'lodash-es/take';
import _slice from 'lodash-es/slice';
import _isEmpty from 'lodash-es/isEmpty';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import {useExpand} from '@steroidsjs/core/hooks';
import {getFormattedExpandLabel} from '../../../../../utils/getFormattedExpandLabel';

import './WeekHour.scss';

const THIRD_ELEMENT_INDEX = 4;
const THREE_ELEMENTS_IN_ARRAY = 5;

interface IWeekHourProps {
    dayOfWeek: IDay,
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    hour: string,
    parentBem: IBem;
}

export default function WeekHour(props: IWeekHourProps) {
    const bem = useBem('WeekHour');
    const {parentBem} = props;

    const {isExpanded, setIsExpanded, triggerRef: weekHourRef} = useExpand();

    const {
        eventsFromHour: events,
        restEventsFromHour: restEvents,
        hasOneEvent,
        hasTreeEvents,
        hasTwoEvents,
    } = React.useMemo(() => {
        const callingDate = new Date(props.dayOfWeek.date);
        let restEventsFromHour: IEvent[];

        const timeArray = props.hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        let eventsFromHour = props.getEventsFromDate(callingDate, CalendarEnum.WEEK);

        const hourHasOneEvent = eventsFromHour.length <= 1;
        const hourHasTwoEvents = eventsFromHour.length === 2;
        const hourHasTreeEvents = eventsFromHour.length >= 3;

        if (hourHasTreeEvents) {
            restEventsFromHour = _slice([...eventsFromHour], THIRD_ELEMENT_INDEX);
            eventsFromHour = _take([...eventsFromHour], THREE_ELEMENTS_IN_ARRAY);
        }

        return {
            eventsFromHour,
            restEventsFromHour: restEventsFromHour ?? [],
            hasOneEvent: hourHasOneEvent,
            hasTwoEvents: hourHasTwoEvents,
            hasTreeEvents: hourHasTreeEvents,
        };
    }, [props]);

    const renderEvent = React.useCallback((event: IEvent, eventIndex: number) => (
        <Tooltip
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
        >
            <div
                key={eventIndex}
                className={parentBem.element('hour-event')}
                style={{backgroundColor: event.color}}
                title={event.title}
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

    const formattedExpandLabel = React.useMemo(() => getFormattedExpandLabel(restEvents), [restEvents]);

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
        >
            {events.map(renderEvent)}
            {isExpanded && !_isEmpty(restEvents) && restEvents.map(renderEvent)}
            {hasTreeEvents && !isExpanded && (
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
