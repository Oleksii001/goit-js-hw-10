import './index.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const breedDescription = document.querySelector('.breed-description');
const breedTemperament = document.querySelector('.breed-temperament');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.style.display = 'none';
catInfoDiv.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    if (breeds.length > 0) {
      const options = breeds.map(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        return option;
      });

      breedSelect.append(...options);
    } else {
      throw new Error('No breeds found');
    }
    new SlimSelect({
  select: '#breedSelect'
})
  })
  .catch(() => {
    Notiflix.Notify.failure('Oops', 'Something went wrong, try reloading the page', 'Ok');
    error.style.display = 'block'; 
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
    .then(data => {
      if (data.length > 0) {
        const catData = data[0];
        const breed = catData.breeds[0];

        catImage.src = catData.url;
        breedName.textContent = breed.name;
        breedDescription.textContent = breed.description;
        breedTemperament.textContent = `Temperament: ${breed.temperament}`;

        catInfoDiv.style.display = 'flex';
      } else {
        throw new Error('No cat found for the given breed ID');
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops', 'Something went wrong, try reloading the page.', 'Ok');
      error.style.display = 'block'; 
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});


