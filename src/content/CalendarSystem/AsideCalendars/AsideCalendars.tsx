import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICalendar} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './AsideCalendars.scss';
import {Accordion, AccordionItem} from '@steroidsjs/core/ui/content';
import {CheckboxListField} from '@steroidsjs/core/ui/form';

interface IAsideCalendarsProps {
    calendars: ICalendar[]
    calendarsTitle: string;
}

function AsideCalendars(props: IAsideCalendarsProps) {
    const bem = useBem('AsideCalendars');

    return (
        <div className={bem.block()}>
            <Accordion>
                <AccordionItem title={props.calendarsTitle}>
                    <CheckboxListField items={props.calendars} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default memo(AsideCalendars);