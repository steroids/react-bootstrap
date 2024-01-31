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
            onClick: (e) => {
                props.item.onClick(e);

                if (!props.hasIconExpandOnly && props.onNestedItemClick) {
                    props.onNestedItemClick();
                }
            },
            onKeyDown: (e) => e.key === 'Enter' && props.item.onClick(e),
            role: 'button',
            tabIndex: 0,
        }
    ), [props]);

    return (
        <div
            key={props.item.uniqueId}
            className={bem(bem.block({
                selected: props.item.isSelected,
                opened: props.item.isOpened,
                'has-items': !props.hasIconExpandOnly && (props.item.hasItems || props.hideIcon),
                level: props.item.level,
                disabled: props.item.disabled,
                'hide-icon': props.hideIcon,
                'without-pointer-on-label': props.hasIconExpandOnly && props.withoutPointerOnLabel,
            }), props.className)}
            style={{
                paddingLeft: !props.hideIcon && `${props.item.level * props.levelPadding + paddingBasedOnIcon}px`,
            }}
            {...(!props.hasIconExpandOnly && onExpandProps)}
        >
            {props.item.hasItems && !props.hideIcon && (
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
