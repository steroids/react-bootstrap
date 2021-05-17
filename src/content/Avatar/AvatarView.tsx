import React, {useState} from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IAvatarViewProps } from '@steroidsjs/core/ui/content/Avatar/Avatar'

import './AvatarView.scss';


export default function Avatar (props: IAvatarViewProps) {
    const bem = useBem('AvatarView');
    const [isError, setIsError] = useState<boolean>(false);

    const customSize: React.CSSProperties =
        typeof props.size === 'number'
        ? {
            width: props.size,
            height: props.size,
            lineHeight: `${props.size}px`,
            fontSize:  props.size / 2,
            }
        : {};

    return (
        <span 
            className={bem.block({
                [`${props.size}`]: typeof props.size === 'string',
                [`${props.shape}`]: !!props.shape,
                'has-image': !!props.src && !isError,
            })}
            style={{...customSize}}
        >
            {props.src && (isError && (
                <span>
                    {props.alt}
                </span>
            ) || (
                <img
                    alt={props.alt}
                    src={props.src}
                    srcSet={props.srcSet}
                    onError={() => {
                        setIsError(true);
                    }}
                />
            ))}
            {props.children}
        </span>
    )
}