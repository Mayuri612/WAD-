//authentication
const user = localStorage.getItem("user");
if (!user && !window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
  window.location.href = "login.html";
}

// CONFIG
const API_URL = "http://localhost:3000/api/bookings";


// SIGNUP
async function signup() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Signup Successful ✔");
  window.location.href = "login.html";
}


// LOGIN
async function login() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(result.user));
    alert("Login Successful ✔");
    window.location.href = "./index.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}

// CREATE BOOKING

async function bookTravel() {
  const name = document.getElementById("name").value;
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("date").value;

  if (!name || !destination || !date) {
    alert("Please fill all fields ✏️");
    return;
  }

  
  const user = JSON.parse(localStorage.getItem("user"));

  const data = { name, destination, date, userId: user._id }; 

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    alert("✨ Trip Booked Successfully!");

    document.getElementById("name").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("date").value = "";

    loadBookings(); // refresh if user is on view page
  } catch (error) {
    console.log(error);
    alert("Error booking trip ❌");
  }
}


// LOAD BOOKINGS 
const container = document.getElementById("bookings");

async function loadBookings() {
  if (!container) return;

  try {
    const user = JSON.parse(localStorage.getItem("user")); //new line for user id
    const res = await fetch(`${API_URL}?userId=${user._id}`); //new line user id
    //const res = await fetch(API_URL);
    const data = await res.json();

    container.innerHTML = "";

    data.forEach((b) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>🌍 ${b.destination}</h3>
        <p><b>Name:</b> ${b.name}</p>
        <p><b>Date:</b> ${b.date}</p>

        <button onclick="editBooking('${b._id}', '${b.name}', '${b.destination}', '${b.date}')">
          Edit ✏️
        </button>

        <button onclick="deleteBooking('${b._id}')">
          Delete ❌
        </button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = "<p>Error loading bookings ❌</p>";
  }
}



// UPDATE BOOKING
async function editBooking(id, oldName, oldDestination, oldDate) {

  const name = prompt("Enter new name:", oldName);
  const destination = prompt("Enter new destination:", oldDestination);
  const date = prompt("Enter new date:", oldDate);

  if (!name || !destination || !date) {
    alert("All fields are required ❌");
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, destination, date })
    });

    alert("Updated Successfully ✨");

    loadBookings();
  } catch (error) {
    console.log(error);
    alert("Error updating booking ❌");
  }
}



// DELETE BOOKING

async function deleteBooking(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    alert("Deleted Successfully 🗑️");

    loadBookings();
  } catch (error) {
    console.log(error);
    alert("Error deleting booking ❌");
  }
}

function logout() {
  localStorage.removeItem("user"); 
  alert("Logged out successfully 👋");
  window.location.href = "login.html"; 
}

// AUTO LOAD (READ ON VIEW PAGE)

loadBookings();