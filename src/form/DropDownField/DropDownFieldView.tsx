import * as React from 'react';
import {useEffect, useRef} from 'react';
import {IDropDownFieldItem, IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import _isArray from 'lodash-es/isArray';

const getSelectedItemsLabel = (selectedItems: Record<string, any>[]): string => (
    selectedItems
        .map(selectedItem => selectedItem.label)
        .join(', ')
);

const getSelectedItemsCount = (selectedItems: Record<string, any>) => {
    if (selectedItems.length <= 1) {
        return selectedItems[0]?.label;
    }

    return `${__('Выбрано')} (${selectedItems.length})`;
};

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const bem = useBem('DropDownFieldView');
    const itemBem = useBem('DropDownItemView');
    const inputRef = useRef<HTMLInputElement>(null);

    const commonProps = (item: IDropDownFieldItem) => ({
        className:
            itemBem.element('option', {
                hover: props.hoveredId === item[props.primaryKey],
                select: props.selectedIds.includes(item[props.primaryKey]),
                size: props.size,
            }),
        onFocus: () => props.onItemHover(item[props.primaryKey]),
        onMouseOver: () => props.onItemHover(item[props.primaryKey]),
        onClick: (e) => {
            e.preventDefault();
            props.onItemSelect(item[props.primaryKey]);
        },
    });

    // Auto focus on search
    useEffect(() => {
        if (props.isSearchAutoFocus && props.isAutoComplete && props.isOpened && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [props.isAutoComplete, props.isOpened, props.isSearchAutoFocus]);

    const renderPlaceholder = React.useCallback(() => props.placeholder && !props.selectedIds?.length
        ? (
            <div className={bem.element('placeholder')}>{props.placeholder}</div>
        )
        : null,
        [bem, props.placeholder, props.selectedIds]);

    return (
        <div
            ref={props.forwardedRef}
            className={bem(bem.block(
                {
                    size: props.size,
                    [`${props.color}`]: !!props.color && !props.outline,
                    [`outline_${props.color}`]: props.outline,
                    opened: props.isOpened,
                },
            ), props.className)}
            onKeyPress={e => e.key === 'Enter' && props.onOpen()}
            style={props.style}
            role="button"
            tabIndex={0}
        >
            <div
                className={bem.element('selected-items', {
                    reset: props.showReset,
                    disabled: props.disabled,
                })}
                onClick={props.onOpen}
                tabIndex={-1}
                role='button'
            >
                {renderPlaceholder()}
                <span
                    className={bem.element('selected-items')}
                >
                    {props.showEllipses
                        ? getSelectedItemsLabel(props.selectedItems)
                        : getSelectedItemsCount(props.selectedItems)}
                </span>
            </div>
            {props.showReset && props.selectedIds.length > 0 && (
                <Icon
                    name="field-close"
                    className={bem.element('icon-close')}
                    tabIndex={-1}
                    onClick={props.onReset}
                    aria-label={__('Сбросить')}
                />
            )}
            <Icon
                name='accordion-chevron'
                className={bem.element('icon-chevron')}
                tabIndex={-1}
                onClick={props.onOpen}
            />
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    {props.isAutoComplete && (
                        <div className={bem.element('search', {
                            size: props.size,
                        })}
                        >
                            <Icon
                                name='search'
                                className={bem.element('search-icon')}
                            />
                            <input
                                {...props.searchInputProps}
                                ref={inputRef}
                                onChange={e => props.searchInputProps.onChange(e.target.value)}
                                className={bem(
                                    bem.element('search-input'),
                                    props.searchInputProps.className,
                                )}
                            />
                        </div>
                    )}
                    <div className={bem.element('drop-down-list')}>
                        {props.items.map((item, itemIndex) => props.renderItem(item, itemIndex, commonProps(item), itemBem))}
                    </div>
                </div>
            )}
        </div>
    );
}
