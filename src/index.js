import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import countryMarkUp from './countryMarkUp.hbs';

const Handlebars = require('handlebars');
// const template = Handlebars.compile('<p>Element</p>');
// console.log(template);
const template = Handlebars.compile('Name: {{name}}');
console.log(template({ name: 'Nils' }));

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
  if (country === '') {
    listEl.innerHTML = '';
    infoAboutCountry.innerHTML = '';
  } else {
    fetchCountries(country)
      .then(countries => {
        let countryArray = countries.map();
        if (countries.status === 404) {
          return response.json();
        }
        if (countryArray.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countryArray.length >= 2 && countryArray.length <= 10) {
          console.log('Від 2 до 10 прапор і назва');
        } else {
          console.log('1 країна - повна інформація');
          infoAboutCountry.insertAdjacentHTML(
            'beforeend',
            countryMarkUp(countries)
          );
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
}
