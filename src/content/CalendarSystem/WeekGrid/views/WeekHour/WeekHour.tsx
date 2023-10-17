import React from 'react';
import useBem, {IBem} from '@steroidsjs/core/hooks/useBem';
import {convertDate} from '@steroidsjs/core/utils/calendar';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Button} from '@steroidsjs/core/ui/form';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';

import './WeekHour.scss';

interface IWeekHourProps {
    dayOfWeek: IDay,
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
    hour: string,
    parentBem: IBem;
}

export default function WeekHour(props: IWeekHourProps) {
    const bem = useBem('WeekHour');
    const {parentBem} = props;

    const [isExpanded, setIsExpanded] = React.useState(false);

    const events = React.useMemo(() => {
        const callingDate = new Date(props.dayOfWeek.date);

        const timeArray = props.hour.replace(':', '').split('');

        callingDate.setHours(Number(timeArray[0] + timeArray[1]), 0, 0, 0);

        return props.getEventsFromDate(callingDate, CalendarEnum.WEEK);
    }, [props]);

    const getFormattedExpandLabel = React.useCallback(() => `${__('Показать ещё')} +${events.length - 3}`, [events.length]);

    const hasOneEvent = events.length <= 1;
    const hasTwoEvents = events.length === 2;
    const hasTreeEvents = events.length >= 3;

    return (
        <div
            className={parentBem.element('hour', {
                isToday: props.dayOfWeek.isToday,
                hasOneEvent,
                hasTwoEvents,
                hasTreeEvents,
                isExpanded,
            })}
        >
            {events.map((event, eventIndex) => (
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
            ))}
            {hasTreeEvents && events.length > 3 && (
                <Button
                    link
                    className={bem.element('expand-button')}
                >
                    {getFormattedExpandLabel()}
                </Button>
            )}
        </div>
    );
}
