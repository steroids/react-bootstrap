import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import {IControlsViewProps} from '@steroidsjs/core/ui/nav/Controls/Controls';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('ControlsView')
export default class ControlsView extends React.Component<IControlsViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.renderControls(this.props.items.filter(item => item.position !== 'right'))}
                {this.renderControls(this.props.items.filter(item => item.position === 'right'))}
            </div>
        );
    }

    renderControls(items) {
        if (items.length === 0) {
            return null;
        }
        return (
            <Nav
                layout='button'
                {...this.props.navProps}
                items={items}
            />
        );
    }

}
