import * as React from 'react';

import {Link} from '@steroidsjs/core/ui/nav';
import {IHeaderViewProps} from '@steroidsjs/core/ui/layout/Header/Header';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import Avatar from '@steroidsjs/core/ui/content/Avatar/Avatar';
import renderIcon from '../../utils/renderIcon';

export default function HeaderView(props: IHeaderViewProps) {
    const bem = useBem('HeaderView');
    return (
        <header
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            {props.logo && (
                <Link
                    className={bem.element('logo')}
                    toRoute='root'
                    {...props.logo.linkProps}
                >
                    {props.logo.icon && (
                        renderIcon(props.logo.icon, {
                            className: bem.element('logo-image'),
                            title: props.logo.title,
                        })
                    )}
                    <span className={bem.element('logo-title')}>
                        {props.logo.title || ''}
                    </span>
                </Link>
            )}
            {props.nav && (
                <Nav
                    size={props.size}
                    layout='navbar'
                    {...props.nav}
                />
            )}
            {props.auth && (typeof props.auth === 'string'
                ? (
                    <Button
                        outline
                        color='basic'
                        toRoute={props.auth}
                        className={bem.element('auth-btn')}
                        size={props.size}
                    >
                        {__('Войти')}
                    </Button>
                )
                : (
                    <div className={bem.element('user')}>
                        <Text className={bem.element('user-name')}>{props.auth?.username}</Text>
                        <Avatar
                            {...props.auth?.userAvatar}
                            className={bem.element('user-avatar')}
                            size={props.size}
                        />
                    </div>
                ))}
            {props.children}
        </header>
    );
}
