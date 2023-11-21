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
import {useDispatch} from '@steroidsjs/core/hooks';
import {formReset, formSetErrors} from '@steroidsjs/core/actions/form';

const ADD_EVENT_FORM_ID = 'AddEventForm';

export default function CalendarSystemModalView(props: ICalendarSystemModalViewProps) {
    const bem = useBem('CalendarSystemModalView');
    const dispatch = useDispatch();

    const eventInitialValues: IEventInitialValues = React.useMemo(() => props.eventInitialValues, [props.eventInitialValues]);

    const callOnEventSubmit = (fields: Record<CalendarSystemModalFields, string>) =>
        eventInitialValues && !props.isCreate ? props.onEventSubmit(fields, eventInitialValues) : props.onEventSubmit(fields);

    const onCloseModal = React.useCallback(() => {
        props.onClose();
        dispatch(formSetErrors(ADD_EVENT_FORM_ID, {}));
    }, []);

    return (
        <Modal
            title={props.isCreate ? __('Новое событие') : __('Редактирование события')}
            onClose={onCloseModal}
            className={bem.block()}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <Form
                className={bem.element('default-form')}
                formId={ADD_EVENT_FORM_ID}
                onBeforeSubmit={(data) => {
                    if (!data.eventGroupId) {
                        dispatch(formSetErrors(ADD_EVENT_FORM_ID, {
                            eventGroupId: [__('Поле обязательно для заполнения')],
                        }));
                        return false;
                    }
                    return data;
                }}
                onSubmit={(fields) => {
                    callOnEventSubmit(fields);
                    onCloseModal();
                }}
                initialValues={eventInitialValues ?? null}
                submitLabel={props.isCreate ? __('Создать') : __('Сохранить')}
                useRedux
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
