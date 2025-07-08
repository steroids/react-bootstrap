import * as React from 'react';
import {ITimePanelViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';
import _padStart from 'lodash-es/padStart';
import TimePanelColumn from './views/TimePanelColumn';

const getHours = () => {
    const result = [];
    for (let i = 0; i < 24; i += 1) {
        const hour = _padStart(i, 2, '0');
        result.push(hour);
    }
    return result;
};

const getMinutes = () => {
    const result = [];
    for (let i = 0; i < 60; i += 1) {
        const minute = _padStart(i, 2, '0');
        result.push(minute);
    }
    return result;
};

export interface ITimePanelColumn {
    values: string[],
    currentValueKey: string,
    onUpdate: (value: string) => void,
}

function TimePanelView(props: ITimePanelViewProps) {
    const bem = useBem('TimePanelView');
    const [hours, minutes] = props.value ? props.value.split(':') : ['00', '00'];
    const currentValues = {
        hours,
        minutes,
    };

    const COLUMNS : ITimePanelColumn[] = [{
        values: getHours(),
        currentValueKey: 'hours',
        onUpdate: (value) => {
            props.onSelect(value + ':' + minutes);
        },
    }, {
        values: getMinutes(),
        currentValueKey: 'minutes',
        onUpdate: (value) => {
            props.onSelect(hours + ':' + value);
        },
    }];

    return (
        <div className={bem(bem.block(), props.className)}>
            {props.showHeader && (
                <div className={bem.element('header')}>
                    {props.value && (
                        `${currentValues.hours}:${currentValues.minutes}`
                    )}
                </div>
            )}
            <div className={bem.element('body')}>
                {COLUMNS.map((column) => (
                    <TimePanelColumn
                        key={column.currentValueKey}
                        column={column}
                        currentValue={currentValues[column.currentValueKey]}
                    />
                ))}
            </div>
            <div className={bem.element('footer', {'to-end': !props.showNow})}>
                {props.showNow && (
                    <button
                        className={bem.element('button', 'now')}
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNow();
                        }}
                    >
                        {__('Текущее')}
                    </button>
                )}
                <button
                    className={bem.element('button', 'ok')}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onClose();
                    }}
                >
                    {__('Ок')}
                </button>
            </div>
        </div>
    );
}

TimePanelView.defaultProps = {
    showHeader: false,
    showNow: true,
};

export default TimePanelView;
