/* eslint-disable consistent-return */
import * as React from 'react';

import {Link} from '@steroidsjs/core/ui/nav';
import {IHeaderViewProps} from '@steroidsjs/core/ui/layout/Header/Header';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import {useBem, useDispatch} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';
import {openModal} from '@steroidsjs/core/actions/modal';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {Avatar, Icon, Menu} from '@steroidsjs/core/ui/content';
import {ILinkProps} from '@steroidsjs/core/ui/nav/Link/Link';
import renderIcon from '../../utils/renderIcon';

export default function HeaderView(props: IHeaderViewProps) {
    const bem = useBem('HeaderView');
    const dispatch = useDispatch();

    const renderAuthBlock = React.useCallback(() => (
        <Button
            outline
            color='basic'
            toRoute={props.authParams?.toRoute}
            className={bem.element('auth-btn')}
            size={props.size}
            {...props.authParams?.buttonProps}
            onClick={() => dispatch(openModal(props.authParams?.modal))}
        >
            {__('Войти')}
        </Button>

    ), [bem, dispatch, props.authParams?.buttonProps, props.authParams?.modal, props.authParams?.toRoute, props.size]);

    const renderUserBlock = React.useCallback(() => {
        if (!props.user) {
            return;
        }

        return (
            <div className={bem.element('menu')}>
                <Text className={bem.element('menu-name')}>{props.user?.name}</Text>
                <Menu
                    icon={(
                        <Avatar
                            size={props.size}
                            className={bem.element('menu-avatar')}
                            {...props.user?.avatar}
                        />
                    )}
                    {...props.user?.menu}
                />
            </div>
        );
    }, [bem, props.size, props.user]);

    const renderBurger = React.useCallback(() => (
        <div className={bem.element('burger')}>
            <Icon
                name={!props.isBurgerOpened ? 'sort' : 'cross_12x12'}
                className={bem.element('burger-icon')}
                onClick={props.toggleBurger}
            />
            <div className={bem.element('burger-menu', {
                isVisible: props.isBurgerOpened,
            })}
            >
                <ul className={bem.element('burger-list')}>
                    {props.burgerMenu.links?.map((linkProps: ILinkProps, linkIndex) => (
                        <li
                            key={linkIndex}
                            className="burger-item"
                        >
                            <Link {...linkProps} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ), [bem, props.burgerMenu?.links, props.isBurgerOpened, props.toggleBurger]);

    return (
        <header
            className={bem(
                bem.block({
                    size: props.size,
                }),
                props.className,
            )}
            style={props.style}
        >
            {props.logo && (
                <Link
                    className={bem(
                        bem.element('logo'),
                        props.logo.className,
                    )}
                    toRoute='root'
                    size={props.size}
                    {...props.logo.linkProps}
                >
                    {props.logo.icon && (
                        renderIcon(props.logo.icon, {
                            className: bem.element('logo-image'),
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
                    className={bem.element('nav')}
                    {...props.nav}
                />

            )}
            {(props.burgerMenu || props.authParams || props.user) && (
                <div className={bem.element('interaction')}>
                    {props?.authParams?.isAuth ? renderAuthBlock() : renderUserBlock()}
                    {props.burgerMenu && renderBurger()}
                </div>
            )}
            {props.children}
        </header>
    );
}
