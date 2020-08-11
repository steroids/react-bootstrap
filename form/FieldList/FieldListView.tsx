import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldListViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';

@bem('FieldListView')
export default class FieldListView extends React.PureComponent<IFieldListViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <table
                    className={bem(
                        bem.element('table'),
                        'table',
                        this.props.size && 'table-' + this.props.size,
                    )}
                >
                    <thead>
                        <tr>
                            {this.props.items.map((field, rowIndex) => (
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
                            {this.props.showRemove && (
                                <th/>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
                {this.props.showAdd && !this.props.disabled && (
                    <a
                        href='#'
                        className={bem.element('link-add')}
                        onClick={e => {
                            e.preventDefault();
                            this.props.onAdd(e);
                        }}
                    >
                        {__('Добавить ещё')}
                    </a>
                )}
            </div>
        );
    }

}
