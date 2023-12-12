import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { hits, totalHits } = await fetchImages(query);

        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        if (page === 1) {
          setImages(imagesArray);
          setImagesOnPage(imagesArray.length);
          setTotalImages(totalHits);
        } else {
          setImages(prevImages => [...prevImages, ...imagesArray]);
          setImagesOnPage(prevImagesOnPage => prevImagesOnPage + imagesArray.length);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      fetchData();
    }
  }, [query, page]);

  const getSearchRequest = newQuery => {
    setQuery(newQuery);
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(prevShowModal => !prevShowModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

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






// import { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { fetchImages } from './fetchAPI/fetchAPI';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// import { ScrollToTop } from './BackToTop/BackToTop';

// export const App = () => {
// const [query, setQuery] = useState('');
// const [page, setPage] = useState(1);
// const [imagesOnPage, setImagesOnPage] = useState(0);
// const [totalImages, setTotalImages] = useState(0);
// const [isLoading, setIsLoading] = useState(false);
// const [showModal, setShowModal] = useState(false);
// const [images, setImages] = useState(null);
// const [error, setError] = useState(null);
// const [currentImageUrl, setCurrentImageUrl] = useState(null);
// const [currentImageDescription, setCurrentImageDescription] = useState(null);

//   // state = {
//   //   query: '',
//   //   page: 1,
//   //   imagesOnPage: 0,
//   //   totalImages: 0,
//   //   isLoading: false,
//   //   showModal: false,
//   //   images: null,
//   //   error: null,
//   //   currentImageUrl: null,
//   //   currentImageDescription: null,
//   // };

//   const componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;

//     if (prevState.query !== query) {
//       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

//       fetchImages(query)
//         .then(({ hits, totalHits }) => {
//           const imagesArray = hits.map(hit => ({
//             id: hit.id,
//             description: hit.tags,
//             smallImage: hit.webformatURL,
//             largeImage: hit.largeImageURL,
//           }));

//           return this.setState({
//             page: 1,
//             images: imagesArray,
//             imagesOnPage: imagesArray.length,
//             totalImages: totalHits,
//           });
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() =>
//           this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
//         );
//     }

//     if (prevState.page !== page && page !== 1) {
//       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

//       fetchImages(query, page)
//         .then(({ hits }) => {
//           const imagesArray = hits.map(hit => ({
//             id: hit.id,
//             description: hit.tags,
//             smallImage: hit.webformatURL,
//             largeImage: hit.largeImageURL,
//           }));

//           return this.setState(({ images, imagesOnPage }) => {
//             return {
//               images: [...images, ...imagesArray],
//               imagesOnPage: imagesOnPage + imagesArray.length,
//             };
//           });
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() =>
//           this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
//         );
//     }
//   }

//   const getSearchRequest = query => {
//     setQuery( query );
//   };

//   const onNextFetch = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   const toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   const openModal = e => {
//     const currentImageUrl = e.target.dataset.large;
//     const currentImageDescription = e.target.alt;

//     if (e.target.nodeName === 'IMG') {
//       this.setState(({ showModal }) => ({
//         showModal: !showModal,
//         currentImageUrl: currentImageUrl,
//         currentImageDescription: currentImageDescription,
//       }));
//     }
//   };

//   // render() {
//   //   const {
//   //     images,
//   //     imagesOnPage,
//   //     totalImages,
//   //     isLoading,
//   //     showModal,
//   //     currentImageUrl,
//   //     currentImageDescription,
//   //   } = this.state;

//   //   const getSearchRequest = this.getSearchRequest;
//   //   const onNextFetch = this.onNextFetch;
//   //   const openModal = this.openModal;
//   //   const toggleModal = this.toggleModal;

//     return (
//       <>
//         <Searchbar onSubmit={getSearchRequest} />

//         {images && <ImageGallery images={images} openModal={openModal} />}

//         {isLoading && <Loader />}

//         {imagesOnPage >= 30 && imagesOnPage < totalImages && (
//           <Button onNextFetch={onNextFetch} />
//         )}

//         {showModal && (
//           <Modal
//             onClose={toggleModal}
//             currentImageUrl={currentImageUrl}
//             currentImageDescription={currentImageDescription}
//           />
//         )}
//         <ScrollToTop />
//         <ToastContainer />
//       </>
//     );
//   }
// }
