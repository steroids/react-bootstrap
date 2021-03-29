import * as React from 'react';
import {ReactText, useMemo} from 'react';
import _uniqueId from 'lodash-es/uniqueId';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import {useBem} from '@steroidsjs/core/hooks';

export default function CheckboxListFieldView(props: ICheckboxListFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxListFieldView');
    // TODO fix id generation
    const checkboxId = useMemo(() => _uniqueId('checkbox_'), []);
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <div
                    key={item.id as ReactText}
                    className='custom-control custom-checkbox'
                >
                    <input
                        {...props.inputProps}
                        id={'checkbox_' + item.id}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            props.isInvalid && 'is-invalid',
                        )}
                        checked={props.selectedIds.includes(item.id)}
                        disabled={props.disabled}
                        onChange={(e) => {
                            props.inputProps.onChange(e.target.value);
                            props.onItemSelect(item.id);
                        }}
                        onMouseOver={() => props.onItemHover(item.id)}
                    />
                    <label
                        className='custom-control-label'
                        htmlFor={'checkbox_' + item.id}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
