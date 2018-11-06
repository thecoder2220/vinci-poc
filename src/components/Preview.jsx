/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LightboxWithPagination from './LightboxWithPagination';
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
        hit: PropTypes.object,
    };

    state = {
        photoIndex: 0,
        isOpen: false,
    };

    render() {
        const { photoIndex, isOpen } = this.state;
        const {objectID} = this.props.hit;

        const tokens = objectID.split('/');
        console.log('tokens =', tokens )
        const fileName = tokens[tokens.length-1];
        console.log('fileName =', fileName )
        const filePath = '/input/img/' + convertObjectIdToFilePath(objectID)+'/'+fileName;
        const firstPageSuffix='-1.png';
        const firstImgPath = filePath + firstPageSuffix;
        console.log('firstImgPath =',firstImgPath  )

        /*const images = [
            firstImgPath,
            filePath +'-2.png',
            filePath +'-3.png',
            filePath +'-4.png',
            filePath +'-5.png',
        ]; */

        const images=[{ src: firstImgPath },{ src: filePath +'-2.png'},{ src: filePath +'-3.png'},{ src: filePath +'-4.png'},{ src: filePath +'-5.png'}]


        return (
            <div>
                <img
                    onClick={() => this.setState({ isOpen: true })}
                    src={firstImgPath}
                    alt="Could not generate preview"
                />
                {isOpen && (

                <LightboxWithPagination
                    images={images}
                    isOpen={this.state.isOpen}
                    onClickPrev={this.gotoPrev}
                    onClickNext={this.gotoNext}
                    onClose={this.closeBackdrop}
                    />

                )}
            </div>
        );
    }
}
