import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IEmptyViewProps} from '@steroidsjs/core/ui/list/Empty/Empty';

@bem('EmptyView')
export default class EmptyView extends React.Component<IEmptyViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block(),
                'text-center p-5',
                this.props.className
            )}>
                {this.props.text}
            </div>
        );
    }

}