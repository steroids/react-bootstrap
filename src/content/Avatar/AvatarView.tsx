import React from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IAvatarViewProps } from '@steroidsjs/core/ui/content/Avatar/Avatar'

import './AvatarView.scss';


export default function Avatar (props: IAvatarViewProps) {
    const bem = useBem('AvatarView');

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
        <div 
        className={bem(bem.block({
            [`${props.size}`]: typeof props.size === 'string',
            [`${props.shape}`]: !!props.shape,
            'has-image': !!props.src && !props.isError,
            [`status`]: props.status === true,
        }), props.className)}
        >
            <span 
                className={bem.element('body', {
                   
                })}
                style={{
                    ...props.style,
                    ...customSize,
                }}
            >
                {(props.src && (props.isError && (
                    <span>
                        {props.formattedTitle}
                    </span>
                ) || (
                    <img
                        alt={props.alt}
                        src={props.src}
                        title={props.title}
                        srcSet={props.srcSet}
                        onError={props.onError}
                    />
                ))) || (
                    <span>
                        {props.formattedTitle}
                    </span>
                )}
                {props.children}
            </span>
        </div>
    )
}