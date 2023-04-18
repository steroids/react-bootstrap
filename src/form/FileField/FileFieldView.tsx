import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {FilesLayout, IFileFieldViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Button from '@steroidsjs/core/ui/form/Button';

export default function FileFieldView(props: IFileFieldViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldView');
    const ButtonView = props.buttonView || Button;
    const FileItemView = props.itemView;
    const isWall = props.filesLayout === FilesLayout?.wall;

    return (
        <div className={bem.block()}>
            <ButtonView
                className={bem.element('button', {isWall})}
                label={props.buttonProps.label}
                icon={isWall ? 'plus' : 'upload'}
                {...props.buttonProps}
            />
            <div className={bem(bem.element('files', {layout: props.filesLayout}))}>
                {props.items.map(item => (
                    <FileItemView
                        key={item.uid}
                        filesLayout={props.filesLayout}
                        customRemoveIcon={props.customRemoveIcon}
                        {...item}
                        {...props.itemProps}
                    />
                ))}
            </div>
        </div>
    );
}
