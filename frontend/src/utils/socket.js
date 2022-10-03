import { io } from 'socket.io-client'
import { MATCHING_URL } from './configs'

export const socket = io(MATCHING_URL)
