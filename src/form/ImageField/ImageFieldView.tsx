import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {Button} from '@steroidsjs/core/ui/form';
import {IImageFieldViewProps} from '@steroidsjs/core/ui/form/ImageField/ImageField';
import * as React from 'react';

export default function ImageFieldView(props: IImageFieldViewProps) {
    const bem = useBem('ImageFieldView');
    const item = props.item;
    const srcImage = React.useMemo(() => item?.image ? item.image.url + '?w=' + item.image.width + '&h=' + item.image.height : '', [item]);

    return (
        <div className={bem(
            bem.block({
                'is-invalid': !!props.errors,
            }),
            props.className,
        )}
        >
            {!item || !item.image ? (
                <Button
                    className={bem.element('button', {
                        loading: item ? item.progress : false,
                        hasErrors: !!props.errors,
                    })}
                    onClick={props.onClick}
                    {...props.buttonProps}
                >
                    {!item || !item.progress ? (
                        <Icon
                            className={bem.element('button-icon')}
                            name='add'
                        />
                    ) : (
                        <div className={bem.element('progress-bar')}>
                            <div
                                className={bem.element('progress-slider')}
                                style={{
                                    width: `${item ? item.progress.percent : 0}%`,
                                }}
                            />
                        </div>
                    )}
                    <span className={bem.element('button-label')}>
                        {!item || !item.progress ? props.label : 'Uploading...'}
                    </span>
                </Button>
            ) : (
                <div className={bem.element('content')}>
                    <img
                        className={bem.element('image')}
                        src={srcImage}
                        width={item.image.width}
                        height={item.image.height}
                        alt={item.title}
                    />
                    <div className={bem.element('image-controls')}>
                        <a
                            className={bem.element('show-icon')}
                            href={item.image.url ?? '#'}
                            target='blank'
                        >
                            <Icon name='view' />
                        </a>
                        <Icon
                            className={bem.element('delete-icon')}
                            name='trash'
                            onClick={item.onRemove}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
