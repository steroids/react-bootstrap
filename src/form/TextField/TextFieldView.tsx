import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITextFieldViewProps} from '@steroidsjs/core/ui/form/TextField/TextField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function TextFieldView(props: ITextFieldViewProps & IBemHocOutput) {
    const bem = useBem('TextFieldView');

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const clearHandler = () => {
        props.input.onChange('');
        textAreaRef.current.value = '';
    };

    return (
        <div className={bem(
            bem.block({
                hasErrors: !!props.errors,
                successful: props.successful,
                filled: textAreaRef.current && !!textAreaRef.current?.value,
            }),
            props.className,
        )}
        >
            <textarea
                ref={textAreaRef}
                className={bem(
                    bem.element('textarea'),
                    bem.block({
                        size: props.size,
                    }),
                )}
                {...props.inputProps}
            />
            {props.showClear && <Icon className={bem.element('clear')} name="field-close" onClick={clearHandler} />}
        </div>
    );
}
