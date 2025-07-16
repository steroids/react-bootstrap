import {useBem} from '@steroidsjs/core/hooks';
import {FilesLayout, IFileFieldViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Button from '@steroidsjs/core/ui/form/Button';
import {FunctionComponent} from 'react';

export default function FileFieldView(props: IFileFieldViewProps) {
    const bem = useBem('FileFieldView');
    const ButtonView = props.buttonView || Button;
    const FileItemView = props.itemView as FunctionComponent;
    const isWall = props.filesLayout === FilesLayout.wall;

    return (
        <div
            className={bem(
                bem.block({
                    isWall,
                    'is-invalid': !!props.errors,
                }),
                props.className,
            )}
        >
            <ButtonView
                className={bem.element('button', {isWall})}
                icon={isWall ? 'add' : 'export'}
                {...props.buttonProps}
            />
            <div className={bem(bem.element('files'))}>
                {props.items.map(item => (
                    <FileItemView
                        key={item.uid}
                        filesLayout={props.filesLayout}
                        imagesOnly={props.imagesOnly}
                        customRemoveIcon={props.customRemoveIcon}
                        loadingText={props.loadingText}
                        {...item}
                        {...props.itemProps}
                    />
                ))}
            </div>
        </div>
    );
}
