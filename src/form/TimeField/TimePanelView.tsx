import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';
import {useMemo} from 'react';
import _padStart from 'lodash-es/padStart';

import './TimePanelView.scss';


export default function TimePanelView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimePanelView');
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
        <div className={bem.block()}>
            <div className={bem.element('body')}>
                <ul className={bem.element('column')}>
                    {hours.map((value, index) => (
                        <li
                            key={index}
                            className={bem.element('cell', {
                                'selected': value === (props.input.value?.substring(0, 2) || '00')
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                props.changeHours(value);
                            }}
                        >
                            <div className={bem.element('cell-value')}>
                                {value}
                            </div>
                        </li>
                    ))}
                </ul>
                <ul className={bem.element('column')}>
                    {minutes.map((value, index) => (
                        <li
                            key={index}
                            className={bem.element('cell', {
                                'selected': value === (props.input.value?.substring(3, 6) || '00')
                            })}
                            onClick={(e) => props.changeMinutes(value)}
                        >
                            <div className={bem.element('cell-value')}>
                                {value}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={bem.element('footer')}>
                <button
                    className={bem.element('button', 'now')}
                    onClick={(e) => {
                        e.preventDefault();
                        props.setNow();
                    }}
                >
                    Now
                </button>
                {/*// TODO Add OK logic*/}
                <button className={bem.element('button', 'ok')}>
                    Ok
                </button>
            </div>
        </div>
    );
}