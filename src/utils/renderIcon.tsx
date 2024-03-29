/* eslint-disable valid-typeof */
import React from 'react';
import Icon, {IIconProps} from '@steroidsjs/core/ui/content/Icon/Icon';

/**
* Функция которая проверяет соответствует ли typeof icon === 'string', если да - то вернет компонент Icon
* с переданным в него iconProps, если нет то вернется span с классом iconProps.className со вложенным {icon}
* @example renderIcon(props.leadIcon, {className: 'leadIcon', tabIndex: -1})
*/
const renderIcon = (
    icon: string | React.ReactElement,
    iconProps: IIconProps,
) => typeof icon === 'string'
    ? (
        <Icon
            name={icon}
            {...iconProps}
        />
    ) : (
        <span className={iconProps.className}>
            {icon}
        </span>
    );

export default renderIcon;
