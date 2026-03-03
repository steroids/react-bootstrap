import {useBem} from '@steroidsjs/core/hooks';
import {ITimePanelViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import * as React from 'react';

import {getAvailableHours, getAvailableMinutes, isHourAvailable, normalizeMinutesForHour} from './utils';
import TimePanelColumn from './views/TimePanelColumn';

export interface ITimePanelColumn {
    values: string[],
    currentValueKey: string,
    onUpdate: (value: string) => void,
}

function TimePanelView(props: ITimePanelViewProps) {
    const bem = useBem('TimePanelView');
    const [hours, minutes] = props.value ? props.value.split(':') : ['00', '00'];

    const {from, to} = props.availableTime || {};
    const minuteStep = props.minuteStep ?? 1;

    const currentValues = {
        hours,
        minutes,
    };

    const availableHours = getAvailableHours(from, to);

    // если текущий час невалиден — берём первый доступный
    const minutesHour = isHourAvailable(hours, from, to)
        ? hours
        : availableHours[0];

    const COLUMNS = [{
        values: getAvailableHours(from, to),
        currentValueKey: 'hours',
        onUpdate: (value) => {
            const nextMinutes = normalizeMinutesForHour(value, minutes, {
                from,
                to,
                step: minuteStep,
            });

            props.onSelect(value + ':' + nextMinutes);
        },
    }, {
        values: getAvailableMinutes(minutesHour, {
            from,
            to,
            step: minuteStep,
        }),
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
