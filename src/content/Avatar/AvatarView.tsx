import React, {useState, isValidElement} from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IAvatarViewProps } from '@steroidsjs/core/ui/content/Avatar/Avatar'

import './AvatarView.scss';

export default function Avatar (props: IAvatarViewProps) {
    const bem = useBem('AvatarView');

    const [isImgExist, setIsImgExist] = useState(true);

    const customSize: React.CSSProperties =
        typeof props.size === 'number'
        ? {
            width: props.size,
            height: props.size,
            lineHeight: `${props.size}px`,
            fontSize:  props.size / 3,
            }
        : {};

    const hasImageElement = isValidElement(props.src);

    let renderingChildren;
    if (typeof props.src === 'string' && isImgExist) {
        renderingChildren = (
            <img src={props.src} srcSet={props.srcSet} alt={props.alt}/>
        );
    } else if (hasImageElement) {
        renderingChildren = props.src;
    } else if (props.children) {
        renderingChildren = (
            <span>{props.children}</span>
        )
    } else if (typeof props.alt === 'string') {
        renderingChildren = (
            <span>{props.alt}</span>
        )
    }  else if (props.src && props.children === "") {
        renderingChildren = (
            <img src="https://hh.ru/employer-logo/3775460.png" srcSet={props.srcSet}/>
        )
    }

    return(
        <span 
            className={bem.block({
                [`large`]: props.size === 'large',
                [`medium`]: props.size === 'medium',
                [`small`]: props.size === 'small',
                [`square`]: props.shape === 'square',
                [`circle`]: props.shape === 'circle',
            })}
            style={ {...customSize}} 
        >
            {renderingChildren}
        </span>
    )
}