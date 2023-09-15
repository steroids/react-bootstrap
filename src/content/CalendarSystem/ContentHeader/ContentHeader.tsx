/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {ButtonGroup} from '@steroidsjs/core/ui/nav';
import {Icon} from '@steroidsjs/core/ui/content';
import CalendarEnum from '@steroidsjs/core/enums/CalendarType';
import DateControlEnum from '@steroidsjs/core/enums/DateControlType';

import './ContentHeader.scss';

interface IContentHeaderProps {
    dateToDisplay: string;
    onChangeType: (newType: string) => void;
    onClickControls: (event: React.MouseEvent<HTMLElement>) => void;
}

function ContentHeader(props: IContentHeaderProps) {
    const bem = useBem('ContentHeader');

    return (
        <div className={bem.block()}>
            <Text
                content={props.dateToDisplay}
                className={bem.element('month')}
            />
            <ul
                className={bem.element('controls')}
                onClick={props.onClickControls}
            >
                {Object.entries(DateControlEnum.getIcons()).map(([controlLabel, controlIcon], controlIndex) => (
                    <li
                        key={controlIndex}
                        className={bem.element('controls-item')}
                        data-control={controlLabel}
                    >
                        <Icon
                            className={bem.element('controls-item-icon')}
                            name={controlIcon}
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

export default React.memo(ContentHeader);
