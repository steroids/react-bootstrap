import * as React from 'react';
import {ReactText, useMemo} from 'react';
import _uniqueId from 'lodash-es/uniqueId';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import {useBem} from '@steroidsjs/core/hooks';

export default function CheckboxListFieldView(props: ICheckboxListFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxListFieldView');
    const checkboxId = useMemo(() => _uniqueId('checkbox'), []);
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.items.map(item => (
                <div
                    key={item.id as ReactText}
                    className='custom-control custom-checkbox'
                >
                    <input
                        {...props.inputProps}
                        id={checkboxId}
                        className={bem(
                            bem.element('input'),
                            'custom-control-input',
                            props.isInvalid && 'is-invalid',
                        )}
                        checked={item.isSelected}
                        disabled={props.disabled}
                        onChange={() => props.onItemClick(item)}
                    />
                    <label
                        className='custom-control-label'
                        htmlFor={checkboxId}
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
