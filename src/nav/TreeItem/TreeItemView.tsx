import * as React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ITreeItemViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {Icon} from '@steroidsjs/core/ui/content';
import {useMemo} from 'react';

const PADDING_WITH_ICON = 0;
const PADDING_WITHOUT_ICON = 24;

export default function TreeItemView(props: ITreeItemViewProps) {
    const bem = useBem('TreeItemView');

    const paddingBasedOnIcon = props.item.hasItems ? PADDING_WITH_ICON : PADDING_WITHOUT_ICON;

    const onExpandProps = useMemo(() => (
        {
            onClick: props.item.onClick,
            onKeyDown: (e) => e.key === 'Enter' && props.item.onClick(e),
            role: 'button',
            tabIndex: 0,
        }
    ), [props.item]);

    return (
        <div
            key={props.item.uniqueId}
            className={bem(bem.block({
                selected: props.item.isSelected,
                opened: props.item.isOpened,
                'has-items': props.item.hasItems,
                level: props.item.level,
                disabled: props.item.disabled,
            }), props.className)}
            style={{
                paddingLeft: `${props.item.level * props.levelPadding + paddingBasedOnIcon}px`,
            }}
            {...(!props.hasIconExpandOnly && onExpandProps)}
        >
            {props.item.hasItems && (
                <Icon
                    name='expand_right'
                    className={bem.element('icon', {
                        opened: props.item.isOpened,
                    })}
                    {...(props.hasIconExpandOnly && onExpandProps)}
                />
            )}
            <div className={bem.element('item')}>
                {props.children}
            </div>
        </div>
    );
}
