import * as React from 'react';
import {useEffect, useRef} from 'react';
import {ITooltipViewProps} from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function TooltipView(props: ITooltipViewProps & IBemHocOutput) {
    const tooltipRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        props.calculatePosition(
            tooltipRef.current.getBoundingClientRect(),
            arrowRef.current.getBoundingClientRect(),
        );
    }, [props.calculatePosition]);

    const bem = useBem('TooltipView');
    return (
        <div
            ref={tooltipRef}
            className={bem.block({
                show: props.isTooltipVisible,
                position: props.position,
            })}
            style={props.style}
        >
            <div
                ref={arrowRef}
                className={bem.element(
                    'arrow',
                    {position: props.position},
                )}
                style={props.arrowPosition}
            />
            <div className={bem.element('content')}>
                <span>{props.content}</span>
            </div>
        </div>
    );
}
