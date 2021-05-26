import React from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IAlertViewProps } from '@steroidsjs/core/ui/content/Alert/Alert'

import './AlertView.scss';
import Icon from '@steroidsjs/core/ui/icon/Icon';


export default function Alert (props: IAlertViewProps) {

    const bem = useBem('AlertView');

    return(
        <>
        {props.closed ? null : (
            <div className={bem(bem.block({
                [`${props.type}`]: !!props.type,
            }))}
            style={props.style}
            >
                {props.showIcon && (
                    <Icon
                        name={props.type}
                        className={bem.element('icon', props.type, {
                            large: !!props.description
                        }
                        )}
                    />
                )}
                <div className={bem.element('content')}>
                    {props.message && (
                        <div className={bem.element('title', {
                            large: !!props.description
                        })}>
                            {props.message}
                        </div>
                    )}
                    {props.description && (
                        <div className={bem.element('description')}>
                            {props.description}
                        </div>
                    )}
                </div>
                {props.showClose && (
                    <Icon onClick={props.onClose} name='times' className={bem.element('icon-close', {
                        large: !!props.description
                    })} />
                )}
            </div>
        )}
        </>
    )
}