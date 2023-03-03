import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITitleViewProps} from '@steroidsjs/core/ui/typography/Title/Title';

export default function TitleView(props: ITitleViewProps) {
    const bem = useBem('TitleView');
    const component = props.component || props.templateMapping[props.template] || 'h2';

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
