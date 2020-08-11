import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateTimeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeField/DateTimeField';

@bem('DateTimeFieldView')
export default class DateTimeFieldView extends React.PureComponent<IDateTimeFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block())}>
                <div className={bem.element('date')}>
                    {this.props.dateField}
                </div>
                <div className={bem.element('time')}>
                    {this.props.timeField}
                </div>
            </div>
        );
    }
}
