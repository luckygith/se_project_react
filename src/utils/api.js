const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

// const requestApi = (url, options = {}) => {
//   return fetch(url, options)
//     .then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)))
//     .catch((err) => {
//       console.error("API request failed:", err);
//       throw err; // Re-throw the error for further handling if needed
//     });
// };

export function getClothingItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addClothingItem(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log("Item clothing successfully added:", name, imageUrl, weather);
      return res;
    });
}

export function deleteClothingItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  })
    .then(checkResponse)
    .then((data) => {
      console.log("Delete success:", _id);
      return data;
    });
}

export const api = { getClothingItems, addClothingItem, deleteClothingItem };
