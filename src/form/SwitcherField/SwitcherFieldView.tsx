import * as React from 'react';
import {useBem, useUniqueId} from '@steroidsjs/core/hooks';
import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import SingleSwitcherFieldView from '../SingleSwitcherField/SingleSwitcherFieldView';

export default function SwitcherFieldView(props: ICheckboxListFieldViewProps) {
    const bem = useBem('SwitcherFieldView');
    const prefix = useUniqueId('switcher');

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
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
                    disabled: props.disabled || checkbox.disabled,
                },
                size: checkbox.size || props.size,
                color: checkbox.color,
                required: checkbox.required,
                view: SingleSwitcherFieldView,
            }))}
        </div>
    );
}
