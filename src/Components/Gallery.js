import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetImages, UploadImages } from '../store/actions/storageAction';
import ImageGallery from 'react-image-gallery';
import { IconButton } from '@material-ui/core';
import { Backup } from '@material-ui/icons';
import { SignOut } from '../store/actions/authAction';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageUploader from 'react-images-upload';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: false,
            imagesToUpload: []
        }
    }

    componentDidMount() {
        const { GetImages } = this.props;
        GetImages();
    }

    UNSAFE_componentWillReceiveProps(nxtProps) {
        const { images } = nxtProps;
        const { showUploader } = this.state;
        if (images.length > this.props.images.length && showUploader)
            this.setState({ showUploader: false, imagesToUpload: [] });
    }

    onSelectImage = image => this.setState({ imagesToUpload: [image, ...this.state.imagesToUpload] });

    startUpload = _ => {
        const { imagesToUpload } = this.state;
        const { UploadImages } = this.props;
        UploadImages(imagesToUpload)
    }

    render() {
        const { images, SignOut } = this.props;
        const { showUploader, imagesToUpload } = this.state;
        return (
            <>
                {images.length ? <ImageGallery items={images} /> : <h2 style={{ display: 'flex', margin: '50px auto 0', justifyContent: 'center' }}>No images to show.. Upload new One</h2>}
                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '100px auto 0', }}>
                    <button className={'btn btn-danger'} onClick={SignOut}>LOGOUT</button>
                    <button className={'btn btn-primary'} onClick={_ => this.setState({ showUploader: true })}>+</button>
                </div>
                {imagesToUpload.length ? <IconButton onClick={this.startUpload}
                    style={{
                        color: 'white', margin: '50px auto', display: 'flex',
                        height: 50, width: 50, alignSelf: 'center',
                        background: '#4FA845'
                    }}  >
                    <Backup />
                </IconButton> : null}
                {showUploader &&
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText={'Select'}
                        onChange={this.onSelectImage}
                        label={`Max file size: 5MB, accepted: jpg|png|jpeg|gif`}
                        imgExtension={['.jpg', '.png', '.jpeg', '.gif']}
                        maxFileSize={5000000}
                    />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        images: state.storage.images
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetImages: () => dispatch(GetImages()),
        SignOut: () => dispatch(SignOut()),
        UploadImages: (images) => dispatch(UploadImages(images))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);