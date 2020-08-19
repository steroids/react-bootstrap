import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsItemViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';

@bem('NotificationsItemView')
export default class NotificationsItemView extends React.Component<INotificationsItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(
                    bem.block(this.props.level),
                    'alert',
                    'alert-' + this.props.level,
                )}
                onClick={this.props.onClosing}
            >
                <div className={bem.element('message')}>
                    {this.props.message}
                </div>
            </div>
        );
    }

}