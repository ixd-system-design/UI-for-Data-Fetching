/*
EmojiHUB defines several categories for Emoji. I have created an array here to replicate these categories. I will use this array to construct a navigation menu. To customize the UI,  I have chosen an exemplar for each category.
*/
let categories = [
  {
    exemplar: "🤔",
    label: "Smileys/People",
    name: "smileys-and-people"
  },
  {
    exemplar: "🐱",
    label: "Animals/Nature",
    name: "animals-and-nature"
  },
  {
    exemplar: "🍕",
    label: "Food/Drink",
    name: "food-and-drink"
  },
  {
    exemplar: "🚋",
    label: "Travel/Places",
    name: "travel-and-places"
  },
  {
    exemplar: "🚲",
    label: "Activities",
    name: "activities"
  },
  {
    exemplar: "📕",
    label: "Objects",
    name: "objects"
  },
  {
    exemplar: "🔣",
    label: "Symbols",
    name: "symbols"
  }
];


/*
Create some variables that help us refer to dynamic elements on the page. 
*/
const navMenu = document.querySelector('nav#menu')
const mainContent = document.querySelector('main#content')


/* Construct a navigation menu from the JSON array above. */
categories.forEach((category) => {
  let menuItem = document.createElement('a')
  menuItem.setAttribute('id', category.name)
  /* inside each menu item there will be two sub-items: an emoji and a label. The template below defines a separate span for both. Note that well structured HTML markup makes a big difference when it comes to applying layout and style with CSS. */
  menuItem.innerHTML =
    `<span class="emoji">${category.exemplar}</span>
     <span class="label">${category.label}</span>`
  /* When the user clicks on an item in the menu, pass along the id (i.e. the category name) to the getRandomEmoji function.  See also: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget */
  menuItem.addEventListener('click', event => {
    getRandomEmoji(event.currentTarget.id)
  })
  navMenu.appendChild(menuItem)
})


/* This function fetches a random emoji from emojihub based on a given category. Once the emoji has been fetched, it gets added to the main content area on the page.  */
const getRandomEmoji = (category) => {
  /* dynamically assemble a URL endpoint for the chosen category. Note the use of a plus (+) to concatenate / join strings. */
  let endpointURL = `https://emojihub.yurace.pro/api/random/category/${category}`
  fetch(endpointURL)
    .then(response => response.json())
    .then(response => {
      /* Let's log the response to the console to help us understand how the data is structured */
      console.log(response)
      /* EmojiHUB stores the HTML Code for the emoji as the first (zeroeth) element of an array. Read more about arrays here: https://www.w3schools.com/js/js_arrays.asp  */
      mainContent.innerHTML = response.htmlCode[0]
    })
    .catch(error => console.log(error))

}

let navigation = document.createElement('nav')
fetch('../examples.json')
  .then(data => data.json())
  .then(json => {
    let template = json.map(example => `<a href="..${example.url}">${example.name}</a>`).join('')
    navigation.innerHTML = `<a href="..">Home</a> ${template}`
  })
document.querySelector('footer').appendChild(navigation)