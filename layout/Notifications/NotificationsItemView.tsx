import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INotificationsItemViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';
import {CSSTransition} from 'react-transition-group';
import Icon from '@steroidsjs/core/ui/icon/Icon';

interface INotificationsState {
    isShow: boolean
}

@bem('NotificationsItemView')
export default class NotificationsItemView extends React.Component<INotificationsItemViewProps & IBemHocOutput, INotificationsState> {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false
        }
    }

    componentDidMount(): void {
        this.setState({isShow: true});
    }

    componentDidUpdate(prevProps: INotificationsItemViewProps & IBemHocOutput): void {
        if (prevProps.isClosing !== this.props.isClosing) {
            this.setState({isShow: !this.props.isClosing});
        }
    }

    render() {
        console.log(345, CSSTransition);
        const bem = this.props.bem;
        return (
            <CSSTransition
                in={this.state.isShow}
                timeout={1000}
                classNames={bem(bem.block({
                    [this.props.position]: true,
                }))}
                unmountOnExit
            >
                <div
                    className={bem(
                        bem.block({
                            [this.props.level]: true,
                            [this.props.position]: true,
                        }),
                        'alert',
                        'alert-' + this.props.level,
                    )}
                >
                    <div className={bem.element('body')}>
                        <div className={bem.element('message')}>
                            {this.props.message}
                        </div>
                        <div
                            className={bem.element('close')}
                            onClick={this.props.onClose}
                        >
                            <Icon name={'reject'}/>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}