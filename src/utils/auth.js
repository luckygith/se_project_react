export const baseUrl = "http://localhost:3001";

// export const getUserToken = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// };

export const register = (email, password, username, avatarUrl) => {
  return fetch(`${baseUrl}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username, avatarUrl }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (identifier, password) => {
  return fetch(`${baseUrl}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
