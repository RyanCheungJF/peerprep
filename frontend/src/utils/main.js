import { JWT_EXPIRY_IN_MINS } from './constants'
import moment from 'moment'

//------- COMMON UTILITY FUNCTIONS --------//

const ONE_MINUTE_IN_MS = 60 * 1000

export const getCollabRoomId = (roomId) =>
  roomId ? `collab-room:${roomId}` : null

// returns a date object representing the timestamp 15 mins from now
export const getJWTExpiry = () =>
  new Date(new Date().getTime() + JWT_EXPIRY_IN_MINS * ONE_MINUTE_IN_MS)


export function expirationCheck(datetime, expiredCallBack, notExpiredCallBack) {
  const now = moment()
  const expiration = moment(datetime)

  // get the difference between the moments of the two dates in minutes
  const diff = now.diff(expiration, 'minutes')
  
  if (diff > 30) {
    expiredCallBack()
  } else {
    notExpiredCallBack()
  }
  
}