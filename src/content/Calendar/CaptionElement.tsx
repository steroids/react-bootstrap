import * as React from 'react';
import {useMemo} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {CaptionElementProps} from 'react-day-picker/types/Props';
import {ICalendarViewProps} from '@steroidsjs/core/ui/content/Calendar/Calendar';
import _upperFirst from 'lodash-es/upperFirst';

interface ICaptionElementProps extends CaptionElementProps,
    Pick<ICalendarViewProps, 'fromYear' | 'toYear' | 'isCaptionPanelVisible' | 'toggleCaptionPanel'>
{
    onChange: (value) => void,
    showCalendarFooter?: boolean,
}

export default function CaptionElement(props: ICaptionElementProps) {
    const bem = useBem('CaptionElement');
    const {localeUtils, locale, fromYear, toYear, date, isCaptionPanelVisible, toggleCaptionPanel} = props;
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const handleYearChange = newYear => {
        if (newYear !== currentYear) {
            props.onChange(new Date(newYear, currentMonth));
        }
    };

    const handleMonthChange = newMonth => {
        if (newMonth !== currentMonth) {
            props.onChange(new Date(currentYear, newMonth));
        }
    };

    const months = useMemo(() => (
        localeUtils.getMonths(locale).map((item, index) => ({
            id: index,
            label: _upperFirst(item),
        }))
    ), [localeUtils, locale]);

    const years = useMemo(() => {
        const result = [];
        for (let i = fromYear.getFullYear(); i <= toYear.getFullYear(); i += 1) {
            result.push(i);
        }
        return result;
    }, [fromYear, toYear]);

    return (
        <div className={bem(bem.block())}>
            <div className={bem.element('container')}>
                <Icon
                    className={bem.element('button')}
                    onClick={(e) => {
                        e.preventDefault();
                        handleYearChange(currentYear - 1);
                    }}
                    name='angle-double-left'
                />
                <Icon
                    className={bem.element('button', 'one-arrow')}
                    onClick={(e) => {
                        e.preventDefault();
                        handleMonthChange(currentMonth - 1);
                    }}
                    name='angle-left'
                />
                <div
                    className={bem.element('content-container')}
                    onKeyPress={e => {
                        e.preventDefault();
                        toggleCaptionPanel();
                    }}
                    onClick={e => {
                        e.preventDefault();
                        toggleCaptionPanel();
                    }}
                    role='button'
                    tabIndex={0}
                >
                    <span className={bem.element('selected-month')}>
                        {months.find(month => month.id === currentMonth).label}
                    </span>
                    <span className={bem.element('selected-year')}>
                        {years.find(year => year === currentYear)}
                    </span>
                </div>
                <Icon
                    className={bem.element('button', 'one-arrow')}
                    onClick={(e) => {
                        e.preventDefault();
                        handleMonthChange(currentMonth + 1);
                    }}
                    name='angle-right'
                />
                <Icon
                    className={bem.element('button')}
                    onClick={(e) => {
                        e.preventDefault();
                        handleYearChange(currentYear + 1);
                    }}
                    name='angle-double-right'
                />
            </div>
            {isCaptionPanelVisible && (
                <div className={bem.element('panel', {'full-height': !props.showCalendarFooter})}>
                    <div className={bem.element('panel-header', 'months')}>
                        {__('Месяц')}
                    </div>
                    <div className={bem.element('panel-header', 'years')}>
                        {__('Год')}
                    </div>
                    <div className={bem.element('panel-column-months', 'first')}>
                        <div className={bem.element('content-column')}>
                            {months.slice(0, 6).map((value, index) => (
                                <div
                                    key={index}
                                    className={bem.element('panel-cell', {
                                        selected: value.id === currentMonth,
                                    })}
                                    onKeyPress={e => {
                                        e.preventDefault();
                                        handleMonthChange(value.id);
                                    }}
                                    onClick={e => {
                                        e.preventDefault();
                                        handleMonthChange(value.id);
                                    }}
                                    role='button'
                                    tabIndex={0}
                                >
                                    <div className={bem.element('cell-value')}>
                                        {value.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={bem.element('panel-column-months', 'second')}>
                        {months.slice(6, 12).map((value, index) => (
                            <div
                                key={index}
                                className={bem.element('panel-cell', {
                                    selected: value.id === currentMonth,
                                })}
                                onKeyPress={e => {
                                    e.preventDefault();
                                    handleMonthChange(value.id);
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    handleMonthChange(value.id);
                                }}
                                role='button'
                                tabIndex={0}
                            >
                                <div className={bem.element('cell-value')}>
                                    {value.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={bem.element('panel-column-years')}>
                        {years.map((value, index) => (
                            <div
                                key={index}
                                className={bem.element('panel-cell', {
                                    selected: value === currentYear,
                                })}
                                onKeyPress={e => {
                                    e.preventDefault();
                                    handleYearChange(value);
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    handleYearChange(value);
                                }}
                                role='button'
                                tabIndex={0}
                            >
                                <div className={bem.element('cell-value')}>
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
