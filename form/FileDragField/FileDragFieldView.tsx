import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFileDragFieldViewProps} from '@steroidsjs/core/ui/form/FileDragField/FileDragField';

@bem('FileDragFieldView')
export default class FileDragFieldView extends React.PureComponent<IFileDragFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        const FileItemView = this.props.itemView;
        return (
            <div className={bem.block()}>
                <div
                    className={bem.element('drop-area', {
                        'is-dragging': this.props.isDragging
                    })}
                    ref={this.props.dropAreaRef}
                    onClick={this.props.onBrowse}
                >
                    +
                </div>
                <div className={bem(bem.element('files'), 'clearfix')}>
                    {this.props.items.map(item => (
                        <FileItemView
                            key={item.uid}
                            {...item}
                            {...this.props.itemProps}
                        />
                    ))}
                </div>
            </div>
        );
    }

}
