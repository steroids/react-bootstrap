import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateTimeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeField/DateTimeField';
import {useBem} from '@steroidsjs/core/hooks';

export default function DateTimeFieldView(props: IDateTimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('DateTimeFieldView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <div className={bem.element('date')}>
                {props.dateField}
            </div>
            <div className={bem.element('time')}>
                {props.timeField}
            </div>
        </div>
    );
}
