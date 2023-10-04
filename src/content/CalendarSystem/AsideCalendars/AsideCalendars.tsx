import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';

import './AsideCalendars.scss';
import {Accordion, AccordionItem} from '@steroidsjs/core/ui/content';
import {CheckboxListField} from '@steroidsjs/core/ui/form';
import {ICalendarGroups} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

interface IAsideCalendarsProps {
    calendarGroups: ICalendarGroups[]
    calendarsTitle: string;
    selectedCalendarGroupsIds: number[],
    onChangeCalendarGroupsIds: (selectedIds: number[]) => void,
}

function AsideCalendars(props: IAsideCalendarsProps) {
    const bem = useBem('AsideCalendars');

    return (
        <div className={bem.block()}>
            <Accordion>
                <AccordionItem title={props.calendarsTitle}>
                    <CheckboxListField
                        items={props.calendarGroups}
                        selectedIds={props.selectedCalendarGroupsIds}
                        onChange={(selectedIds) => props.onChangeCalendarGroupsIds(selectedIds)}

                    />
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default memo(AsideCalendars);
