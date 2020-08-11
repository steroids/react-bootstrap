import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITextFieldViewProps} from '@steroidsjs/core/ui/form/TextField/TextField';

@bem('TextFieldView')
export default class TextFieldView extends React.PureComponent<ITextFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <textarea
                className={bem(
                    bem.block({
                        size: this.props.size,
                    }),
                    'form-control',
                    'form-control-' + this.props.size,
                    this.props.isInvalid && 'is-invalid',
                    this.props.className
                )}
                {...this.props.inputProps}
            />
        );
    }

}
