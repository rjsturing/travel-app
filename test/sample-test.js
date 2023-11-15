import chai from "chai";
const expect = chai.expect;

let trips;
let destinations;
let trip;
let destination;

beforeEach(() => {
  trips = [
    {
      userID: 1,
      destinationID: 100,
      date: "2023-01-01",
      travelers: 2,
      duration: 7,
      status: "active",
    },
    {
      userID: 2,
      destinationID: 101,
      date: "2023-08-15",
      travelers: 1,
      duration: 3,
      status: "pending",
    },
  ];

  destinations = [
    {
      id: 100,
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 300,
    },
    {
      id: 101,
      estimatedLodgingCostPerDay: 200,
      estimatedFlightCostPerPerson: 400,
    },
  ];

  trip = { date: "2023-01-01", duration: 7, travelers: 2, destinationID: 100 };
  destination = {
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 300,
  };
});


import {
  filterUserTrips,
  calculateTotalCostForYear,
  calculateDuration,
  calculateTripCost
} from "../src/utils";


// Testing filterUserTrips function
describe("filterUserTrips", function () {
  it("should return trips for a given user", function () {
    const result = filterUserTrips(1, trips);
    expect(result).to.be.an("array").that.is.not.empty;
    expect(result[0].userID).to.equal(1);
  });
  it("should return an empty array for a user with no trips", function () {
    const result = filterUserTrips(999, trips);
    expect(result).to.be.an("array").that.is.empty;
  });
});

// Testing calculateTotalCostForYear function
describe("calculateTotalCostForYear", function () {
  it("should calculate the total cost for trips in the current year", function () {
    const result = calculateTotalCostForYear(trips, destinations);
    expect(result).to.be.a("string");
  });
  it("should return 0 when there are no trips in the current year", function () {
    const result = calculateTotalCostForYear([], destinations);
    expect(result).to.equal("0.00");
  });
});

// Testing calculateDuration function
describe("calculateDuration", function () {
  it("should calculate the duration between two dates", function () {
    const result = calculateDuration("2023-01-01", "2023-01-08");
    expect(result).to.equal(7);
  });
  it("should return a negative duration if the end date is before the start date", function () {
    const result = calculateDuration("2023-01-08", "2023-01-01");
    expect(result).to.be.lessThan(0);
  });
});

// Testing calculateTripCost function
describe("calculateTripCost", function () {
  it("should correctly calculate the trip cost", function () {
    const result = calculateTripCost(destination, 2, 7);
    const expectedCost = (100 * 2 * 7 + 300 * 2) * 1.1;
    expect(result).to.equal(expectedCost);
  });

  it("should return 0 if the duration or number of travelers is 0", function () {
    const result = calculateTripCost(destination, 0, 7);
    expect(result).to.equal(0);
  });
});
