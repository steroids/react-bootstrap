import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {ButtonGroup} from '@steroidsjs/core/ui/nav';
import {PresentDateInfo} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';
import {Icon} from '@steroidsjs/core/ui/content';
import CalendarEnum from '@steroidsjs/core/enums/CalendarType';

import './ContentHeader.scss';

const CONTROLS = [
    'double_arrow_left',
    'arrow_left_24x24',
    'arrow_right_24x24',
    'double_arrow_right',
];

interface IContentHeaderProps {
    allDateInfo: PresentDateInfo;
    onChangeType: (newType: string) => void;
}

export default function ContentHeader(props: IContentHeaderProps) {
    const bem = useBem('ContentHeader');

    return (
        <div className={bem.block()}>
            <Text
                content={props.allDateInfo.dateToDisplay}
                className={bem.element('month')}
            />
            <ul className={bem.element('controls')}>
                {CONTROLS.map((control, controlIndex) => (
                    <li
                        key={controlIndex}
                        className={bem.element('controls-item')}
                    >
                        <Icon
                            className={bem.element('controls-item-icon')}
                            name={control}
                        />
                    </li>
                ))}
            </ul>
            <ButtonGroup
                className={bem.element('measures')}
                items={CalendarEnum}
                onClick={props.onChangeType}
                defaultActiveButton={CalendarEnum.Month}
            />
        </div>
    );
}
