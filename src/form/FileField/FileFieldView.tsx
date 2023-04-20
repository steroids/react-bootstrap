import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {FilesLayout, IFileFieldViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Button from '@steroidsjs/core/ui/form/Button';

export default function FileFieldView(props: IFileFieldViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldView');
    const ButtonView = props.buttonView || Button;
    const FileItemView = props.itemView;
    const isWall = props.filesLayout === FilesLayout.wall;

    return (
        <div className={bem.block({isWall})}>
            <ButtonView
                className={bem.element('button', {isWall})}
                icon={isWall ? 'plus' : 'upload'}
                {...props.buttonProps}
            />
            <div className={bem(bem.element('files'))}>
                {props.items.map(item => (
                    <FileItemView
                        key={item.uid}
                        filesLayout={props.filesLayout}
                        imagesOnly={props.imagesOnly}
                        customRemoveIcon={props.customRemoveIcon}
                        {...item}
                        {...props.itemProps}
                    />
                ))}
            </div>
        </div>
    );
}
