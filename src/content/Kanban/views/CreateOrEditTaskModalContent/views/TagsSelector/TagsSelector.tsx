import React, {useCallback, useMemo, useState} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITaskTag} from '@steroidsjs/core/ui/content/Kanban/Kanban';
import {DropDownField} from '@steroidsjs/core/ui/form';
import TaskTags from '../../../TaskTags';
import './TagsSelector.scss';

interface ITagsSelectorProps {
    taskTags?: ITaskTag[];
    tags?: ITaskTag[];
}

const getSelectedTagsIds = (tags: ITaskTag[]) => tags.map((tag) => tag.id);

export default function TagsSelector(props: ITagsSelectorProps) {
    const bem = useBem('TagsSelector');

    const [selectedTags, setSelectedTags] = useState(props.taskTags || []);

    const tagsList = useMemo(() => (
        props.tags.map((tag) => (
            {
                id: tag.id,
                label: tag.message,
                contentType: 'icon',
                contentSrc: <div className={bem.element('tag-color', tag.type)} />,
            }
        ))
    ), [bem, props.tags]);

    const onTagSelect = useCallback((args) => {
        const filteredTags = props.tags.filter((tag) => args.includes(tag.id));
        setSelectedTags(filteredTags);
    }, [props.tags]);

    const onTagRemove = useCallback((id: number) => {
        const filteredTags = selectedTags.filter((tag) => tag.id !== id);
        setSelectedTags(filteredTags);
    }, [selectedTags]);

    return (
        <div className={bem.block()}>
            {selectedTags && (
                <TaskTags
                    tags={selectedTags}
                    showClose
                    onClose={onTagRemove}
                />
            )}
            <DropDownField
                attribute="tags"
                placeholder={__('Выберите теги')}
                multiple
                items={tagsList}
                selectedIds={getSelectedTagsIds(selectedTags)}
                autoComplete
                outline
                onChange={onTagSelect}
            />
        </div>
    );
}
