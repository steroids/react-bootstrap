import * as React from 'react';
import _isString from 'lodash-es/isString';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDateFieldViewProps} from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import DropDown from "@steroidsjs/core/ui/content/DropDown";
import Calendar from "@steroidsjs/core/ui/form/DateField/Calendar";
import './DateFieldView.scss';

export default function DateFieldView(props: IDateFieldViewProps & IBemHocOutput) {
    const bem = useBem('DateFieldView');

    return (
        <DropDown
            content={() =>
                <Calendar
                    value={props.input.value}
                    onDayChange={props.onDayClick}
                    displayFormat={props.displayFormat}
                    valueFormat={props.valueFormat}
                />
            }
            position='bottomLeft'
            visible={props.isPanelOpen}
            toggleVisibility={(value)  => value ? props.closePanel() : props.openPanel()}
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
                        onFocus={(e) => {
                            e.preventDefault();
                            props.openPanel();
                        }}
                        onBlur={(e) => {
                            e.preventDefault();
                            props.onBlur();
                        }}
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
