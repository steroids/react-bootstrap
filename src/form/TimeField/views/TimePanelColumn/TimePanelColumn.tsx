import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';

import {ITimePanelColumn} from '../../TimePanelView';
import './TimePanelColumn.scss';

export interface ITimePanelColumnProps {
    column: ITimePanelColumn,
    currentValue: string,
}

export default function TimePanelColumn(props: ITimePanelColumnProps) {
    const bem = useBem('TimePanelColumn');

    const onUpdate = (value: string) => () => {
        props.column.onUpdate(value);
    };

    return (
        <div className={bem.block()}>
            <div className={bem.element('column')}>
                {props.column.values.map((value, index) => (
                    <div
                        key={index}
                        className={bem.element('cell', {
                            selected: value === props.currentValue,
                        })}
                        onKeyPress={onUpdate(value)}
                        onClick={onUpdate(value)}
                        role='button'
                        tabIndex={0}
                    >
                        <div className={bem.element('cell-value')}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
