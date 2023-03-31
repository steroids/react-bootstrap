import * as React from 'react';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import {IAccordionCommonViewProps, IAccordionIcon} from '@steroidsjs/core/ui/content/Accordion/Accordion';
import renderIconByType from '../../utils/renderIcon';

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

        if (typeof props.icon === 'object') {
            const icons = props.icon as IAccordionIcon;

            return (
                <>
                    {renderIconByType(icons.open, {className: bem.element('open-icon')})}
                    {renderIconByType(icons.close, {className: bem.element('close-icon')})}
                </>
            );
        }

        return renderIconByType(props.icon, {className: bem.element('custom-icon')});
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
                {props.showIcon && (
                    <div className={bem.element('icon-wrapper')}>
                        {props.icon
                            ? renderIcon()
                            : (
                                <Icon
                                    className={bem.element('icon-chevron', {
                                        active: !props.disabled && props.isShowMore,
                                    })}
                                    name="accordion-chevron"
                                />
                            )}
                    </div>
                )}
            </div>
            <div className={bem.element('content', {visible: !props.disabled && props.isShowMore})}>
                {props.children}
            </div>
        </div>
    );
}
