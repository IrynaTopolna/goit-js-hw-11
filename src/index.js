// import './css/styles.css';
// import fetchCountries from './fetchCountries';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;

// const inputRef = document.querySelector('#search-box');
// const countryListRef = document.querySelector('.country-list');
// const countryInfoRef = document.querySelector('.country-info');

// inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(evt) {
//   const countryName = evt.target.value.trim();
//   console.log(countryName);

//   clearHTML();

//   if (countryName) {
//     fetchCountries(countryName)
//       .then(data => {
//         if (data.length > 10) {
//           Notiflix.Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//           return;
//         }

//         createListMarkup(data);

//         if (data.length === 1) {
//           clearHTML();
//           createCountryMarkup(data);
//         }
//       })
//       .catch(err => Notiflix.Notify.failure(`${err}`));
//   }
// }

// function createListMarkup(data) {
//   const listMarkup = data.map(
//     ({ name: { official }, flags: { svg } }) =>
//       `<li class="country-list__item">
//       <img src="${svg}" class="country-list__item-flag" alt="Flag of ${official}">
//       ${official}</li>`
//   );
//   countryListRef.innerHTML = listMarkup.join('');
// }

// function createCountryMarkup(data) {
//   const contryMarkup = data.map(
//     ({
//       name: { official },
//       flags: { svg },
//       capital,
//       languages,
//       population,
//     }) => {
//       const counrtyLang = Object.values(languages);

//       return `<h2 class="country-name">
//           <img src="${svg}" class="country-list__item-flag" alt="Flag of ${official}">
//           ${official}</h2>
//       <h3>Capital: ${capital}</h3>
//       <h3>Population: ${population}</h3>
//       <h3>Languages: ${counrtyLang}</h3>`;
//     }
//   );
//   countryInfoRef.innerHTML = contryMarkup.join('');
// }

// function clearHTML() {
//   countryListRef.innerHTML = '';
//   countryInfoRef.innerHTML = '';
// }
