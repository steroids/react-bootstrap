import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Link from '@steroidsjs/core/ui/nav/Link';

@bem('Breadcrumbs')
export default class Breadcrumbs extends React.PureComponent {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        params: PropTypes.string,
        pageId: PropTypes.string,
        pageTitle: PropTypes.string,
    };

    static defaultProps = {
        items: [],
    };


    render() {
        const bem = this.props.bem;
        const items = this.props.items;
        
        return (
            <nav
                className={bem.block()}
                aria-label='breadcrumb'
            >
                <ol className={bem(bem.element('list'), 'breadcrumb')}>
                    {items.map((item, index) => {
                        const isLastItem = items.length === index + 1;

                        return (
                            <li
                                key={item.id}
                                className={bem(bem.element('item'), 'breadcrumb-item')}
                            >
                                {item.url && !isLastItem && (
                                    <Link
                                        to={item.url}
                                    >
                                        {item.title}
                                    </Link>
                                )}

                                {!item.url || isLastItem && (
                                    <span>
                                        {this.props.pageTitle || item.title}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        );
    }
}
