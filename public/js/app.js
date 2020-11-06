console.log('entering client side javascript side')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = ''

const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    // to prevent the refreshing o f the browser
    e.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecastData
                // console.log(data.location)
                // console.log(data.forecastData)
            }

        })
    })

})