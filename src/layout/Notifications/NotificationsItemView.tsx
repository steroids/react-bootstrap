import * as React from 'react';
import {useEffect, useState} from 'react';

import {INotificationsItemViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';
import {CSSTransition} from 'react-transition-group';
import {useBem} from '@steroidsjs/core/hooks';
import AlertView from '../../content/Alert/AlertView';

export default function NotificationsItemView(props: INotificationsItemViewProps) {
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(!props.isClosing);
    }, [props.isClosing]);

    const bem = useBem('NotificationsItemView');
    return (
        <CSSTransition
            in={isShow}
            timeout={1000}
            classNames={bem.block({
                [props.position]: true,
            })}
            unmountOnExit
        >
            <div
                className={bem.block({
                    [props.position]: true,
                })}
            >
                <AlertView
                    onClose={props.onClose}
                    message={props.message}
                    type={props.level}
                    showClose
                    isExist
                    isVisible
                    showIcon
                />
            </div>
        </CSSTransition>
    );
}
