import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import _get from 'lodash-es/get';
import {IPictureColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import Format from '@steroidsjs/core/ui/format/Format';

import './PictureColumnView.scss';

export default function PictureColumnView(props: IPictureColumnViewProps) {
    const bem = useBem('PictureColumnView');

    return (
        <div className={bem(bem.block({
            size: props.size,
            hasText: !!props.item[props.attribute],
            hasText_isLeft: props.picture?.isLeft && !!props.item[props.attribute],
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
            <span className={bem.element('picture')}>
                <img
                    src={_get(props.item, props.picture.property)}
                    alt="cell element"
                />
            </span>
        </div>
    );
}
