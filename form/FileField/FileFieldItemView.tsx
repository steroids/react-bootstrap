import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileFieldItemViewProps} from '@steroidsjs/core/ui/form/FileField/FileField';

@bem('FileFieldItemView')
export default class FileFieldItemView extends React.PureComponent<IFileFieldItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), 'card float-left mb-1 mr-1')}>
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
                    <div className={bem.element('blank-img')}>
                        <span className='material-icons'>
                            {this.props.imagesOnly ? 'insert_photo' : 'insert_drive_file'}
                        </span>
                    </div>
                )}
                {this.props.showRemove && (
                    <div
                        className={bem.element('remove')}
                        onClick={this.props.onRemove}
                    >
                        <span className='material-icons'>
                            close
                        </span>
                    </div>
                )}
                <div className='card-body'>
                    <p
                        className={bem(bem.element('text'), 'card-text text-center')}
                        title={this.props.title}
                    >
                        {this.props.title}
                    </p>
                </div>
            </div>
        );
    }

}
