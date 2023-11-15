import "./css/styles.css";

import {
  renderTrips,
  populateDestinations,
  showErrorMessage,
  updateAnnualSpending,
  loginPage,
  tripsPage,
} from "./domUpdates";

// Utility Functions
import {
  filterUserTrips,
  calculateTotalCostForYear,
  calculateDuration,
  calculateTripCost,
  formatDate,
} from "./utils";

// API Calls
import { getData, postData } from "./apiCalls";

// Global Variables
let globalUserID;
let destinations = [];

const calculateEstimatedCost = () => {
  const numberOfTravelers = parseInt(
    document.getElementById("num-travelers").value
  );
  const destinationID = parseInt(
    document.getElementById("location-dropdown").value
  );
  const duration = calculateDuration(
    document.getElementById("start-date").value,
    document.getElementById("end-date").value
  );

  const destination = destinations.find((dest) => dest.id === destinationID);
  if (destination && numberOfTravelers && duration) {
    return calculateTripCost(destination, numberOfTravelers, duration);
  }
  return 0;
};

const setUpDashboard = (userId) => {
  loginPage.classList.add("hidden");
  tripsPage.classList.remove("hidden");
  Promise.all([
    getData("trips"),
    getData("destinations"),
    getData(`travelers/${userId}`),
  ])
    .then(([tripsResponse, destinationsResponse, userResponse]) => {
      destinations = destinationsResponse.destinations;
      const userTrips = filterUserTrips(userId, tripsResponse.trips);
      renderTrips(userTrips, destinationsResponse.destinations);
      populateDestinations(destinationsResponse.destinations);

      const userTotal = calculateTotalCostForYear(
        userTrips,
        destinationsResponse.destinations
      );
      updateAnnualSpending(userTotal);

      // update dom with userResponse data
    })
    .catch((error) => showErrorMessage(error.message));
};

const handleSubmit = (event) => {
  event.preventDefault();
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const numberOfTravelersInput = document.getElementById("num-travelers");
  const destinationInput = document.getElementById("location-dropdown");

  if (
    !startDateInput.value ||
    !endDateInput.value ||
    !numberOfTravelersInput.value ||
    destinationInput.value === ""
  ) {
    showErrorMessage("Please fill out all required fields.");
    return;
  }

  if (new Date(startDateInput.value) > new Date(endDateInput.value)) {
    showErrorMessage("End date must be after start date.");
    return;
  }

  const newTrip = {
    id: Date.now(),
    userID: globalUserID,
    destinationID: parseInt(destinationInput.value),
    travelers: parseInt(numberOfTravelersInput.value),
    date: formatDate(startDateInput.value),
    duration: calculateDuration(startDateInput.value, endDateInput.value),
    status: "pending",
    suggestedActivities: [],
  };

  postData("trips", newTrip)
    .then((response) => {
      startDateInput.value = "";
      endDateInput.value = "";
      numberOfTravelersInput.value = "";
      destinationInput.value = "";
      setUpDashboard(globalUserID);
    })
    .catch((error) => showErrorMessage(error.message));
};

////////////////////////////////////////////////////////
document
  .getElementById("booking-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const numberOfTravelers = document.getElementById("num-travelers").value;
    const destination = document.getElementById("location-dropdown").value;

    if (!startDate || !endDate || !numberOfTravelers || destination === "") {
      showErrorMessage("Please fill out all required fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      showErrorMessage("End date must be after start date.");
      return;
    }

    handleSubmit(event);
  });

////////////////////////////////////////////////////////
const displayEstimatedCost = () => {
  const estimatedCost = calculateEstimatedCost();
  const costElement = document.getElementById("estimated-cost");
  if (costElement) {
    costElement.textContent = `Estimated Cost: $${estimatedCost.toFixed(2)}`;
  }
};

document
  .getElementById("num-travelers")
  .addEventListener("change", displayEstimatedCost);
document
  .getElementById("location-dropdown")
  .addEventListener("change", displayEstimatedCost);
document
  .getElementById("start-date")
  .addEventListener("change", displayEstimatedCost);
document
  .getElementById("end-date")
  .addEventListener("change", displayEstimatedCost);

const loginUser = () => {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("current-password").value;

  // Check for blank password
  if (passwordInput === "") {
    showErrorMessage("Password cannot be blank.");
    return;
  }

  // Check if the password is correct
  if (passwordInput !== "travel") {
    showErrorMessage("Invalid password.");
    return;
  }

  // Extract user ID from the username and validate it
  const userIdMatch = usernameInput.match(/^traveler(\d+)$/);
  if (!userIdMatch) {
    showErrorMessage(
      "Invalid username format. Expected format: traveler<number>."
    );
    return;
  }

  const userId = parseInt(userIdMatch[1]);
  globalUserID = userId;

  if (userId < 1 || userId > 50) {
    showErrorMessage(
      "Invalid user ID. Please enter a number between 1 and 50."
    );
    return;
  }

  // fetch user data and set up dashboard
  // fetchSingleTraveler(userId)
  //   .then(() => {
  //     loginPage.classList.add("hidden");
  //     tripsPage.classList.remove("hidden");
  //   })
  //   .catch((error) => {
  //     showErrorMessage(`Failed to login: ${error.message}`);
  //   });
  setUpDashboard(userId);
};

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});
