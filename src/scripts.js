// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import "./images/trips-icon.png";
import "./images/user-icon.png";
import "./images/main-logo.png";
import "./images/paris-pic.png";

// Import domUpdates
import { renderTrips, populateDestinations, showErrorMessage, updateAnnualSpending } from "./domUpdates";

//Import Function
import { filterUserTrips, 
  calculateTotalCostForYear } from "./utils";

// API Calls
import { getData, postData } from "./apiCalls";


let userId = 3
let destinations = [];

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = (end - start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  return duration;
};

const calculateEstimatedCost = () => {
  const numberOfTravelers = parseInt(document.getElementById("num-travelers").value);
  const destinationID = parseInt(document.getElementById("location-dropdown").value);
  const duration = calculateDuration(document.getElementById("start-date").value, document.getElementById("end-date").value);

  // Assuming you have a way to get the destination details (like cost per day, flight cost per person)
  const destination = destinations.find(dest => dest.id === destinationID);

  if (destination && numberOfTravelers && duration) {
      const lodgingCost = destination.estimatedLodgingCostPerDay * numberOfTravelers * duration;
      const flightCost = destination.estimatedFlightCostPerPerson * numberOfTravelers;
      const totalCost = lodgingCost + flightCost;
      const totalCostWithFee = totalCost * 1.1; // 10% travel agent fee

      return totalCostWithFee;
  }

  return 0;
};



const setUpDashboard = (userId) => {
  Promise.all([getData("trips"), getData("destinations")])
    .then(([tripsResponse, destinationsResponse]) => {
      destinations = destinationsResponse.destinations;
      const userTrips = filterUserTrips(userId, tripsResponse.trips);
      renderTrips(userTrips, destinationsResponse.destinations);
      populateDestinations(destinationsResponse.destinations);

      const userTotal = calculateTotalCostForYear(userTrips, destinationsResponse.destinations);
      updateAnnualSpending(userTotal);
    })
    .catch((error) => showErrorMessage(error.message));
};

window.addEventListener("load", () => {
  setUpDashboard(userId);
});


const formatDate = (dateString) => {
  return dateString.split('-').join('/');
};

const handleSubmit = (event) => {
  if (event) event.preventDefault();
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

    
    const newTrip = {
        id: Date.now(),
        userID: userId,
        destinationID: parseInt(document.getElementById("location-dropdown").value),
        travelers: parseInt(document.getElementById("num-travelers").value),
        date: formatDate(document.getElementById("start-date").value),
        duration: calculateDuration(document.getElementById("start-date").value, document.getElementById("end-date").value),
        status: "pending",
        suggestedActivities: [] 
    };

    postData('trips', newTrip)
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));
};

document.getElementById("booking-form").addEventListener("submit", function(event) {
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


const displayEstimatedCost = () => {
  const estimatedCost = calculateEstimatedCost();
  const costElement = document.getElementById("estimated-cost");
  if (costElement) {
      costElement.textContent = `Estimated Cost: $${estimatedCost.toFixed(2)}`;
  }
};

document.getElementById("num-travelers").addEventListener("change", displayEstimatedCost);
document.getElementById("location-dropdown").addEventListener("change", displayEstimatedCost);
document.getElementById("start-date").addEventListener("change", displayEstimatedCost);
document.getElementById("end-date").addEventListener("change", displayEstimatedCost);
