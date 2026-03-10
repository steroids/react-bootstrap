import {useBem} from '@steroidsjs/core/hooks';
import {IControlsViewProps} from '@steroidsjs/core/ui/nav/Controls/Controls';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import * as React from 'react';

export default function ControlsView(props: IControlsViewProps) {
    const bem = useBem('ControlsView');

    const renderControls = (items) => {
        if (items.length === 0) {
            return null;
        }
        return (
            <Nav
                layout='button'
                {...props.navProps}
                items={items}
            />
        );
    };

    return (
        <div className={bem(bem.block(), props.className)}>
            {renderControls(props.items.filter(item => item.position !== 'right'))}
            {renderControls(props.items.filter(item => item.position === 'right'))}
        </div>
    );
}
