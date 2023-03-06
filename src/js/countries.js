import '../css/styles.css';
import { debounce, values } from 'lodash';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log('error'));
}

const resetResult = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

const findCountry = () => {
  const searchInput = input.value.trim();
  if (/[0-9]/.test(searchInput)) {
    Notiflix.Notify.failure("We don't accept numbers");
  } else {
    fetchCountries(searchInput)
      .then(data => {
        countriesFoundedList(data);
      })
      .catch(error => {
        if (searchInput !== '') {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      });
  }
};

const countriesFoundedList = data => {
  if (data.length > 10) {
    resetResult();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length <= 10 && data.length > 1) {
    resetResult();
    console.log(data);
    return (countryList.innerHTML = data
      .map(
        country =>
          `<li><h4><img src =" ${country.flags.svg}" alt="${country.name.common} flag" width="50px"/>${country.name.common}</h4></li>`
      )
      .join(''));
  } else {
    resetResult();
    return (countryInfo.innerHTML = data
      .map(
        country =>
          `<ul class="country-info-list">
        <li><p class="country-name"><b><img src =" ${country.flags.svg}" alt="${
            country.name.common
          } flag" width="100px"/>${country.name.common}</b></p></li>
        <li><p><b>Capital:</b> ${country.capital}</p></li>
        <li><p><b>Population:</b> ${country.population}</p></li>
        <li><p><b>Languages:</b> ${values(country.languages).join(
          ', '
        )}</p></li>
        </ul>`
      )
      .join(''));
  }
};

input.addEventListener('keyup', debounce(findCountry, DEBOUNCE_DELAY));
