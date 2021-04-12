import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';
import {useMemo} from 'react';
import _padStart from 'lodash-es/padStart';
import Icon from '../../../react/ui/icon/Icon';

import './TimeFieldView.scss';


export default function TimeFieldView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimeFieldView');
    const hours = useMemo(() => {
        const result = [];
        for (let i = 0; i < 24; i++) {
            const hour = _padStart(i, 2, '0');
            result.push(hour);
        }
        return result
    }, []);
    const minutes = useMemo(() => {
        const result = [];
        for (let i = 0; i < 60; i++) {
            const minute = _padStart(i, 2, '0');
            result.push(minute);
        }
        return result
    }, []);
    return (
        <div
            ref={props.forwardedRef}
            className={bem(bem.block(), props.className)}
            onFocus={(e) => {
                e.preventDefault();
                props.openDropDown();
            }}
        >
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
            <Icon
                className={bem.element('icon')}
                name='clock'
            />
            {props.showDropDown && (
                <div className={bem.element('time-panel')}>
                    <div className={bem.element('time-panel-body')}>
                        <ul className={bem.element('time-panel-column')}>
                            {hours.map((value, index) => (
                                <li
                                    key={index}
                                    className={bem.element('time-panel-cell')}
                                    onClick={e => props.changeHours(value)}
                                >
                                    <div className={bem.element('time-panel-column-cell-value')}>
                                        {value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul
                            className={bem.element('time-panel-column')}
                        >
                            {minutes.map((value, index) => (
                                <li
                                    key={index}
                                    className={bem.element('time-panel-cell')}
                                    onClick={(e) => props.changeMinutes(value)}
                                >
                                    <div className={bem.element('time-panel-column-cell-value')}>
                                        {value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={bem.element('time-panel-footer')}>
                        <button>
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
