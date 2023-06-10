import './index.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const breedDescription = document.querySelector('.breed-description');
const breedTemperament = document.querySelector('.breed-temperament');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(() => {
    Notiflix.Notify.failure('Oops', 'Something went wrong, try reloading the page', 'Ok');
    error.style.display = 'none';
  })
  .finally(() => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';

  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  catInfoDiv.style.display = 'none';
  loader.style.display = 'block';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catImage.src = catData.imageUrl;
      breedName.textContent = `${catData.name}`;
      breedDescription.textContent = `${catData.description}`;
      breedTemperament.textContent = `Temperament: ${catData.temperament}`;

      catInfoDiv.style.display = 'flex';
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops', 'Something went wrong, try reloading the page.', 'Ok');
      error.style.display = 'none';

    })
    .finally(() => {
      loader.style.display = 'none';

    });
});
