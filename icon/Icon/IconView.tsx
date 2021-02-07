import * as React from 'react';

import './IconView.scss';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IIconViewProps} from '@steroidsjs/core/ui/icon/Icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function IconView(props: IIconViewProps & IBemHocOutput) {
    const bem = useBem('IconView');
    if (typeof props.icon === 'string' && props.icon.indexOf('<svg') === 0) {
        return (
            <span
                title={props.title}
                dangerouslySetInnerHTML={{__html: props.icon}}
                className={bem(bem.block(), props.className)}
                onClick={props.onClick}
            />
        );
    } else {
        return (
            <img
                alt={props.title}
                title={props.title}
                src={props.icon}
                className={bem(bem.block(), props.className)}
                onClick={props.onClick}
            />
        );
    }
}
