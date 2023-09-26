import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Menu, {IMenuProps} from '@steroidsjs/core/ui/content/Menu/Menu';
import {Avatar} from '@steroidsjs/core/ui/content';

import './SidebarUser.scss';

interface ISidebarUserProps {
    menu: IMenuProps,
    name: string,
    picture: string,
}

function SidebarUser(props: ISidebarUserProps) {
    const bem = useBem('SidebarUser');

    return (
        <div className={bem.block()}>
            <div className={bem.element('left')}>
                <Avatar
                    size="sm"
                    src={props.picture}
                    className={bem.element('avatar')}
                />
                <p className={bem.element('name')}>
                    {props.name}
                </p>
            </div>
            <Menu
                {...props?.menu}
            />
        </div>
    );
}

export default memo(SidebarUser);
