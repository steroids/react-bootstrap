/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {ISliderViewProps} from '@steroidsjs/core/ui/content/Slider/Slider';

import '@splidejs/splide/dist/css/splide.min.css';

export default function SliderView(props: ISliderViewProps) {
    const bem = useBem('Slider');

    const SplideHardCoded: any = Splide;

    const {itemView: ItemView} = props;

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            <SplideHardCoded
                options={props.sliderOptions}
                extensions={props.extensions}
                hasTrack={props.hasTrack}
                tag={props.tag}
                transition={props.transition}
            >
                {props.items?.map((item, itemIndex) => (
                    <SplideSlide key={itemIndex}>
                        <ItemView item={item} />
                    </SplideSlide>
                ))}
            </SplideHardCoded>
        </div>
    );
}
