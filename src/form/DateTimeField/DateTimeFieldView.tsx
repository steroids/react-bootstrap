import {useBem} from '@steroidsjs/core/hooks';
import {useCallback} from 'react';
import Icon from '@steroidsjs/core/ui/content/Icon';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import DropDown from '@steroidsjs/core/ui/content/DropDown';

import {IDateTimeFieldViewProps} from '@steroidsjs/core/ui/form/DateTimeField/DateTimeField';
import TimePanelView from '../TimeField/TimePanelView';

export default function DateTimeFieldView(props: IDateTimeFieldViewProps) {
    const bem = useBem('DateTimeFieldView');

    const renderContent = useCallback(() => (
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

    return (
        <DropDown
            content={renderContent}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
            hasArrow={false}
            className={bem.element('dropdown')}
        >
            <div
                className={bem(
                    bem.block({
                        size: props.size,
                        disabled: props.disabled,
                        'is-invalid': !!props.errors,
                    }),
                    props.className,
                )}
                style={props.style}
            >

                <div className={bem.element('body')}>
                    <input
                        {...props.inputProps}
                        id={props.id}
                        placeholder={props.placeholder
                            ? props.placeholder
                            : props.inputProps.placeholder}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        onInput={e => props.inputProps.onChange(e.currentTarget.value)}
                        ref={props.maskInputRef}
                    />
                    <div className={bem.element('icon-container')}>
                        {!props.inputProps.value && props.icon && (
                            <Icon
                                className={bem.element('date-icon')}
                                name={typeof props.icon === 'string' ? props.icon : 'calendar_range'}
                                tabIndex={-1}
                            />
                        )}
                        {props.showRemove && props.inputProps.value && (
                            <Icon
                                className={bem.element('close-icon')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.onClear();
                                }}
                                name={typeof props.icon === 'string' ? props.icon : 'cross_8x8'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </DropDown>
    );
}
