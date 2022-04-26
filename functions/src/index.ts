import onUser from './events/user'
import onStatus from './events/status'

// user
export const userCreate = onUser.createMem
export const userDeleted = onUser.deleteMem
export const statusUpdated = onStatus.updated

console.log(`run ${new Date().toLocaleString()}`)
