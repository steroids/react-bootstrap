import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';

let ReactQuill = null;
if (!process.env.IS_SSR) {
    ReactQuill = require('react-quill').default;
    const ImageUpload = require('quill-image-uploader').default;
    ReactQuill.Quill.register('modules/imageUploader', ImageUpload);
}

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
        className: PropTypes.string,
    };

    render() {
        if (process.env.IS_SSR) {
            return null;
        }

        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <ReactQuill {...this.props.editorProps} />
            </div>
        );
    }

}
