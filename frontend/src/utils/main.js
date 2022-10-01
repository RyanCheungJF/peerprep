import { JWT_EXPIRY_IN_MINS } from './constants'

//------- COMMON UTILITY FUNCTIONS --------//
export const checkFormFields = (username, password, setter) => {
  if (!username) {
    setter('No username is provided!')
    return
  }
  if (!password) {
    setter('No password is provided!')
    return
  }
}

// Returns a date object representing the timestamp 15 mins from now
export const getJWTExpiry = () =>
  new Date(new Date().getTime() + JWT_EXPIRY_IN_MINS * 60 * 1000)
