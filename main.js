
let navigation = document.createElement('nav')

fetch('examples.json')
    .then(data => data.json())
    .then(json => {


        navigation.innerHTML = json.map(example => `
        <div class="example">
            <h2><a href=".${example.url}">${example.name}</a></h2>
            <p>${example.description}</p>
            <a target="_blank" href="${example.api}">API Documentation</a>
        </div>
        ` ).join('')

    })


document.querySelector('body').appendChild(navigation)