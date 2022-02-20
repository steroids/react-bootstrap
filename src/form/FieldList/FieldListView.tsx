import * as React from 'react';

import {IFieldListViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';
import {useBem} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';

export default function FieldListView(props: IFieldListViewProps) {
    const bem = useBem('FieldListView');
    return (
        <div
            className={bem(bem.block(), props.className)}
            style={props.style}
            ref={props.forwardedRef}
        >
            <table
                className={bem(
                    bem.element('table'),
                    'table',
                    props.size && 'table-' + props.size,
                    props.tableClassName,
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
                <tfoot>
                    <tr>
                        <td colSpan={props.items.length}>
                            {props.showAdd && !props.disabled && (
                                <Button
                                    formId={false}
                                    layout={false}
                                    color='secondary'
                                    className={bem.element('button-add')}
                                    onClick={e => {
                                        e.preventDefault();
                                        props.onAdd();
                                    }}
                                >
                                    {__('Добавить ещё')}
                                </Button>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
