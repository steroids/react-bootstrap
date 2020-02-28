import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('PaginationButtonView')
export default class PaginationButtonView extends React.PureComponent<IPaginationViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <ul className={bem(
                this.props.className,
                bem.block(),
                'flex-row',
                'pagination',
                `pagination-${this.props.size}`
            )}>
                {this.props.pages.map((item, index) => (
                    <li
                        key={index}
                        className={bem(
                            bem.element('page', {hidden: !item.page}),
                            'page-item',
                            item.isActive ? 'active' : ''
                        )}
                    >
                        <a
                            className={bem(
                                bem.element('page-link', {hidden: !item.page}),
                                'page-link'
                            )}
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                this.props.onSelect(item.page);
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

}
