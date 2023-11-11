console.log('fetch requests go here')
const tripsUrl = 'http://localhost:3001/api/v1/trips'
const travelersUrl = 'http://localhost:3001/api/v1/travelers'
const destinationsUrl = 'http://localhost:3001/api/v1/destinations'
const endpoints = [tripsUrl, travelersUrl, destinationsUrl]

export const getData = () => {
    console.log('fetch requests go here 2')
    return endpoints.map((url) =>
    fetch(url)
    .then(response => response.json())
    .catch((error) => console.log(error))
    )
}