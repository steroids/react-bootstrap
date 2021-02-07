import * as React from 'react';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import {IControlsViewProps} from '@steroidsjs/core/ui/nav/Controls/Controls';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function ControlsView(props: IControlsViewProps & IBemHocOutput) {
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
    }

    const bem = useBem('ControlsView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {renderControls(props.items.filter(item => item.position !== 'right'))}
            {renderControls(props.items.filter(item => item.position === 'right'))}
        </div>
    );
}
