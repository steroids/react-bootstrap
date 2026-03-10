import {useBem} from '@steroidsjs/core/hooks';
import {INotificationsViewProps} from '@steroidsjs/core/ui/layout/Notifications/Notifications';

export default function NotificationsView(props: INotificationsViewProps) {
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
