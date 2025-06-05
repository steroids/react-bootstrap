import * as React from 'react';
import _isString from 'lodash-es/isString';
import {IFormViewProps} from '@steroidsjs/core/ui/form/Form/Form';
import {useBem} from '@steroidsjs/core/hooks';
import Field from '@steroidsjs/core/ui/form/Field';
import Button from '@steroidsjs/core/ui/form/Button';
import {useMount} from 'react-use';
import {useRef} from 'react';

function FormView(props: IFormViewProps) {
    const bem = useBem('FormView');
    const formRef = useRef(null);

    // Auto focus
    useMount(() => {
        if (props.autoFocus) {
            const inputEl = formRef.current.querySelector('input:not([type=hidden])');
            setTimeout(() => {
                if (inputEl && inputEl.focus) {
                    inputEl.focus();
                }
            }, 10);
        }
    });

    return (
        <form
            ref={formRef}
            className={bem(
                bem.block(),
                props.className,
            )}
            onSubmit={props.onSubmit}
            style={props.style}
        >
            {props.children}
            {(props.fields || []).map((field: any, index) => (
                <Field
                    key={index}
                    {...(_isString(field) ? {attribute: field} : field)}
                    size={field.size || props.size || null}
                />
            ))}
            {props.buttons}
            {props.submitLabel && (
                <Button
                    type='submit'
                    label={props.submitLabel}
                    {...props.submitButtonProps}
                />
            )}
        </form>
    );
}

export default React.memo(FormView);
