import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAutoCompleteFieldViewProps} from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';
import {useBem} from '@steroidsjs/core/hooks';

export default function AutoCompleteFieldView(props: IAutoCompleteFieldViewProps & IBemHocOutput) {
    const bem = useBem('AutoCompleteFieldView');
    return (
        <div
            ref={props.forwardedRef}
            className={bem.block({size: props.size})}
        >
            <input
                {...props.inputProps}
                className={bem(
                    bem.block({
                        size: props.size,
                    }),
                    'form-control',
                    'form-control-' + props.size,
                    props.isInvalid && 'is-invalid',
                    props.inputProps.className,
                    props.className,
                )}
                onClick={(e) => {
                    e.preventDefault();
                    props.onOpen();
                }}
                onChange={e => props.inputProps.onChange(e.target.value)}
                placeholder={props.placeholder}
                disabled={props.disabled}
                required={props.required}
            />
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    <div className={bem.element('drop-down-list')}>
                        {props.items.map(item => (
                            <button
                                key={String(item[props.primaryKey])}
                                className={bem.element('drop-down-item', {
                                        hover: props.hoveredId === item[props.primaryKey],
                                        select: props.selectedIds.includes(item[props.primaryKey]),
                                })}
                                onClick={() => props.onItemSelect(item[props.primaryKey])}
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
