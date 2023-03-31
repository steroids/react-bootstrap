import * as React from 'react';
import {ReactText} from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ICheckboxListFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';
import {CheckboxField} from '@steroidsjs/core/ui/form';

export default function CheckboxListFieldView(props: ICheckboxListFieldViewProps & IBemHocOutput) {
    const bem = useBem('CheckboxListFieldView');
    const prefix = useUniqueId('checkbox');

    return (
        <div className={bem(bem.block({
            [`${props.orientation}`]: !!props.orientation,
        }))}
        >
            {props.items.map((checkbox, checkboxIndex) => (
                <CheckboxField
                    checked={props.selectedIds.includes(checkbox.id)}
                    inputProps={{
                        onChange: () => {
                            props.onItemSelect(checkbox.id);
                        },
                    }}
                    label={checkbox.label}
                    id={`${prefix}_${checkbox.id}`}
                    key={checkboxIndex}
                />
            ))}
        </div>
    );
}
