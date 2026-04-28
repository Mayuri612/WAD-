let users = [];

// Load users from API
window.onload = function () {
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            users = data;
            displayUsers();
        })
        .catch(err => console.error("Error fetching data:", err));
};


// Display users in table
function displayUsers() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    users.forEach(user => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.city}</td>
        </tr>`;
        table.innerHTML += row;
    });
}


// Open modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}


// Close modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


// Add user (POST to API)
function addUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;
    let phone = document.getElementById("phone").value;

    if (name === "" || email === "" || phone === "" || city === "") {
        alert("Please fill all fields");
        return;
    }

    let newUser = { name, email, phone, city };

    // Send data to API
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        users.push(data);   // update local array
        displayUsers();     // refresh table
    })
    .catch(err => console.error("Error adding user:", err));

    // Reset form + close modal
    closeModal();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("city").value = "";
    document.getElementById("phone").value = "";
}