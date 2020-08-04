import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from 'react-draft-wysiwyg';

import {bem} from '@steroidsjs/core/hoc';

@bem('HtmlFieldView')
export default class HtmlFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        editorProps: PropTypes.object,
        editorState: PropTypes.object,
        className: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        customButtons: PropTypes.arrayOf(PropTypes.any),
    };

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
