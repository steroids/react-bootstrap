import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITextViewProps} from '@steroidsjs/core/ui/typography/Text/Text';

const TYPE_MAPPING = {
    body: 'p',
    span: 'span',
    boldSpan: 'span',
};

export default function TextView(props: ITextViewProps) {
    const bem = useBem('TextView');
    const tag = props.tag || TYPE_MAPPING[props.type || ''] || 'p';

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
