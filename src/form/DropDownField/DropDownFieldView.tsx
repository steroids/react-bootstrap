import * as React from 'react';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem, useUniqueId} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {DropDown} from '@steroidsjs/core/ui/content';
import {getSelectedItemsCount, getSelectedItemsLabel} from './utils';
import DropDownFieldOpenedContent from './views/DropDownFieldOpenedContent';

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const bem = useBem('DropDownFieldView');

    const uniqueId = useUniqueId('DropDown');

    const {onClose} = props;

    const renderPlaceholder = React.useCallback(() => props.placeholder && !props.selectedIds?.length
        ? (
            <div className={bem.element('placeholder')}>{props.placeholder}</div>
        )
        : null, [bem, props.placeholder, props.selectedIds]);

    const renderList = React.useCallback(() => (
        <DropDownFieldOpenedContent
            autoCompleteInputForwardedRef={props.autoCompleteInputForwardedRef}
            itemToSelectAll={props.itemToSelectAll}
            items={props.items}
            renderItem={props.renderItem}
            searchInputProps={props.searchInputProps}
            isAutoComplete={props.isAutoComplete}
            multiple={props.multiple}
            size={props.size}
            bem={bem}
            uniqueId={uniqueId}
            isSearchAutoFocus={props.isSearchAutoFocus}
        />
    ), [bem, props.autoCompleteInputForwardedRef, props.isAutoComplete, props.itemToSelectAll, props.items,
        props.multiple, props.renderItem, props.searchInputProps, props.size, uniqueId, props.isSearchAutoFocus]);

    const onInputClick = React.useCallback(() => {
        if (props.isOpened) {
            onClose();
        }
    }, [onClose, props.isOpened]);

    return (
        <DropDown
            content={renderList}
            position={props.viewProps.position}
            autoPositioning={props.viewProps.autoPositioning}
            visible={props.isOpened}
            onClose={onClose}
            hasArrow={false}
            className={bem.element('wrapper')}
        >
            <div
                className={bem(bem.block(
                    {
                        size: props.size,
                        [`${props.color}`]: !!props.color && !props.outline,
                        [`outline_${props.color}`]: props.outline,
                        opened: props.isOpened,
                        'is-invalid': !!props.errors,
                        disabled: props.disabled,
                    },
                ), props.className)}
                onKeyPress={e => e.key === 'Enter' && !props.disabled && props.onOpen()}
                style={props.style}
                role="button"
                tabIndex={0}
                onClick={onInputClick}
                id={uniqueId}
            >
                <div
                    className={bem.element('selected-items', {
                        reset: props.showReset,
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
                    <input
                        className={bem.element('input')}
                        ref={props.inputRef}
                    />
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
            </div>
        </DropDown>
    );
}
