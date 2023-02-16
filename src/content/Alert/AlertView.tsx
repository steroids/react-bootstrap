import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {IAlertViewProps} from '@steroidsjs/core/ui/content/Alert/Alert';

export default function Alert(props: IAlertViewProps) {
    const bem = useBem('AlertView');
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
                    <div className={bem.element('content')}>
                        <div className={bem.element('icon-section')}>
                            {props.showIcon && (
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
                        </div>
                        <div className={bem.element('text-section')}>
                            {props.message && (
                                <div className={bem.element('message')}>
                                    {props.message}
                                </div>
                            )}
                            {props.description && (
                                <div className={bem.element('description')}>
                                    {props.description}
                                </div>
                            )}
                        </div>
                        <div className={bem.element('close-section')}>
                            {props.showClose && (
                                <Icon
                                    className={bem.element('icon-close', {
                                        large: !!props.description,
                                    })}
                                    name='close'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.onClose();
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    {props.action && (
                        <div className={bem.element('action')}>
                            {props.action}
                        </div>
                    )}
                </div>
            </div>
        )
    );
}
