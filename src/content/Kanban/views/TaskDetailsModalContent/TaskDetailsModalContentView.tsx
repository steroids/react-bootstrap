import React, {useCallback, useMemo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Avatar, Badge} from '@steroidsjs/core/ui/content';
import {Text} from '@steroidsjs/core/ui/typography';
import {IKanbanTaskDetailsModalViewProps, ITaskTag} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import PriorityEnum from '@steroidsjs/core/ui/content/Kanban/enums/PriorityEnum';

export default function TaskDetailsModalContentView(props: IKanbanTaskDetailsModalViewProps) {
    const bem = useBem('TaskDetailsModalContentView');
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
        () => PriorityEnum.getLabels()[priority?.type || PriorityEnum.DEFAULT],
        [priority?.type],
    );
    const priorityColor = useMemo(
        () => PriorityEnum.getColorByType()[priority?.type || PriorityEnum.DEFAULT],
        [priority?.type],
    );

    return (
        <div className={bem.element('content')}>
            {description && (
                <Text
                    type="body"
                    content={description}
                    tag="p"
                />
            )}
            {tags && (
                <div
                    className={bem.element('row', 'tags')}
                >
                    {tags.map(toTags)}
                </div>
            )}

            <div className={bem.element('row')}>
                <div className={bem.element('left')}>
                    <Text
                        className={bem.element('label')}
                        type='body3'
                        content={__('Приоритет')}
                    />
                </div>
                <div className={bem.element('right')}>
                    <Badge
                        size="md"
                        roundingStyle="squarer"
                        message={priorityLabel}
                        type={priorityColor}
                    />
                </div>
            </div>

            {assigner && (
                <div className={bem.element('row')}>
                    <div className={bem.element('left')}>
                        <Text
                            className={bem.element('label')}
                            type='body3'
                            content={__('Исполнитель')}
                        />
                    </div>
                    <div className={bem.element('right')}>
                        <div
                            className={bem.element('assigner')}
                        >
                            <Avatar
                                src={assigner.avatar.src}
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
