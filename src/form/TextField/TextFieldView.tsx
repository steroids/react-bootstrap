import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITextFieldViewProps} from '@steroidsjs/core/ui/form/TextField/TextField';
import {useBem} from '@steroidsjs/core/hooks';

export default function TextFieldView(props: ITextFieldViewProps & IBemHocOutput) {
    const bem = useBem('TextFieldView');
    return (
        <textarea
            className={bem(
                bem.block({
                    size: props.size,
                }),
                'form-control',
                'form-control-' + props.size,
                !!props.errors && 'is-invalid',
                props.className,
            )}
            {...props.inputProps}
        />
    );
}
