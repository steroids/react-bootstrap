import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldListItemViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';
import {useBem} from '@steroidsjs/core/hooks';
import {Field} from '@steroidsjs/core/ui/form';

export default function FieldListItemView(props: IFieldListItemViewProps & IBemHocOutput) {
    const bem = useBem('FieldListItemView');
    return (
        <tr>
            {props.items.map((field, index) => (
                <td
                    key={index}
                    className={bem(
                        bem.element('table-cell'),
                        field.className,
                    )}
                >
                    <Field {...field} prefix={props.prefix}/>
                </td>
            ))}
            {props.showRemove && (
                <td className={bem.element('table-cell', 'remove')}>
                    {(!props.required || props.rowIndex > 0) && (
                        <button
                            className={bem.element('remove')}
                            onClick={() => props.onRemove(props.rowIndex)}
                        >
                            &times;
                        </button>
                    )}
                </td>
            )}
        </tr>
    );
}
