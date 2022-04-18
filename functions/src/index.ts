import onUser from './events/user'

// user
export const userCreate = onUser.createMem
export const userDeleted = onUser.deleteMem

console.log(`run ${new Date().toLocaleString()}`)
