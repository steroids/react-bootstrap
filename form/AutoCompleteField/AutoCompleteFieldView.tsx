import * as React from 'react';
import {ReactText} from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAutoCompleteFieldViewProps} from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';
import {useBem} from '@steroidsjs/core/hooks';

export default function AutoCompleteFieldView(props: IAutoCompleteFieldViewProps & IBemHocOutput) {
    const bem = useBem('AutoCompleteFieldView');
    return (
        <div className={bem.block({size: props.size})}>
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
                onChange={e => props.input.onChange(e.target.value)}
                placeholder={props.placeholder}
                disabled={props.disabled}
                required={props.required}
            />
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    <div className={bem.element('drop-down-list')}>
                        {props.items.map(item => (
                            <button
                                key={item.id as ReactText}
                                className={bem.element(
                                    'drop-down-item', {hover: item.isHovered, select: item.isSelected},
                                )}
                                onClick={() => props.onItemClick(item)}
                                onMouseOver={() => props.onItemMouseOver(item)}
                            >
                                {item.labelHighlighted && (
                                    item.labelHighlighted.map((label, index) => (
                                        label[1]
                                            ? <b key={index}>{label[0]}</b>
                                            : <span key={index}>{label[0]}</span>
                                    ))
                                ) || item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
