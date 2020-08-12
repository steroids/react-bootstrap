import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INumberFieldViewProps} from '@steroidsjs/core/ui/form/NumberField/NumberField';

@bem('NumberFieldView')
export default class NumberFieldView extends React.PureComponent<INumberFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <input
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
