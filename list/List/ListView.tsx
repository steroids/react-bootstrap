import * as React from 'react';

import {IListViewProps} from '@steroidsjs/core/ui/list/List/List';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function ListView(props: IListViewProps & IBemHocOutput) {
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
    }

    return (
        <div className={bem(bem.block({loading: props.isLoading}), props.className)}>
            {props.outsideSearchFormNode}
            {renderPagination(
                ['top', 'both'].includes(props.paginationPosition) && props.paginationNode,
                ['top', 'both'].includes(props.paginationSizePosition) && props.paginationSizeNode,
                ['top', 'both'].includes(props.layoutPosition) && props.layoutNode
            )}
            <div className={bem('mb-3', bem.element('content'), props.contentClassName)}>
                {props.content}
            </div>
            {renderPagination(
                ['bottom', 'both'].includes(props.paginationPosition) && props.paginationNode,
                ['bottom', 'both'].includes(props.paginationSizePosition) && props.paginationSizeNode,
                ['bottom', 'both'].includes(props.layoutPosition) && props.layoutNode
            )}
            {props.emptyNode}
        </div>
    );

}
