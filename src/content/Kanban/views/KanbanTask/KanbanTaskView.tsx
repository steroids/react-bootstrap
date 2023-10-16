import React, {memo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IKanbanTaskViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import Avatar from '@steroidsjs/core/ui/content/Avatar/Avatar';
import {Text} from '@steroidsjs/core/ui/typography';

import TaskTags from '../TaskTags';

function KanbanTaskView(props: IKanbanTaskViewProps) {
    const bem = useBem('KanbanTaskView');
    const {id, title, description, tags, assigner, status} = props.task;

    const Draggable = props.draggableComponent;

    return (
        <Draggable
            draggableId={id}
            index={props.index}
        >
            {(provided) => (
                <div
                    className={bem.block()}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className={bem.element('wrapper')}>
                        <div className={bem.element('content')}>
                            <div className={bem.element('header')}>
                                <h4
                                    className={bem.element('title')}
                                    aria-hidden="true"
                                >
                                    <span className={bem.element('task-id')}>
                                        {__(`#${id} `)}
                                    </span>
                                    {title}
                                </h4>
                            </div>
                            {description && (
                                <Text
                                    type='body2'
                                    content={description}
                                    className={bem.element('description')}
                                />
                            )}
                        </div>
                        <div className={bem.element('footer')}>
                            {tags && (<TaskTags tags={tags} />)}
                            {assigner && (
                                <div
                                    className={bem.element('assigner')}
                                >
                                    <Avatar
                                        {...assigner.avatar}
                                        size='sm'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {status && (
                        <span className={bem.element('status', !!status && `${status.type}`)} />
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default memo(KanbanTaskView);
