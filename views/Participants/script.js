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



let nationality = ["Afghan", "Albanian", "Algerian", "American",
"Andorran", "Angolan", "Antiguans", "Argentine", "Armenian",
"Australian",
"Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi",
"Barbadian", "Barbudans", "Batswana", "Belarusian",
"Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian",
"Brazilian", "British", "Bruneian", "Bulgarian",
"Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian",
"Canadian", "Cape Verdean", "Central African", "Chadian",
"Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa",
"Rican", "Croatian", "Cuban", "Cypriot", "Czech",
"Danish", "Djibouti", "Dominican", "Dutch", "East Timorese",
"Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean",
"Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish",
"French", "Gabonese", "Gambian", "Georgian",
"German", "Ghanaian", "Greek", "Grenadian", "Guatemalan",
"Guinea-Bissauan", "Guinean", "Guyanese", "Haitian",
"Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander",
"Indian", "Indonesian", "Iranian", "Iraqi", "Irish",
"Palestinian", "Italian", "Ivorian", "Jamaican", "Japanese",
"Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian",
"Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian",
"Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger",
"Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan",
"Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian",
"Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian",
"Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian",
"Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan",
"Nigerian", "Nigerien", "North Korean", "Northern Irish",
"Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New",
"Guinean", "Paraguayan", "Peruvian", "Polish",
"Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint",
"Lucian", "Salvadoran", "Samoan", "San Marinese",
"Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian",
"Seychellois", "Sierra Leonean", "Singaporean", "Slovakian",
"Slovenian", "Solomon Islander", "Somali", "South African", "South",
"Korean", "Spanish", "Sri Lankan", "Sudanese",
"Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese",
"Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
"Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan",
"Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani",
"Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean"
];

let isDropdownOpen = false;


function addNationality(selectedNationality) {
options.innerHTML = "";
nationality.forEach(nationality => {
let isSelected = nationality == selectedNationality ? "selected" : "";
let li = `<li onclick="updateName(this)"
class="${isSelected}">${nationality}</li>`;
options.insertAdjacentHTML("beforeend", li);
});
}
addNationality();

function updateName(selectedLi) {
searchInp.value = "";
addNationality(selectedLi.innerText);
wrapper.classList.remove("active");
selectBtn.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen = false
}

