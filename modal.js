// DOM Elements
const modalbg = document.querySelector(".bground");
const close = document.querySelector(".close");
const mainNavBar = document.querySelector(".main-navbar")
const burgerIcon = document.querySelector(".icon")
const modalBtn = document.querySelector(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");
const form = document.forms["form"]

//menu
burgerIcon.addEventListener("click", menuOpen)

// launch modal event
modalBtn.addEventListener("click", launchModal);

//form event
if (form !== null) {
  form.addEventListener('submit', handleSubmit)
}
//fonction creation d'element
function insertAfter(newElement, reference) {
  reference.parentNode.insertBefore(newElement, reference.nextSibling)
}
//message de confirmation
function createConfirmation(message, labelButton, parent) {
  let div = document.createElement("div")
  let closeButton = document.createElement("button")
  let messageApproved = document.createElement("p")

  div.classList.add("confirmation-message")
  closeButton.classList.add("btn-submit", "button")
  messageApproved.classList.add("messageApproved")

  messageApproved.innerHTML = message
  closeButton.innerHTML = labelButton

  div.prepend(messageApproved)
  div.appendChild(closeButton)

  parent.appendChild(div)
  closeModal(closeButton)
}

//messages d'erreur des champs
function errorSpan(errorMessage, afterElement) {
  let divError = document.createElement('div')
  divError.classList.add("error")
  divError.innerHTML = errorMessage
  insertAfter(divError, afterElement)
}

//suppression du message d'erreur
function isRemoved() {
    let o = document.querySelectorAll(".formData")
    o.forEach(item =>{
    let error = document.querySelector(`.error`)
    if (item.contains(error)) {
        error.remove()
    }
  })
}

//fonction de fermeture de la fenêtre
function closeModal(button) {
  button.addEventListener('click', () => {
    modalbg.classList.remove('showing')
    modalbg.classList.add('hide')
    isRemoved()
  })
}

// launch modal form
function launchModal() {
  let confirmationMessage = document.querySelector(".confirmation-message")

  modalbg.classList.remove("hide")
  modalbg.classList.add("showing")
  form.style.display = 'block'

  if (confirmationMessage) {
    confirmationMessage.remove()
  }
  closeModal(close)
}

//ouverture de menu
function menuOpen() {
  mainNavBar.classList.toggle("active-animation")
}
// fonction de soumission du formulaire
function handleSubmit(e) {
  e.preventDefault()

  let input = this
  let radio = document.querySelectorAll("input[name=location]:checked").length
  validationError = false

  //suppression du message d'erreur en cas de spam click
  isRemoved()

  //messages d'erreur en cas d'invalidation du formulaire
  if (input["first"].value.trim().length < 2 || input["first"].value.trim() === null) {
    errorSpan("Veuillez entrer 2 caractères ou plus pour le champ prénom.", input["first"])
    validationError = true
  }
  if (input["last"].value.trim().length < 2 || input["last"].value.trim() === null) {
    errorSpan("Veuillez entrer 2 caractères ou plus pour le champ nom.", input["last"])
    validationError = true
  }
  if (!input['email'].validity.valid) {
    errorSpan("Veuillez entrer une adresse email valide.", input["email"])
    validationError = true
  }
  if (!input['email'].value) {
    errorSpan("Veuillez remplir ce champ.", input["email"])
    validationError = true
  }
  if (input["birthdate"].value > "1998-12-31") {
    errorSpan("Vous devez avoir 18 ans pour participer.", input["birthdate"])
    validationError = true
  }
  if (!input["birthdate"].value) {
    errorSpan("Vous devez indiquer votre date de naissance.", input["birthdate"])
    validationError = true
  }
  if (!input["quantity"].value) {
    errorSpan("Veuillez entrer un chiffre.", input["quantity"])
    validationError = true
  }
  if (input["quantity"].value < 0) {
    errorSpan("Veuillez entrer un chiffre valide.", input["quantity"])
    validationError = true
  }
  if (radio <= 0) {
    errorSpan("Vous devez choisir une option.", document.querySelector(".last-label"))
    validationError = true
  }
  if (!input["user-condition"].checked) {
    errorSpan("Vous devez vérifier que vous acceptez les termes et conditions.", document.querySelector(".checkbox2-label"))
    validationError = true
  }

  //reset du formulaire et message de confirmation de l'envoi
  if(validationError !== true){
    input.style.display = 'none'
    createConfirmation(
      "Merci ! Votre réservation a été reçue.",
      "Fermer",
      modalBody
    )
    input["first"].value = null
    input["last"].value = null
    input['email'].value = null
    input["birthdate"].value = null
    input["quantity"].value = null
    input["user-condition"].checked = false
    input["newsletter"].checked = false
    document.querySelector("input[name=location]:checked").checked = false
  }
}


