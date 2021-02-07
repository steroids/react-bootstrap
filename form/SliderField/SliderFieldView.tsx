import * as React from 'react';
import Slider from 'rc-slider';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISliderFieldViewProps} from '@steroidsjs/core/ui/form/SliderField/SliderField';
import {useBem} from '@steroidsjs/core/hooks';

export default function SliderFieldView(props: ISliderFieldViewProps & IBemHocOutput) {
    const bem = useBem('SliderFieldView');
    const SliderComponent: any = Slider; // TODO Fix error https://github.com/react-component/slider/issues/656
    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
            props.className,
        )}>
            <SliderComponent
                {...props.slider}
                className={bem.element('slider')}
            />
        </div>
    );
}
