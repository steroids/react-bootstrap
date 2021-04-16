import * as React from 'react';
import {useBem} from '../../../../react/src/hooks';
import {IBemHocOutput} from '../../../../react/src/hoc/bem';
import {IFileFieldViewProps} from '../../../../react/src/ui/form/FileField/FileField';
import Icon from '../../../../react/src/ui/icon/Icon';
import Button from '../../../../react/src/ui/form/Button';

export default function FileFieldView(props: IFileFieldViewProps & IBemHocOutput) {
    const bem = useBem('FileFieldView');
    const ButtonComponent = props.buttonComponent || Button;
    const FileItemView = props.itemView;
    return (
        <div className={bem.block()}>
            <div className={bem(bem.element('files'), 'clearfix')}>
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
                    layout={false}
                    label={null}
                >
                    <Icon
                        className={bem.element('button-icon')}
                        name={props.imagesOnly ? 'file-image' : 'file'}
                    />
                    <span className={bem.element('button-label')}>
                        {props.buttonProps.label}
                    </span>
                </ButtonComponent>
            </div>
        </div>
    );
}
