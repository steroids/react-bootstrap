import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IKanbanColumnViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import {Title} from '@steroidsjs/core/ui/typography';
import {Button} from '@steroidsjs/core/ui/form';

export default function KanbanColumnView(props: IKanbanColumnViewProps) {
    const bem = useBem('KanbanColumnView');

    const Draggable = props.draggableComponent;
    const Droppable = props.droppableComponent;
    const {id, title, tasks} = props.column;

    return (
        <Draggable
            draggableId={id.toString()}
            index={props.columnIndex}
        >
            {(providedDraggable) => (
                <div
                    className={bem.block()}
                    {...providedDraggable.draggableProps}
                    ref={providedDraggable.innerRef}
                >
                    <div
                        className={bem.element('header')}
                        {...providedDraggable.dragHandleProps}
                    >
                        <Title
                            className={bem.element('title')}
                            content={title}
                            type='h3'
                        >
                            <span className={bem.element('tasks-count')}>
                                {tasks.length}
                            </span>
                        </Title>
                    </div>

                    <Droppable
                        droppableId={id.toString()}
                        type="task"
                    >
                        {(providedDroppable) => (
                            <div
                                className={bem.element('content')}
                                ref={providedDroppable.innerRef}
                                {...providedDroppable.droppableProps}
                            >
                                {tasks.map((task, taskIndex) => (
                                    props.renderTask(task, props.column.id, taskIndex)
                                ))}
                                {providedDroppable.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className={bem.element('button')}>
                        <Button
                            size="sm"
                            color='basic'
                            icon="add"
                            onClick={() => props.onOpenCreateTaskModal(props.column.id)}
                            block
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
