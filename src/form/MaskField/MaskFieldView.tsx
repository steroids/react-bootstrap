import * as React from 'react';
import {InputField} from '@steroidsjs/core/ui/form';
import {IInputFieldViewProps} from '@steroidsjs/core/ui/form/InputField/InputField';

export default function MaskFieldView(props: IInputFieldViewProps) {
    return (
        <InputField maskProps={{mask: props.mask, ...props.maskProps}} />
    );
}
