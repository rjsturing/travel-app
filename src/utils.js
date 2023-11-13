export const filterUserTrips = (userID, trips) => {
    return trips.filter(trip => trip.userID === userID) 
  }