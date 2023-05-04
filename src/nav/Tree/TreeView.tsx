import * as React from 'react';

import Link from '@steroidsjs/core/ui/nav/Link';

import {ITreeViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {useBem} from '@steroidsjs/core/hooks';

export default function TreeView(props: ITreeViewProps) {
    const levelPadding = props.levelPadding || 20;

    const bem = useBem('TreeView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <div
                    key={item.uniqId}
                    onClick={item.onClick}
                    onKeyPress={item.onClick}
                    className={bem(
                        bem.element('item', {
                            selected: item.isSelected,
                            opened: item.isOpened,
                            'has-items': item.hasItems,
                        }),
                        item.className,
                    )}
                    role='button'
                    tabIndex={0}
                >
                    <Link
                        className={bem.element('item-label')}
                        style={{
                            paddingLeft: String(item.level * levelPadding) + 'px',
                        }}
                        {...item}
                    />
                </div>
            ))}
        </div>
    );
}
