import * as React from 'react';
import {useCallback} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {IDateTimeRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeRangeField/DateTimeRangeField';
import _isString from 'lodash-es/isString';

import TimePanelView from '../TimeField/TimePanelView';

export default function DateTimeRangeFieldView(props: IDateTimeRangeFieldViewProps) {
    const bem = useBem('DateTimeRangeFieldView');

    const renderCalendar = useCallback(() => (
        <div className={bem.element('panel-container')}>
            <Calendar
                {...props.calendarProps}
                className={bem.element('calendar')}
            />
            <TimePanelView
                {...props.timePanelViewProps}
                className={bem.element('time-panel')}
            />
        </div>
    ), [bem, props.calendarProps, props.timePanelViewProps]);

    return (
        <DropDown
            content={renderCalendar}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
        >
            <div
                className={bem(bem.block({
                    disabled: props.disabled,
                    'no-border': props.noBorder,
                }),
                props.className)}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputPropsFrom}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            !!props.errorsFrom && 'is-invalid',
                        )}
                        onChange={e => props.inputPropsFrom.onChange(e.target.value)}
                    />
                    <span className={bem.element('divider')}>
                        -
                    </span>
                    <input
                        {...props.inputPropsTo}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            !!props.errorsTo && 'is-invalid',
                        )}
                        onChange={e => props.inputPropsTo.onChange(e.target.value)}
                    />
                    <div className={bem.element('icon-container')}>
                        {props.icon && (
                            <Icon
                                className={bem.element('icon')}
                                name={_isString(props.icon) ? props.icon as string : 'calendar-alt'}
                            />
                        )}
                        {props.showRemove && (props.inputPropsFrom.value || props.inputPropsTo.value) && (
                            <Icon
                                className={bem.element('icon', 'close')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.onClear();
                                }}
                                name='times-circle'
                            />
                        )}
                    </div>
                </div>
            </div>
        </DropDown>
    );
}
