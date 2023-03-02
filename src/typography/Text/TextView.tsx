import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITextViewProps} from '@steroidsjs/core/ui/typography/Text/Text';

export default function TextView(props: ITextViewProps) {
    const bem = useBem('TextView');
    const component = props.templateMapping[props.template] || 'p';

    return (
        React.createElement(
            component,
            {
                className: bem(
                    bem.block({
                        template: props.template,
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
