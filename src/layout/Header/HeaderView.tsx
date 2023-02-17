import * as React from 'react';

import {Link} from '@steroidsjs/core/ui/nav';
import {IHeaderViewProps} from '@steroidsjs/core/ui/layout/Header/Header';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function HeaderView(props: IHeaderViewProps) {
    const bem = useBem('HeaderView');
    return (
        <nav
            className={bem(
                'navbar navbar-expand-lg',
                props.dark ? 'navbar-dark' : 'navbar-light',
                props.dark ? 'bg-dark' : 'bg-light',
                bem.block(),
                props.className,
            )}
        >
            {props.logo && (
                <Link
                    className={bem('navbar-brand', bem.element('logo'))}
                    toRoute='root'
                    {...props.logo.linkProps}
                >
                    {props.logo.icon && (
                        <Icon
                            className={bem.element('logo-image')}
                            name={props.logo.icon}
                            title={props.logo.title}
                        />
                    )}
                    {props.logo.title || ''}
                </Link>
            )}
            {props.nav && (
                <Nav
                    layout='navbar'
                    {...props.nav}
                />
            )}
            {props.children}
        </nav>
    );
}
