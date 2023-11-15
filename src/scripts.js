import "./css/styles.css";
import "./images/trips-icon.png";
import "./images/user-icon.png";
import "./images/main-logo.png";


import {
  renderTrips,
  populateDestinations,
  showErrorMessage,
  updateAnnualSpending,
  updateEstimatedCost,
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

// Query Selectors
const loginForm = document.getElementById("form");
const bookingForm = document.getElementById("booking-form");
const numTravelersElement = document.getElementById("num-travelers");
const locationDropdownElement = document.getElementById("location-dropdown");
const startDateElement = document.getElementById("start-date");
const endDateElement = document.getElementById("end-date");
const loginPage = document.querySelector(".bottom-page-login");
const tripsPage = document.querySelector(".bottom-page-trip");

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
      displayEstimatedCost()
    })
    .catch((error) => showErrorMessage(error.message));
};

const submitBookingForm = (event) => {
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
};

const displayEstimatedCost = () => {
  const estimatedCost = calculateEstimatedCost();
  updateEstimatedCost(estimatedCost);
};

const loginUser = (event) => {
  event.preventDefault();
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

  setUpDashboard(userId);
};

// Event Listeners
loginForm.addEventListener("submit", loginUser);
bookingForm.addEventListener("submit", submitBookingForm);
numTravelersElement.addEventListener("change", displayEstimatedCost);
locationDropdownElement.addEventListener("change", displayEstimatedCost);
startDateElement.addEventListener("change", displayEstimatedCost);
endDateElement.addEventListener("change", displayEstimatedCost);
