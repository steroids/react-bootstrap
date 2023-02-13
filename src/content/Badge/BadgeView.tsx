import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IBadgeViewProps} from '@steroidsjs/core/ui/content/Badge/Badge';

import './BadgeView.scss';

export default function BadgeView(props: IBadgeViewProps) {
    const bem = useBem('BadgeView');

    return (
        props.isExist && (
            <div className={bem(
                bem.block({
                    [props.type]: !!props.type,
                    'close-animation': !props.isVisible,
                }), props.className,
            )}
                style={props.style}
            >
                <div className={bem.element('content-wrapper')}>
                    <div className={bem.element('content')}></div>
                </div>
            </div>
        )
    );
}
