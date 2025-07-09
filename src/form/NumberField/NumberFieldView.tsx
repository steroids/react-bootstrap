import * as React from 'react';
import _isNumber from 'lodash-es/isNumber';
import {INumberFieldViewProps} from '@steroidsjs/core/ui/form/NumberField/NumberField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function NumberFieldView(props: INumberFieldViewProps) {
    const bem = useBem('NumberFieldView');

    return (
        <div
            className={bem(
                bem.block({
                    disabled: props.inputProps.disabled,
                    size: props.size,
                    hasErrors: !!props.errors,
                    filled: !!props.inputRef?.current?.value,
                }),
                props.className,
            )}
        >
            <input
                ref={props.inputRef}
                className={bem(
                    bem.element('input'),
                )}
                {...props.inputProps}
                onWheel={event => event.currentTarget.blur()}
                id={props.id}
            />
            {!props.disabled && !props.errors && (
                <div className={bem.element('arrows-container')}>
                    <button
                        className={bem.element('arrow', {
                            disabled: _isNumber(props.inputProps.max) && props.inputProps.value >= props.inputProps.max,
                        })}
                        type='button'
                        onClick={props.onStepUp}
                    >
                        <Icon
                            name='expand_up'
                            tabIndex={-1}
                        />
                    </button>
                    <button
                        className={bem.element('arrow', {
                            disabled: _isNumber(props.inputProps.min) && props.inputProps.value <= props.inputProps.min,
                        })}
                        type='button'
                        onClick={props.onStepDown}
                    >
                        <Icon
                            name='expand_up'
                            tabIndex={-1}
                        />
                    </button>
                </div>
            )}
            <span className={bem.element('input-effects')} />
        </div>
    );
}
