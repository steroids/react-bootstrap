import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';
import {IDashboardItemViewProps} from '@steroidsjs/core/ui/content/Dashboard/Dashboard';
import {Title} from '@steroidsjs/core/ui/typography';
import React from 'react';

export default function DashboardItemView(props: IDashboardItemViewProps) {
    const bem = useBem('DashboardItemView');

    return (
        <div className={bem.block()}>
            <div className={bem.element('header')}>
                {props.iconName && <Icon name={props.iconName} /> }
                <Title
                    content={props.title}
                    type='h3'
                />
            </div>
            {props.children}
        </div>
    );
}
