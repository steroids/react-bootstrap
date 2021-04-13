import * as React from 'react';
import {IFieldSetViewProps} from '@steroidsjs/core/ui/form/FieldSet/FieldSet';

export default function FieldSetView(props: IFieldSetViewProps) {
    return (
        <fieldset className={props.className}>
            <legend>{props.label}</legend>
            {props.children}
        </fieldset>
    );
}
