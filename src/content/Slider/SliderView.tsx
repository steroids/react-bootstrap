/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Splide as SplideSource, SplideSlide} from '@splidejs/react-splide';
import {ISliderViewProps} from '@steroidsjs/core/ui/content/Slider/Slider';

import '@splidejs/splide/dist/css/splide.min.css';

export default function SliderView(props: ISliderViewProps) {
    const bem = useBem('Slider');

    //TODO Исправить тип, связано с yarn tsc в action publish.yml
    const Splide: any = SplideSource;

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
                hasTrack={props.hasTrack}
                tag={props.tag}
                transition={props.transition}
                ref={props.ref}
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
