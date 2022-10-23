import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoAboutCountry = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

let country = null;
let debounce = require('lodash.debounce');
let markUp = null;

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  country = e.target.value.trim();
  if (country === '') {
    listEl.innerHTML = '';
    infoAboutCountry.innerHTML = '';
  } else {
    fetchCountries(country).then(countries => {
      let countryArray = countries;
      if (countries.status === 404) {
        return response.json();
      }
      if (countryArray.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countryArray.length >= 2 && countryArray.length <= 10) {
        markUp = countryArray.map(country => {
         return `<li><img src='${country['flags']['svg']}' width = 50 heigth = 50/>
          <span>${country['name']['official']}</span></li>`
        }).join('');
        infoAboutCountry.innerHTML = '';
        listEl.innerHTML = markUp;
      } else {
        if (countryArray[0]['name']['official'] === 'Russian Federation') {
          Report.failure('Attention', 'Now you will be shown information about the country of the terrorist', 'Ok');
        } else if (countryArray[0]['name']['official'] === 'Republic of Belarus') {
          Report.failure('Attention', 'And now I will show you where the attack on Belarus was being prepared from', 'Ok');
        }
        let languages = Object.values(countryArray[0]['languages'])
        markUp = `<img src='${countryArray[0]['flags']['svg']}' width = 200 heigth = 200/>
        <h2>${countryArray[0]['name']['official']}</h2>
        <p><span>Capital:</span> ${countryArray[0]['capital']}</p>
        <p><span>Population:</span> ${countryArray[0]['population']}</p>
        <p><span>Languages:</span> ${languages.join(', ')}</p>`;
        listEl.innerHTML = '';
        infoAboutCountry.innerHTML = markUp;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
  }
}
