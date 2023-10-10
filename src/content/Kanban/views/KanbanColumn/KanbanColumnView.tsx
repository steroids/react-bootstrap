import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IKanbanColumnViewProps} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import {Title} from '@steroidsjs/core/ui/typography';
import {Button} from '@steroidsjs/core/ui/form';

import './KanbanColumnView.scss';

export default function KanbanColumnView(props: IKanbanColumnViewProps) {
    const bem = useBem('KanbanColumnView');

    const Draggable = props.draggableComponent;
    const Droppable = props.droppableComponent;
    const {id, title, tasks} = props.column;

    return (
        <Draggable
            draggableId={`${id}`}
            index={props.columnIndex}
        >
            {(provided) => (
                <div
                    className={bem.block()}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className={bem.element('header')}
                        {...provided.dragHandleProps}
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
                        droppableId={id}
                        type="task"
                    >
                        {(prov) => (
                            <div
                                className={bem.element('content')}
                                ref={prov.innerRef}
                                {...prov.droppableProps}
                            >
                                {tasks.map((task, taskIndex) => (
                                    props.renderTask(task, taskIndex)
                                ))}
                                {prov.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className={bem.element('button')}>
                        <Button
                            size="sm"
                            color='basic'
                            icon="add"
                            block
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
