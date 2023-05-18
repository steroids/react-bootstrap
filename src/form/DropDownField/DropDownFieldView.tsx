import * as React from 'react';
import {useEffect, useRef} from 'react';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import _isArray from 'lodash-es/isArray';
import {ITEM_TO_SELECT_ALL_ID} from '@steroidsjs/core/hooks/useDataSelect';
import {getSelectedItemsCount, getSelectedItemsLabel} from './utils';

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const bem = useBem('DropDownFieldView');
    const inputRef = useRef<HTMLInputElement>(null);

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
                    name="cross_8x8"
                    className={bem.element('icon-close')}
                    tabIndex={-1}
                    onClick={props.onReset}
                    aria-label={__('Сбросить')}
                />
            )}
            <Icon
                name='arrow_down_24x24'
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
                        {props.multiple && props.itemToSelectAll
                            && props.renderItem({
                                id: props.itemToSelectAll.id || ITEM_TO_SELECT_ALL_ID,
                                label: props.itemToSelectAll.label || __('Все'),
                            })}
                        {props.items.map((item) => props.renderItem(item))}
                    </div>
                </div>
            )}
        </div>
    );
}
