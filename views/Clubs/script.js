const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

const wrapper = document.querySelector("#wrapper"),
selectBtn = wrapper.querySelector("#select-btn"),
searchInp = wrapper.querySelector("#input"),
options = wrapper.querySelector("#options");



let projects = ["NDICI", "AFD", "ECHO", "LHF","CIAA"];

let isDropdownOpen = false;


function addprojects(selectedprojects) {
options.innerHTML = "";
projects.forEach(projects => {
let isSelected = projects == selectedprojects ? "selected" : "";
let li = `<li onclick="updateName(this)"
class="${isSelected}">${projects}</li>`;
options.insertAdjacentHTML("beforeend", li);
});
}
addprojects();

function updateName(selectedLi) {
searchInp.value = "";
addprojects(selectedLi.innerText);
wrapper.classList.remove("active");
selectBtn.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen = false
}

searchInp.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp.value.toLowerCase();
arr = projects.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected = data == selectBtn.firstElementChild.innerText ?
"selected" : "";
return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
}).join("");
options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops!
projects not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
if (isDropdownOpen) {
options.innerHTML = ""; // Clear the options when closing
wrapper.classList.remove("active");
} else {
addprojects(selectBtn.firstElementChild.innerText);
wrapper.classList.add("active");
}
isDropdownOpen = !isDropdownOpen;
}


// Event listener for the dropdown trigger (selectBtn)
selectBtn.addEventListener("click", toggleDropdown);



// Event listener to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
const targetElement = event.target;
// Check if the click is outside the dropdown container or the trigger button
if (!wrapper.contains(targetElement)) {
options.innerHTML = ""; // Clear the options when closing
isDropdownOpen = false;
wrapper.classList.remove("active");
}
});

// Event listener to prevent options from vanishing when clicking on the list
options.addEventListener("click", (event) => {
event.stopPropagation(); // Stop the click event from reaching the document
});


//*************PHCC Dropdown*************\\

const wrapper1 = document.querySelector("#wrapper1"),
selectBtn1 = wrapper1.querySelector("#select-btn1"),
searchInp1 = wrapper1.querySelector("#input1"),
options1 = wrapper1.querySelector("#options1");

let phcc = ["saida", "beirut"]
let isDropdownOpen1 = false;


function addphcc1(selectedphcc) {
options1.innerHTML = "";
phcc.forEach(phcc => {
let isSelected1 = phcc == selectedphcc ? "selected" : "";
let li = `<li onclick="updateName1(this)"
class="${isSelected1}">${phcc}</li>`;
options1.insertAdjacentHTML("beforeend", li);
});
}
addphcc1();

function updateName1(selectedLi) {
searchInp1.value = "";
addphcc1(selectedLi.innerText);
wrapper1.classList.remove("active");
selectBtn1.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen1 = false
}

searchInp1.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp1.value.toLowerCase();
arr = phcc.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected1 = data == selectBtn1.firstElementChild.innerText ?
"selected" : "";
return `<li onclick="updateName1(this)" class="${isSelected1}">${data}</li>`;
}).join("");
options1.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops!
phcc not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown1() {
if (isDropdownOpen1) {
options1.innerHTML = ""; // Clear the options when closing
wrapper1.classList.remove("active");
} else {
// alert("test2")
addphcc1(selectBtn1.firstElementChild.innerText);
wrapper1.classList.add("active");
}
isDropdownOpen1 = !isDropdownOpen1;
}


// Event listener for the dropdown trigger (selectBtn)
selectBtn1.addEventListener("click", toggleDropdown1);



// Event listener to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
const targetElement = event.target;

// Check if the click is outside the dropdown container or the trigger button
if (!wrapper1.contains(targetElement)) {
options1.innerHTML = ""; // Clear the options when closing
isDropdownOpen1 = false;
wrapper1.classList.remove("active");
}
});

// Event listener to prevent options from vanishing when clicking on the list
options1.addEventListener("click", (event) => {
event.stopPropagation(); // Stop the click event from reaching the document
});


//*************End of PHCC Dropdown*************\\






//*************volunteers Dropdown*************\\

const wrapper_volunteers = document.querySelector("#wrapper_volunteers"),
  selectBtn_volunteers = wrapper_volunteers.querySelector("#select_btn_volunteers"),
  searchInp_volunteers = wrapper_volunteers.querySelector("#input_volunteers"),
  options_volunteers = wrapper_volunteers.querySelector("#options_volunteers");

let excludedVolunteers = ["id1", "id2"]; // IDs to exclude

let isDropdownOpen_volunteers = false;

function addvolunteers(selectedId) {
  options_volunteers.innerHTML = "";

  // Fetch volunteer data from API
  fetch('http://localhost:3000/Allvolunteers')
    .then(response => response.json())
    .then(data => {
      const filteredVolunteers = data.filter(volunteer => !excludedVolunteers.includes(volunteer.VolunteerId));

      filteredVolunteers.forEach(volunteer => {
        let isSelected = volunteer.VolunteerId === selectedId ? "selected" : "";
        let li = `<li onclick="updateSelectedVolunteer(this)" class="${isSelected}" data-id="${volunteer.VolunteerId}">${volunteer.VolunteerId}</li>`;
        options_volunteers.insertAdjacentHTML("beforeend", li);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

addvolunteers();

function updateSelectedVolunteer(selectedLi) {
  searchInp_volunteers.value = "";
  const selectedId = selectedLi.getAttribute("data-id");
  addvolunteers(selectedId);
  wrapper_volunteers.classList.remove("active");
  selectBtn_volunteers.firstElementChild.innerText = selectedId;
  isDropdownOpen_volunteers = false;
}

searchInp_volunteers.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp_volunteers.value.toLowerCase();

  // Fetch and filter volunteer data from API
  fetch('http://localhost:3000/Allvolunteers')
    .then(response => response.json())
    .then(data => {
      const filteredVolunteers = data.filter(volunteer => !excludedVolunteers.includes(volunteer.VolunteerId));

      arr = filteredVolunteers.filter(data => {
        return data.VolunteerId.toString().startsWith(searchWord);
      }).map(data => {
        let isSelected = data.VolunteerId.toString() === selectBtn_volunteers.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateSelectedVolunteer(this)" class="${isSelected}" data-id="${data.VolunteerId}">${data.VolunteerId}</li>`;
      }).join("");

      options_volunteers.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Volunteers not found</p>`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
// Function to toggle the visibility of the dropdown menu
function toggleDropdown_volunteers() {
  if (isDropdownOpen_volunteers) {
  options_volunteers.innerHTML = ""; // Clear the options_project when closing
  wrapper_volunteers.classList.remove("active");
  } else {
  addvolunteers(selectBtn_volunteers.firstElementChild.innerText);
  wrapper_volunteers.classList.add("active");
  }
  isDropdownOpen_volunteers = !isDropdownOpen_volunteers;
  }
  


// Event listener for the dropdown trigger (selectBtn_project)
selectBtn_volunteers.addEventListener("click", toggleDropdown_volunteers);



// Event listener to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
const targetElement = event.target;

// Check if the click is outside the dropdown container or the trigger button
if (!wrapper_volunteers.contains(targetElement)) {
options_volunteers.innerHTML = ""; // Clear the options_project when closing
isDropdownOpen_volunteers = false;
wrapper_volunteers.classList.remove("active");
}
});

// Event listener to prevent options_project from vanishing when clicking on the list
options_volunteers.addEventListener("click", (event) => {
event.stopPropagation(); // Stop the click event from reaching the document
});