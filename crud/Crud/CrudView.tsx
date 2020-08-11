import React from 'react';
import Controls from '@steroidsjs/core/ui/nav/Controls';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICrudViewProps} from '@steroidsjs/core/ui/crud/Crud/Crud';

@bem('CrudView')
export default class CrudView extends React.Component<ICrudViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.controls && (
                    <Controls items={this.props.controls}/>
                )}
                {this.props.children}
            </div>
        );
    }

}
