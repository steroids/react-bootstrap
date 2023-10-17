import React from 'react';
import {Badge} from '@steroidsjs/core/ui/content';
import {useBem} from '@steroidsjs/core/hooks';
import {ITaskTag} from '@steroidsjs/core/ui/content/Kanban/Kanban';

import './TaskTags.scss';

interface ITaskTagsProps {
    tags: ITaskTag[]
}

export default function TaskTags(props: ITaskTagsProps) {
    const bem = useBem('TaskTags');

    return (
        <div
            className={bem.element('wrapper')}
        >
            {props.tags.map((tag) => (
                <Badge
                    key={tag.id}
                    size="md"
                    roundingStyle="squarer"
                    message={tag.message}
                    type={tag.type}
                />
            ))}
        </div>
    );
}
