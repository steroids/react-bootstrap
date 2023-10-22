import React, {useMemo} from 'react';
import {ICreateOrEditTaskModalContentViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import KanbanPrioritiesEnum from '@steroidsjs/core/ui/content/Kanban/enums/KanbanPrioritiesEnum';
import {Button, DropDownField, Form, HtmlField, InputField, RadioListField} from '@steroidsjs/core/ui/form';
import {Badge} from '@steroidsjs/core/ui/content';
import {Text} from '@steroidsjs/core/ui/typography';
import TagsSelector from './views/TagsSelector';

const DEFAULT_PRIORITIES = [
    {
        id: 1,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={KanbanPrioritiesEnum.getLabels()[KanbanPrioritiesEnum.HIGH]}
            type={KanbanPrioritiesEnum.getColorByType()[KanbanPrioritiesEnum.HIGH]}
        />,
    },
    {
        id: 2,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={KanbanPrioritiesEnum.getLabels()[KanbanPrioritiesEnum.MIDDLE]}
            type={KanbanPrioritiesEnum.getColorByType()[KanbanPrioritiesEnum.MIDDLE]}
        />,
    },
    {
        id: 3,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={KanbanPrioritiesEnum.getLabels()[KanbanPrioritiesEnum.DEFAULT]}
            type={KanbanPrioritiesEnum.getColorByType()[KanbanPrioritiesEnum.DEFAULT]}
        />,
    },
];

export default function CreateOrEditTaskModalContentView(props: ICreateOrEditTaskModalContentViewProps) {
    const columns = useMemo(() => (
        props.columns.map((column) => (
            {
                id: column.id,
                label: column.title,
            }
        ))
    ), [props.columns]);

    return (
        <Form
            formId={props.formId}
            className={props.bem.element('form')}
            initialValues={props.task
                ? {
                    title: props.task.title || '',
                    description: props.task.description || '',
                    fullDescription: props.task.fullDescription || '',
                }
                : {}}
            onSubmit={(data) => {
                props.onSubmit(props.task?.id, data);
            }}
        >
            <div className={props.bem.element('form-content')}>
                <div className={props.bem.element('row')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body2'
                        content={__('Заголовок')}
                        color="light-dark"
                    />
                    <div className={props.bem.element('right')}>
                        <InputField
                            attribute="title"
                            size="md"
                            showClear
                            required
                            outline
                        />

                        <div className={props.bem.element('sub-right')}>
                            <Text
                                className={props.bem.element('label')}
                                type='body2'
                                content={__('Переместить в')}
                                color="light-dark"
                            />

                            <DropDownField
                                attribute='columnId'
                                selectedIds={[props.columnId]}
                                items={columns}
                                size="md"
                                outline
                            />
                        </div>
                    </div>
                </div>
                <div className={props.bem.element('row')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body2'
                        content={__('Описание')}
                        color="light-dark"
                    />
                    <div className={props.bem.element('right', 'column')}>
                        <InputField
                            attribute="description"
                            size="md"
                            showClear
                        />
                    </div>
                </div>
                <div className={props.bem.element('row')}>
                    <div className={props.bem.element('label')} />
                    <div className={props.bem.element('right', 'column')}>
                        <HtmlField
                            attribute="fullDescription"
                            size="md"
                        />
                    </div>
                </div>
                <div className={props.bem.element('row', 'tags-field')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body2'
                        content={__('Добавить теги')}
                        color="light-dark"
                    />

                    <div className={props.bem.element('right', 'column')}>
                        <TagsSelector
                            taskTags={props.task?.tags}
                            tags={props.tags}
                        />
                    </div>
                </div>
                <div className={props.bem.element('row')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body2'
                        content={__('Исполнители')}
                        color="light-dark"
                    />
                    <div className={props.bem.element('right')}>
                        <DropDownField
                            attribute='assigner'
                            selectedIds={props.task?.assigner?.id && [props.task.assigner.id]}
                            items={props.assigners}
                            showReset
                            outline
                        />
                    </div>
                </div>
                <div className={props.bem.element('row', 'radio')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body2'
                        content={__('Приоритет')}
                        color="light-dark"
                    />
                    <div className={props.bem.element('right')}>
                        <RadioListField
                            attribute='priority'
                            items={DEFAULT_PRIORITIES}
                            selectedIds={props.task?.priority?.id
                                ? [props.task.priority.id]
                                : KanbanPrioritiesEnum.getDefaultSelectedPriorityId()}
                            multiple={false}
                            orientation='horizontal'
                        />
                    </div>
                </div>
                <div className={props.bem.element('button')}>
                    <Button
                        type="submit"
                        label={props.submitButtonLabel}
                        size="md"
                    />
                </div>
            </div>
        </Form>
    );
}
