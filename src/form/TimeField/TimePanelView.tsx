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
        return result;
    }, []);
    const minutes = useMemo(() => {
        const result = [];
        for (let i = 0; i < 60; i++) {
            const minute = _padStart(i, 2, '0');
            result.push(minute);
        }
        return result;
    }, []);
    const inputValue = props.input.value ? props.input.value.split(':') : ['00', '00'];
    return (
        <div className={bem.block()}>
            <div className={bem.element('body')}>
                <div className={bem.element('column')}>
                    {hours.map((value, index) => (
                        <div
                            key={index}
                            className={bem.element('cell', {
                                selected: value === inputValue[0],
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                props.handlePanelClick(value + ':' + inputValue[1]);
                            }}
                        >
                            <div className={bem.element('cell-value')}>
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={bem.element('column')}>
                    {minutes.map((value, index) => (
                        <div
                            key={index}
                            className={bem.element('cell', {
                                selected: value === inputValue[1],
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                props.handlePanelClick(inputValue[0] + ':' + value);
                            }}
                        >
                            <div className={bem.element('cell-value')}>
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
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
                <button
                    className={bem.element('button', 'ok')}
                    onClick={(e) => {
                        e.preventDefault();
                        props.closePanel();
                    }}
                >
                    Ok
                </button>
            </div>
        </div>
    );
}
