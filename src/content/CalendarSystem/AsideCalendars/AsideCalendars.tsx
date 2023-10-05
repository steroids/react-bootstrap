import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Accordion, AccordionItem} from '@steroidsjs/core/ui/content';
import {CheckboxListField} from '@steroidsjs/core/ui/form';
import {IEventGroup} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './AsideCalendars.scss';

interface IAsideCalendarsProps {
    calendarGroups: IEventGroup[]
    calendarsTitle: string;
    selectedCalendarGroupsIds: number[],
    onChangeEventGroupsIds: (selectedIds: number[]) => void,
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
                        onChange={(selectedIds) => props.onChangeEventGroupsIds(selectedIds)}

                    />
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default memo(AsideCalendars);
