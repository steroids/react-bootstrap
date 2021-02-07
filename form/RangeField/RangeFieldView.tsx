import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IRangeFieldViewProps} from '@steroidsjs/core/ui/form/RangeField/RangeField';
import {useBem} from '@steroidsjs/core/hooks';

export default function RangeFieldView(props: IRangeFieldViewProps & IBemHocOutput) {
    const bem = useBem('RangeFieldView');
    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
            props.className,
            'row align-items-center'
        )}>
            <div className='col'>
                {props.fromField}
            </div>
            -
            <div className='col'>
                {props.toField}
            </div>
        </div>
    );
}
