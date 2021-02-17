import * as React from 'react';
import {Editor} from 'react-draft-wysiwyg';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IHtmlFieldViewProps} from '@steroidsjs/core/ui/form/HtmlField/HtmlField';
import {useBem} from '@steroidsjs/core/hooks';

export default function HtmlFieldView(props: IHtmlFieldViewProps & IBemHocOutput) {
    if (process.env.IS_SSR) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const bem = useBem('HtmlFieldView');
    return (
        <div className={bem.block()}>
            <Editor
                toolbar={props.editorProps}
                editorState={props.editorState}
                onEditorStateChange={props.onEditorStateChange}
                toolbarClassName='rdw-editor-toolbar'
                wrapperClassName='wrapperClassName'
                editorClassName='home-editor rdw-editor-main'
                toolbarCustomButtons={props.customButtons}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
        </div>
    );
}
