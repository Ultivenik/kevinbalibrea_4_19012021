function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const close = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");
const form = document.querySelector("#form")
const firstName = document.querySelector("input[name=first]")
const lastName = document.querySelector("input[name=last]")
const email = document.querySelector("input[name=email]")
const birthdate = document.querySelector("input[name=birthdate]")
const localisation = document.querySelectorAll("input[name=location]")
const quantity = document.querySelector("input[name=quantity]")
const terms = document.querySelector("input[name=user-condition]")
let deleteMessage = document.querySelector(".confirmation-message")


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//form event
if (form !== null) {
  form.addEventListener('submit', handleSubmit)
}
firstName.addEventListener('invalid', errorMessageFirstName)
lastName.addEventListener('invalid', errorMessageLastName)
email.addEventListener('invalid', errorMessageMail)
birthdate.addEventListener('invalid', errorMessagePicker)
localisation.forEach(item =>{
  item.addEventListener('invalid', errorMessageLocation)
})
quantity.addEventListener('invalid', errorMessageQuantity)
terms.addEventListener('invalid', errorMessageTermsChecked)

//fonction creation d'element
function createConfirmation(parent) {
  let div = document.createElement("div")
  let closeButton = document.createElement("button")
  let messageApproved = document.createElement("p")

  div.classList.add("confirmation-message")
  closeButton.classList.add("btn-submit", "button")
  messageApproved.classList.add("messageApproved")

  messageApproved.innerHTML = "Merci ! Votre réservation a été reçue."
  closeButton.innerHTML = "Fermer"

  div.prepend(messageApproved)
  div.append(closeButton)

  parent.append(div)
  closeModal(closeButton)
  if (form === null) {
    deleteMessage.remove()
  }
}

function errorSpan(errorMessage) {
  let divError = document.createElement('div')
  divError.classList.add("error")
  divError.innerHTML = errorMessage
}

//fonction des evenements
function closeModal(button) {
  button.addEventListener('click', () => {
    modalbg.style.display = "none"
    form.style.display = 'block'
  })
}
function handleSubmit(e) {
  e.preventDefault()
  form.style.display = 'none'
  createConfirmation(modalBody)
}
function errorMessageFirstName(e){
  e.target.setCustomValidity('')
  if (!e.target.validity.valid) {
    if (e.target.value.length < 2) {
      e.target.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ nom.')
    }
  }
}
function errorMessageLastName(e){
  e.target.setCustomValidity('')
  if (!e.target.validity.valid) {
    if (e.target.value.length < 2) {
      e.target.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ nom.')
    }
  }
}
function errorMessageMail(e){
  e.target.setCustomValidity('')
  if (!e.target.validity.valid) {
    if (e.target.value.length < 2) {
      e.target.setCustomValidity("Veuillez entrer une adresse email valide.")
    }
  }
}
function errorMessagePicker(e){
  e.target.setCustomValidity('')
  if (!e.target.validity.valid) {
    e.target.setCustomValidity("Vous devez entrer votre date de naissance.")
  }
}
function errorMessageQuantity(e){
  e.target.setCustomValidity('')
  if (!e.target.validity.valid) {
    if (e.target.value === null) {
      e.target.setCustomValidity("Veuillez entrer un chiffre.")
    }
  }
}
function errorMessageLocation(e){
  e.target.setCustomValidity('')
  let isChecked = Array.prototype.slice.call(localisation).some(x => x.checked)
  if (!e.target.validity.valid) {
    if (!isChecked) {
      e.target.setCustomValidity("Vous devez choisir une option.")
    }
  }
}
function errorMessageTermsChecked(e){
  // e.target.setCustomValidity('')
  // if (!e.target.validity.valid) {
  //   if (!e.target.checked) {
  //     e.target.setCustomValidity("Vous devez vérifier que vous acceptez les termes et conditions.")
  //     }
  // }
}


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  closeModal(close)
}
