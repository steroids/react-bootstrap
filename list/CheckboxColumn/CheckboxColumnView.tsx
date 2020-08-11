import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import CheckboxField from '@steroidsjs/core/ui/form/CheckboxField';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxColumnViewProps} from '@steroidsjs/core/ui/list/CheckboxColumn/CheckboxColumn';

@bem('CheckboxColumnView')
export default class CheckboxColumnView extends React.PureComponent<ICheckboxColumnViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        const CheckboxFieldInternal = CheckboxField.WrappedComponent;
        return (
            <div className={bem.block()}>
                 <CheckboxFieldInternal
                     {...this.props.fieldProps}
                     input={this.props.input}
                 />
             </div>
         );
    }
}
