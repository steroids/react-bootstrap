import * as React from 'react';
import {useEffect, useState} from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsItemViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';
import {CSSTransition} from 'react-transition-group';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function NotificationsItemView(props: INotificationsItemViewProps & IBemHocOutput) {
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(!props.isClosing);
    }, [props.isClosing]);

    const bem = useBem('NotificationsItemView');
    return (
        <CSSTransition
            in={isShow}
            timeout={1000}
            classNames={bem(bem.block({
                [props.position]: true,
            }))}
            unmountOnExit
        >
            <div
                className={bem(
                    bem.block({
                        [props.level]: true,
                        [props.position]: true,
                    }),
                    'alert',
                    'alert-' + props.level,
                )}
            >
                <div className={bem.element('body')}>
                    <div className={bem.element('message')}>
                        {props.message}
                    </div>
                    <button
                        className={bem.element('close')}
                        onClick={props.onClose}
                    >
                        <Icon name='reject' />
                    </button>
                </div>
            </div>
        </CSSTransition>
    );
}
