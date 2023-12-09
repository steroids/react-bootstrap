import React, {useMemo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ITreeItemViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {Icon} from '@steroidsjs/core/ui/content';
import renderIcon from '../../utils/renderIcon';

const WITHOUT_PADDING = 0;
const PADDING_WITH_ICON = 0;
const PADDING_WITHOUT_ICON = 24;

export default function TreeItemView(props: ITreeItemViewProps) {
    const bem = useBem('TreeItemView');

    const paddingBasedOnIcon = useMemo(() => {
        if (!props.showIcon) {
            return WITHOUT_PADDING;
        }

        return props.item.hasItems ? PADDING_WITH_ICON : PADDING_WITHOUT_ICON;
    }, [props.item.hasItems, props.showIcon]);

    const onExpandProps = useMemo(() => ({
        onClick: props.item.onClick,
        onKeyDown: (e) => e.key === 'Enter' && props.item.onClick(e),
        role: 'button',
        tabIndex: 0,
    }), [props.item]);

    const renderExpandIcon = React.useCallback(() => (
        props.customIcon
            ? renderIcon(props.customIcon, {
                className: bem.element('custom-icon', {
                    opened: props.item.isOpened,
                }),
                ...(props.hasIconExpandOnly && onExpandProps),
            })
            : (
                <Icon
                    name='expand_right'
                    className={bem.element('icon', {
                        opened: props.item.isOpened,
                    })}
                    {...(props.hasIconExpandOnly && onExpandProps)}
                />
            )
    ), [bem, onExpandProps, props.customIcon, props.hasIconExpandOnly, props.item.isOpened]);

    return (
        <div
            key={props.item.uniqueId}
            className={bem(bem.block({
                selected: props.item.isSelected,
                opened: props.item.isOpened,
                'has-items': props.item.hasItems,
                'has-icon': props.showIcon,
                level: props.item.level,
                disabled: props.item.disabled,
            }), props.className)}
            style={{
                paddingLeft: `${props.item.level * props.levelPadding + paddingBasedOnIcon}px`,
            }}
            {...(!props.hasIconExpandOnly && onExpandProps)}
        >
            {props.showIcon && props.item.hasItems && renderExpandIcon()}
            <div className={bem.element('item')}>
                {props.children}
            </div>
        </div>
    );
}
