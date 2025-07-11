import {memo, ReactElement} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Icon} from '@steroidsjs/core/ui/content';
import renderIcon from '../../../utils/renderIcon';

import './SidebarLogo.scss';

interface ISidebarLogoProps {
    icon: string | ReactElement,
    label: string,
    toggleSidebar: () => void,
}

function SidebarLogo(props: ISidebarLogoProps) {
    const bem = useBem('SidebarLogo');

    return (
        <div className={bem.block()}>
            <div
                className={bem.element('left')}
            >
                {renderIcon(props.icon, {
                    className: bem.element('icon'),
                })}
                <h3 className={bem.element('label')}>
                    {props.label}
                </h3>
            </div>
            <Icon
                name='menu_left'
                className={bem.element('right')}
                onClick={props.toggleSidebar}
            />
        </div>
    );
}

export default memo(SidebarLogo);
