/* eslint-disable valid-typeof */
import React from 'react';
import Icon, {IIconProps} from '@steroidsjs/core/ui/content/Icon/Icon';

/**
* Функция которая проверяет соответствует ли typeof entity === 'expectedEntityType', если да - то вернет компонент Icon
* с переданным в него trueConditionIconProps, если нет то вернется falseConditionJSX.
* @example renderIconByType(
            props.leadIcon,
            'string',
            {
                name: props.leadIcon as string,
                className,
                tabIndex: -1,
            },
            <span className={className}>
                {props.leadIcon}
            </span>,
        )
*/
const renderIconByType = (
    entity: any,
    expectedEntityType: string,
    trueConditionIconProps: IIconProps,
    falseConditionJSX: React.ReactElement,
) => typeof entity === expectedEntityType ? <Icon {...trueConditionIconProps} /> : falseConditionJSX;

export default renderIconByType;
