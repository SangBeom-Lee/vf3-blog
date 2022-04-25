// firebase 연결을 위한 기본 불러오는 파일

import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import firebaseJson from '../../firebase.json'

const app = initializeApp(firebaseConfig)

const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://localhost:9099')

const db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8081)

const rtdb = getDatabase(app)
connectDatabaseEmulator(rtdb, 'localhost', firebaseJson.emulators.database.port)

export { app, auth, db, rtdb }
