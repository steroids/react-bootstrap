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
                successful: props.successful,
                filled: !!props.inputProps.value,
            }),
            props.className,
        )}
        >
            <textarea
                className={bem(
                    bem.element('textarea'),
                    bem.block({
                        size: props.size,
                    }),
                )}
                {...props.inputProps}
            />
            {props.showClear && (
                <Icon
                    className={bem.element('clear')}
                    name="field-close"
                    onClick={props.onClear}
                />
            )}
        </div>
    );
}
