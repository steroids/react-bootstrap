import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INumberFieldViewProps} from '@steroidsjs/core/ui/form/NumberField/NumberField';
 
interface INumberFieldViewState {
    value: number,
}

@bem('NumberFieldView')
export default class NumberFieldView extends React.Component<INumberFieldViewProps & IBemHocOutput, INumberFieldViewState> {

    _inputRef: React.RefObject<any>;


    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this._inputRef = React.createRef();
    }

    onStepUp = () => {
        this._inputRef.current.stepUp();
        this.setState({value: this._inputRef.current.value});
    }

    onStepDown = () => {
        this._inputRef.current.stepDown();
        this.setState({value: this._inputRef.current.value});
    }

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(
                    bem.block({
                        disabled: this.props.inputProps.disabled
                    }),
                    'form-control',
                    'form-control-' + this.props.size,
                    this.props.isInvalid && 'is-invalid',
                    this.props.className
                )}
            >
                <input
                    ref={this._inputRef}
                    className={bem(
                        bem.element('input', {
                            size: this.props.size,
                        }),
                        this.props.isInvalid && 'is-invalid',
                    )}
                    {...this.props.inputProps}
                />
                {!this.props.disabled && !this.props.isInvalid && (
                    <div className={bem.element('arrows-container')}>
                        <span
                            className={bem(
                                bem.element('arrow', {
                                    'disabled': this.props.inputProps.max && this.state.value >= this.props.inputProps.max,
                                })
                            )}
                            onClick={this.onStepUp}
                        >
                            <svg
                                viewBox='64 64 896 896'
                                width='1em'
                                height='1em'
                            >
                                <path
                                    d='M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5
                                        0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39
                                        17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'
                                />
                            </svg>
                        </span>
                        <span
                            className={bem(
                                bem.element('arrow', {
                                    'disabled': this.props.inputProps.min && this.state.value <= this.props.inputProps.min,
                                })
                            )}
                            onClick={this.onStepDown}
                        >
                            <svg
                                viewBox='64 64 896 896'
                                width='1em' height='1em'
                            >
                                <path
                                    d='M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140
                                        768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1
                                        391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z'
                                />
                            </svg>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
