import * as React from 'react';
import Slider from 'rc-slider';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISliderFieldViewProps} from '@steroidsjs/core/ui/form/SliderField/SliderField';

@bem('SliderFieldView')
export default class SliderFieldView extends React.Component<ISliderFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        const SliderComponent: any = Slider; // TODO Fix error https://github.com/react-component/slider/issues/656
        return (
            <div className={bem(
                bem.block({
                    size: this.props.size,
                }),
                this.props.className,
            )}>
                <SliderComponent
                    {...this.props.slider}
                    className={bem.element('slider')}
                />
            </div>
        );
    }

}
