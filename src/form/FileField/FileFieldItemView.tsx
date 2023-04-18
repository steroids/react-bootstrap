import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {FilesLayout, IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function FileFieldItemView(props: IFileFieldItemViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldItemView');
    const isLoading = props.progress && props.progress.percent !== 100;
    const isWall = props.filesLayout === FilesLayout?.wall;

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
            <div className={bem.element('icon-wrapper')}>
                <Icon
                    className={bem.element('icon-loading')}
                    name='file-loading'
                />
            </div>
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
            {renderTitle()}
        </div>
    ), [bem, renderTitle, props.image, props.imagesOnly]);

    return (
        <div
            className={bem.block({
                error: !!props.error,
                images: props.imagesOnly,
                isWall,
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
