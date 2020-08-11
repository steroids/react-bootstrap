import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('LoaderView')
export default class LoaderView extends React.Component<IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <div className={bem.element('loader')}/>
            </div>
        );
    }

}