import { baseUrl } from "./constants";
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const editUserInfo = (name, avatar, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
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

export function addClothingItem(name, imageUrl, weather, token) {
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

export function deleteClothingItem(_id, token) {
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

export function addCardLike(_id, token) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log("like function success:", _id, data);
      return data;
    });
}

export function removeCardLike(_id, token) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log("unlike function success:", _id, data);
      return data;
    });
}

export const api = {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
};
