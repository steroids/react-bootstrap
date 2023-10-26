import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IDashboardItemViewProps} from '@steroidsjs/core/ui/content/Dashboard/Dashboard';
import {Title} from '@steroidsjs/core/ui/typography';

export default function DashboardItemView(props: IDashboardItemViewProps) {
    const bem = useBem('DashboardItemView');

    return (
        <div className={bem.block()}>
            <Title content={props.title} />
            {props.children}
        </div>
    );
}
