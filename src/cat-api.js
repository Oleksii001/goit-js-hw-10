const API_KEY = 'live_cCNP47IE19FDfmH0yEhc07cArVYjvzEJOKM8kcBJOI1T4LWNRYQWjus7GK76zMGv';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const catData = data[0];
        const breed = catData.breeds[0];
        return {
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          imageUrl: catData.url
        };
      } else {
        throw new Error('No cat found for the given breed ID');
      }
    });
}
