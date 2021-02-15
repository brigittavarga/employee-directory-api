// empty array that will hold values from the API
let employees = [];

// string literal that stores the url of the API, complete with desired options
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

// stores the DOM element that is the container for the employees
const container = document.querySelector(".container");

// stores the DOM element that acts as an overlay for the modal
const overlay = document.querySelector(".overlay");

// stores the DOM element that is a container for the modal information
const modalContainer = document.querySelector(".modal-content");

//stores the DOM element that is the modal’s close button
const modalClose = document.querySelector(".modal-close");


// fetch data from API
fetch(urlAPI)
.then(res => res.json()) // format the response as json
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {

    employees = employeeData;

    let employeeHTML = ""; 

    employees.forEach(( employee, index ) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
    });

    container.innerHTML = employeeHTML;
}

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.name} ${street.number} ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

container.addEventListener("click", e => {

    // make sure the click is not on the gridContainer itself
    if(e.target !== container) {
        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }
});

modalClose.addEventListener("click", () => {
    overlay.classList.add("hidden");
});