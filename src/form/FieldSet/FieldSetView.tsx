import * as React from 'react';
import {IFieldSetViewProps} from '@steroidsjs/core/ui/form/FieldSet/FieldSet';
import {useBem} from '@steroidsjs/core/hooks';

export default function FieldSetView(props: IFieldSetViewProps) {
    const bem = useBem('FieldSetView');
    return (
        <fieldset className={bem(bem.block(), props.className)}>
            <legend className={bem.element('legend')}>{props.label}</legend>
            {props.children}
        </fieldset>
    );
}
