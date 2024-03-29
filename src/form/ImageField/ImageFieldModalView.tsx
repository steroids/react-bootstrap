import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {useState} from 'react';
import ReactCropSource from 'react-image-crop';
import {IImageFieldModalViewProps} from '@steroidsjs/core/ui/form/ImageField/ImageField';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageFieldModalView(props: IImageFieldModalViewProps) {
    const bem = useBem('ImageFieldModalView');

    //TODO Исправить тип, связано с yarn tsc в action publish.yml
    const ReactCrop: any = ReactCropSource;

    const [crop, setCrop] = useState(props.crop.initialValues);

    return (
        <Modal
            className={bem.block()}
            title={props.title || __('Выберите область изображения')}
            onClose={props.onClose}
            buttons={[{
                label: __(('Сохранить')),
                onClick: () => {
                    props.onClose();
                    props.crop.onSubmit(crop, props.image.id);
                },
            }]}
        >
            <div className='mb-3'>
                <ReactCrop
                    {...props.crop.reactImageCropProps}
                    className={bem.element('crop')}
                    src={props.image && props.image.url}
                    crop={crop}
                    onChange={setCrop}
                />
            </div>
        </Modal>
    );
}
