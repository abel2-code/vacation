let form = document.getElementById("form");
const destination = document.getElementById("destination_name");
const newLocation = document.getElementById("location");
const photo = document.getElementById("photo");
const description = document.getElementById("description");
const wishlist = document.getElementById("wishlist");

form.onsubmit = (e) => {
  e.preventDefault();
  console.log("hello");
  let destinationValue = destination.value;
  let locationValue = newLocation.value;
  let photoValue = photo.value;
  let descriptionValue = description.value;

  wishlist.innerHTML += `<li>
  <h1>${destinationValue}</h1>
  <p>${locationValue}</p>
  <button id="delete_button">Remove</button>
  <button id="edit_button">Edit</button>
  </li>`;

  form.reset();
};

onclick = (e) => {
  console.log("hi, there");
  if (e.target.matches("button#delete_button")) {
    e.target.parentNode.remove();
  }
  if (e.target.matches("button#edit_button")) {
    let editedDestination = prompt("Enter new destination name");
    let editedLocation = prompt("Enter a new location");
    let editedPhoto = prompt("Enter a new photo");

    e.target.parentNode.innerHTML = `
        <h1>${editedDestination}</h1>
        <p>${editedLocation}</p>
        <button id="delete_button">Remove</button>
        <button id="edit_button">Edit</button>
    `;
  }
};
