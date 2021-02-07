import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';
import {useBem} from '@steroidsjs/core/hooks';

export default function NotificationsView(props: INotificationsViewProps & IBemHocOutput) {
    const bem = useBem('NotificationsView');
    return (
        <div
            className={bem(bem.block({
                [props.position]: true,
            }))}
        >
            {props.children}
        </div>
    );
}