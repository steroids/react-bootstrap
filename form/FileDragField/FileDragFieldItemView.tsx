import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileDragFieldItemViewProps} from '@steroidsjs/core/ui/form/FileDragField/FileDragField';
import Icon from '@steroidsjs/core/ui/icon/Icon';

@bem('FileDragFieldItemView')
export default class FileDragFieldItemView extends React.PureComponent<IFileDragFieldItemViewProps & IBemHocOutput> {

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
                        <Icon name={this.props.imagesOnly ? 'file' : 'file-image'}/>
                    </div>
                )}
                {this.props.showRemove && (
                    <div
                        className={bem.element('remove')}
                        onClick={this.props.onRemove}
                    >
                        <Icon name={'times'}/>
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
