/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {
    CalendarSystemModalFields,
    IEventInitialValues,
    ICalendarSystemModalViewProps,
} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {InputField, Form, DropDownField, DateTimeField, TextField} from '@steroidsjs/core/ui/form';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import _omit from 'lodash-es/omit';
import _isEmpty from 'lodash-es/isEmpty';

export default function CalendarSystemModalView(props: ICalendarSystemModalViewProps) {
    const bem = useBem('CalendarSystemModalView');

    const eventInitialValues: IEventInitialValues = React.useMemo(() => props.eventInitialValues, [props.eventInitialValues]);

    const callOnEventSubmit = (fields: Record<CalendarSystemModalFields, string>) =>
        eventInitialValues && !props.isCreate ? props.onEventSubmit(fields, eventInitialValues) : props.onEventSubmit(fields);

    return (
        <Modal
            title={props.isCreate ? __('Новое событие') : __('Редактирование события')}
            onClose={props.onClose}
            className={bem.block()}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <Form
                className={bem.element('default-form')}
                onSubmit={(fields) => {
                    callOnEventSubmit(fields);
                    props.onClose();
                }}
                initialValues={eventInitialValues ?? null}
                submitLabel={props.isCreate ? __('Создать') : __('Сохранить')}
            >
                <div>
                    <Text
                        content={__('Наименование')}
                        className={bem.element('label')}
                    />
                    <InputField
                        attribute='title'
                        required
                        className={bem.element('name-field')}
                    />
                    <DropDownField
                        attribute='eventGroupId'
                        items={props.eventGroups}
                        outline
                        placeholder='Группа'
                        color="primary"
                        required
                        itemsContent={{
                            type: 'checkbox',
                        }}
                    />
                </div>
                <div>
                    <Text
                        content={__('Время и дата')}
                        className={bem.element('label')}
                    />
                    <DateTimeField
                        attribute='date'
                        required
                    />
                </div>
                <div>
                    <Text
                        content={__('Описание')}
                        className={bem.element('label')}
                    />
                    <TextField
                        attribute='description'
                        required
                    />
                </div>
            </Form>
        </Modal>
    );
}
