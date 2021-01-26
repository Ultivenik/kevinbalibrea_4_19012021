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
function isRemoved(element) {
  if (document.querySelector(`.${element}`) !== null) {
    document.querySelector(`.${element}`).remove()
  }
}

//fonction de fermeture de la fenêtre
function closeModal(button) {
  button.addEventListener('click', () => {
    modalbg.classList.remove('showing')
    modalbg.classList.add('hide')
    isRemoved('error')
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
async function handleSubmit(e) {
  e.preventDefault()

  let input = this
  let radio = document.querySelectorAll("input[name=location]:checked").length
  let data = new FormData(input)

  //suppression du message d'erreur en cas de spam click
  isRemoved("error")

  //messages d'erreur en cas d'invalidation du formulaire
  if (input["first"].value.trim().length < 2 || input["first"].value.trim() === null) {
    errorSpan("Veuillez entrer 2 caractères ou plus pour le champ prénom.", input["first"])

  }else if (input["last"].value.trim().length < 2 || input["last"].value.trim() === null) {
    errorSpan("Veuillez entrer 2 caractères ou plus pour le champ nom.", input["last"])

  }else if (!input['email'].validity.valid) {
    errorSpan("Veuillez entrer une adresse email valide.", input["email"])

  }else if (input["birthdate"].value > "1998-12-31") {
    errorSpan("Vous devez avoir 18 ans pour participer.", input["birthdate"])

  }else if (!input["birthdate"].value) {
    errorSpan("Vous devez indiquer votre date de naissance.", input["birthdate"])

  }else if (!input["quantity"].value) {
    errorSpan("Veuillez entrer un chiffre.", input["quantity"])

  }else if (radio <= 0) {
    errorSpan("Vous devez choisir une option.", document.querySelector(".checkboxes"))

  }else if (!input["user-condition"].checked) {
    errorSpan("Vous devez vérifier que vous acceptez les termes et conditions.", document.querySelector(".checkbox2-label"))

  }else{
    isRemoved("error")
    input.style.display = 'none'
    createConfirmation(
      "Merci ! Votre réservation a été reçue.",
      "Fermer",
      modalBody
    )
  }

  // let getData = await fetch(input.getAttribute('action'),{
  //   method:"POST",
  //   body: data
  // })
  // if (getData.ok === true) {
  //   let inputsData = form.querySelectorAll('input')
  //   for (let i = 0; i <inputsData.length; i++) {
  //     const element = inputsData[i];
  //     if (element.value !== null) {
        
  //       console.log(element.value);
  //     }
  //   }
  // }
}


