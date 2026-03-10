import {useBem} from '@steroidsjs/core/hooks';
import {IKanbanModalViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import {KanbanModalTypeEnum} from '@steroidsjs/core/ui/content/Kanban/enums';
import Modal from '@steroidsjs/core/ui/modal/Modal/Modal';
import React, {useCallback} from 'react';

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
                        createTaskEditorConfig={props.createTaskEditorConfig}
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
                        createTaskEditorConfig={props.createTaskEditorConfig}
                        submitButtonLabel={__('Сохранить')}
                        onSubmit={props.onSubmit}
                    />
                );
            default:
                return null;
        }
    }, [bem, props.assigners, props.columnId, props.columns, props.createTaskEditorConfig, props.formId, props.onSubmit, props.tags, props.task]);

    const renderModalButton = useCallback((modalType: KanbanModalTypeEnum) => modalType !== KanbanModalTypeEnum.CREATE
        ? [{
            icon: KanbanModalTypeEnum.getModalIconByType(modalType),
            onClick: props.onToggleModalType,
        }]
        : null, [props.modalType]);

    return (
        <Modal
            className={bem.block()}
            title={props.title}
            onClose={props.onClose}
            size="lg"
            buttons={renderModalButton(props.modalType)}
        >
            {renderModalContent(props.modalType)}
        </Modal>
    );
}
