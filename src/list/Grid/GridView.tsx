import * as React from 'react';
import _get from 'lodash-es/get';
import _keyBy from 'lodash-es/keyBy';
import _isString from 'lodash-es/isString';

import Button from '@steroidsjs/core/ui/form/Button';
import Field from '@steroidsjs/core/ui/form/Field';
import {useBem} from '@steroidsjs/core/hooks';
import {IGridViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import {useCallback, useMemo} from 'react';

export const getFormId = props => _get(props, 'searchForm.formId', props.listId);

export default function GridView(props: IGridViewProps) {
    const bem = useBem('GridView');

    const renderInsideSearchForm = useCallback(() => {
        if (!props.searchForm || !props.searchForm.fields || props.searchForm.layout !== 'table') {
            return null;
        }

        const fields = _keyBy(
            props.searchForm.fields.map(column => _isString(column) ? {attribute: column} : column),
            'attribute',
        );
        return (
            <tr>
                {props.columns.map((column, columnIndex) => (
                    <td
                        key={columnIndex}
                        className={column.headerClassName}
                    >
                        {column.attribute && fields[column.attribute] && (
                            <Field
                                layout='inline'
                                size={props.searchForm?.size}
                                {...fields[column.attribute]}
                            />
                        )}
                    </td>
                ))}
            </tr>
        );
    }, [props.searchForm, props.columns]);

    const renderSortButton = useCallback((attribute, direction) => {
        const sortKey = (direction === 'desc' ? '-' : '') + attribute;
        const isActive = [].concat(props.list?.sort || []).includes(sortKey);
        return (
            <Button
                icon={direction === 'asc' ? 'long-arrow-alt-up' : 'long-arrow-alt-down'}
                className={bem.element('sort-button', {
                    'is-active': isActive,
                })}
                link
                onClick={(e) => {
                    e.preventDefault();
                    props.onSort(!isActive ? sortKey : null);
                }}
            />
        );
    }, [props.onSort, props.list?.sort]);

    const emptyContent = useMemo(() => props.renderEmpty(), [props.renderEmpty]);

    return props.renderList(
        <div className={bem(bem.block({loading: props.isLoading || props.list?.isLoading}), props.className)}>
            {props.renderSearchForm()}
            {props.renderPaginationSize()}
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
                {emptyContent && (
                    <tr>
                        <td colSpan={props.columns.length}>
                            {emptyContent}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {props.renderPagination()}
        </div>
    );
}
