import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IListViewProps} from '@steroidsjs/core/ui/list/List/List';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('ListView')
export default class ListView extends React.Component<IListViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block({loading: this.props.isLoading}), this.props.className)}>
                {this.props.outsideSearchFormNode}
                {this.renderPagination(
                    ['top', 'both'].includes(this.props.paginationPosition) && this.props.paginationNode,
                    ['top', 'both'].includes(this.props.paginationSizePosition) && this.props.paginationSizeNode,
                    ['top', 'both'].includes(this.props.layoutPosition) && this.props.layoutNode
                )}
                <div className={bem('mb-3', bem.element('content'), this.props.contentClassName)}>
                    {this.props.content}
                </div>
                {this.renderPagination(
                    ['bottom', 'both'].includes(this.props.paginationPosition) && this.props.paginationNode,
                    ['bottom', 'both'].includes(this.props.paginationSizePosition) && this.props.paginationSizeNode,
                    ['bottom', 'both'].includes(this.props.layoutPosition) && this.props.layoutNode
                )}
                {this.props.emptyNode}
            </div>
        );
    }

    renderPagination(pagination, paginationSize, layout) {
        const bem = this.props.bem;

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

}
