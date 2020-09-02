import * as React from 'react';

import './IconView.scss';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IIconViewProps} from '@steroidsjs/core/ui/icon/Icon/Icon';

@bem('IconView')
export default class IconView extends React.PureComponent<IIconViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        if (typeof this.props.icon === 'string' && this.props.icon.indexOf('<svg') === 0) {
            return (
                <span
                    title={this.props.title}
                    dangerouslySetInnerHTML={{__html: this.props.icon}}
                    className={bem(bem.block(), this.props.className)}
                />
            );
        } else {
            return (
                <img
                    alt={this.props.title}
                    title={this.props.title}
                    src={this.props.icon}
                    className={bem(bem.block(), this.props.className)}
                />
            );
        }
    }
}
