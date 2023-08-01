import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Icon, {IIconProps} from '@steroidsjs/core/ui/content/Icon/Icon';
import renderIcon from '../../../utils/renderIcon';

import './FooterIcons.scss';

interface IFooterIconsProps {
    footerIcons?: IIconProps[];
    isShink?: boolean;
}

function FooterIcons(props: IFooterIconsProps) {
    const bem = useBem('FooterIcons');

    return (
        <ul className={bem(bem.block(
            {
                isShrink: props.isShink,
            },
        ))}
        >
            {props.isShink
                ? (
                    <Icon
                        name='share'
                        className={bem.element('item')}
                    />
                )
                : props.footerIcons?.map((icon, iconIndex) => (
                    <li
                        key={iconIndex}
                        className={bem.element('item')}
                    >
                        {renderIcon(icon?.name, {
                            ...icon,
                        })}
                    </li>
                ))}
        </ul>
    );
}

export default memo(FooterIcons);
