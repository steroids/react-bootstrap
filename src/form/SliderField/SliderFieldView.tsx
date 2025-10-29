import {useBem} from '@steroidsjs/core/hooks';

import {ISliderFieldViewProps} from '@steroidsjs/core/ui/form/SliderField/SliderField';
import Slider, {SliderTooltip, Handle as HandleSource, Range} from 'rc-slider';

const createRangeWithTooltip = Slider.createSliderWithTooltip;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeComponent: any = createRangeWithTooltip(Range);
const SliderComponent: any = createSliderWithTooltip(Slider);

export default function SliderFieldView(props: ISliderFieldViewProps) {
    const bem = useBem('SliderFieldView');

    //TODO Исправить тип, связано с yarn tsc в action publish.yml
    const Handle: any = HandleSource;

    const handle = (prevProps) => {
        const {value} = prevProps;
        return (
            <SliderTooltip
                prefixCls='rc-slider-tooltip'
                placement='top'
                overlay={`${value}`}
            >
                <Handle value={value} />
            </SliderTooltip>
        );
    };

    const commonProps = {
        slider: props.slider,
        className: props.className,
        min: props.min,
        max: props.max,
        step: props.step,
        marks: props.marks,
        onChange: props.onChange,
        onAfterChange: props.onAfterChange,
        defaultValue: props.defaultValue
            ? props.defaultValue
            : (props.isRange ? props.rangeDefaultValue : props.sliderDefaultValue),
        disabled: props.disabled,
        tipFormatter: value => `${value + props.valuePostfix}`,
        handle,
    };

    const RangeField = (
        <RangeComponent
            {...commonProps}
            draggableTrack
            areaDisabled
            pushable
        />
    );

    const SliderField = (
        <SliderComponent {...commonProps} />
    );

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            {props.isRange ? RangeField : SliderField}
        </div>
    );
}
