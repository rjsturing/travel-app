//Query Selectors:
export const signInButton = document.querySelector("#signin");
export const loginPage = document.querySelector(".lower-page-trips");
export const tripsPage = document.querySelector(".lower-page-login");
export const tripsTitle = document.querySelector(".trips-header");
export const tripsContainer = document.querySelector(".trips-container");
export const tripsTest = document.querySelector(".user-trips");
const errorMessageElement = document.getElementById("errorMessage");

export const renderTrips = (trips, destinations) => {
  tripsContainer.innerHTML = "";
  trips.forEach((trip) => {
    const matchingDestination = destinations.find(
      (destination) => destination.id === trip.destinationID
    );
    tripsContainer.innerHTML += `
        <li>
          <dl>
            <dt>Destination:</dt>
            <dd>${matchingDestination.destination}</dd>
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
  console.log(destinations);
  const locationDropdown = document.getElementById("location-dropdown");
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.text = destination.destination;
    locationDropdown.appendChild(option);
  });
};

// signInButton.addEventListener('click', showMainPage)

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

