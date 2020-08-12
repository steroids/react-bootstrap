import * as React from 'react';
import Slider from 'rc-slider';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISliderFieldViewProps} from '@steroidsjs/core/ui/form/SliderField/SliderField';

@bem('SliderFieldView')
export default class SliderFieldView extends React.PureComponent<ISliderFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block({
                    size: this.props.size,
                }),
                this.props.className,
            )}>
                <Slider
                    {...this.props.slider}
                    className={bem.element('slider')}
                />
            </div>
        );
    }

}
