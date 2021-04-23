import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';

import TimePanelView from './TimePanelView';
import Icon from '@steroidsjs/core/ui/icon/Icon';

import './TimeFieldView.scss';


export default function TimeFieldView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimeFieldView');
    return (
        <div
            className={bem(
                bem.block({
                    'disabled': props.disabled,
                    'no-border': props.noBorder,
                }), props.className
            )}
            ref={props.forwardedRef}
            onFocus={(e) => {
                e.preventDefault();
                props.openDropDown();
            }}
            onBlur={(e) => {
                e.preventDefault();
                props.onBlur();
            }}
        >
            <div className={bem.element('body')}>
                <input
                    {...props.inputProps}
                    className={bem(
                        bem.element('input', {
                            size: props.size,
                        }),
                        props.isInvalid && 'is-invalid',
                    )}
                    autoComplete='off'
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    required={props.required}
                    type={props.type}
                    onChange={e => props.inputProps.onChange(e.target.value)}
                />
                <div className={bem.element('icon-container')}>
                    <Icon
                        className={bem.element('icon')}
                        name='clock'
                    />
                    {props.showRemove && props.input.value && (
                        <Icon
                            className={bem.element('icon', 'close')}
                            onClick={(e) => {
                                e.preventDefault();
                                props.clearInput();
                            }}
                            name='times-circle'
                        />
                    )}
                </div>
            </div>
            {props.showDropDown && (
                <TimePanelView {...props} />
            )}
        </div>
    );
}