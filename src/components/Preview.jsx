import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import './css/preview.css';

const images = [
    '/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-1.png',
    '/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-2.png',
    '/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-3.png',
    '/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-4.png',
    '/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-5.png',
];

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                <img
                    onClick={() => this.setState({ isOpen: true })}
                    src="/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-1.png"
                    alt="Could not generate preview"
                />
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={
                            images[
                                (photoIndex + images.length - 1) % images.length
                            ]
                        }
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (photoIndex + images.length - 1) %
                                    images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}
