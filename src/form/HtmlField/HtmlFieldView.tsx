import {useBem} from '@steroidsjs/core/hooks';
import {IHtmlFieldViewProps} from '@steroidsjs/core/ui/form/HtmlField/HtmlField';
import React from 'react';

export default function HtmlFieldView(props: IHtmlFieldViewProps) {
    const bem = useBem('HtmlFieldView');

    const HtmlComponent = props.htmlComponent;

    if (process.env.IS_SSR) {
        return null;
    }

    return (
        <div className={bem.block()}>
            <HtmlComponent
                editor={props.editorConstructor}
                disabled={props.disabled}
                config={props.editorProps}
                data={!props.input.value ? '' : props.input.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
        </div>
    );
}
