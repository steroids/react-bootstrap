import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISliderFieldViewProps} from '@steroidsjs/core/ui/form/SliderField/SliderField';
import Slider, {SliderTooltip, Handle, Range} from 'rc-slider';

export default function SliderFieldView(props: ISliderFieldViewProps & IBemHocOutput) {
    const bem = useBem('SliderFieldView');

    const createRangeWithTooltip = Slider.createSliderWithTooltip;
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const RangeComponent: any = createRangeWithTooltip(Range);
    const SliderComponent: any = createSliderWithTooltip(Slider);

    const handle = (prevProps) => {
        const { value } = prevProps;
        return (
            <SliderTooltip
                prefixCls='rc-slider-tooltip'
                overlay={`${value}`}
                visible={props.tooltipIsVisible}
                placement="top"
            >
                <Handle value={value} />
            </SliderTooltip>
        );
    };

    const commonProps = {
        className: props.className,
        min: props.min,
        max: props.max,
        step: props.step,
        marks: props.marks,
        onChange: props.onChange,
        disabled: props.disabled,
        tipFormatter: value => `${value + props.countFormat}`,
        handle,
    };

    const RangeField = (
        <RangeComponent
            {...commonProps}
            defaultValue={props.defaultValue ? props.defaultValue : [0, 10]}
            areaDisabled
            draggableTrack
            pushable
        />
    );

    const SliderField = (
        <SliderComponent {...commonProps} defaultValue={5} />
    );

    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                }),
                props.className,
            )}
        >
            {props.isRange ? RangeField : SliderField}
        </div>
    );
}
