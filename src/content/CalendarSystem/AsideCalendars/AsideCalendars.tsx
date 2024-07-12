import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Accordion, AccordionItem, Icon} from '@steroidsjs/core/ui/content';
import {Button, CheckboxListField} from '@steroidsjs/core/ui/form';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './AsideCalendars.scss';

type IAsideCalendarsProps = Pick<
    ICalendarSystemViewProps,
    'eventGroups' | 'eventGroupsTitle' | 'asideCalendarCheckboxListProps' | 'onChangeEventGroupsIds' | 'openCreateEventGroupModal'
>

function AsideCalendars(props: IAsideCalendarsProps) {
    const bem = useBem('AsideCalendars');

    return (
        <div className={bem.block()}>
            <Accordion>
                <AccordionItem title={props.eventGroupsTitle}>
                    <CheckboxListField
                        items={props.eventGroups}
                        onChange={(selectedIds) => props.onChangeEventGroupsIds(selectedIds)}
                        {...props.asideCalendarCheckboxListProps}
                    />
                    <Button
                        color='basic'
                        className={bem.element('add')}
                        onClick={props.openCreateEventGroupModal}
                        size='sm'
                    >
                        <Icon name="add_16x16" />
                    </Button>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default memo(AsideCalendars);
