// Setup a variables to hold dynamic elements
const searchForm = document.querySelector('#searchForm')
const mainContent = document.querySelector('#content')

// listen for form submission
searchForm.addEventListener("submit", event => {

  // By default, JavaScript sends form data to the server, thus reloading the page. However, since we have already processed the form on the client side, there is no need to reload the page. Let's therefore prevent a reload from happening:
  event.preventDefault()

  // get the contexts of the search input box.
  let searchText = document.querySelector('#searchText').value
  
  // let's build a URL with all the necessary query parameters (searchParams)
  // the key element here is to search for a title based on user input
  let url = new URL('https://online-movie-database.p.rapidapi.com/title/v2/find')
  url.searchParams.set('title',  searchText )  
  url.searchParams.set('titleType', 'movie')
  url.searchParams.set('limit', 20)

  // log the above generated URL to the console
  console.log(url.href)
    
  // Rapid API Key as specified by RapidAPI documentation.
  // NOTE: You may need to get your own API Key if this one runs out of bandwidth.
  const options = {
  	method: 'GET',
    	headers: {
      'X-RapidAPI-Key': '1vIbsga81PmshbLgB36s095VydtMp1IEtO5jsnYcjTFoXzpbeU',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };

  // Run the request
  fetch(url.href, options)
  	.then(response => response.json())
  	.then(response => { 
      // log the response to help understand how it is structured.
      console.log(response)
      // pass the results on to the displayResults function for rendering.
      displayResults(response.results)
    })
  	.catch(err => console.error(err));
 

});


// For each search result, display some HTML
const displayResults = (results) => {
  // reset the contents of the page to remove previous results. 
   mainContent.innerHTML = '';
  if (results){
    results.forEach(result => {
      // create a div to contain the movie.
      let div = document.createElement('div');
      div.classList.add('result'); 
      
      // If no image is provided, set a default image.
      // I'm using a conditional operator here.
      // It's like a single-line if-statement.
      // See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
     
      let imageURL = (result.image) ? result.image.url : 'imdb.svg'
      
      // Make a simple template for the movie and add it to the page
      div.innerHTML = 
        `<img src="${imageURL}">
        <p class="name">${result.title}</p>` 
      mainContent.appendChild(div)
    })
  }
  else{
    // in case there are no results, show the user some helpful feedback.
    mainContent.innerHTML = 'No Results Found';
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