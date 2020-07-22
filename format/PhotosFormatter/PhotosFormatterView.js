import * as React from 'react';
import * as Gallery from 'react-grid-gallery';
import PropTypes from 'prop-types';

export default class PhotosFormatterView extends React.PureComponent {

    static propTypes = {
        value: PropTypes.any,
        photoRowHeight: PropTypes.number,
    };

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
