/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import CalendarEnum from '@steroidsjs/core/ui/content/CalendarSystem/enums/CalendarType';
import {ICalendarSystemViewProps, IDay} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import _take from 'lodash-es/take';
import _slice from 'lodash-es/slice';
import _get from 'lodash-es/get';
import {Button} from '@steroidsjs/core/ui/form';
import _isEmpty from 'lodash-es/isEmpty';
import useExpandClickAway from '@steroidsjs/core/ui/content/CalendarSystem/hooks/useExpandClickAway';
import _cloneDeep from 'lodash-es/cloneDeep';
import {getFormattedExpandRestLabel} from '../../../../../utils/getFormattedExpandLabel';

import './MonthDay.scss';

const SIXTH_ELEMENT_INDEX = 6;

interface IMonthDayProps extends Pick<
    ICalendarSystemViewProps,
    'openEditModal' | 'openCreateModal' | 'getEventsFromDate'
> {
    day: IDay,
    renderEventView: <T>(componentProps: T) => React.FunctionComponent<T>,
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

        const day: IDay = _cloneDeep(props.day);
        day.date.setHours(0, 0, 0, 0);
        props.openCreateModal(day);
    }, [props]);

    return (
        <div
            className={bem(
                bem.block({
                    outOfRange: day.outOfRange,
                    isToday: day.isToday,
                }),
            )}
            ref={monthDayRef}
            onClick={handleEventClick}
            onContextMenu={handleOnContextMenuCreateClick}
        >
            <div className={bem.element('wrapper')}>
                <span className={bem.element('number')}>{day.dayNumber.toString()}</span>
                <div className={bem.element('content', {
                    isExpanded,
                })}
                >
                    {events.map((event) => props.renderEventView({
                        event,
                    }))}
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
