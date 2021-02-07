import * as React from 'react';

import Link from '@steroidsjs/core/ui/nav/Link';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITreeViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {useBem} from '@steroidsjs/core/hooks';

export default function TreeView(props: ITreeViewProps & IBemHocOutput) {
    const levelPadding = props.levelPadding || 20;

    const bem = useBem('TreeView');
    return (
        <ul className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <li
                    key={item.uniqId}
                    onClick={item.onClick}
                    className={bem(
                        bem.element('item', {
                            selected: item.isSelected,
                            opened: item.isOpened,
                            'has-items': item.hasItems,
                        }),
                        item.className
                    )}
                >
                    <Link
                        className={bem.element('item-label')}
                        style={{
                            paddingLeft: String(item.level * levelPadding) + 'px',
                        }}
                        {...item}
                    />
                </li>
            ))}
        </ul>
    );
}