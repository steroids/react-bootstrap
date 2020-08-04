import React from 'react';
import PropTypes from 'prop-types';
import {IControlsColumnViewProps} from '@steroidsjs/core/ui/list/ControlsColumn/ControlsColumn';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import Controls from '@steroidsjs/core/ui/nav/Controls';

@bem('ControlsColumnView')
export default class ControlsColumnView extends React.PureComponent<IControlsColumnViewProps & IBemHocOutput> {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
            ]),
            icon: PropTypes.string,
            label: PropTypes.string,
        })),
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <Controls
                    {...this.props}
                    navProps={{
                        layout: 'icon',
                    }}
                    items={this.props.items}
                />
            </div>
        );
    }
}
