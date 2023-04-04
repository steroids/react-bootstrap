export const getSelectedItemsLabel = (selectedItems: Record<string, any>[]): string => (
    selectedItems
        .map(selectedItem => selectedItem.label)
        .join(', ')
);

export const getSelectedItemsCount = (selectedItems: Record<string, any>) => {
    if (selectedItems.length <= 1) {
        return selectedItems[0]?.label;
    }

    return `${__('Выбрано')} (${selectedItems.length})`;
};
