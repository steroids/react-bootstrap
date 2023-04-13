import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function FileFieldItemView(props: IFileFieldItemViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldItemView');
    return (
        <div
            className={bem.block({
                error: !!props.error,
                layout: props.layout,
                images: props.imagesOnly,
            })}
        >
            <div className={bem.element('left')}>
                {props.image
                    ? (
                        <img
                            src={props.image.url}
                            width={props.image.width}
                            height={props.image.height}
                            alt={props.title}
                        />
                    )
                    : (
                        <Icon
                            className={bem.element('icon')}
                            name='clip'
                        />
                    )}
                <a
                    className={bem.element('title')}
                    title={props.title}
                    href={props.error ? '#' : props.url}
                >
                    {props.title}
                </a>
            </div>
            {props.showRemove && (
                <Icon
                    name='trash'
                    className={bem.element('remove')}
                    onClick={props.onRemove}
                />
            )}
        </div>
    );
}
