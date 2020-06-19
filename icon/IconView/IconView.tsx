import React from 'react';

import './IconView.scss';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IIconViewProps} from '@steroidsjs/core/ui/icon/Icon';

interface IIconViewInnerProps extends IIconViewProps, IBemHocOutput {
    className: string,
    title: string
}

@bem('IconView')
export default class IconView extends React.PureComponent<IIconViewInnerProps> {

    render() {
        const bem = this.props.bem;
        return (
            <span
                className={bem(bem.block(), this.props.className)}
                dangerouslySetInnerHTML={{__html: this.props.icon}}
                title={this.props.title}
            />
        );
    }
}
