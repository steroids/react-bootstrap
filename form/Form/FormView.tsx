import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFormViewProps} from '@steroidsjs/core/ui/form/Form/Form';

@bem('FormView')
export default class FormView extends React.PureComponent<IFormViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <form
                className={bem(
                    bem.block(),
                    this.props.className,
                    this.props.layout.layout === 'horizontal' && 'form-horizontal',
                )}
                onSubmit={this.props.onSubmit}
            >
                {this.props.children}
            </form>
        );
    }

}