searchInp.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp.value.toLowerCase();
arr = nationality.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected = data == selectBtn.firstElementChild.innerText ?
"selected" : "";
return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
}).join("");
options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops!
Nationality not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
if (isDropdownOpen) {
options.innerHTML = ""; // Clear the options when closing
wrapper.classList.remove("active");
} else {
addNationality(selectBtn.firstElementChild.innerText);
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


//*************District Dropdown*************\\

const wrapper1 = document.querySelector("#wrapper1"),
selectBtn1 = wrapper1.querySelector("#select-btn1"),
searchInp1 = wrapper1.querySelector("#input1"),
options1 = wrapper1.querySelector("#options1");

let disctricts = ["South", "BML","Tripoly","Akkar"]
let isDropdownOpen1 = false;


function addNationality1(selectedNationality) {
options1.innerHTML = "";
disctricts.forEach(disctricts => {
let isSelected1 = disctricts == selectedNationality ? "selected" : "";
let li = `<li onclick="updateName1(this)"
class="${isSelected1}">${disctricts}</li>`;
options1.insertAdjacentHTML("beforeend", li);
});
}
addNationality1();

function updateName1(selectedLi) {
searchInp1.value = "";
addNationality1(selectedLi.innerText);
wrapper1.classList.remove("active");
selectBtn1.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen1 = false
}

searchInp1.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp1.value.toLowerCase();
arr = disctricts.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected1 = data == selectBtn1.firstElementChild.innerText ?
"selected" : "";
return `<li onclick="updateName1(this)" class="${isSelected1}">${data}</li>`;
}).join("");
options1.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops!
Nationality not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown1() {
if (isDropdownOpen1) {
options1.innerHTML = ""; // Clear the options when closing
wrapper1.classList.remove("active");
} else {
// alert("test2")
addNationality1(selectBtn1.firstElementChild.innerText);
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


//*************End of District Dropdown*************\\


//*************Projects Dropdown*************\\

const wrapper_project = document.querySelector("#wrapper_project"),
selectBtn_project = wrapper_project.querySelector("#select_btn_project"),
searchInp_project = wrapper_project.querySelector("#input_project"),
options_project = wrapper_project.querySelector("#options_project");



let projects = ["NDICI", "AFD", "ECHO", "LHF", "CIAA"]

let isDropdownOpen_projects = false;


function addProjects(selectedProjects) {
options_project.innerHTML = "";
projects.forEach(projects => {
let isSelected = projects == selectedProjects ? "selected" : "";
let li = `<li onclick="updateNameProject(this)"
class="${isSelected}">${projects}</li>`;
options_project.insertAdjacentHTML("beforeend", li);
});
}
addProjects();

function updateNameProject(selectedLi) {
searchInp_project.value = "";
addProjects(selectedLi.innerText);
wrapper_project.classList.remove("active");
selectBtn_project.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen_projects = false
}

searchInp_project.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp_project.value.toLowerCase();
arr = projects.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected = data == selectBtn_project.firstElementChild.innerText
? "selected" : "";
return `<li onclick="updateNameProject(this)"
class="${isSelected}">${data}</li>`;
}).join("");
options_project.innerHTML = arr ? arr : `<p style="margin-top:
10px;">Oops! projects not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown_projects() {
if (isDropdownOpen_projects) {
options_project.innerHTML = ""; // Clear the options_project when closing
wrapper_project.classList.remove("active");
} else {
addProjects(selectBtn_project.firstElementChild.innerText);
wrapper_project.classList.add("active");
}
isDropdownOpen_projects = !isDropdownOpen_projects;
}


// Event listener for the dropdown trigger (selectBtn_project)
selectBtn_project.addEventListener("click", toggleDropdown_projects);



// Event listener to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
const targetElement = event.target;

// Check if the click is outside the dropdown container or the trigger button
if (!wrapper_project.contains(targetElement)) {
options_project.innerHTML = ""; // Clear the options_project when closing
isDropdownOpen_projects = false;
wrapper_project.classList.remove("active");
}
});

// Event listener to prevent options_project from vanishing when clicking on the list
options_project.addEventListener("click", (event) => {
event.stopPropagation(); // Stop the click event from reaching the document
});


//*************End of Project Dropdown*************\\


//*************Cadaster Dropdown*************\\

const wrapper_cadaster = document.querySelector("#wrapper_cadaster"),
selectBtn_cadaster = wrapper_cadaster.querySelector("#select_btn_cadaster"),
searchInp_cadaster = wrapper_cadaster.querySelector("#input_cadaster"),
options_cadaster = wrapper_cadaster.querySelector("#options_cadaster");



let cadaster = ["Aaba",
"Aabadiye",

];


let isDropdownOpen_cadaster = false;


function addCadaster(selectedCadaster) {
options_cadaster.innerHTML = "";
cadaster.forEach(cadaster => {
let isSelected = cadaster == selectedCadaster ? "selected" : "";
let li = `<li onclick="updateNameCaster(this)"
class="${isSelected}">${cadaster}</li>`;
options_cadaster.insertAdjacentHTML("beforeend", li);
});
}
addCadaster();

function updateNameCaster(selectedLi) {
searchInp_cadaster.value = "";
addCadaster(selectedLi.innerText);
wrapper_cadaster.classList.remove("active");
selectBtn_cadaster.firstElementChild.innerText = selectedLi.innerText;
isDropdownOpen_cadaster = false
}

searchInp_cadaster.addEventListener("keyup", () => {
let arr = [];
let searchWord = searchInp_cadaster.value.toLowerCase();
arr = cadaster.filter(data => {
return data.toLowerCase().startsWith(searchWord);
}).map(data => {
let isSelected = data ==
selectBtn_cadaster.firstElementChild.innerText ? "selected" : "";
return `<li onclick="updateNameCaster(this)"
class="${isSelected}">${data}</li>`;
}).join("");
options_cadaster.innerHTML = arr ? arr : `<p style="margin-top:
10px;">Oops! cadaster not found</p>`;
});

// Function to toggle the visibility of the dropdown menu
function toggleDropdown_cadaster() {
if (isDropdownOpen_cadaster) {
options_cadaster.innerHTML = ""; // Clear the options_project when closing
wrapper_cadaster.classList.remove("active");
} else {
addCadaster(selectBtn_cadaster.firstElementChild.innerText);
wrapper_cadaster.classList.add("active");
}
isDropdownOpen_cadaster = !isDropdownOpen_cadaster;
}


// Event listener for the dropdown trigger (selectBtn_project)
selectBtn_cadaster.addEventListener("click", toggleDropdown_cadaster);



// Event listener to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
const targetElement = event.target;

// Check if the click is outside the dropdown container or the trigger button
if (!wrapper_cadaster.contains(targetElement)) {
options_cadaster.innerHTML = ""; // Clear the options_project when closing
isDropdownOpen_cadaster = false;
wrapper_cadaster.classList.remove("active");
}
});

// Event listener to prevent options_project from vanishing when clicking on the list
options_cadaster.addEventListener("click", (event) => {
event.stopPropagation(); // Stop the click event from reaching the document
});












