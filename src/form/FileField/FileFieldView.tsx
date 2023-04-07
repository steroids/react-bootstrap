import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';
import Icon from '@steroidsjs/core/ui/content/Icon';
import Button from '@steroidsjs/core/ui/form/Button';

export default function FileFieldView(props: IFileFieldViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldView');
    const ButtonComponent = props.buttonComponent || Button;
    const FileItemView = props.itemView;
    return (
        <div className={bem.block()}>
            <div className={bem(bem.element('files'))}>
                {props.items.map(item => (
                    <FileItemView
                        key={item.uid}
                        {...item}
                        {...props.itemProps}
                    />
                ))}
            </div>
            <div className={bem.element('button')}>
                <ButtonComponent
                    {...props.buttonProps}
                    label={null}
                >
                    <Icon
                        className={bem.element('button-icon')}
                        name={props.imagesOnly ? 'file-image' : 'upload'}
                    />
                    <span className={bem.element('button-label')}>
                        {props.buttonProps.label}
                    </span>
                </ButtonComponent>
            </div>
        </div>
    );
}
