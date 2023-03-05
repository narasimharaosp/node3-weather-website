console.log('client side')

const weatherForm = document.querySelector('.main-content form')
const search = document.querySelector('.main-content form input')

const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  const path = '/weather?address=' + location
  p1.textContent = 'Loading....'
  p2.textContent = ''
  fetch(path).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        p1.textContent = data.error
      } else {
        p1.textContent = data.location
        p2.textContent = data.forecast
      }
    })
  })
})