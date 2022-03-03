import * as React from 'react';
import {useCallback, useRef} from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INumberFieldViewProps} from '@steroidsjs/core/ui/form/NumberField/NumberField';
import {useBem} from '@steroidsjs/core/hooks';

export default function NumberFieldView(props: INumberFieldViewProps & IBemHocOutput) {
    // Input ref
    const inputRef = useRef(null);

    const onStepUp = useCallback(() => {
        inputRef.current.stepUp();
        props.inputProps.onChange(inputRef.current.value);
    }, [inputRef.current]);
    const onStepDown = useCallback(() => {
        inputRef.current.stepDown();
        props.inputProps.onChange(inputRef.current.value);
    }, [inputRef.current]);

    const bem = useBem('NumberFieldView');
    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                }),
                'form-control',
                'form-control-' + props.size,
                !!props.errors && 'is-invalid',
                props.className,
            )}
        >
            <input
                ref={inputRef}
                className={bem(
                    bem.element('input', {
                        size: props.size,
                    }),
                    !!props.errors && 'is-invalid',
                )}
                {...props.inputProps}
                onChange={e => props.onChange(e.target.value)}
            />
            {!props.disabled && !props.errors && (
                <div className={bem.element('arrows-container')}>
                    <button
                        className={bem.element('arrow', {
                            disabled: props.inputProps.max && props.inputProps.value >= props.inputProps.max,
                        })}
                        type='button'
                        onClick={onStepUp}
                    >
                        <svg
                            viewBox='64 64 896 896'
                            width='1em'
                            height='1em'
                        >
                            <path
                                d='M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140
                                    768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1
                                    391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z'
                            />
                        </svg>
                    </button>
                    <button
                        className={bem.element('arrow', {
                            disabled: props.inputProps.min && props.inputProps.value <= props.inputProps.min,
                        })}
                        type='button'
                        onClick={onStepDown}
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
                    </button>
                </div>
            )}
        </div>
    );
}
