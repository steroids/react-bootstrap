import * as React from 'react';
import {useEffect, useRef} from 'react';

import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import _isArray from 'lodash-es/isArray';
import DropDownItem from './views/DropDownItem';

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const bem = useBem('DropDownFieldView');
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus on search
    useEffect(() => {
        if (props.isSearchAutoFocus && props.isAutoComplete && props.isOpened && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [props.isAutoComplete, props.isOpened, props.isSearchAutoFocus]);

    const renderPlaceholder = React.useCallback(() => props.placeholder && !(props.selectedIds && props.selectedIds.length)
        ? (
            <div className={bem.element('placeholder')}>{props.placeholder}</div>
        )
        : null, [bem, props.placeholder, props.selectedIds]);

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
                    {props.ellipses
                        ? (
                            props.selectedItems.map((item, itemIndex) => {
                                if (props.selectedItems.length === itemIndex + 1) {
                                    return <React.Fragment key={itemIndex}>{item.label as React.ReactNode}</React.Fragment>;
                                }

                                return (
                                    <React.Fragment key={itemIndex}>
                                        {`${item.label}, `}
                                    </React.Fragment>
                                );
                            })
                        )
                        : (
                            props.selectedItems.length <= 1
                                ? (
                                    <>
                                        {props.selectedItems[0]?.label}
                                    </>
                                )
                                : (
                                    <>
                                        {__('Выбрано')}
                                        {' '}
                                        {props.selectedItems.length}
                                    </>
                                )
                        )}
                </span>
            </div>
            <Icon
                name='accordion-chevron'
                className={bem.element('icon-chevron')}
                tabIndex={-1}
                onClick={props.onOpen}
            />
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    {props.isAutoComplete && (
                        <div className={bem.element('search')}>
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
                        {props.items.map((item, itemIndex) => (
                            <DropDownItem
                                key={itemIndex}
                                groupAttribute={props.groupAttribute}
                                hoveredId={props.hoveredId}
                                onItemHover={props.onItemHover}
                                onItemSelect={props.onItemSelect}
                                primaryKey={props.primaryKey}
                                selectedIds={props.selectedIds}
                                item={item}
                                contentProperties={props.contentProperties}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
