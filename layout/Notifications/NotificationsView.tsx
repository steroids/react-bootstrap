import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';

@bem('NotificationsView')
export default class NotificationsView extends React.Component<INotificationsViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(bem.block({
                    [this.props.position]: true,
                }))}
            >
                {this.props.children}
            </div>
        );
    }

}