import useBem from '@steroidsjs/core/hooks/useBem';
import {Accordion, AccordionItem, Icon} from '@steroidsjs/core/ui/content';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Button, CheckboxListField, Form} from '@steroidsjs/core/ui/form';
import React, {memo} from 'react';

import './AsideCalendars.scss';

type IAsideCalendarsProps = Pick<
    ICalendarSystemViewProps,
    'eventGroups'
    | 'eventGroupsTitle'
    | 'asideCalendarCheckboxListProps'
    | 'onChangeEventGroupsIds'
    | 'openCreateEventGroupModal'
    | 'canAddedEventGroups'
>

const EVENT_GROUPS_FORM_ID = 'CalendarSystemEventGroupsForm';

function AsideCalendars(props: IAsideCalendarsProps) {
    const bem = useBem('AsideCalendars');

    return (
        <div className={bem.block()}>
            <Accordion>
                <AccordionItem
                    isShowMore
                    title={props.eventGroupsTitle}
                >
                    <Form
                        formId={EVENT_GROUPS_FORM_ID}
                        initialValues={{
                            eventGroups: props.eventGroups.map(eventGroup => eventGroup.id),
                        }}
                        useRedux
                    >
                        <CheckboxListField
                            attribute='eventGroups'
                            items={props.eventGroups}
                            onChange={(selectedIds) => props.onChangeEventGroupsIds(selectedIds)}
                            {...props.asideCalendarCheckboxListProps}
                        />
                    </Form>
                    {props.canAddedEventGroups && (
                        <Button
                            color='basic'
                            className={bem.element('add')}
                            onClick={props.openCreateEventGroupModal}
                            size='sm'
                        >
                            <Icon name="add_16x16" />
                        </Button>
                    )}
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default memo(AsideCalendars);
