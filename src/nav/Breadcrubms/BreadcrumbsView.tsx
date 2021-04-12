import * as React from 'react';

import Link from '@steroidsjs/core/ui/nav/Link';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IBreadcrumbsViewProps} from '@steroidsjs/core/ui/nav/Breadcrumbs/Breadcrumbs';
import {useBem} from '@steroidsjs/core/hooks';

export default function BreadcrumbsView(props: IBreadcrumbsViewProps & IBemHocOutput) {
    const bem = useBem('BreadcrumbsView');
    const items = props.items || [];

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

                            {(!item.url || isLastItem) && (
                                <span>
                                    {props.pageTitle || item.title}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
