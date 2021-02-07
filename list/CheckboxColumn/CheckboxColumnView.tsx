import * as React from 'react';

import CheckboxField from '@steroidsjs/core/ui/form/CheckboxField';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxColumnViewProps} from '@steroidsjs/core/ui/list/CheckboxColumn/CheckboxColumn';
import {useBem} from '@steroidsjs/core/hooks';

export default function CheckboxColumnView(props: ICheckboxColumnViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxColumnView');
    const CheckboxFieldInternal = CheckboxField.WrappedComponent;
    return (
        <div className={bem.block()}>
             <CheckboxFieldInternal
                 {...props.fieldProps}
                 input={props.input}
             />
         </div>
     );
}
