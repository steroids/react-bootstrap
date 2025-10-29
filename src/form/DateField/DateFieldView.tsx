import {useCallback} from 'react';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/content/Calendar';

export default function DateFieldView(props: IDateFieldViewProps) {
    const bem = useBem('DateFieldView');

    const renderCalendar = useCallback(() => (
        <Calendar
            {...props.calendarProps}
        />
    ), [props.calendarProps]);

    return (
        <DropDown
            content={renderCalendar}
            position="bottom"
            visible={props.isOpened}
            onClose={props.onClose}
            className={bem.element('dropdown')}
            autoPositioning={props.autoPositioning}
            hasArrow={false}
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
                        ref={props.maskInputRef}
                        onInput={e => {
                            props.inputProps.onChange(e.currentTarget.value);
                        }}
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
