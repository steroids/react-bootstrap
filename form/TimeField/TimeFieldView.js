import React from 'react';
import PropTypes from 'prop-types';
import {bem} from '@steroidsjs/core/hoc';

@bem('TimeFieldView')
export default class TimeFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        type: PropTypes.string,
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        className: PropTypes.string,
        pickerProps: PropTypes.object,
    };

    render() {
        const bem = this.props.bem;
        console.log("PROPS TIME", this.props);
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
                onChange={e => this.props.input.onChange(e.target.value)}
                type={this.props.type}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                required={this.props.required}
            />
        );
    }
}
