import * as React from 'react';
import * as Gallery from 'react-grid-gallery';
import {IPhotosFormatterViewProps} from '@steroidsjs/core/ui/format/PhotosFormatter/PhotosFormatter';

export default class PhotosFormatterView extends React.Component<IPhotosFormatterViewProps> {

    static defaultProps = {
        photoRowHeight: 120
    };

    render() {
        const photos = this.props.value;
        if (!photos || photos.length === 0) {
            return null;
        }
        return (
            <Gallery
                images={photos}
                margin={3}
                rowHeight={this.props.photoRowHeight}
                backdropClosesModal={true}
                enableImageSelection={false}
                imageCountSeparator={__(' из ')}
            />
        );
    }
}
