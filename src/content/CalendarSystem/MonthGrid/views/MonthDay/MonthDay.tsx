/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import {IDay, IEvent} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import Tooltip from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import _take from 'lodash-es/take';
import _slice from 'lodash-es/slice';
import {Button} from '@steroidsjs/core/ui/form';
import _isEmpty from 'lodash-es/isEmpty';
import useExpandClickAway from '@steroidsjs/core/ui/content/CalendarSystem/hooks/useExpandClickAway';
import {getFormattedExpandRestLabel} from '../../../../../utils/getFormattedExpandLabel';

import './MonthDay.scss';

const SIXTH_ELEMENT_INDEX = 6;
const SIX_ELEMENTS_IN_ARRAY = 6;

interface IMonthDayProps {
    day: IDay;
    getEventsFromDate: (dateFromDay: Date, currentCalendarType: CalendarEnum) => IEvent[];
}

export default function MonthDay(props: IMonthDayProps) {
    const bem = useBem('MonthDay');

    const {day, getEventsFromDate} = props;

    const {isExpanded, setIsExpanded, triggerRef: monthDayRef} = useExpandClickAway();

    const {
        events,
        hasSixEvents,
    } = React.useMemo(() => {
        const callingDate = new Date(props.day.date);

        const events = getEventsFromDate(callingDate, CalendarEnum.MONTH);

        const dayHasMoreThanSixEvents = events.length > 6;

        return {
            events,
            hasSixEvents: dayHasMoreThanSixEvents,
        };
    }, [getEventsFromDate, props.day.date]);

    const formattedExpandLabel = React.useMemo(() => getFormattedExpandRestLabel(
        _slice([...events], SIXTH_ELEMENT_INDEX),
    ), [events]);

    const renderEvent = React.useCallback((event: IEvent, eventIndex: number) => (
        <Tooltip
            key={eventIndex}
            position='rightBottom'
            content={event.title}
            className={bem.element('tooltip')}
        >
            <span
                key={eventIndex}
                className={bem.element('event')}
            >
                <span
                    className={bem.element('event-dot')}
                    style={{backgroundColor: event.color}}
                />
                {event.title}
            </span>
        </Tooltip>
    ), [bem]);

    return (
        <div
            className={bem(
                bem.block({
                    outOfRange: day.outOfRange,
                    isToday: day.isToday,
                }),
            )}
            ref={monthDayRef}
        >
            <div className={bem.element('wrapper')}>
                <span className={bem.element('number')}>{day.dayNumber.toString()}</span>
                <div className={bem.element('content', {
                    isExpanded,
                })}
                >
                    {events.map(renderEvent)}
                    {hasSixEvents && !isExpanded && (
                        <Button
                            link
                            className={bem.element('expand-button')}
                            onClick={() => setIsExpanded(true)}
                        >
                            {formattedExpandLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
