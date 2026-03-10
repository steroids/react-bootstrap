import {useBem} from '@steroidsjs/core/hooks';
import {IListItemViewProps} from '@steroidsjs/core/ui/list/List/List';
import * as React from 'react';

export default function ListItemView(props: IListItemViewProps) {
    const bem = useBem('ListItemView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.item.title || props.item.label || props.item[props.primaryKey]}
        </div>
    );
}
