// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import "./images/trips-icon.png";
import "./images/user-icon.png";
import "./images/main-logo.png";
import "./images/paris-pic.png";

// Import domUpdates
import { renderTrips, populateDestinations, showErrorMessage } from "./domUpdates";

//Event Listeners

let userId = 3

//Import Function
import { filterUserTrips, 
  calculateTotalCostForYear } from "./utils";

// API Calls
import { getData } from "./apiCalls";

// signInButton.addEventListener("click", showMainPage);

const setUpDashboard = (userId) => {
  Promise.all([getData("trips"), getData("destinations")])
    .then(([tripsResponse, destinationsResponse]) => {
      const userTrips = filterUserTrips(userId, tripsResponse.trips);
      renderTrips(userTrips, destinationsResponse.destinations);
      populateDestinations(destinationsResponse.destinations);

      const userTotal = calculateTotalCostForYear(userTrips, destinationsResponse.destinations);
      updateAnnualSpending(userTotal); // This line updates the UI with the total cost
    })
    .catch((error) => showErrorMessage(error.message));
};

window.addEventListener("load", () => {
  setUpDashboard(userId);
});

