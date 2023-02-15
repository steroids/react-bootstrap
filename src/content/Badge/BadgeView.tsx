import React, {useCallback} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IBadgeViewProps} from '@steroidsjs/core/ui/content/Badge/Badge';

import './BadgeView.scss';
import Icon from '@steroidsjs/core/ui/icon/Icon';

export default function BadgeView(props: IBadgeViewProps) {
    const bem = useBem('BadgeView');

    return (
        props.isExist && (
            <div
                className={bem(
                    bem.block({
                        [props.type]: !!props.type,
                        'close-animation': !props.isVisible,
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
                    {props.hasChip
                        && (
                            <div className={bem.element('chip')}>
                                {props.chipContent}
                            </div>
                        )}
                </div>
            </div>
        )
    );
}
