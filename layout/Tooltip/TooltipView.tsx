import * as React from 'react';
import {ITooltipViewProps} from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useEffect, useRef} from 'react';
import {useBem} from '@steroidsjs/core/hooks';

export default function TooltipView(props: ITooltipViewProps & IBemHocOutput) {
    const tooltipRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        props.calculatePosition(
            tooltipRef.current.getBoundingClientRect(),
            arrowRef.current.getBoundingClientRect()
        );
    }, []);

    const bem = useBem('TooltipView');
    return (
        <div
            ref={tooltipRef}
            className={bem(
                bem.block({
                    'show': props.isTooltipVisible
                }),
                'tooltip',
                'tooltip-position-'+props.position
            )}
            style={props.style}
        >
            <div
                ref={arrowRef}
                className={bem(
                    bem.element(
                        'arrow',
                        {['position-'+props.position]: true},
                    )
                )}
                style={props.arrowPosition}
            />
            <div
                className={bem(
                    bem.element('content'),
                    'tooltip-inner'
                )}
            >
                <span>{props.content}</span>
            </div>
        </div>
    );
}
