import * as React from 'react';

import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function CheckboxListFieldView(props: ICheckboxListFieldViewProps) {
    const bem = useBem('CheckboxListFieldView');
    const prefix = useUniqueId('checkbox');

    return (
        <div className={bem(bem.block({
            [`${props.orientation}`]: !!props.orientation,
        }))}
        >
            {props.items.map((checkbox, checkboxIndex) => props.renderCheckbox({
                inputProps: {
                    name: `${prefix}_${checkbox.id}`,
                    checked: null,
                    type: 'checkbox',
                    disabled: false,
                    onChange: () => {
                        props.onItemSelect(checkbox.id);
                    },
                },
                disabled: props.disabled,
                label: checkbox.label,
                id: `${prefix}_${checkbox.id}`,
                key: checkboxIndex,
                color: checkbox.color,
            }))}
        </div>
    );
}
