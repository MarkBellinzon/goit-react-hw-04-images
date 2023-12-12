import React, { useEffect } from 'react';
import css from './Modal.module.css';
import * as basicLightbox from 'basiclightbox';


export const Modal = ({ currentImageUrl, currentImageDescription, onClose, }) => {
  const handleClickImage = () => {
    const instance = basicLightbox.create(`
      <img src="${currentImageUrl}" alt="${currentImageDescription}" >
    `);
    instance.show();
  };

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <img
        
          src={currentImageUrl}
          alt={currentImageDescription}
          loading="lazy"
          onClick={handleClickImage}
        />
      </div>
    </div>
  );
};

