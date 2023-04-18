import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function FileFieldItemView(props: IFileFieldItemViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldItemView');
    const isLoading = props.progress && props.progress.percent !== 100;

    const renderTitle = React.useCallback(() => (
        <a
            className={bem.element('title')}
            title={props.title}
            href={props.error ? '#' : props.item?.url}
            target='blank'
        >
            {props.title}
        </a>
    ), [bem, props.title, props.error, props.item]);

    const renderProgressBar = React.useCallback(() => (
        <div className={bem.element('progress-track')}>
            <div
                className={bem.element('progress-bar')}
                style={{width: `${props.progress?.percent}%`}}
            />
        </div>
    ), [bem, props.progress]);

    const renderUploadingState = React.useCallback(() => (
        <div className={bem.element('left')}>
            <Icon
                className={bem.element('icon-loading')}
                name='file-loading'
            />
            <div className={bem.element('content')}>
                {renderTitle()}
                {renderProgressBar()}
            </div>
        </div>
    ), [bem, renderTitle, renderProgressBar]);

    const renderUploadedState = React.useCallback(() => (
        <div className={bem.element('left')}>
            {props.image
                ? (
                    <img
                        className={bem.element('image')}
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
            {renderTitle()}
        </div>
    ), [bem, renderTitle, props.image, props.title]);

    return (
        <div
            className={bem.block({
                error: !!props.error,
                layout: props.filesLayout,
                images: props.imagesOnly,
            })}
        >
            {isLoading
                ? renderUploadingState()
                : renderUploadedState()}
            {props.showRemove && (
                <Icon
                    name={props.customRemoveIcon || 'trash'}
                    className={bem.element('remove')}
                    onClick={props.onRemove}
                />
            )}
        </div>
    );
}
