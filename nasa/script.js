// NASA API
// Here's my API Key for NASA
// You can get your own NASA API key for free
// see also: https://api.nasa.gov/
const myAPIKey = 'EzDCRKNTuMwZloWNccRvaiuZrhKJLvcbRO4PJVHO'

// Let's setup a variable for the apod container that will hold our pictures.
const apod = document.querySelector('#apod')

// To make the datepicker dynamic, let's put it inside variable
const datePicker = document.querySelector('#datePicker')

/* NASA publishes images on the day-of (not for tomorrow or beyond). Let's therefore disable future dates in the datepicker by setting today's date as both the default and the maximum value for the datePicker. To get the date in the correct format, we can use JavaScript's Date() functions. For more about this, see the discussion here: https://stackoverflow.com/a/49916376/17929842
See also: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#max */ 
const today = new Date().toLocaleDateString('en-ca')
datePicker.max = today
datePicker.value = today

// Whenever the user changes the date, we run a function.
// To do this we will attach an event listener to the datePicker.
// For more examples of event listeners, see here: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#examples
datePicker.addEventListener('change', (event)=>{ 
    // the event listener passes along lot's of useful contextual info, including the value of the datepicker. Logging it here just so we can see it.
    console.log(event.target.value)
    getImage(event.target.value)  
})


// The function fetches data for a particular chosen date. 
const getImage = (chosenDate) => {
  
    // Let's assemble a NASA endpoint URL that includes the chosen date as a query parameter. We'll include an API Key as a  query parameter too.  
    let url = new URL ('https://api.nasa.gov/planetary/apod')
    url.searchParams.set('date', chosenDate)
    url.searchParams.set('api_key', myAPIKey)

    console.log(url.href )
 
    // fetch data from NASA
    fetch(url.href)
      .then(response => response.json())   /* parse the response as JSON */
      .then(response => {  
  
        // log the result from NASA to the console. 
        console.log(response);       

        // Reset contents of apod container to prepare for a new image. 
        apod.innerHTML = ""; 

        // Usually NASA returns an image, but sometimes we get a video instead. 
        // For example, try May 31, 2023 !
        
        // if we have an image then we need an image tag. 
        // if we have a video, then it's easiest to embed it inside an iframe.
        if (response.media_type == "image"){
            // create an image and give it a dynamic URL 
            let img = document.createElement('img');
            img.src = response.url;
            apod.appendChild(img);
        }
        else if (response.media_type == "video"){
          // create an iframe and give it a dynamic URL 
            let iframe = document.createElement('iframe'); 
            iframe.src = response.url;
            apod.appendChild(iframe); 
        }

      })
      .catch(error=> console.log(error))
}

// begin by loading data for today.
getImage(today);



let navigation = document.createElement('nav') 
fetch('../examples.json')
.then(data => data.json())
.then(json => { 
    let template = json.map( example => `<a href="${example.url}">${example.name}</a>` ).join('') 
    navigation.innerHTML = `<a href="/">Home</a> ${template}`
}) 
document.querySelector('footer').appendChild(navigation)