import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IRadioListFieldViewProps} from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function RadioListFieldView(props: IRadioListFieldViewProps & IBemHocOutput) {
    const bem = useBem('RadioListFieldView');
    const prefix = useUniqueId('radio');

    return (
        <div className={bem.block()}>
            {props.items.map((item, index) => (
                <div
                    key={typeof item.id !== 'boolean' ? item.id : (item.id ? 'true' : 'false')}
                    className={bem(
                        bem.element('item', {
                            hasError: !!props.errors,
                            size: props.size,
                        }),
                        props.className,
                    )}
                >
                    <input
                        {...props.inputProps}
                        id={`${prefix}_${item.id}`}
                        tabIndex={index}
                        className={bem(
                            bem.element('input', {
                                checked: props.selectedIds.includes(item.id),
                            }),
                        )}
                        checked={props.selectedIds.includes(item.id)}
                        disabled={props.disabled || item.disabled}
                        onChange={() => {
                            props.onItemSelect(item.id);
                        }}
                    />
                    <label
                        htmlFor={`${prefix}_${item.id}`}
                        className={bem.element('label')}
                    >
                        {item.label}
                    </label>
                    <span className={bem.element('ellipse')} />
                </div>
            ))}
        </div>
    );
}
