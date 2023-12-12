const API_KEY = '40207022-3419c72a3f77a39584f0c1b04';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImages(query, page = 1) {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=30`
  ).then(response => response.json());
}
