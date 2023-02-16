import * as React from 'react';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import {ICollapseItemViewProps} from '@steroidsjs/core/ui/content/Collapse/CollapseItem';

export default function CollapseItemView(props: ICollapseItemViewProps) {
    const bem = useBem('CollapseItemView');

    React.useEffect(() => {
        if (props.isAccordion) {
            props.toggleAccordion(props.activeKey - 1);
        } else { props.toggleCollapse(props.activeKey - 1); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeKey]);

    return (
        <div
            className={bem(bem.block({
                disable: props.disabled,
                borderless: props.borderless,
            }), props.className)}
            style={props.style}
        >
            <div
                className={bem.element('header-container', {revert: props.iconPosition === 'left'})}
                onClick={!props.disabled
                    ? () => {
                        // eslint-disable-next-line no-unused-expressions
                        props.isAccordion
                            ? props.toggleAccordion(props.childIndex)
                            : props.toggleCollapse(props.childIndex);
                    }
                    : null}
            >
                <div className={bem.element('title-container')}>
                    <p>
                        {props.title}
                    </p>
                </div>
                <div className={bem.element('icon-wrapper', {not_visible: !props.showIcon})}>
                    {props.icon
                        ? (typeof props.icon === 'string' ? <Icon name={props.icon} /> : props.icon)
                        : (
                            <Icon
                                className={bem.element('icon', {
                                    active: !props.disabled && props.isShowMore,
                                    disable_cursor: !props.showIcon,
                                })}
                                name="chevron-down"
                            />
                        )}
                </div>
            </div>
            <div className={bem.element('content', {visible: !props.disabled && props.isShowMore})}>
                {props.children}
            </div>
        </div>
    );
}
