import * as React from 'react';

import {IFieldListViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';
import {useBem} from '@steroidsjs/core/hooks';

export default function FieldListView(props: IFieldListViewProps) {
    const bem = useBem('FieldListView');
    return (
        <div
            className={bem(bem.block(), props.className)}
            ref={props.forwardedRef}
        >
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
                                    field.headerClassName,
                                )}
                            >
                                {field.label}
                            </th>
                        ))}
                        {props.showRemove && (
                            // eslint-disable-next-line jsx-a11y/control-has-associated-label
                            <th />
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
            {props.showAdd && !props.disabled && (
                <button
                    className={bem.element('link-add')}
                    onClick={e => {
                        e.preventDefault();
                        props.onAdd();
                    }}
                >
                    {__('Добавить ещё')}
                </button>
            )}
        </div>
    );
};
