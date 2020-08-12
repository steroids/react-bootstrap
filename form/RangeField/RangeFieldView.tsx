import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IRangeFieldViewProps} from '@steroidsjs/core/ui/form/RangeField/RangeField';

@bem('RangeFieldView')
export default class RangeFieldView extends React.PureComponent<IRangeFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block({
                    size: this.props.size,
                }),
                this.props.className,
                'row align-items-center'
            )}>
                <div className='col'>
                    {this.props.fromField}
                </div>
                -
                <div className='col'>
                    {this.props.toField}
                </div>
            </div>
        );
    }

}
