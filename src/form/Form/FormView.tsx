import * as React from 'react';
import _isString from 'lodash-es/isString';

import {IFormViewProps} from '@steroidsjs/core/ui/form/Form/Form';
import {useBem} from '@steroidsjs/core/hooks';
import Field from '@steroidsjs/core/ui/form/Field';
import Button from '@steroidsjs/core/ui/form/Button';

function FormView(props: IFormViewProps) {
    const bem = useBem('FormView');

    return (
        <form
            className={bem(
                bem.block({
                    border: props.isBordered,
                    inline: props.layout.layout === 'inline',
                }),
                props.className,
                props.layout.layout === 'horizontal' && 'form-horizontal',
            )}
            onSubmit={props.onSubmit}
            style={props.style}
        >
            {props.children}
            {(props.fields || []).map((field: any, index) => (
                <Field
                    key={index}
                    {...(_isString(field) ? {attribute: field} : field)}
                />
            ))}
            {props.submitLabel && (
                <Button
                    type='submit'
                    label={props.submitLabel}
                />
            )}
        </form>
    );
}

export default React.memo(FormView);
