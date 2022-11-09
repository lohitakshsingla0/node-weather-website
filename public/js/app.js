

console.log("Cliend side javascript on local host")






const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message1.textContent = "Loading......"
    message2.textContent = ""

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error
        } else {
            
            message1.textContent = "Weather : " + data.forcast.Weather + ", Temperature : " + data.forcast.Temperature +  ", Feels Like : " + data.forcast.FeelsLike 
            message2.textContent = data.location

            console.log(data.forcast)
            console.log(data.location)
        }
    })
})


    console.log(location)
})
