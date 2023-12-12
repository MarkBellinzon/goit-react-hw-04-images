import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './fetchAPI/fetchAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ScrollToTop } from './BackToTop/BackToTop';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  // const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  const getSearchRequest = newQuery => setQuery(newQuery);

  const onNextFetch = () => setPage(prevPage => prevPage + 1);

  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);

  const openModal = e => {
    setCurrentImageUrl(e.target.dataset.large);
    setCurrentImageDescription(e.target.alt);
    setShowModal(prevShowModal => !prevShowModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await fetchImages(query, page);
        const newImages = result.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            description: tags,
            smallImage: webformatURL,
            largeImage: largeImageURL,
          })
        );

        setImages(prevImages =>
          page === 1 ? newImages : [...prevImages, ...newImages]
        );
        setImagesOnPage(prevImagesOnPage =>
          page === 1 ? newImages.length : prevImagesOnPage + newImages.length
        );
        setTotalImages(result.totalHits);
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      fetchData();
    }
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 30 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
      <ScrollToTop />
      <ToastContainer />
    </>
  );
};
