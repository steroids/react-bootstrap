import * as React from 'react';
import {useBem} from '../../../../react/src/hooks';
import {IBemHocOutput} from '../../../../react/src/hoc/bem';
import {IFileFieldItemViewProps} from '../../../../react/src/ui/form/FileField/FileField';
import Icon from '../../../../react/src/ui/icon/Icon';

export default function FileFieldItemView(props: IFileFieldItemViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldItemView');
    return (
        <div
            className={bem(
                bem.block(),
                'card float-left mb-1 mr-1',
                props.error && 'border-danger',
            )}
        >
            {props.image
                ? (
                    <img
                        src={props.image.url}
                        className='card-img-top'
                        width={props.image.width}
                        height={props.image.height}
                        alt={props.title}
                    />
                )
                : (
                    <Icon
                        className={bem.element('blank-img')}
                        name={props.imagesOnly ? 'file-image' : 'file'}
                    />
                )}
            {props.showRemove && (
                <Icon
                    onClick={props.onRemove}
                    className={bem.element('remove')}
                    name='times'
                />
            )}
            <div className='card-body'>
                <p
                    className={bem(
                        bem.element('text'),
                        'card-text text-center',
                        props.error && 'text-danger',
                    )}
                    title={props.error || props.title}
                >
                    {props.error || props.title}
                </p>
            </div>
        </div>
    );
}
