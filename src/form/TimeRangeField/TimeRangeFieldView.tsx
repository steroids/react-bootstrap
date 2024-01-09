import React, {useCallback} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ITimeRangeFieldViewProps} from '@steroidsjs/core/ui/form/TimeRangeField/TimeRangeField';
import {DropDown, Icon} from '@steroidsjs/core/ui/content';
import TimePanelView from '../TimeField/TimePanelView';

export default function TimeRangeFieldView(props: ITimeRangeFieldViewProps) {
    const bem = useBem('TimeRangeFieldView');

    const hasValue = props.inputPropsFrom.value || props.inputPropsTo.value;

    const renderTimeRange = useCallback(() => (
        <div className={bem.element('panel-container')}>
            <TimePanelView {...props.timePanelFromViewProps} />
            <TimePanelView {...props.timePanelToViewProps} />
        </div>
    ), [bem, props.timePanelFromViewProps, props.timePanelToViewProps]);

    return (
        <DropDown
            position="bottomLeft"
            content={renderTimeRange}
            onClose={props.onClose}
            visible={props.isOpened}
            className={bem.element('dropdown')}
            hasArrow={false}
            autoPositioning={false}
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
                        className={bem(
                            bem.element('input'),
                        )}
                        onChange={e => props.inputPropsFrom.onChange(e.target.value)}
                    />
                    <input
                        {...props.inputPropsTo}
                        className={bem.element('input')}
                        onChange={e => props.inputPropsTo.onChange(e.target.value)}
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
