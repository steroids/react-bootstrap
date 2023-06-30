import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ISidebarViewProps} from '@steroidsjs/core/ui/layout/Sidebar/Sidebar';
import Title from '@steroidsjs/core/ui/typography/Title/Title';
import {Avatar, Icon, Menu} from '@steroidsjs/core/ui/content';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {Nav} from '@steroidsjs/core/ui/nav';
import renderIcon from '../../utils/renderIcon';

export default function SidebarView(props: ISidebarViewProps) {
    const bem = useBem('SidebarView');

    return (
        <aside className={bem(
            bem.block(),
            props.className,
        )}
        >
            <header className={bem.element('header')}>
                <div className={bem.element('header-logo')}>
                    {renderIcon(props.logo?.icon, {
                        className: bem.element('header-logo-icon'),
                    })}
                    <Title
                        content={props.logo?.label}
                        className={bem.element('header-logo-label')}
                    />
                </div>
                <div className={bem.element('header-user')}>
                    <div>
                        <Avatar
                            src={props.user?.picture}
                            className={bem.element('header-user-avatar')}
                        />
                        <Text
                            className={bem.element('header-user-name')}
                            content={props.user?.name}
                        />
                    </div>
                    <Menu
                        {...props?.menu}
                        className={bem.element('header-user-menu')}
                    />
                </div>
                <Icon name='' />
            </header>
            <Nav
                items={props.navItems}
                layout="icon"
                className={bem.element('nav')}
            />
            <footer className={bem.element('footer')}>
                {props.footerIcons?.map((icon) => renderIcon(icon?.name, {
                    ...icon,
                }))}
            </footer>
        </aside>
    );
}
