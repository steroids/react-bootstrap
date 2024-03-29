import React, {useCallback, useMemo} from 'react';
import {Avatar, Badge} from '@steroidsjs/core/ui/content';
import {Text} from '@steroidsjs/core/ui/typography';
import {IKanbanTaskDetailsModalViewProps, ITaskTag} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import KanbanPrioritiesEnum from '@steroidsjs/core/ui/content/Kanban/enums/KanbanPrioritiesEnum';

export default function TaskDetailsModalContentView(props: IKanbanTaskDetailsModalViewProps) {
    const {tags, priority, description, assigner} = props.task;

    const toTags = useCallback((tag: ITaskTag) => (
        <Badge
            key={tag.id}
            size="md"
            roundingStyle="squarer"
            message={tag.message}
            type={tag.type}
        />
    ), []);

    const priorityLabel = useMemo(
        () => KanbanPrioritiesEnum.getLabel(priority?.type),
        [priority?.type],
    );
    const priorityColor = useMemo(
        () => KanbanPrioritiesEnum.getColorByType(priority?.type),
        [priority?.type],
    );

    return (
        <div className={props.bem.element('content')}>
            {description && (
                <Text
                    type="body"
                    content={description}
                    tag="p"
                />
            )}
            {!!tags?.length && (
                <div
                    className={props.bem.element('row', 'tags')}
                >
                    {tags.map(toTags)}
                </div>
            )}
            <div className={props.bem.element('row')}>
                <Text
                    className={props.bem.element('label')}
                    type='body3'
                    content={__('Приоритет')}
                    color="light-dark"
                />
                <div className={props.bem.element('data')}>
                    <Badge
                        size="md"
                        roundingStyle="squarer"
                        message={priorityLabel}
                        type={priorityColor}
                    />
                </div>
            </div>
            {assigner && (
                <div className={props.bem.element('row')}>
                    <Text
                        className={props.bem.element('label')}
                        type='body3'
                        content={__('Исполнитель')}
                        color="light-dark"
                    />
                    <div className={props.bem.element('data')}>
                        <div className={props.bem.element('assigner')}>
                            <Avatar
                                src={assigner.avatar?.src}
                                title={assigner.firstName}
                                size='sm'
                            />
                            <Text
                                type="body"
                                content={`${assigner.firstName || ''} ${assigner.lastName || ''}`}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
