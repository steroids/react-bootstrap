import React from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import { IAlertViewProps } from '@steroidsjs/core/ui/content/Alert/Alert';

import './AlertView.scss';

export default function Alert(props: IAlertViewProps) {
    const bem = useBem('AlertView');
    return (
        props.isExist && (
            <div
                className={bem(
                    bem.block({
                        [props.type]: !!props.type,
                        'has-description': !!props.description,
                        'close-animation': !props.isVisible,
                    }), props.className,
                )}
                style={props.style}
            >
            {typeof props.showIcon === 'boolean' && (
                <Icon
                    name={props.type}
                    className={bem.element('icon', {
                        [props.type]: !!props.type,
                    })}
                />
            )}
            {typeof props.showIcon === 'string' && (
                <Icon
                    name={props.showIcon}
                    className={bem.element('icon')}
                />
            )}
            <div className={bem.element('content-wrapper')} >
                <div className={bem.element('content')}>
                    <div className={bem.element('message')}>
                        {props.message}
                    </div>
                    {props.description && (
                        <div className={bem.element('description')}>
                            {props.description}
                        </div>
                    )}
                </div>
                {props.action && (
                    <div className={bem.element('action')}>
                        {props.action}
                    </div>
                )}
            </div>
            {props.showClose && (
                <Icon
                    className={bem.element('icon-close', {
                        large: !!props.description,
                    })}
                    name='times'
                    onClick={(e) => {
                        e.preventDefault();
                        props.onClose();
                    }}
                />
            )}
        </div>
        )
    );
}