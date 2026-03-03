import {useBem} from '@steroidsjs/core/hooks';
import {IFieldSetViewProps} from '@steroidsjs/core/ui/form/FieldSet/FieldSet';
import * as React from 'react';

export default function FieldSetView(props: IFieldSetViewProps) {
    const bem = useBem('FieldSetView');
    return (
        <fieldset className={bem(bem.block(), props.className)}>
            <legend className={bem.element('legend')}>{props.label}</legend>
            {props.children}
        </fieldset>
    );
}
