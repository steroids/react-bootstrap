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
        const isActive = [].concat(props?.sort || []).includes(sortKey);
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
    }, [bem, props]);

    const infiniteScroll = useMemo(() => props.renderInfiniteScroll(), [props]);
    const emptyContent = useMemo(() => props.renderEmpty(), [props]);
    const loading = useMemo(() => props.renderLoading(), [props]);

    return props.renderList(
        <div className={bem(
            bem.block(
                {
                    loading: props.isLoading || props.list?.isLoading,
                    size: props.size,
                    alternatingColors: props.hasAlternatingColors,
                },
            ), props.className,
        )}
        >
            {props.renderSearchForm()}
            {props.renderPaginationSize()}
            <table className={bem.element('table')}>
                <thead>
                    <tr>
                        {props.columns.map((column, columnIndex) => (
                            <th
                                key={columnIndex}
                                className={column.headerClassName}
                            >
                                {column.label}
                                {column.sortable && column.attribute && (
                                    <span className={bem.element('sort-buttons')}>
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
                                    className={bem(
                                        bem.element('column', {
                                            isDiagram: !!column.diagram,
                                        }),
                                        column.className,
                                    )}
                                    data-label={_isString(column.label) ? column.label : null}
                                >
                                    {props.renderValue(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {(loading || emptyContent) && (
                        <tr>
                            <td colSpan={props.columns.length}>
                                {loading || emptyContent}
                            </td>
                        </tr>
                    )}
                    {!loading && infiniteScroll && (
                        <tr className={bem.element('infinite-scroll')}>
                            <td>
                                {infiniteScroll}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {props.renderPagination()}
        </div>,
    );
}
