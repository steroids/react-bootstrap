import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITitleViewProps} from '@steroidsjs/core/ui/typography/Title/Title';

const TYPE_MAPPING = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle: 'h6',
};

export default function TitleView(props: ITitleViewProps) {
    const bem = useBem('TitleView');
    const tag = props.tag || TYPE_MAPPING[props.type] || 'h2';

    return (
        React.createElement(
            tag,
            {
                className: bem(
                    bem.block({
                        type: props.type,
                        color: props.color,
                    }),
                    props.className,
                ),
                style: props.style,
            },
            <>
                {props.content}
                {props.children}
            </>,
        )
    );
}
