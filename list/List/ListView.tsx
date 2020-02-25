import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IListViewProps} from '@steroidsjs/core/ui/list/List/List';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('ListView')
export default class ListView extends React.Component<IListViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        if (this.props.reverse) {
            return (
                <div className={bem(bem.block({loading: this.props.isLoading}), this.props.className)}>
                    {this.props.layoutNames}
                    {this.props.outsideSearchForm}
                    {this.props.paginationSize}
                    {this.props.pagination}
                    {this.props.content}
                    {this.props.empty}
                </div>
            );
        } else {
            return (
                <div className={bem(bem.block(), this.props.className)}>
                    {this.props.layoutNames}
                    {this.props.outsideSearchForm}
                    {this.props.paginationSize}
                    {this.props.content}
                    {this.props.pagination}
                    {this.props.empty}
                </div>
            );
        }
    }

}
