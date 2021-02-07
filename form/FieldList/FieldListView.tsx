import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldListViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';
import {useBem} from '@steroidsjs/core/hooks';

export default function FieldListView(props: IFieldListViewProps & IBemHocOutput) {
    const bem = useBem('FieldListView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <table
                className={bem(
                    bem.element('table'),
                    'table',
                    props.size && 'table-' + props.size,
                )}
            >
                <thead>
                <tr>
                    {props.items.map((field, rowIndex) => (
                        <th
                            key={rowIndex}
                            className={bem(
                                bem.element('table-cell-header'),
                                field.headerClassName
                            )}
                        >
                            {field.label}
                        </th>
                    ))}
                    {props.showRemove && (
                        <th/>
                    )}
                </tr>
                </thead>
                <tbody>
                {props.children}
                </tbody>
            </table>
            {props.showAdd && !props.disabled && (
                <a
                    href='#'
                    className={bem.element('link-add')}
                    onClick={e => {
                        e.preventDefault();
                        props.onAdd(e);
                    }}
                >
                    {__('Добавить ещё')}
                </a>
            )}
        </div>
    );
}
