import * as React from 'react';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import {IAccordionCommonViewProps} from '@steroidsjs/core/ui/content/Accordion/Accordion';

export default function AccordionItemView(props: IAccordionCommonViewProps) {
    const bem = useBem('AccordionItemView');

    React.useEffect(() => {
        props.toggleAccordion(props.activeKey - 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeKey]);

    return (
        <div
            className={bem(bem.block({
                disable: props.disabled,
                [`position_${props.positionStyle}`]: !!props.positionStyle,
                [`theme_${props.theme}`]: !!props.theme,
            }), props.className)}
            style={props.style}
        >
            <div
                className={bem.element('header-container')}
                onClick={!props.disabled
                    ? () => {
                        // eslint-disable-next-line no-unused-expressions
                        props.toggleAccordion(props.childIndex);
                    }
                    : null}
            >
                <div className={bem.element('title-container')}>
                    <p>
                        {props.title}
                    </p>
                </div>
                <div className={bem.element('icon-wrapper')}>
                    {props.icon
                        ? (typeof props.icon === 'string' ? <Icon name={props.icon} /> : props.icon)
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
