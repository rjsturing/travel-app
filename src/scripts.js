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

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = (end - start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  return duration;
};


const setUpDashboard = (userId) => {
  Promise.all([getData("trips"), getData("destinations")])
    .then(([tripsResponse, destinationsResponse]) => {
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
    event.preventDefault();

    // Capture form data
    const newTrip = {
        id: Date.now(), // or generate ID as per your application logic
        userID: userId, // Assuming you have a way to get the current user's ID
        destinationID: parseInt(document.getElementById("location-dropdown").value),
        travelers: parseInt(document.getElementById("num-travelers").value),
        date: formatDate(document.getElementById("start-date").value),
        duration: calculateDuration(document.getElementById("start-date").value, document.getElementById("end-date").value),
        status: "pending", // or "approved", depending on your logic
        suggestedActivities: [] // Populate as per your form structure
    };

    // Post the new trip data
    postData('trips', newTrip)
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));
};

document.getElementById("newBookingBtn").addEventListener("click", handleSubmit);