import * as React from 'react';

import {IListViewProps} from '@steroidsjs/core/ui/list/List/List';
import {useBem} from '@steroidsjs/core/hooks';

export default function ListView(props: IListViewProps) {
    const bem = useBem('ListView');

    const renderPagination = (pagination, paginationSize, layout) => {
        if (!pagination && !paginationSize && !layout) {
            return null;
        }

        return (
            <div className={bem('row mb-3', bem.element('pagination'))}>
                <div className='col-4'>
                    &nbsp;
                </div>
                <div className='col-4'>
                    {pagination}
                </div>
                <div className='col-4 d-flex justify-content-end'>
                    {layout}
                    {paginationSize}
                </div>
            </div>
        );
    };

    return props.renderList(
        <div className={bem(bem.block({loading: props.isLoading}), props.className)}>
            {props.renderSearchForm()}
            {renderPagination(
                ['top', 'both'].includes(props.paginationPosition) && props.renderPagination(),
                ['top', 'both'].includes(props.paginationSizePosition) && props.renderPaginationSize(),
                ['top', 'both'].includes(props.layoutNamesPosition) && props.renderLayoutNames(),
            )}
            <div className={bem('mb-3', bem.element('content'), props.contentClassName)}>
                {props.content}
            </div>
            {renderPagination(
                ['bottom', 'both'].includes(props.paginationPosition) && props.renderPagination(),
                ['bottom', 'both'].includes(props.paginationSizePosition) && props.renderPaginationSize(),
                ['bottom', 'both'].includes(props.layoutNamesPosition) && props.renderLayoutNames(),
            )}
            {props.renderEmpty()}
        </div>
    );
}
