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
                key: checkboxIndex,
                id: `${prefix}_${checkbox.id}`,
                label: checkbox.label,
                inputProps: {
                    name: `${prefix}_${checkbox.id}`,
                    type: 'checkbox',
                    checked: props.selectedIds.includes(checkbox.id),
                    onChange: () => {
                        props.onItemSelect(checkbox.id);
                    },
                    disabled: props.disabled,
                },
                size: checkbox.size || props.size,
                color: checkbox.color,
                required: checkbox.required,
            }))}
        </div>
    );
}
