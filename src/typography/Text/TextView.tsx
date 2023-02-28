import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ITextViewProps} from '@steroidsjs/core/ui/typography/Text/Text';

export default function TextView(props: ITextViewProps) {
    const bem = useBem('TextView');
    const Component = props.templateMapping[props.template] || 'p';

    return (
        <Component
            className={bem(
                bem.block({template: props.template}),
                props.className,
            )}
            style={props.style}
        >
            {props.content || null}
            {props.children || null}
        </Component>
    );
}
