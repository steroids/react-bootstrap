import * as React from 'react';
import Link from '@steroidsjs/core/ui/nav/Link';
import {ITreeViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {useBem} from '@steroidsjs/core/hooks';
import TreeItemView from '../TreeItem/TreeItemView';

export default function TreeView(props: ITreeViewProps) {
    const bem = useBem('TreeView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <TreeItemView
                    key={item.uniqueId}
                    item={item}
                    levelPadding={props.levelPadding}
                    showIcon={props.showIcon}
                    className={bem.element('item')}
                >
                    <Link
                        className={bem.element('item-label')}
                        {...item}
                    />
                </TreeItemView>
            ))}
        </div>
    );
}
