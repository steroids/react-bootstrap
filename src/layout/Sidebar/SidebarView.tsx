import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ISidebarViewProps} from '@steroidsjs/core/ui/layout/Sidebar/Sidebar';
import {Avatar, Icon, Menu} from '@steroidsjs/core/ui/content';
import {Nav} from '@steroidsjs/core/ui/nav';
import renderIcon from '../../utils/renderIcon';

export default function SidebarView(props: ISidebarViewProps) {
    const bem = useBem('SidebarView');

    return (
        <aside
            className={bem(
                bem.block({
                    isOpened: props.isOpened,
                }),
                props.className,
            )}
            style={props.style}
        >
            <header className={bem.element('header')}>
                <div className={bem.element('header-logo')}>
                    <div className={bem.element('header-logo-left')}>
                        {renderIcon(props.logo?.icon, {
                            className: bem.element('header-logo-icon'),
                        })}
                        <h3 className={bem.element('header-logo-label')}>
                            {props.logo?.label}
                        </h3>
                    </div>
                    <Icon
                        name='menu_left'
                        className={bem.element('header-logo-right')}
                        onClick={props.toggleSidebar}
                    />
                </div>
                <div className={bem.element('header-user')}>
                    <div className={bem.element('header-user-left')}>
                        <Avatar
                            size="small"
                            src={props.user?.picture}
                            className={bem.element('header-user-avatar')}
                        />
                        <p className={bem.element('header-user-name')}>
                            {props.user?.name}
                        </p>
                    </div>
                    <Menu
                        {...props?.menu}
                    />
                </div>
            </header>
            <Nav
                items={props.items}
                layout="icon"
                className={bem.element('nav')}
            />
            <footer className={bem.element('footer')}>
                <ul className={bem.element('footer-icons')}>
                    {props.footerIcons?.map((icon, iconIndex) => (
                        <li
                            key={iconIndex}
                            className={bem.element('footer-icons-item')}
                        >
                            {renderIcon(icon?.name, {
                                ...icon,
                            })}
                        </li>
                    ))}
                </ul>
            </footer>
        </aside>
    );
}
