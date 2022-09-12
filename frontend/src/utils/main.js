//------- COMMON UTILITY FUNCTIONS --------//
const checkFormFields = (username, password, setter) => {
  if (!username) {
    setter('No username is provided!')
    return
  }
  if (!password) {
    setter('No password is provided!')
    return
  }
}

export { checkFormFields }
