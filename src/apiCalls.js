import { setUpDashboard } from './scripts.js';

export const getData = (endpoint) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`We received this error message, please try again! Error: ${response.status}`);
      }
      return response.json();
    })
};

export const postData = (endpoint, data) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
};

// export const fetchSingleTraveler = (userId) => {
//   return getData(`travelers/${userId}`)
//     .then(userResponse => {
//         if (userResponse) {
//             setUpDashboard(userId);
//         }
//     });
// };
