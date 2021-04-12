import * as React from 'react';

import {IListItemViewProps} from '@steroidsjs/core/ui/list/List/List';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function ListItemView(props: IListItemViewProps & IBemHocOutput) {
    const bem = useBem('ListItemView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.item.title || props.item.label || props.item[props.primaryKey]}
        </div>
    );
}
