import * as React from 'react';
import {useCallback} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {IDateTimeRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeRangeField/DateTimeRangeField';

import TimePanelView from '../TimeField/TimePanelView';
import RangeButtons from '../DateRangeField/views/RangeButtons';

export default function DateTimeRangeFieldView(props: IDateTimeRangeFieldViewProps) {
    const bem = useBem('DateTimeRangeFieldView');

    const hasValue = props.inputPropsFrom.value || props.inputPropsTo.value;

    const calendarComponent = React.useMemo(() => (
        <div className={bem.element('panel-container')}>
            <Calendar
                {...props.calendarProps}
                className={bem.element('calendar')}
            />
            <div className={bem.element('separator')} />
            <TimePanelView
                {...props.timePanelViewProps}
                className={bem.element('time-panel')}
            />
        </div>
    ), [bem, props.calendarProps, props.timePanelViewProps]);

    const renderCalendar = useCallback(() => (
        props.withRangeButtons ? (
            <div className={bem.element('calendar-wrapper', {
                position: props.rangeButtonsPosition,
            })}
            >
                <div className={bem.element('additional-buttons')}>
                    <RangeButtons
                        config={props.withRangeButtons}
                        changeTo={props.inputPropsTo.onChange}
                        changeFrom={props.inputPropsFrom.onChange}
                        position={props.rangeButtonsPosition}
                        format={props.displayFormat}
                    />
                </div>
                <div className={bem.element('calendar')}>
                    {calendarComponent}
                </div>
            </div>
        )
            : calendarComponent
    ), [bem, calendarComponent, props.inputPropsFrom.onChange, props.inputPropsTo.onChange,
        props.rangeButtonsPosition, props.displayFormat, props.withRangeButtons]);

    return (
        <DropDown
            content={renderCalendar}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
            hasArrow={false}
            className={bem.element('dropdown')}
        >
            <div
                className={bem(bem.block({
                    disabled: props.disabled,
                    size: props.size,
                    'is-invalid': !!props.errors,
                }),
                props.className)}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputPropsFrom}
                        id={props.id}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                        )}
                        onInput={e => props.inputPropsFrom.onChange(e.currentTarget.value)}
                    />
                    <input
                        {...props.inputPropsTo}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            !!props.errorsTo && 'is-invalid',
                        )}
                        onInput={e => props.inputPropsTo.onChange(e.currentTarget.value)}
                    />
                    <div className={bem.element('icon-container')}>
                        {props.icon && !hasValue && (
                            <Icon
                                className={bem.element('date-icon')}
                                name={typeof props.icon === 'string' ? props.icon : 'calendar_range'}
                                tabIndex={-1}
                            />
                        )}
                        {props.showRemove && hasValue && (
                            <Icon
                                className={bem.element('close-icon')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.onClear();
                                }}
                                name='cross_8x8'
                            />
                        )}
                    </div>
                    <span className={bem.element('effect')} />
                </div>
            </div>
        </DropDown>
    );
}
