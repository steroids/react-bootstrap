import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IBadgeViewProps} from '@steroidsjs/core/ui/content/Badge/Badge';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function BadgeView(props: IBadgeViewProps) {
    const bem = useBem('BadgeView');

    return (
        props.isExist && (
            <div
                className={bem(
                    bem.block({
                        [props.type]: !!props.type,
                        size: props.size,
                        hasClose: props.showClose,
                        [props.roundingStyle]: !!props.roundingStyle,
                        'has-counter': !!props.counter,
                    }),
                    props.className,
                )}
                style={props.style}
            >
                <div className={bem.element('content')}>
                    <span className={bem.element('message')}>
                        {props.message}
                    </span>
                    {props.counter && (
                        <span className={bem.element('counter')}>
                            {typeof props.counter === 'object' && (
                                <span className={bem.element('counter-content')}>
                                    {props.counter.content}
                                </span>
                            )}
                        </span>
                    )}
                    {props.showClose && (
                        <Icon
                            onClick={props.onClose}
                            className={bem.element('close')}
                            name='cross_4x4'
                        />
                    )}
                </div>
            </div>
        )
    );
}
