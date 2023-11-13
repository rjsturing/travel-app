// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import "./images/trips-icon.png";
import "./images/user-icon.png";
import "./images/main-logo.png";
import "./images/paris-pic.png";

// Import domUpdates
import {
  renderTrips,
  showErrorMessage,
  getDestinationNames
} from "./domUpdates";

let userId = 3

//Import Function
import { filterUserTrips } from "./utils";

// API Calls
import { getData } from "./apiCalls";

// signInButton.addEventListener("click", showMainPage);

const setUpDashboard = (userId) => {
  Promise.all([getData("trips"), getData("destinations")])
    .then(([tripsResponse, destinationsResponse]) => {
      const userTrips = filterUserTrips(userId, tripsResponse.trips);
      renderTrips(userTrips, destinationsResponse.destinations);
    })
    .catch((error) => showErrorMessage(error.message));
};

window.addEventListener("load", () => {
  setUpDashboard(3);
});







// window.addEventListener('load', () => {
//     getData
//     Promise.all(getData()).then((promises) => {
//         mainData.trips = promises[0].trips;
//         mainData.travelers = promises[1].travelers;
//         mainData.destinations = promises[2].destinations;
//         console.log('mainData', mainData);
//         console.log('mainData.trips', mainData.trips)
//         console.log('mainData.travelers', mainData.travelers)
//         getUserData()
//     })
//     .then(getDescriptiveData())
//     .then(generatePage())
//   })

//   const getUserData = () => {
//     mainData.currentUser = mainData.travelers[2].id
//     mainData.userTrips = getUserTrips(mainData.trips, mainData.currentUser)
//     console.log('mainData.currentUser',  mainData.currentUser)
//     console.log('mainData.userTrips', mainData.userTrips)
//   }

//   const getDescriptiveData = () => {
//     mainData.userNums = getDestinationNums(mainData.userTrips)
//     mainData.locationNames = getDestinationNames(mainData.userNums, mainData.destinations)
//     console.log("mainData.userNums", mainData.userNums)
//     console.log("mainData.locationNames", mainData.locationNames)
//     mainData.tripCards = createTripCard(mainData.userTrips, mainData.destinations)
//   }+

//   const generatePage = () => {
//     mainData.currentUser = mainData.travelers[0];
//     updateTripsPage(mainData.travelers[0].name, mainData.locationNames, mainData.trips[0].destinationID)
//   }

// console.log('This is the JavaScript entry file - your code begins here.');
