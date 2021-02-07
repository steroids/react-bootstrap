import * as React from 'react';
import _keyBy from 'lodash-es/keyBy';
import _isString from 'lodash-es/isString';

import {getFormId} from '@steroidsjs/core/hoc/list';
import Form from '@steroidsjs/core/ui/form/Form';
import Button from '@steroidsjs/core/ui/form/Button';
import Field from '@steroidsjs/core/ui/form/Field';
import InsideSearchFormView from './InsideSearchFormView';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IGridViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import {useBem} from '@steroidsjs/core/hooks';

export default function GridView(props: IGridViewProps & IBemHocOutput) {

    const renderTable = () => {
        return (
            <table className='table table-striped'>
                <thead>
                <tr>
                    {props.columns.map((column, columnIndex) => (
                        <th
                            key={columnIndex}
                            className={column.headerClassName}
                        >
                            {column.label}
                            {column.sortable && column.attribute && (
                                <span>
                                    {column.label && <span>&nbsp;</span>}
                                    {renderSortButton(column.attribute, 'asc')}
                                    {renderSortButton(column.attribute, 'desc')}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
                {renderInsideSearchForm()}
                </thead>
                <tbody>
                {props.items && props.items.map((item, rowIndex) => (
                    <tr key={item[props.primaryKey] || rowIndex}>
                        {props.columns.map((column, columnIndex) => (
                            <td
                                key={columnIndex}
                                className={column.className}
                                data-label={_isString(column.label) ? column.label : null}
                            >
                                {props.renderValue(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
                {props.emptyNode && (
                    <tr>
                        <td colSpan={props.columns.length}>
                            {props.emptyNode}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    const renderSortButton = (attribute, direction) => {
        const bem = useBem('');
        const sortKey = (direction === 'desc' ? '!' : '') + attribute;
        const isActive = [].concat(props.list.sort || []).includes(sortKey);
        return (
            <Button
                icon={direction === 'asc' ? 'long-arrow-alt-up' : 'long-arrow-alt-down'}
                className={bem.element('sort-button', {
                    'is-active': isActive
                })}
                link
                onClick={() => props.onSort(!isActive ? sortKey : null)}
            />
        );
    }

    const renderInsideSearchForm = () => {
        if (!props.searchForm || !props.searchForm.fields || props.searchForm.layout !== 'table') {
            return;
        }
        const fields = _keyBy(
            props.searchForm.fields
                .map(column => _isString(column) ? {attribute: column} : column),
            'attribute'
        );
        return (
            <Form
                {...props.searchForm}
                formId={getFormId(props)}
                fields={null}
                submitLabel={null}
                layout='inline'
                onSubmit={() => props.fetch()}
                view={InsideSearchFormView}
            >
                {props.columns.map((column, columnIndex) => (
                    <td
                        key={columnIndex}
                        className={column.headerClassName}
                    >
                        {column.attribute && fields[column.attribute] && (
                            <Field
                                formId={getFormId(props)}
                                {...fields[column.attribute]}
                            />
                        )}
                    </td>
                ))}
            </Form>
        );
    }

    const bem = useBem('GridView');
    return (
        <div className={bem(bem.block({loading: props.isLoading}), props.className)}>
            {props.outsideSearchFormNode}
            {props.paginationSizeNode}
            <div>
                {renderTable()}
                {props.paginationNode}
            </div>
        </div>
    );
}
