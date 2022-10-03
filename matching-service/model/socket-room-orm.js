import { createSocketRoom, findSocketRoom } from './repository.js'

export const ormFindByRoomId = async (query, projection) => {
  try {
    console.log("bro my query is: " + JSON.stringify(query))
    return await findSocketRoom(query, projection)
  } catch (err) {
    console.log('ERROR: Could not retrieve room')
    return { err }
  }
}