//Query Selectors:
export const signInButton = document.querySelector('#signin')
export const loginPage = document.querySelector('.lower-pane-1')
export const tripsPage = document.querySelector('.lower-pane-2')
export const tripsTitle = document.querySelector('.trips-header')
export const tripsTest = document.querySelector('.user-trips')
// Event Handlers:

// signInButton.addEventListener('click', showMainPage)

export const showMainPage = () => {
    loginPage.classList.add('hidden');
    tripsPage.classList.remove('hidden');
}
export const getDestinationNums = (userTrips) => {
    const justNums = userTrips.map(trip => {
        return trip.destinationID
    })
    return justNums
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