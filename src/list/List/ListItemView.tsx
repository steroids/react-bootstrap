import {IListItemViewProps} from '@steroidsjs/core/ui/list/List/List';

import {useBem} from '@steroidsjs/core/hooks';

export default function ListItemView(props: IListItemViewProps) {
    const bem = useBem('ListItemView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.item.title || props.item.label || props.item[props.primaryKey]}
        </div>
    );
}
