import * as functions from 'firebase-functions'
import { createUser, deleteUser } from '../models/user'

const createMem = functions.auth.user().onCreate((user) => {
  console.log(user)
  return createUser(user)
})

const deleteMem = functions.auth.user().onDelete((user) => {
  return deleteUser(user)
})

export default { createMem, deleteMem }
