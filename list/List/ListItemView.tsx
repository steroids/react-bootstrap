import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IListItemViewProps} from '@steroidsjs/core/ui/list/List/List';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('ListItemView')
export default class ListItemView extends React.Component<IListItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.item.title || this.props.item.label || this.props.item[this.props.primaryKey]}
            </div>
        );
    }

}
