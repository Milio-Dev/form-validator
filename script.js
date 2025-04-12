const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password_confirmation = document.getElementById("password-confirmation")

function showError(input, message) {
  const controller_form = input.parentElement
  controller_form.className = "form-controller error"
  const smallTag = controller_form.querySelector("small")
  smallTag.innerText = message
}

function showSuccess(input) {
  const controller_form = input.parentElement
  controller_form.className = "form-controller success"
}

function isValidEmail(input) {
  const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if(format.test(input.value.trim())) {
    showSuccess(input)
  } 
  else {
      showError(input, "Email is not valid")
  }
}

function checkRequired(array) {
  array.forEach(input => {
    if(input.value === "") {
      showError(input, `${getFieldName(input)} is required`)
    } 
    else {
      showSuccess(input)
    }
  });
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`)
  } 
  else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`)
  } 
  else {
    showSuccess(input)
  }
}

function checkPasswordMatch(input1, input2) {
  if(input1.value === input2.value) {
    showSuccess(input2)
  }
  else {
    showError(input2, `${getFieldName(input2)} doesn't match`)
  }
}

form.addEventListener("submit", e => {
  e.preventDefault()

  checkRequired([username, email, password, password_confirmation])
  isValidEmail(email)
  checkLength(username, 3, 15)
  checkLength(password, 8, 25)
  checkPasswordMatch(password, password_confirmation)
})