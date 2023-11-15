export const filterUserTrips = (userID, trips) => {
  return trips.filter((trip) => trip.userID === userID);
};

export const calculateTotalCostForYear = (trips, destinations) => {
  const currentYear = new Date().getFullYear();
  const thisYearsTrips = trips.filter(
    (trip) =>
      new Date(trip.date).getFullYear() === currentYear &&
      trip.status !== "pending"
  );
  const totalSpent = thisYearsTrips.reduce((acc, trip) => {
    const matchingDestination = destinations.find(
      (destination) => destination.id === trip.destinationID
    );

    if (matchingDestination) {
      const flightCost =
        trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
      const lodgingCost =
        trip.duration *
        trip.travelers *
        matchingDestination.estimatedLodgingCostPerDay;
      acc += flightCost + lodgingCost;
    }
    return acc;
  }, 0);
  const finalCost = (totalSpent * 1.1).toFixed(2);

  return finalCost;
};

export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = (end - start) / (1000 * 60 * 60 * 24);
  return duration;
};

export const calculateTripCost = (destination, numberOfTravelers, duration) => {
  const lodgingCost =
      destination.estimatedLodgingCostPerDay * numberOfTravelers * duration;
    const flightCost =
      destination.estimatedFlightCostPerPerson * numberOfTravelers;
    const totalCost = lodgingCost + flightCost;
    const totalCostWithFee = totalCost * 1.1;
    return totalCostWithFee;
}

export const formatDate = (dateString) => {
  return dateString.split("-").join("/");
};