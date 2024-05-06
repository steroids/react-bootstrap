import React, {memo} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Title from '@steroidsjs/core/ui/typography/Title/Title';
import {Button} from '@steroidsjs/core/ui/form';
import {ICalendarSystemViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

import './AsideHeader.scss';

interface IAsideHeaderProps extends Pick<
    ICalendarSystemViewProps,
    'openCreateModal'
> {
    className?: string,
}

function AsideHeader(props: IAsideHeaderProps) {
    const bem = useBem('AsideHeader');

    return (
        <div className={bem(
            bem.block(),
            props.className,
        )}
        >
            <Title
                content={__('Календарь')}
                className={bem.element('title')}
            />
            <Button
                icon="add"
                size="sm"
                label={__('Создать')}
                className={bem.element('create')}
                onClick={() => props.openCreateModal()}
            />
        </div>
    );
}

export default memo(AsideHeader);
