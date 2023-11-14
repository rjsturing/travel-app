export const filterUserTrips = (userID, trips) => {
  return trips.filter((trip) => trip.userID === userID);
};

export const calculateTotalCostForYear = (trips, destinations) => {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  const thisYearsTrips = trips.filter(
    (trip) => new Date(trip.date).getFullYear() === currentYear
  );
  console.log(thisYearsTrips);
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
  console.log("Final Cost (after 10% surcharge):", finalCost);

  return finalCost;
};
