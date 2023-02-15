import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IAvatarViewProps} from '@steroidsjs/core/ui/content/Avatar/Avatar';

interface IAvatarProps extends IAvatarViewProps{
    formattedTitle: any,
}

export default function Avatar(props: IAvatarProps) {
    const bem = useBem('AvatarView');

    const customSize: React.CSSProperties = typeof props.size === 'number'
        ? {
            width: props.size,
            height: props.size,
            lineHeight: `${props.size}px`,
            fontSize: props.size / 2,
        }
        : {};

    const renderImage = () => (
        (props.isError && (
            <span>
                {props.formattedTitle}
            </span>
        )) || (
            <img
                alt={props.alt}
                src={props.src}
                title={props.title}
                srcSet={props.srcSet}
                onError={props.onError}
            />
        )
    );

    return (
        <div
            className={bem(bem.block({
                size: props.size,
                shape: props.shape,
                'has-image': !!props.src && !props.isError,
                'has-status': props.status,
            }), props.className)}
        >
            <span
                className={bem.element('body')}
                style={{
                    ...props.style,
                    ...customSize,
                }}
            >
                <>
                    {(props.src && renderImage()) || (
                        <span>
                            {props.formattedTitle}
                        </span>
                    )}
                    {props.children}
                </>
            </span>
        </div>
    );
}
