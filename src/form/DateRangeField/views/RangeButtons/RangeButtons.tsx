import React, {useMemo} from 'react';
import {useBem, useComponents} from '@steroidsjs/core/hooks';
import {IDateRangeButton, IDateRangeFieldViewProps} from '@steroidsjs/core/ui/form/DateRangeField/DateRangeField';
import {Button} from '@steroidsjs/core/ui/form';
import {RANGE_BUTTONS} from './consts';

interface IRangeButtonsProps {
    config: IDateRangeFieldViewProps['withRangeButtons'],
    changeFrom: (value: string) => void,
    changeTo: (value: string) => void,
    position?: IDateRangeFieldViewProps['rangeButtonsPosition'],
    format?: string,
}

const DEFAULT_BUTTONS = [
    RANGE_BUTTONS.today,
    RANGE_BUTTONS.yesterday,
    RANGE_BUTTONS.thisWeek,
    RANGE_BUTTONS.lastWeek,
    RANGE_BUTTONS.thisMonth,
    RANGE_BUTTONS.lastMonth,
    RANGE_BUTTONS.thisYear,
    RANGE_BUTTONS.lastYear,
] as IDateRangeButton[];

const DEFAULT_VALUE_FORMAT = 'DD.MM.YYYY';

export default function RangeButtons(props: IRangeButtonsProps) {
    const bem = useBem('RangeButtons');
    const {locale} = useComponents();

    const {changeFrom, changeTo} = props;
    const buttons = useMemo(() => (
        Array.isArray(props.config)
            ? props.config
            : DEFAULT_BUTTONS
    )
        .map((button) => ({
            ...button,
            onClick: button.onClick.bind(null, locale, changeFrom, changeTo, props.format || DEFAULT_VALUE_FORMAT),
        })), [changeFrom, changeTo, locale, props.config, props.format]);

    return (
        <div className={bem.block({position: props.position})}>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    onClick={button.onClick}
                    label={button.label}
                    outline
                    size='sm'
                    color='basic'
                />
            ))}
        </div>
    );
}
