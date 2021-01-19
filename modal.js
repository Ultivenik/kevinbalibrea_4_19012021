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
const form = document.querySelector("form[name=reserve]")
const firstName = document.querySelector("input[name=first]")
const lastName = document.querySelector("input[name=last]")
const email = document.querySelector("input[name=email]")
const birthdate = document.querySelector("input[name=birthdate]")
const localisation = document.querySelectorAll("input[name=location]")
const quantity = document.querySelector("input[name=quantity]")
const terms = document.querySelector("input[name=user-condition]")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//form event
if (form.style.display === "block") {
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
function createConfirmation() {
  let div = document.createElement("div")
  let closeButton = document.createElement("button")
  div.classList.add("confirmation-message")
  closeButton.classList.add("close-btn")
  div.innerHTML = "Merci ! Votre réservation a été reçue."
  div.append(closeButton)
}

//fonction des evenements
function handleSubmit(e) {
  e.preventDefault()
  fetch("index.html", {
    method: "POST"
  })
  .then(res => res.json)
  .then(respose => console.log(response))
  formData.style.display = 'none'

}
function errorSpan(errorMessage) {
  let divError = document.createElement('div')
  divError.classList.add("error")
  divError.innerHTML = errorMessage

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
  //fermeture de la fenêtre
  close.addEventListener('click', () => {
    modalbg.style.display = "none"
  })
}
