import {Badge} from '@steroidsjs/core/ui/content';
import {useBem} from '@steroidsjs/core/hooks';
import {ITaskTag} from '@steroidsjs/core/ui/content/Kanban/Kanban';

import './TaskTags.scss';

interface ITaskTagsProps {
    tags: ITaskTag[],
    showClose?: boolean,
    onClose?: (id: number) => void,
}

export default function TaskTags(props: ITaskTagsProps) {
    const bem = useBem('TaskTags');

    return (
        <div
            className={bem.block()}
        >
            {props.tags.map((tag) => (
                <Badge
                    key={tag.id}
                    size="md"
                    roundingStyle="squarer"
                    message={tag.message}
                    type={tag.type}
                    showClose={props.showClose}
                    onClose={() => props.onClose(tag.id)}
                />
            ))}
        </div>
    );
}
