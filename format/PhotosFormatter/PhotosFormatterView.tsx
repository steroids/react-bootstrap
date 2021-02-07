import * as React from 'react';
import * as Gallery from 'react-grid-gallery';
import {IPhotosFormatterViewProps} from '@steroidsjs/core/ui/format/PhotosFormatter/PhotosFormatter';

export default function PhotosFormatterView(props: IPhotosFormatterViewProps) {
    const photos = props.value;
    if (!photos || photos.length === 0) {
        return null;
    }
    return (
        <Gallery
            images={photos}
            margin={3}
            rowHeight={props.photoRowHeight || 120}
            backdropClosesModal={true}
            enableImageSelection={false}
            imageCountSeparator={__(' из ')}
        />
    );
}
