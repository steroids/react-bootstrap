import * as React from 'react';
import _keyBy from 'lodash/keyBy';
import _isString from 'lodash/isString';

import {bem} from '@steroidsjs/core/hoc';
import {getFormId} from '@steroidsjs/core/hoc/list';
import Form from '@steroidsjs/core/ui/form/Form';
import Button from '@steroidsjs/core/ui/form/Button';
import Field from '@steroidsjs/core/ui/form/Field';
import InsideSearchFormView from './InsideSearchFormView';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IGridViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';

@bem('GridView')
export default class GridView extends React.Component<IGridViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block({loading: this.props.isLoading}), this.props.className)}>
                {this.props.outsideSearchFormNode}
                {this.props.paginationSizeNode}
                <div>
                    {this.renderTable()}
                    {this.props.paginationNode}
                </div>
            </div>
        );
    }

    renderTable() {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {this.props.columns.map((column, columnIndex) => (
                            <th
                                key={columnIndex}
                                className={column.headerClassName}
                            >
                                {column.label}
                                {column.sortable && column.attribute && (
                                    <span>
                                        {column.label && <span>&nbsp;</span>}
                                        {this.renderSortButton(column.attribute, 'asc')}
                                        {this.renderSortButton(column.attribute, 'desc')}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                    {this.renderInsideSearchForm()}
                </thead>
                <tbody>
                    {this.props.items && this.props.items.map((item, rowIndex) => (
                        <tr key={item[this.props.primaryKey] || rowIndex}>
                            {this.props.columns.map((column, columnIndex) => (
                                <td
                                    key={columnIndex}
                                    className={column.className}
                                    data-label={_isString(column.label) ? column.label : null}
                                >
                                    {this.props.renderValue(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {this.props.emptyNode && (
                        <tr>
                            <td colSpan={this.props.columns.length}>
                                {this.props.emptyNode}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderSortButton(attribute, direction) {
        const bem = this.props.bem;
        const sortKey = (direction === 'desc' ? '!' : '') + attribute;
        const isActive = [].concat(this.props.list.sort || []).includes(sortKey);
        return (
            <Button
                icon={direction === 'asc' ? 'long-arrow-alt-up' : 'long-arrow-alt-down'}
                className={bem.element('sort-button', {
                    'is-active': isActive
                })}
                link
                onClick={() => this.props.onSort(!isActive ? sortKey : null)}
            />
        );
    }

    renderInsideSearchForm() {
        if (!this.props.searchForm || !this.props.searchForm.fields || this.props.searchForm.layout !== 'table') {
            return;
        }
        const fields = _keyBy(
            this.props.searchForm.fields
                .map(column => _isString(column) ? {attribute: column} : column),
            'attribute'
        );
        return (
            <Form
                {...this.props.searchForm}
                formId={getFormId(this.props)}
                fields={null}
                submitLabel={null}
                layout='inline'
                onSubmit={() => this.props.fetch()}
                view={InsideSearchFormView}
            >
                {this.props.columns.map((column, columnIndex) => (
                    <td
                        key={columnIndex}
                        className={column.headerClassName}
                    >
                        {column.attribute && fields[column.attribute] && (
                            <Field
                                formId={getFormId(this.props)}
                                {...fields[column.attribute]}
                            />
                        )}
                    </td>
                ))}
            </Form>
        );
    }

}
