import { rtdb } from 'src/boot/firebase'
import {
  ref,
  onValue,
  onDisconnect,
  serverTimestamp,
  set,
  off
} from 'firebase/database'

const infoContecedRef = ref(rtdb, '.info/connected')

export const onChangeStatus = (uid:string) => {
  onValue(infoContecedRef, snapshot => {
    const connected = snapshot.val() as boolean
    if (!connected) return

    const statusRef = ref(rtdb, `status/${uid}`)
    return onDisconnect(statusRef).set({ online: false, visited: serverTimestamp() })
      .then(() => {
        return set(statusRef, { online: true, visitedAt: serverTimestamp() })
      })
  })
}

export const offChangeStatus = (uid:string) => {
  off(infoContecedRef)
  if (!uid) return Promise.resolve()

  const statusRef = ref(rtdb, `status/${uid}`)

  return set(statusRef, { online: false, visitedAt: serverTimestamp() })
}
