import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITextFieldViewProps} from '@steroidsjs/core/ui/form/TextField/TextField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function TextFieldView(props: ITextFieldViewProps & IBemHocOutput) {
    const bem = useBem('TextFieldView');

    return (
        <div className={bem(
            bem.block({
                hasErrors: !!props.errors,
                filled: !!props.inputProps.value,
                size: props.size,
            }),
            props.className,
        )}
        >
            <textarea
                className={bem.element('textarea')}
                id={props.id}
                {...props.inputProps}
            />
            {props.showClear && (
                <Icon
                    className={bem.element('clear')}
                    name="cross_8x8"
                    onClick={props.onClear}
                />
            )}
        </div>
    );
}
