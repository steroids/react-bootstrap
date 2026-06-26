import {useUniqueId} from '@steroidsjs/core/hooks';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICheckboxTreeFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxTreeField/CheckboxTreeField';
import {ITreeItemViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import _isArray from 'lodash-es/isArray';
import _isEmpty from 'lodash-es/isEmpty';
import {FunctionComponent, useMemo} from 'react';

const TREE_ITEM_STATE = {
    SELECTED: 'selected',
    INDETERMINATE: 'indeterminate',
    UNSELECTED: 'unselected',
} as const;

type TreeItemState = typeof TREE_ITEM_STATE[keyof typeof TREE_ITEM_STATE];

type TreeNode = {id: string | number | boolean, [key: string]: any};

export default function CheckboxTreeFieldView(props: ICheckboxTreeFieldViewProps) {
    const bem = useBem('CheckboxTreeFieldView');
    const prefix = useUniqueId('checkbox');
    const TreeItemView = props.itemView as FunctionComponent<ITreeItemViewProps>;

    const {indeterminateIds, viewSelectedIds} = useMemo(() => {
        const selectedSet = new Set(props.selectedIds);
        const foundIndeterminateIds: TreeNode['id'][] = [];
        const selectedLeafIds: TreeNode['id'][] = [];
        const selectedParentIds: TreeNode['id'][] = [];

        const getState = (item: TreeNode): TreeItemState => {
            const children: TreeNode[] = item[props.primaryKey];
            if (!_isArray(children) || _isEmpty(children)) {
                if (selectedSet.has(item.id)) {
                    selectedLeafIds.push(item.id);
                    return TREE_ITEM_STATE.SELECTED;
                }
                return TREE_ITEM_STATE.UNSELECTED;
            }
            const childStates = children.map(getState);
            if (childStates.every(state => state === TREE_ITEM_STATE.SELECTED)) {
                selectedParentIds.push(item.id);
                return TREE_ITEM_STATE.SELECTED;
            }
            if (childStates.every(state => state === TREE_ITEM_STATE.UNSELECTED)) {
                return TREE_ITEM_STATE.UNSELECTED;
            }
            foundIndeterminateIds.push(item.id);
            return TREE_ITEM_STATE.INDETERMINATE;
        };

        props.items.forEach(getState);
        return {
            indeterminateIds: foundIndeterminateIds,
            viewSelectedIds: [...selectedLeafIds, ...selectedParentIds],
        };
    }, [props.items, props.selectedIds, props.primaryKey]);

    return (
        <div className={bem.block()}>
            {props.items.map((checkbox) => (
                <TreeItemView
                    key={checkbox.uniqueId}
                    item={checkbox}
                    levelPadding={props.levelPadding}
                    hasIconExpandOnly={props.hasIconExpandOnly}
                    withoutPointerOnLabel={props.hasOnlyLeafCheckboxes && checkbox.hasItems && !checkbox.isOpened}
                    itemProps={props.itemProps}
                >
                    {
                        props.renderCheckbox({
                            id: props.hasOnlyLeafCheckboxes && checkbox.hasItems ? null : `${prefix}_${checkbox.id}`,
                            label: checkbox.label,
                            indeterminate: indeterminateIds.includes(checkbox.id),
                            inputProps: {
                                name: `${prefix}_${checkbox.id}`,
                                type: 'checkbox',
                                checked: viewSelectedIds.includes(checkbox.id),
                                onChange: () => {
                                    const isOpenedLabel = props.hasOnlyLeafCheckboxes && (checkbox.isOpened || !checkbox.hasItems);

                                    if (isOpenedLabel || !props.hasOnlyLeafCheckboxes) {
                                        props.onItemSelect(checkbox);
                                    }
                                },
                                disabled: checkbox.disabled,
                                required: checkbox.required,
                            },
                            size: props.size,
                            color: checkbox.color,
                            hasOnlyLeafCheckboxes: props.hasOnlyLeafCheckboxes,
                        })
                    }
                </TreeItemView>
            ))}
        </div>
    );
}
