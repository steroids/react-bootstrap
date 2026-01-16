import {useBem} from '@steroidsjs/core/hooks';
import {IControlsColumnViewProps} from '@steroidsjs/core/ui/list/ControlsColumn/ControlsColumn';
import Controls from '@steroidsjs/core/ui/nav/Controls';
import * as React from 'react';

export default function ControlsColumnView(props: IControlsColumnViewProps) {
    const bem = useBem('ControlsColumnView');
    return (
        <div className={bem.block()}>
            <Controls
                {...props}
                navProps={{
                    layout: 'icon',
                }}
                items={props.items}
            />
        </div>
    );
}
