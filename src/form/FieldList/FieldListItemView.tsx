import * as React from 'react';

import {IFieldListItemViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';
import {useBem} from '@steroidsjs/core/hooks';
import {Field} from '@steroidsjs/core/ui/form';
import {Icon} from '@steroidsjs/core/ui/content';

export default React.memo((props: IFieldListItemViewProps) => {
    const bem = useBem('FieldListItemView');
    return (
        <tr className={bem.block()}>
            {props.items.map((field, index) => (
                <td
                    key={index}
                    className={field.className}
                >
                    <Field
                        {...field}
                        prefix={props.prefix}
                    />
                </td>
            ))}
            {props.showRemove && (
                <td>
                    {(!props.required || props.rowIndex > 0) && (
                        <button
                            type='button'
                            className={bem.element('remove')}
                            onClick={e => {
                                e.preventDefault();
                                props.onRemove(props.rowIndex);
                            }}
                        >
                            <Icon name={props.removeIcon || 'circle_cross_18x18'} />
                        </button>
                    )}
                </td>
            )}
        </tr>
    );
});
