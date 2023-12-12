import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({
  description,
  smallImage,
  largeImage,
  openModal,
}) {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
}

