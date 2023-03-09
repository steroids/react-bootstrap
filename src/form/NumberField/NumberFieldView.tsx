import * as React from 'react';
import {useCallback, useRef} from 'react';
import _isNumber from 'lodash-es/isNumber';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INumberFieldViewProps} from '@steroidsjs/core/ui/form/NumberField/NumberField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function NumberFieldView(props: INumberFieldViewProps & IBemHocOutput) {
    // Input ref
    const inputRef = useRef(null);

    const onStepUp = useCallback(() => {
        if (!inputRef.current) {
            return;
        }

        inputRef.current.stepUp();
        props.inputProps.onChange(inputRef.current.value);
    }, [inputRef.current]);

    const onStepDown = useCallback(() => {
        if (!inputRef.current) {
            return;
        }

        inputRef.current.stepDown();
        props.inputProps.onChange(inputRef.current.value);
    }, [inputRef.current]);

    const onChangeHandler = useCallback((value: string) => {
        if (!props.input) {
            return;
        }

        props.input.onChange(value);
    }, [props.input]);

    const bem = useBem('NumberFieldView');
    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                    size: props.size,
                    hasErrors: !!props.errors,
                    filled: !!inputRef.current?.value,
                }),
                props.className,
            )}
        >
            <input
                ref={inputRef}
                className={bem(
                    bem.element('input', {
                        hasErrors: !!props.errors,
                    }),
                )}
                {...props.inputProps}
                onChange={e => onChangeHandler(e.target.value)}
            />
            {!props.disabled && !props.errors && (

                <div className={bem.element('arrows-container')}>
                    <button
                        className={bem.element('arrow', {
                            disabled: _isNumber(props.inputProps.max) && props.inputProps.value >= props.inputProps.max,
                        })}
                        type='button'
                        onClick={onStepUp}
                    >
                        <Icon name='arrow' />
                    </button>
                    <button
                        className={bem.element('arrow', {
                            disabled: _isNumber(props.inputProps.min) && props.inputProps.value <= props.inputProps.min,
                        })}
                        type='button'
                        onClick={onStepDown}
                    >
                        <Icon name='arrow' />
                    </button>
                </div>
            )}
            <span className={bem.element('input-effects')} />
        </div>
    );
}
