import * as React from 'react';
import {useCallback} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import Calendar from '@steroidsjs/core/ui/form/DateField/Calendar';
import {IDateRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateRangeField/DateRangeField';
import _isString from 'lodash-es/isString';

import './DateRangeFieldView.scss';

export default function DateRangeFieldView(props: IDateRangeFieldViewProps) {
    const bem = useBem('DateRangeFieldView');
    const valuesRange = props.input.value
        ? [props.input.value.from || '', props.input.value.to || '']
        : [];
    return (
        <DropDown
            content={useCallback(() => (
                <Calendar
                    calendarValue={valuesRange}
                    onDayChange={props.onDayClick}
                    dateValidFormats={[props.displayFormat, props.valueFormat]}
                />
                // eslint-disable-next-line react-hooks/exhaustive-deps
            ), [valuesRange])}
            position='bottomLeft'
            visible={props.isPanelOpen}
            toggleVisibility={(value) => value ? props.closePanel() : props.openPanel()}
        >
            <div
                className={bem(
                    bem.block({
                        disabled: props.disabled,
                        'no-border': props.noBorder,
                    }),
                    props.className,
                )}
                onFocus={(e) => {
                    e.preventDefault();
                    props.openPanel();
                }}
                onBlur={(e) => {
                    e.preventDefault();
                    props.onBlur();
                }}
                style={props.style}
            >
                <div className={bem.element('body')}>
                    <input
                        {...props.inputFromProps}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        onChange={e => props.inputFromProps.onChange(e.target.value)}
                    />
                    <span className={bem.element('divider')}>
                        -
                    </span>
                    <input
                        {...props.inputToProps}
                        className={bem(
                            bem.element('input', {
                                size: props.size,
                            }),
                            props.isInvalid && 'is-invalid',
                        )}
                        onChange={e => props.inputToProps.onChange(e.target.value)}
                    />
                    <div className={bem.element('icon-container')}>
                        {props.icon && (
                            <Icon
                                className={bem.element('icon')}
                                name={_isString(props.icon) ? props.icon as string : 'calendar-alt'}
                            />
                        )}
                        {props.showRemove && props.input.value && (
                            <Icon
                                className={bem.element('icon', 'close')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.clearInput();
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
