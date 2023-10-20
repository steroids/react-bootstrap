import React, {useMemo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICreateOrEditTaskModalContentViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import PriorityEnum from '@steroidsjs/core/ui/content/Kanban/enums/PriorityEnum';
import {Button, DropDownField, Form, HtmlField, InputField, RadioListField} from '@steroidsjs/core/ui/form';
import {Badge} from '@steroidsjs/core/ui/content';

import TagsSelector from './views/TagsSelector';

const DEFAULT_PRIORITIES = [
    {
        id: 1,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={PriorityEnum.getLabels()[PriorityEnum.HIGH]}
            type={PriorityEnum.getColorByType()[PriorityEnum.HIGH]}
        />,
    },
    {
        id: 2,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={PriorityEnum.getLabels()[PriorityEnum.MIDDLE]}
            type={PriorityEnum.getColorByType()[PriorityEnum.MIDDLE]}
        />,
    },
    {
        id: 3,
        label: <Badge
            size="md"
            roundingStyle="squarer"
            message={PriorityEnum.getLabels()[PriorityEnum.DEFAULT]}
            type={PriorityEnum.getColorByType()[PriorityEnum.DEFAULT]}
        />,
    },
];

export default function CreateOrEditTaskModalContentView(props: ICreateOrEditTaskModalContentViewProps) {
    const bem = useBem('CreateOrEditTaskModalContentView');

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
            className={bem.block()}
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
            <div className={bem.element('content')}>
                <div className={bem.element('field')}>
                    <div className={bem.element('left')}>
                        <span className={bem.element('label')}>{__('Заголовок')}</span>
                    </div>
                    <div className={bem.element('right')}>
                        <InputField
                            className={bem.element('input')}
                            attribute="title"
                            size="md"
                            showClear
                            required
                            outline
                        />

                        <div className={bem.element('sub-right')}>
                            <span className={bem.element('label')}>{__('Переместить в')}</span>

                            <DropDownField
                                className={bem.element('input')}
                                attribute='columnId'
                                selectedIds={[props.columnId]}
                                items={columns}
                                size="md"
                                outline
                            />
                        </div>
                    </div>
                </div>

                <div className={bem.element('field')}>
                    <div className={bem.element('left')}>
                        <span className={bem.element('label')}>{__('Описание')}</span>
                    </div>
                    <div className={bem.element('right', 'column')}>
                        <InputField
                            className={bem.element('input')}
                            attribute="description"
                            size="md"
                            showClear
                        />
                    </div>
                </div>

                <div className={bem.element('field')}>
                    <div className={bem.element('left')} />
                    <div className={bem.element('right', 'column')}>
                        <HtmlField
                            attribute="fullDescription"
                            size="md"
                        />
                    </div>
                </div>

                <div className={bem.element('field', 'label-top')}>
                    <div className={bem.element('left')}>
                        <span className={bem.element('label')}>{__('Добавить теги')}</span>
                    </div>

                    <div className={bem.element('right', 'column')}>
                        <TagsSelector
                            taskTags={props.task?.tags}
                            tags={props.tags}
                        />
                    </div>
                </div>

                <div className={bem.element('field')}>
                    <div className={bem.element('left')}>
                        <span className={bem.element('label')}>{__('Исполнители')}</span>
                    </div>
                    <div className={bem.element('right')}>
                        <DropDownField
                            className={bem.element('input')}
                            attribute='assigner'
                            selectedIds={props.task?.assigner?.id && [props.task.assigner.id]}
                            items={props.assigners}
                            outline
                        />
                    </div>
                </div>

                <div className={bem.element('field', 'radio')}>
                    <div className={bem.element('left')}>
                        <span className={bem.element('label')}>{__('Приоритет')}</span>
                    </div>
                    <div className={bem.element('right')}>
                        <RadioListField
                            attribute='priority'
                            items={DEFAULT_PRIORITIES}
                            selectedIds={props.task?.priority?.id
                                ? [props.task.priority.id]
                                : PriorityEnum.getDefaultSelectedPriorityId()}
                            multiple={false}
                            orientation='horizontal'
                        />
                    </div>
                </div>

                <div className={bem.element('button')}>
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
