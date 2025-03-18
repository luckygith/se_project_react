const baseUrl = "http://localhost:3001";

// export const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   } else {
//     return Promise.reject(`Error: ${res.status}`);
//   }
// };

export const checkResponse = (res) => {
  return res.text().then((text) => {
    try {
      const json = JSON.parse(text);
      if (res.ok) return json;
      throw new Error(`Error ${res.status}: ${json.message || res.statusText}`);
    } catch (err) {
      // If it's not JSON, just return the raw text or status message
      throw new Error(`Error ${res.status}: ${text || res.statusText}`);
    }
  });
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
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

export function addClothingItem(token, name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log("Item clothing successfully added:", name, imageUrl, weather);
      return res;
    });
}

export function deleteClothingItem(token, _id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(checkResponse)
    .then((data) => {
      console.log("Delete success:", _id);
      return data;
    });
}

export const api = { getClothingItems, addClothingItem, deleteClothingItem };
