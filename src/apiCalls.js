export const getData = (endpoint) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`We received this error message, please try again! Error: ${response.status}`);
      }
      return response.json();
    })
};
