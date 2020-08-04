import * as React from 'react';

import './IconView.scss';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IIconViewProps} from '@steroidsjs/core/ui/icon/Icon/Icon';
import _isString from 'lodash-es/isString';

interface IIconViewInnerProps extends IIconViewProps, IBemHocOutput {
    className: string,
    title: string
}

@bem('IconView')
export default class IconView extends React.PureComponent<IIconViewInnerProps> {

    render() {
        const bem = this.props.bem;

        let icon = this.props.icon;
        if (_isString(this.props.icon)) {
            // @ts-ignore
            icon = !this.props.icon.match(/<svg/)
                ? `<img alt=${this.props.name} src=${icon} />`
                : icon;
        }

        return (
            <span
                className={bem(bem.block(), this.props.className)}
                dangerouslySetInnerHTML={{__html: icon as string}}
                title={this.props.title}
            />
        );
    }
}
