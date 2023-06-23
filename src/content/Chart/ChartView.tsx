import React from 'react';
import {IChartViewProps} from '@steroidsjs/core/ui/content/Chart/Chart';

const DEFAULT_AXIS_PARAMS = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendPosition: 'middle',
};

const DEFAULT_LINE_CHART_CONFIG = {
    margin: {top: 50, right: 110, bottom: 50, left: 60},
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
    const ChartComponent = props.chartComponent;
    const defaultChartConfig = (props.useLineChartConfig && DEFAULT_LINE_CHART_CONFIG) || {};

    return (
        <div
            className={props.className}
            style={{
                height: `${props.height}px`,
                ...props.style,
            }}
        >
            <ChartComponent
                data={props.data}
                {...defaultChartConfig}
                {...props.config}
            />
        </div>
    );
}
