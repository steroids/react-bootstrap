import Modal from '@steroidsjs/core/ui/modal/Modal';
import {ICalendarSystemModalViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {InputField, Form, DropDownField, DateTimeField, TextField, Button} from '@steroidsjs/core/ui/form';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';

export default function CalendarSystemModalView(props: ICalendarSystemModalViewProps) {
    const bem = useBem('CalendarSystemModalView');

    return (
        <Modal
            title={__('Новое событие')}
            onClose={props.onClose}
            className={bem.block()}
        >
            <Form
                className={bem.element('default-form')}
                onSubmit={props.onEventCreate}
                submitLabel={__('Создать')}
            >
                <div>
                    <Text
                        content={__('Наименование')}
                        className={bem.element('label')}
                    />
                    <InputField
                        attribute='name'
                        required
                        className={bem.element('name-field')}
                    />
                    <DropDownField
                        attribute='eventGroup'
                        items={props.eventGroups}
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
