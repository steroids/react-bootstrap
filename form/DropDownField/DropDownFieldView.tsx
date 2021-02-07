import * as React from 'react';
import {ReactText} from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';

export default function DropDownFieldView(props: IDropDownFieldViewProps & IBemHocOutput) {

    /* TODO Move to core component
    static defaultProps = {
        searchAutoFocus: true,
    };

    componentDidUpdate(prevProps) {
        // Auto focus on search
        if (props.searchAutoFocus && props.autoComplete && !prevProps.isOpened && props.isOpened) {
            const element: any = findDOMNode(this);
            const input = element.querySelector('.' + props.bem.element('search-input'));
            if (input) {
                input.focus();
            }
        }
    }*/

    const bem = useBem('DropDownFieldView');
    return (
        <div className={bem.block({size: props.size})}>
            <div
                className={bem.element('selected-items', {
                    reset: props.showReset,
                    'no-border': props.noBorder,
                    'is-invalid': props.isInvalid,
                })}
                onClick={props.onOpen}
            >
                {props.multiple ?
                    props.selectedItems.map(item => (
                        <span
                            key={item.id as ReactText}
                            className={bem.element('selected-item-multiple')}
                        >
                                {item.label}
                            <span
                                className={bem.element('selected-item-multiple-remove')}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    props.onItemRemove(item);
                                }}
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
                                          3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
                                    </svg>
                                </span>
                            </span>
                    )) :
                    props.selectedItems.map(item => (
                        <span
                            key={item.id as ReactText}
                            className={bem.element('selected-item')}
                        >
                            {item.label}
                        </span>
                    ))
                }
            </div>
            {props.showReset && !!props.selectedItems.length && (
                <span
                    className={bem.element('reset')}
                    onClick={props.onReset}
                />
            )}
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    {props.autoComplete.enable && (
                        <div className={bem.element('search')}>
                            <input
                                {...props.searchInputProps}
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
                            <div
                                key={item.id as ReactText}
                                className={bem.element('drop-down-item', {
                                    hover: item.isHovered,
                                    select: item.isSelected
                                })}
                                onClick={() => props.onItemClick(item)}
                                onMouseOver={() => props.onItemMouseOver(item)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
