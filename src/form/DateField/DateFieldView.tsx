import * as React from 'react';
import {useCallback} from 'react';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/content/Calendar';

export default function DateFieldView(props: IDateFieldViewProps) {
    const bem = useBem('DateFieldView');

    const renderCalendar = useCallback(() => (
        <Calendar {...props.calendarProps} />
    ), [props.calendarProps]);

    return (
        <DropDown
            content={renderCalendar}
            position='bottomLeft'
            visible={props.isOpened}
            onClose={props.onClose}
            className={bem.element('dropdown')}
        >
            <div
                className={bem(
                    bem.block({
                        size: props.size,
                        disabled: props.disabled,
                        'has-icon': !!props.icon,
                        'is-invalid': !!props.errors,
                    }),
                    props.className,
                )}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputProps}
                        onChange={e => props.inputProps.onChange(e.target.value)}
                        className={bem(
                            bem.element('input'),
                            props.inputProps.className,
                        )}
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
                                name='cross_8x8'
                            />
                        )}
                    </div>
                </div>
            </div>
        </DropDown>
    );
}
