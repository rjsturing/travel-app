console.log('fetch requests go here')
const tripsUrl = 'http://localhost:3001/api/v1/trips'
const travelersUrl = 'http://localhost:3001/api/v1/travelers'
const destinationsUrl = 'http://localhost:3001/api/v1/destinations'
const endpoints = [tripsUrl, travelersUrl, destinationsUrl]

export const getData = () => {
    return endpoints.map((url) =>
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .catch((error) => console.log(error))
    )
  }