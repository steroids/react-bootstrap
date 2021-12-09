import * as React from 'react';
import {ReactText, useEffect, useRef} from 'react';

import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const inputRef = useRef(null);

    // Auto focus on search
    useEffect(() => {
        if (props.isSearchAutoFocus && props.isAutoComplete && props.isOpened && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [props.isAutoComplete, props.isOpened, props.isSearchAutoFocus]);

    const bem = useBem('DropDownFieldView');
    return (
        <div
            ref={props.forwardedRef}
            className={bem(bem.block({size: props.size}), props.className)}
            style={props.style}
        >
            <div
                className={bem.element('selected-items', {
                    reset: props.showReset,
                    'no-border': props.noBorder,
                    'is-invalid': !!props.errors,
                    disabled: props.disabled,
                })}
                onClick={props.onOpen}
                onKeyPress={props.onOpen}
                tabIndex={0}
                role='button'
            >
                {props.multiple
                    ? props.selectedIds
                        .map(id => props.items.find(item => item[props.primaryKey] === id))
                        .filter(Boolean)
                        .map(item => (
                            <span
                                key={String(item.id)}
                                className={bem.element('selected-item-multiple')}
                            >
                                {item.label}
                                <span
                                    className={bem.element('selected-item-multiple-remove')}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onItemRemove(item[props.primaryKey]);
                                    }}
                                    onKeyPress={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onItemRemove(item[props.primaryKey]);
                                    }}
                                    tabIndex={0}
                                    role='button'
                                >
                                    <svg
                                        viewBox="64 64 896 896"
                                        className=""
                                        width="1em"
                                        height="1em"
                                    >
                                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3
                                         5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4
                                         512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3
                                          3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                                        />
                                    </svg>
                                </span>
                            </span>
                        ))
                    : props.selectedIds
                        .map(id => props.items.find(item => item[props.primaryKey] === id))
                        .filter(Boolean)
                        .map(item => (
                            <span
                                key={item.id as ReactText}
                                className={bem.element('selected-item')}
                            >
                                {item.label}
                            </span>
                        ))}
            </div>
            {props.showReset && props.selectedIds.length > 0 && (
                <button
                    className={bem.element('reset')}
                    onClick={props.onReset}
                    aria-label={__('Сбросить')}
                />
            )}
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    {props.isAutoComplete && (
                        <div className={bem.element('search')}>
                            <input
                                {...props.searchInputProps}
                                ref={inputRef}
                                onChange={e => props.searchInputProps.onChange(e.target.value)}
                                className={bem(
                                    'form-control',
                                    'form-control-' + props.size,
                                    bem.element('search-input'),
                                    props.searchInputProps.className,
                                )}
                            />
                        </div>
                    )}
                    <div className={bem.element('drop-down-list')}>
                        {props.items.map(item => (
                            <button
                                key={String(item[props.primaryKey])}
                                type='button'
                                className={bem.element('drop-down-item', {
                                    hover: props.hoveredId === item[props.primaryKey],
                                    select: props.selectedIds.includes(item[props.primaryKey]),
                                })}
                                onClick={e => {
                                    e.preventDefault();
                                    props.onItemSelect(item[props.primaryKey]);
                                }}
                                onFocus={() => props.onItemHover(item[props.primaryKey])}
                                onMouseOver={() => props.onItemHover(item[props.primaryKey])}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
