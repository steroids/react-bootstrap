import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IBadgeViewProps} from '@steroidsjs/core/ui/content/Badge/Badge';
import Icon from '@steroidsjs/core/ui/content/Icon';

import './BadgeView.scss';

export default function BadgeView(props: IBadgeViewProps) {
    const bem = useBem('BadgeView');

    return (
        props.isExist && (
            <div
                className={bem(
                    bem.block({
                        [props.type]: !!props.type,
                    }), props.className,
                )}
                style={props.style}
            >
                <div className={bem.element('content-wrapper')}>
                    <span className={bem.element('content')}>
                        {props.message}
                    </span>
                    {props.showClose && (
                        <Icon
                            name='close'
                            onClick={props.onClose}
                        />
                    )}
                    {props.counter
                        && (
                            <div className={bem.element('chip')}>
                                {typeof props.counter === 'object'
                                    && props.counter.content}
                            </div>
                        )}
                </div>
            </div>
        )
    );
}
