import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITextFieldViewProps} from '@steroidsjs/core/ui/form/TextField/TextField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function TextFieldView(props: ITextFieldViewProps & IBemHocOutput) {
    const bem = useBem('TextFieldView');

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const onClearHandler = React.useCallback(() => {
        if (!textAreaRef.current) {
            return;
        }

        textAreaRef.current.value = '';

        if (props.onClear) {
            props.onClear();
        }
    }, [props]);

    return (
        <div className={bem(
            bem.block({
                hasErrors: !!props.errors,
                successful: props.successful,
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
            {props.showClose && <Icon className={bem.element('close')} name="field-close" onClick={onClearHandler} />}
        </div>
    );
}
