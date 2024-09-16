// An array of letters to help us build a Nav menu.
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

/* Variables to help us refer to dynamic elements on the page.  */
const navMenu = document.querySelector('nav#menu')
const mainContent = document.querySelector('main#content')

/* Construct a navigation menu from the array of letters above. */
alphabet.forEach(letter => {
  let menuItem = document.createElement('a')
  menuItem.classList.add('menuItem')
  menuItem.setAttribute('id', letter)
  menuItem.innerHTML = letter
  // add an event listener to monitor for clicks.
  menuItem.addEventListener('click', event => clickLetter(event))
  navMenu.appendChild(menuItem)
})

// this function runs whenever a letter is clicked-on
const clickLetter = (event) => {
  // use the id of the element to find out which letter was clicked
  let currentLetter = event.currentTarget.id;
  // Reset CSS class for all letters so that none are "selected"
  // see also: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
  document.querySelectorAll('.menuItem').forEach(menuItem => {
    menuItem.classList.remove('selected')
  })
  // Assign a "selected" CSS class to the current letter.
  // note: the appearance of this can be customized in style.css
  document.querySelector('#' + currentLetter).classList.add('selected')
  // pass along the current letter to the getDrinks function
  getDrinks(currentLetter)
}

/* This function fetches cocktails based on a given letter. Only those cocktails whose first letter matches will be returned. */
const getDrinks = (letter) => {

  // assemble an endpoint URL based on the the guidelines in the CocktailDB API documentation
  let url = new URL('https://www.thecocktaildb.com/api/json/v1/1/search.php')
    url.searchParams.set('f', letter);
    url.searchParams.set('limit', 10);

  let anotherApproach = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
  
  console.log(url.href)

  fetch(url.href)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      // pass along the data to our displayDrinks function for rendering. 
      displayDrinks(response.drinks)
    })
    .catch(error => console.log(error))
}

/* It can be helpful to have separate functions for fetching and display. It keeps our code organized and modular! */
const displayDrinks = (drinks) => {
  // reset the main content div to clear away previous results.
  mainContent.innerHTML = ""
  if (drinks == null) {
    /* notify the user in case there are no drinks available for a given letter. */
    mainContent.innerHTML = "No drinks found."
  }
  else {
    // loop through all the drinks and display them. 
    drinks.forEach(drink => {
      /* make a div for each drink, and populate it with a simple template. */
      let div = document.createElement('div')
      div.classList.add('drink')
      /* the CocktailDB API includes a helpful thumb image for each drink. */
      div.innerHTML =
        `<img src="${drink.strDrinkThumb}">
        <p class="name">${drink.strDrink}</p>`

      mainContent.appendChild(div);
    })
  }
}

let navigation = document.createElement('nav') 
fetch('../examples.json')
.then(data => data.json())
.then(json => { 
    let template = json.map( example => `<a href="${example.url}">${example.name}</a>` ).join('') 
    navigation.innerHTML = `<a href="/">Home</a> ${template}`
}) 
document.querySelector('footer').appendChild(navigation)