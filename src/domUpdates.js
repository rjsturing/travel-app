//Query Selectors:
export const signInButton = document.querySelector('#signin')
export const loginPage = document.querySelector('.lower-page-trips')
export const tripsPage = document.querySelector('.lower-page-login')
export const tripsTitle = document.querySelector('.trips-header')
export const tripsTest = document.querySelector('.user-trips')
const errorMessageElement = document.getElementById('errorMessage')


// Event Handlers:

// signInButton.addEventListener('click', showMainPage)

export const showErrorMessage = (message) => {
    errorMessageElement.innerText = message
}


export const showMainPage = () => {
    loginPage.classList.add('hidden');
    tripsPage.classList.remove('hidden');
}
export const getDestinationNums = (userTrips) => {
    const nums = userTrips.map(trip => {
        return trip.destinationID
    })
    return nums
}
export const getDestinationNames = (destinationNumbers, allDestinations) => {
    const locations = destinationNumbers.reduce((acc, number) => {
        const destinationIds = allDestinations.forEach(destination => {
            if(destination.id === number){
                acc.push(destination.destination)
            }
        })
        return acc
    }, [])
    return locations
}

export const updateTripsPage = (travelerName, locationNames) => {
    tripsTitle.innerText = `${travelerName}'s Trips`
    tripsTest.innerText = `${locationNames}`
}