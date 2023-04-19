import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ISubtitleColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import Format from '@steroidsjs/core/ui/format/Format';

import './SubtitleColumnView.scss';

export default function SubtitleColumnView(props: ISubtitleColumnViewProps) {
    const bem = useBem('SubtitleColumnView');

    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
        )}
        >
            <span className={bem.element('value')}>
                <Format
                    item={props.item}
                    model={props.model}
                    {...props}
                    {...(props.formatter || {})}
                />
            </span>
            <span className={bem.element('subtitle')}>{props.item[props.subtitle]}</span>
        </div>
    );
}
