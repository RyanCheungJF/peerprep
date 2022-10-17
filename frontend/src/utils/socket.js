import { io } from 'socket.io-client'
import { MATCHING_URL, COLLAB_URL } from './configs'

export const matchingSocket = io(MATCHING_URL)
export const collabSocket = io(COLLAB_URL)
