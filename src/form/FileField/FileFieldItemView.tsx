import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {FilesLayout, IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function FileFieldItemView(props: IFileFieldItemViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldItemView');
    const isLoading = props.progress && props.progress.percent !== 100;
    const isWall = props.filesLayout === FilesLayout.wall;

    const renderLink = React.useCallback(() => (
        <a
            className={bem.element('link')}
            title={props.title}
            href={props.error ? '#' : props.item.url}
            target='blank'
        >
            {isWall
                ? <Icon name='visible-eye' />
                : props.title}
        </a>
    ), [bem, props.title, props.error, props.item.url, isWall]);

    const renderProgressBar = React.useCallback(() => (
        <div className={bem.element('progress-track')}>
            <div
                className={bem.element('progress-bar')}
                style={{width: `${props.progress.percent}%`}}
            />
        </div>
    ), [bem, props.progress]);

    const renderLoadingState = React.useCallback(() => (
        <div className={bem.element('left')}>
            <div className={bem.element('icon-wrapper', 'loading')}>
                <Icon
                    className={bem.element('icon-loading')}
                    name='file-loading'
                />
            </div>
            <div className={bem.element('content')}>
                <span className={bem.element('title', 'loading')}>
                    {props.title}
                </span>
                {renderProgressBar()}
                <span className={bem.element('loading-text')}>
                    {__('Uploading...')}
                </span>
            </div>
        </div>
    ), [bem, props.title, renderProgressBar]);

    const renderFileItem = React.useCallback(() => (
        <div className={bem.element('left')}>
            {props.image
                ? (
                    <div
                        className={bem.element('image')}
                        style={{backgroundImage: `url(${props.image.url})`}}
                    />
                )
                : (
                    <div className={bem.element('icon-wrapper')}>
                        <Icon
                            className={bem.element('icon')}
                            name={props.imagesOnly ? 'file-img-type' : 'clip'}
                        />
                    </div>
                )}
            {renderLink()}
            <span className={bem.element('title')}>
                {props.title}
            </span>
        </div>
    ), [bem, props.image, props.imagesOnly, props.title, renderLink]);

    return (
        <div
            className={bem.block({
                error: !!props.error,
                images: props.imagesOnly,
                isWall,
            })}
        >
            {isLoading
                ? renderLoadingState()
                : renderFileItem()}
            {props.showRemove && (
                <Icon
                    name={props.customRemoveIcon || 'trash'}
                    className={bem.element('remove', {isLoading})}
                    onClick={props.onRemove}
                />
            )}
            <div className={bem.element('overlay')} />
        </div>
    );
}
