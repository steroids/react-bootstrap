import React from 'react';
import {IChartViewProps} from '@steroidsjs/core/ui/content/Chart/Chart';
import {useBem} from '@steroidsjs/core/hooks';
import {Title} from '@steroidsjs/core/ui/typography';
import {CheckboxListField} from '@steroidsjs/core/ui/form';
import _omit from 'lodash-es/omit';
import {ButtonGroup} from '@steroidsjs/core/ui/nav';

const DEFAULT_AXIS_PARAMS = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: '',
    legendPosition: 'middle',
};

const DEFAULT_LINE_CHART_CONFIG = {
    yScale: {
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
    },
    xScale: {type: 'point'},
    axisBottom: {
        ...DEFAULT_AXIS_PARAMS,
        legendOffset: 36,
    },
    axisLeft: {
        ...DEFAULT_AXIS_PARAMS,
        legendOffset: -40,
    },
    pointSize: 8,
    useMesh: true,
};

export default function ChartView(props: IChartViewProps) {
    const bem = useBem('ChartView');
    const ChartComponent = props.chartComponent;
    const defaultChartConfig = (props.useDefaultLineChartConfig && DEFAULT_LINE_CHART_CONFIG) || {};

    const customChartHeightVariable = {'--chart-custom-height': `${props.chartHeight}px`} as React.CSSProperties;

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={{
                ...props.style,
                height: `${props.wrapperHeight}px`,
                ...customChartHeightVariable,
            }}
        >
            {props.title && (
                <Title
                    type="h3"
                    content={props.title}
                    className={bem.element('title')}
                />
            )}
            <div className={bem.element('controls')}>
                {props.checkboxes && (
                    <CheckboxListField
                        {...props.checkboxes}
                    />
                )}
                {props.buttonGroup && (
                    <ButtonGroup {...props.buttonGroup} />
                )}
            </div>
            <ChartComponent
                style={{
                    height: `${props.chartHeight}px !important`,
                }}
                data={props.data}
                {...defaultChartConfig}
                {...props.config}
            />
        </div>
    );
}
