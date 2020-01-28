import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import CheckboxField from '@steroidsjs/core/ui/form/CheckboxField';

@bem('CheckboxColumnView')
export default class CheckboxColumnView extends React.PureComponent {

    static propTypes = {
        input: PropTypes.object,
        fieldProps: PropTypes.object,
        isChecked: PropTypes.bool,
    };

    render() {
        const bem = this.props.bem;
        const CheckboxFieldInternal = CheckboxField.WrappedComponent;
        return (
            <div className={bem.block()}>
                <CheckboxFieldInternal
                    {...this.props.fieldProps}
                    input={this.props.input}
                />
            </div>
        );
    }
}
