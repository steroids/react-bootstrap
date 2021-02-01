import * as React from 'react';
import {Editor} from 'react-draft-wysiwyg';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IHtmlFieldViewProps} from '@steroidsjs/core/ui/form/HtmlField/HtmlField';

@bem('HtmlFieldView')
export default class HtmlFieldView extends React.Component<IHtmlFieldViewProps & IBemHocOutput> {

    render() {
        if (process.env.IS_SSR) {
            return null;
        }

        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <Editor
                    toolbar={this.props.editorProps}
                    editorState={this.props.editorState}
                    onEditorStateChange={this.props.onEditorStateChange}
                    toolbarClassName='rdw-editor-toolbar'
                    wrapperClassName='wrapperClassName'
                    editorClassName='home-editor rdw-editor-main'
                    toolbarCustomButtons={this.props.customButtons}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                />
            </div>
        );
    }
}
