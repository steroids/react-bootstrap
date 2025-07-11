import useBem from '@steroidsjs/core/hooks/useBem';
import {ISidebarViewProps} from '@steroidsjs/core/ui/layout/Sidebar/Sidebar';
import {Nav} from '@steroidsjs/core/ui/nav';
import SidebarUser from './SidebarUser';
import SidebarLogo from './SidebarLogo';
import FooterIcons from './FooterIcons';

export default function SidebarView(props: ISidebarViewProps) {
    const bem = useBem('SidebarView');

    return (
        <aside
            className={bem(
                bem.block({
                    isOpened: props.isOpened,
                    hasSeparatedItem: props.hasSeparatedNavItem,
                }),
                props.className,
            )}
            style={props.style}
        >
            <header className={bem.element('header')}>
                <SidebarLogo
                    icon={props.logo.icon}
                    label={props.logo.label}
                    toggleSidebar={props.toggleSidebar}
                />
                <SidebarUser
                    menu={props.menu}
                    name={props.user.name}
                    picture={props.user.picture}
                />
            </header>
            <Nav
                items={props.items}
                layout="icon"
                className={bem.element('nav')}
                onChange={props?.onClickNav}
            />
            <footer className={bem.element('footer')}>
                <FooterIcons
                    footerIcons={props.footerIcons}
                    isShink={!props.isOpened}
                />
            </footer>
            <div
                className={bem.element('trigger')}
                onClick={props.toggleSidebar}
            />
        </aside>
    );
}
