import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {useUniqueId} from '@steroidsjs/core/hooks';
import {ICheckboxTreeFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxTreeField/CheckboxTreeField';
import TreeItemView from '../../nav/TreeItem/TreeItemView';

export default function CheckboxTreeFieldView(props: ICheckboxTreeFieldViewProps) {
    const bem = useBem('CheckboxTreeFieldView');

    const prefix = useUniqueId('checkbox');

    return (
        <div className={bem.block()}>
            {props.items.map((checkbox) => (
                <TreeItemView
                    key={checkbox.uniqueId}
                    item={checkbox}
                    levelPadding={props.levelPadding}
                    hasIconExpandOnly
                >
                    {
                        props.renderCheckbox({
                            id: `${prefix}_${checkbox.id}`,
                            label: checkbox.label,
                            inputProps: {
                                name: `${prefix}_${checkbox.id}`,
                                type: 'checkbox',
                                checked: props.selectedIds.includes(checkbox.id),
                                onChange: () => {
                                    props.onItemSelect(checkbox);
                                },
                                disabled: checkbox.disabled,
                                required: checkbox.required,
                            },
                            size: props.size,
                            color: checkbox.color,
                        })
                    }
                </TreeItemView>
            ))}
        </div>
    );
}
