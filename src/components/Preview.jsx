/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from './LightboxWithPagination/Lightbox';
import './css/preview.css';

const convertObjectIdToFilePath  = (args) => {
    var result = args.replace('https://','');
    console.log('convertObjectIdToFilePath part one =',result)
    result = result.replace(/[^a-zA-Z0-9]/g, '-');
    console.log('convertObjectIdToFilePath part two =',result)
    return result;
}

export default class Preview extends Component {
    static propTypes = {
        heading: PropTypes.string,
        hit: PropTypes.object,
        showThumbnails: PropTypes.bool,
        subheading: PropTypes.string,
    };

    state = {
        lightboxIsOpen: false,
        currentImage: 0,
    };

    constructor() {
        super();
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    openLightbox (index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    gotoImage (index) {
        this.setState({
            currentImage: index,
        });
    }

    handleClickImage () {
        if (this.state.currentImage === this.props.images.length - 1) return;
        this.gotoNext();
    }

    render() {

        const {objectID} = this.props.hit;
        const tokens = objectID.split('/');
        const fileName = tokens[tokens.length-1];
        const filePath = '/input/img/' + convertObjectIdToFilePath(objectID)+'/'+fileName;
        const firstPageSuffix='-1.png';
        const firstImgPath = filePath + firstPageSuffix;
        const images=[{ src: firstImgPath },{ src: filePath +'-2.png'},{ src: filePath +'-3.png'},{ src: filePath +'-4.png'},{ src: filePath +'-5.png'}]

        return (
            <div>
                <img
                    onClick={() => this.setState({ lightboxIsOpen: true })}
                    src={firstImgPath}
                    alt="Could not generate preview"
                />

                <Lightbox
                    currentImage={this.state.currentImage}
                    images={images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                    preventScroll={this.props.preventScroll}
                    showThumbnails={this.props.showThumbnails}
                    spinner={this.props.spinner}
                    spinnerColor={this.props.spinnerColor}
                    spinnerSize={this.props.spinnerSize}
                    theme={this.props.theme}
                />

            </div>
        );
    }
}
