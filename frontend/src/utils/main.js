import { JWT_EXPIRY_IN_MINS } from './constants'

//------- COMMON UTILITY FUNCTIONS --------//

export const getCollabRoomId = (roomId) =>
  roomId ? `collab-room:${roomId}` : null

// returns a date object representing the timestamp 15 mins from now
export const getJWTExpiry = () =>
  new Date(new Date().getTime() + JWT_EXPIRY_IN_MINS * 60 * 1000)
