import * as React from 'react';
import {Fade} from 'reactstrap';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsItemViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';

@bem('NotificationsItemView')
export default class NotificationsItemView extends React.Component<INotificationsItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <Fade
                in={!this.props.isClosing}
                onExited={this.props.onClose}
            >
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
            </Fade>
        );
    }

}