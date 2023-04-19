import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IIconColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import Format from '@steroidsjs/core/ui/format/Format';
import {Icon} from '@steroidsjs/core/ui/content';
import _get from 'lodash-es/get';

import './IconColumnView.scss';

export default function IconColumnView(props: IIconColumnViewProps) {
    const bem = useBem('IconColumnView');

    return (
        <div className={bem(bem.block({
            size: props.size,
            hasText: !!props.item[props.attribute],
            hasText_isLeft: props.icon?.isLeft && !!props.item[props.attribute],
        }))}
        >
            <span className={bem.element('value')}>
                <Format
                    item={props.item}
                    model={props.model}
                    {...props}
                    {...(props.formatter || {})}
                />
            </span>
            <Icon name={_get(props.item, props.icon.property)} />
        </div>
    );
}
