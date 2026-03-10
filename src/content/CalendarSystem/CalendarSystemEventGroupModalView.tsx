import {useBem} from '@steroidsjs/core/hooks';
import {CalendarSystemEventGroupModalViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {InputField, Form} from '@steroidsjs/core/ui/form';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {Text} from '@steroidsjs/core/ui/typography';
import React from 'react';

export default function CalendarSystemEventGroupModalView(props: CalendarSystemEventGroupModalViewProps) {
    const bem = useBem('CalendarSystemEventGroupModalView');

    return (
        <Modal
            title={props.isCreate ? __('Новая группа') : __('Редактирование группы')}
            onClose={props.onClose}
            className={bem.block()}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <Form
                className={bem.element('form')}
                onSubmit={(fields) => {
                    props.onEventGroupSubmit(fields);
                    props.onClose();
                }}
                submitLabel={props.isCreate ? __('Создать') : __('Сохранить')}
                initialValues={props.eventGroupInitialValues}
            >
                <div>
                    <Text
                        className={bem.element('label')}
                        content={__('Имя')}
                    />
                    <InputField
                        attribute='label'
                        required
                        className={bem.element('name-field')}
                    />
                </div>
                <div>
                    <Text
                        className={bem.element('label')}
                        content={__('Выбор цвета')}
                    />
                    <InputField
                        type='color'
                        required
                        attribute='color'
                    />
                </div>
            </Form>
        </Modal>
    );
}
