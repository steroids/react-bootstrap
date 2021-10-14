import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ICollapseViewProps} from '@steroidsjs/core/ui/content/Collapse/Collapse';

export default function CollapseView(props: ICollapseViewProps) {
    const bem = useBem('CollapseView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.children}
        </div>
    );
}
