import * as React from 'react';

import {IListViewProps} from '@steroidsjs/core/ui/list/List/List';
import {useBem} from '@steroidsjs/core/hooks';

import './ListView.scss';

export default function ListView(props: IListViewProps) {
    const bem = useBem('ListView');

    if (!props.list) {
        return null;
    }

    const renderPagination = (pagination, paginationSize, layout) => {
        if (!pagination && !paginationSize && !layout) {
            return null;
        }

        return (
            <div className={bem.element('pagination')}>
                <div>
                    {pagination}
                </div>
                <div className={bem.element('pagination-sizes')}>
                    {layout}
                    {paginationSize}
                </div>
            </div>
        );
    };

    return props.renderList(
        <div className={bem(bem.block({loading: props.isLoading || props.list.isLoading}), props.className)}>
            {props.renderSearchForm()}
            {renderPagination(
                ['top', 'both'].includes(props.paginationPosition) && props.renderPagination(),
                ['top', 'both'].includes(props.paginationSizePosition) && props.renderPaginationSize(),
                ['top', 'both'].includes(props.layoutNamesPosition) && props.renderLayoutNames(),
            )}
            <div className={bem(bem.element('content'), props.contentClassName)}>
                {props.content}
            </div>
            {renderPagination(
                ['bottom', 'both'].includes(props.paginationPosition) && props.renderPagination(),
                ['bottom', 'both'].includes(props.paginationSizePosition) && props.renderPaginationSize(),
                ['bottom', 'both'].includes(props.layoutNamesPosition) && props.renderLayoutNames(),
            )}
            {props.renderEmpty()}
        </div>,
    );
}
