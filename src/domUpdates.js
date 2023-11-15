//Query Selectors:
const tripsTitle = document.querySelector(".trips-header");
const tripsContainer = document.querySelector(".trips-container");
const tripsTest = document.querySelector(".user-trips");
const errorMessageElement = document.getElementById("errorMessage");

export const renderTrips = (trips, destinations) => {
  tripsContainer.innerHTML = "";
  trips.forEach((trip) => {
    const matchingDestination = destinations.find(
      (destination) => destination.id === trip.destinationID
    );

    let tripStatus = trip.status.charAt(0).toUpperCase() + trip.status.slice(1);

    tripsContainer.innerHTML += `
        <li>
          <dl>
            <dt>Destination:</dt>
            <dd>${matchingDestination.destination}</dd>
            <dt>Status:</dt>
            <dd>${tripStatus}</dd>
            <dt>Number of Travelers:</dt>
            <dd>${trip.travelers}</dd>
            <dt>Date:</dt>
            <dd>${trip.date}</dd>
            <dt>Number of Days:</dt>
            <dd>${trip.duration}</dd>
          </dl>
          <img src=${matchingDestination.image} alt=${matchingDestination.alt}/>
        </li>
      `;
  });
};

export const populateDestinations = (destinations) => {
  const locationDropdown = document.getElementById("location-dropdown");
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.text = destination.destination;
    locationDropdown.appendChild(option);
  });
};

export const showErrorMessage = (message) => {
  errorMessageElement.innerText = message;
};

export const getDestinationNames = (destinationNumbers, allDestinations) => {
  const locations = destinationNumbers.reduce((acc, number) => {
    const destinationIds = allDestinations.forEach((destination) => {
      if (destination.id === number) {
        acc.push(destination.destination);
      }
    });
    return acc;
  }, []);
  return locations;
};

export const updateTripsPage = (travelerName, locationNames) => {
  tripsTitle.innerText = `${travelerName}'s Trips`;
  tripsTest.innerText = `${locationNames}`;
};

export const updateAnnualSpending = (totalSpending) => {
  const annualSpendingElement = document.getElementById("annual-spending");
  annualSpendingElement.innerText = `Year-to-Date spending: ${totalSpending}`;
};

export const updateEstimatedCost = (estimatedCost) => {
  const costElement = document.getElementById("estimated-cost");
  costElement.textContent = `Estimated Cost: $${estimatedCost.toFixed(2)}`;
};
