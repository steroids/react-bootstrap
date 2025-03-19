import * as React from 'react';
import {useCallback} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/content/Calendar';
import {IDateRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateRangeField/DateRangeField';

export default function DateRangeFieldView(props: IDateRangeFieldViewProps) {
    const bem = useBem('DateRangeFieldView');

    const hasValue = props.inputPropsFrom.value || props.inputPropsTo.value;

    const renderCalendar = useCallback(() => (
        <Calendar
            {...props.calendarProps}
        />
    ), [props.calendarProps]);
    return (
        <DropDown
            content={renderCalendar}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
            className={bem.element('split')}
            hasArrow={false}
        >
            <div
                className={bem(
                    bem.block({
                        disabled: props.disabled,
                        size: props.size,
                        'is-invalid': !!props.errors,
                    }),
                    props.className,
                )}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputPropsFrom}
                        id={props.id}
                        className={bem(
                            bem.element('input', {
                            }),
                        )}
                        onInput={e => props.inputPropsFrom.onChange(e.currentTarget.value)}
                    />
                    <input
                        {...props.inputPropsTo}
                        className={bem.element('input')}
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
