import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';

@bem('FileFieldView')
export default class FileFieldView extends React.Component<IFileFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        const ButtonComponent = this.props.buttonComponent || Button;
        const FileItemView = this.props.itemView;
        return (
            <div className={bem.block()}>
                <div className={bem(bem.element('files'), 'clearfix')}>
                    {this.props.items.map(item => (
                        <FileItemView
                            key={item.uid}
                            {...item}
                            {...this.props.itemProps}
                        />
                    ))}
                </div>
                <div className={bem.element('button')}>
                    <ButtonComponent
                        {...this.props.buttonProps}
                        layout={false}
                        label={null}
                    >
                        <Icon
                            className={bem.element('button-icon')}
                            name={this.props.imagesOnly ? 'file-image' : 'file'}
                        />
                        <span className={bem.element('button-label')}>
                            {this.props.buttonProps.label}
                        </span>
                    </ButtonComponent>
                </div>
            </div>
        );
    }

}
