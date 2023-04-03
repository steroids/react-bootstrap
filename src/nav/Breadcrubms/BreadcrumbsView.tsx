import * as React from 'react';
import Link from '@steroidsjs/core/ui/nav/Link';
import {IBreadcrumbsViewProps} from '@steroidsjs/core/ui/nav/Breadcrumbs/Breadcrumbs';
import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';
import renderIcon from '../../utils/renderIcon';

export default function BreadcrumbsView(props: IBreadcrumbsViewProps) {
    const bem = useBem('BreadcrumbsView');
    const items = props.items || [];

    const renderLink = React.useCallback((item, children) => (
        <Link
            toRoute={item.id}
            toRouteParams={props.routeParams}
            href={item.id}
        >
            {children}
        </Link>
    ), [props.routeParams]);

    const renderHomeIcon = React.useCallback(() => (
        props.customIcon
            ? renderIcon(props.customIcon, {className: bem.element('custom-icon')})
            : (
                <Icon
                    name='home'
                    className={bem.element('icon')}
                />
            )
    ), [bem, props.customIcon]);

    return (
        <nav
            className={bem(bem.block(), props.className)}
            aria-label='breadcrumb'
        >
            <ol className={bem.element('list')}>
                {items.map((item, index) => {
                    const isLastItem = items.length === index + 1;
                    const isFirstItem = index === 0;
                    return (
                        <li
                            key={item.id || index}
                            className={bem.element('item')}
                        >
                            {isFirstItem && item.id && renderLink(
                                item,
                                props.showIcon ? renderHomeIcon() : item.title,
                            )}
                            {!isFirstItem && !isLastItem && item.id && renderLink(
                                item,
                                item.title,
                            )}
                            {(isLastItem || !item.id) && (
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
