import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFormViewProps} from '@steroidsjs/core/ui/form/Form/Form';
import {useBem} from '@steroidsjs/core/hooks';

export default function FormView(props: IFormViewProps & IBemHocOutput) {
    const bem = useBem('FormView');
    return (
        <form
            className={bem(
                bem.block(),
                props.className,
                props.layout.layout === 'horizontal' && 'form-horizontal',
            )}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    );
}
