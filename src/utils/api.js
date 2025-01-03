const baseUrl = "http://localhost:3001";

export function getClothingItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    console.log("get clothing api working");
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export function addClothingItem(name, imageUrl, weather, _id) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather, _id }),
  }).then((res) => {
    console.log("add clothing apiiiiiiiiiiiii");
    console.log(name, imageUrl, weather, _id);
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export function deleteClothingItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then((res) => {
    console.log("delete clothing api");
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export const api = { getClothingItems, addClothingItem, deleteClothingItem };
