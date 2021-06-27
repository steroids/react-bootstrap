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
        <div className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <div
                    key={item.id as ReactText}
                    className="custom-control custom-checkbox"
                >
                    <input
                        {...props.inputProps}
                        id={`${prefix}_${item.id}`}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            !!props.errors && 'is-invalid',
                        )}
                        checked={props.selectedIds.includes(item.id)}
                        disabled={props.disabled}
                        onChange={() => {
                            props.onItemSelect(item.id);
                        }}
                        onMouseOver={() => props.onItemHover(item.id)}
                    />
                    <label
                        className="custom-control-label"
                        htmlFor={`${prefix}_${item.id}`}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
