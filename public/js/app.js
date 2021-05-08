//const { response } = require("express")

console.log('this is a client side javascript')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('http://localhost:3000/weather?address='+location+'').then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageone.textContent = 'Error'
                messagetwo.textContent = ''
                console.log(data.error)
            }else{
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        
        })
    })
    return 
})