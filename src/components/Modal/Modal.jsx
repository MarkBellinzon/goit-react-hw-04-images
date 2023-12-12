import React, { Component } from 'react';
import css from './Modal.module.css';
import * as basicLightbox from 'basiclightbox';

export class Modal extends Component {
  handleClickImage = () => {
    const { currentImageUrl, currentImageDescription } = this.props;

    const instance = basicLightbox.create(`
      <img src="${currentImageUrl}" alt="${currentImageDescription}"  width="800" height="600">
    `);

    instance.show();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { currentImageUrl, currentImageDescription, onClose } = this.props;

    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
            onClick={this.handleClickImage}
          />
        </div>
      </div>
    );
  }
}

