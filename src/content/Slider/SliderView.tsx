/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {ISliderViewProps} from '@steroidsjs/core/ui/content/Slider/Slider';

export default function SliderView(props: ISliderViewProps) {
    const bem = useBem('Slider');

    const {itemView: ItemView} = props;

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            <Splide
                options={props.sliderOptions}
                extensions={props.extensions}
            >
                {props.items?.map((item, itemIndex) => (
                    <SplideSlide key={itemIndex}>
                        <ItemView item={item} />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}
