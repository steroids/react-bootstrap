import * as React from 'react';
import {ReactText} from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function CheckboxListFieldView(props: ICheckboxListFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxListFieldView');
    const prefix = useUniqueId('checkbox');
    return (
        <div className={bem(bem.block({'is-invalid': !!props.errors}), props.className)}>
            {props.items.map(item => (
                <div
                    key={item.id as ReactText}
                    className="custom-control custom-checkbox"
                >
                    <input
                        {...props.inputProps}
                        disabled={props.disabled}
                        required={props.required}
                        id={`${prefix}_${item.id}`}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            !!props.errors && 'is-invalid',
                        )}
                        checked={props.selectedIds.includes(item.id)}
                        onChange={() => props.onItemSelect(item.id)}
                        onMouseOver={() => props.onItemHover(item.id)}
                    />
                    <label
                        className={bem(
                            bem.element('label'),
                            'custom-control-label',
                        )}
                        htmlFor={`${prefix}_${item.id}`}
                    >
                        <span className={bem.element('label-text', {required: props.required})}>
                            {item.label}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    );
}
