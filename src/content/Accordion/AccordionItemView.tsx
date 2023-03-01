import * as React from 'react';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import {IAccordionCommonViewProps, IAccordionIcon} from '@steroidsjs/core/ui/content/Accordion/Accordion';

export default function AccordionItemView(props: IAccordionCommonViewProps) {
    const bem = useBem('AccordionItemView');

    React.useEffect(() => {
        if (!props.toggleAccordion || !props.toggleCollapse || !props.activeKey) {
            return;
        }

        if (props.hasOneOpenItem) {
            props.toggleAccordion(props.activeKey - 1);
        } else {
            props.toggleCollapse(props.activeKey - 1);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeKey]);

    const renderIcon = React.useCallback(() => {
        if (!props.icon) {
            return null;
        }

        const openIconClassName = bem.element('open-icon');
        const closeIconClassName = bem.element('close-icon');

        if (typeof props.icon === 'object') {
            const icons = props.icon as IAccordionIcon;

            return (
                <>
                    {typeof icons.open === 'string'
                        ? (
                            <Icon
                                name={icons.open}
                                className={openIconClassName}
                            />
                        )
                        : (
                            <span className={openIconClassName}>
                                {icons.open}
                            </span>
                        )}
                    {typeof icons.close === 'string'
                        ? (
                            <Icon
                                name={icons.close}
                                className={closeIconClassName}
                            />
                        )
                        : (
                            <span className={closeIconClassName}>
                                {icons.close}
                            </span>
                        )}
                </>
            );
        }

        return typeof props.icon === 'string'
            ? <Icon name={props.icon} />
            : (
                <span className={bem.element('custom-icon')}>
                    {props.icon}
                </span>
            );
    }, [bem, props.icon]);

    const handleHeaderClick = React.useCallback(() => {
        if (props.disabled || !props.toggleAccordion || !props.toggleCollapse) {
            return;
        }

        const {toggleAccordion, toggleCollapse, hasOneOpenItem, childIndex} = props;

        if (hasOneOpenItem) {
            toggleAccordion(childIndex);
        } else {
            toggleCollapse(childIndex);
        }
    }, [props]);

    return (
        <div
            className={bem(
                bem.block({
                    disable: props.disabled,
                    [`position_${props.position}`]: !!props.position,
                    [`theme_${props.theme}`]: !!props.theme,
                    opened: !props.disabled && props.isShowMore,
                }),
                props.className,
            )}
            style={props.style}
        >
            <div
                className={bem.element('header-container')}
                onClick={handleHeaderClick}
            >
                <div className={bem.element('title-container')}>
                    <p>
                        {props.title}
                    </p>
                </div>
                <div className={bem.element('icon-wrapper')}>
                    {props.showIcon && props.icon
                        ? renderIcon()
                        : (
                            <Icon
                                className={bem.element('icon', {
                                    active: !props.disabled && props.isShowMore,
                                })}
                                name="accordion-chevron"
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