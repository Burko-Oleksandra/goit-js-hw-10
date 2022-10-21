import './css/styles.css';
let debounce = require('lodash.debounce');

// ukraine

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoAboutCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
let country = null;

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  country = e.target.value.trim();
  fetchCountries(country);
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      response.json;
    })
    .catch(error => {
      console.log(`Помилка: ${error.status}`);
    });
}
