import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {useCallback} from 'react';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import TimePanelView from '../TimeField/TimePanelView';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateTimeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeField/DateTimeField';

export default function DateTimeFieldView(props: IDateTimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('DateTimeFieldView');

    const renderContent = useCallback(() => (
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
            content={renderContent}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
        >
            <div
                className={bem(
                    bem.block({
                        size: props.size,
                        'has-icon': !!props.icon,
                        'is-invalid': !!props.isInvalid,
                    }),
                    props.className,
                )}
                style={props.style}
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
                        onChange={e => props.inputProps.onChange(e.target.value)}
                    />
                    <div className={bem.element('icon-container')}>
                        {props.icon && (
                            <Icon
                                className={bem.element('icon')}
                                name={props.icon || 'calendar-alt'}
                            />
                        )}
                        {props.showRemove && props.inputProps.value && props.icon !== false && (
                            <Icon
                                className={bem.element('icon', 'close')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.onClear();
                                }}
                                name={typeof props.icon === 'string' ? props.icon : 'times-circle'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </DropDown>
    );
}
