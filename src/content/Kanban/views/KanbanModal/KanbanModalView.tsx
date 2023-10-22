import React, {useCallback} from 'react';
import Modal from '@steroidsjs/core/ui/modal/Modal/Modal';
import {IKanbanModalViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import {KanbanModalTypeEnum} from '@steroidsjs/core/ui/content/Kanban/enums';
import {useBem} from '@steroidsjs/core/hooks';
import CreateOrEditTaskModalContent from './views/CreateOrEditTaskModalContent';
import TaskDetailsModalContent from './views/TaskDetailsModalContent';

export default function KanbanModalView(props: IKanbanModalViewProps) {
    const bem = useBem('KanbanModalView');

    const renderModalContent = useCallback((modalType: KanbanModalTypeEnum) => {
        switch (modalType) {
            case KanbanModalTypeEnum.CREATE:
                return (
                    <CreateOrEditTaskModalContent
                        bem={bem}
                        formId={props.formId}
                        columns={props.columns}
                        columnId={props.columnId}
                        tags={props.tags}
                        assigners={props.assigners}
                        submitButtonLabel={__('Создать')}
                        onSubmit={props.onSubmit}
                    />
                );
            case KanbanModalTypeEnum.DETAILS:
                return (
                    <TaskDetailsModalContent
                        bem={bem}
                        task={props.task}
                    />
                );
            case KanbanModalTypeEnum.EDIT:
                return (
                    <CreateOrEditTaskModalContent
                        bem={bem}
                        formId={props.formId}
                        task={props.task}
                        columns={props.columns}
                        columnId={props.columnId}
                        tags={props.tags}
                        assigners={props.assigners}
                        submitButtonLabel={__('Сохранить')}
                        onSubmit={props.onSubmit}
                    />
                );
            default:
                return null;
        }
    }, [bem, props.assigners, props.columnId, props.columns, props.formId, props.onSubmit, props.tags, props.task]);

    return (
        <Modal
            className={bem.block()}
            title={props.title}
            onClose={props.onClose}
            size="lg"
            buttons={props.buttons}
        >
            {renderModalContent(props.modalType)}
        </Modal>
    );
}
