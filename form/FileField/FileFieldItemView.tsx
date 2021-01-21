import * as React from 'react';

import Icon from '@steroidsjs/core/ui/icon/Icon';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';

@bem('FileFieldItemView')
export default class FileFieldItemView extends React.PureComponent<IFileFieldItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block(),
                'card float-left mb-1 mr-1',
                this.props.error && 'border-danger',
            )}>
                {this.props.image && (
                    <img
                        src={this.props.image.url}
                        className='card-img-top'
                        width={this.props.image.width}
                        height={this.props.image.height}
                        alt={this.props.title}
                    />
                ) ||
                (
                    <Icon
                        className={bem.element('blank-img')}
                        name={this.props.imagesOnly ? 'file-image' : 'file'}
                    />
                )}
                {this.props.showRemove && (
                    <Icon
                        onClick={this.props.onRemove}
                        className={bem.element('remove')}
                        name='times'
                    />
                )}
                <div className='card-body'>
                    <p
                        className={bem(
                            bem.element('text'),
                            'card-text text-center',
                            this.props.error && 'text-danger',
                        )}
                        title={this.props.error || this.props.title}
                    >
                        {this.props.error || this.props.title}
                    </p>
                </div>
            </div>
        );
    }

}
