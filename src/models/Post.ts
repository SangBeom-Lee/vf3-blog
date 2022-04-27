import {
  FirestoreDataConverter,
  Timestamp,
  SetOptions,
  doc,
  setDoc,
  collection, query, getDocs,
  deleteDoc,
  serverTimestamp,
  DocumentReference,
  DocumentSnapshot,
  getDoc
} from 'firebase/firestore'
import { db } from 'src/boot/firebase'
import { getUser, User } from './User'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title: string,
    readonly content: string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date,
    public userSnapshot?: DocumentSnapshot<User> | undefined
  ) { }

  toJson () {
    return {
      title: this.title,
      content: this.content,
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp()
    }
  }

  // update post
  updatePost (id: string, content: string) {
    const ref = doc(db, 'posts', id).withConverter(convertor)
    return setDoc(ref, {
      content
    }, {
      merge: true
    })
  }

  // delte post
  deletePost (id: string) {
    const ref = doc(db, 'posts', id)
    return deleteDoc(ref)
  }
}

const convertor: FirestoreDataConverter<Post> = {
  toFirestore (model: Post, options?: SetOptions) {
    if (options) {
      return Object.assign(model, { updatedAt: serverTimestamp() })
    }
    return model.toJson()
  },
  fromFirestore (snapshot) {
    const data = snapshot.data()
    const uid = data.userRef instanceof DocumentReference ? data.userRef.id : ''
    const findUserSnapshot = userSnapshots.find(u => u.id === uid)
    return new Post(
      data.title,
      data.content,
      data.userRef,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
      findUserSnapshot
    )
  }
}

const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const patern = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

  return text.replace(patern, '').split(' ').join('-')
}

// save post
export const setPost = (post: Post) => {
  const ref = doc(db, 'posts', titleToId(post.title)).withConverter(convertor)
  return setDoc(ref, post)
}

// get post data
const userSnapshots: DocumentSnapshot<User>[] = []
export const getPosts = async () => {
  const ref = collection(db, 'posts').withConverter(convertor)
  const q = query(ref)
  const sn = await getDocs(q)

  for (const postSnapshot of sn.docs) {
    const data = postSnapshot.data()
    const findUserSnapshot = userSnapshots.find(u => u.id === data.userRef.id)
    if (findUserSnapshot) continue
    const userSnapshot = await getUser(data.userRef.id)
    userSnapshots.push(userSnapshot)
  }

  return sn
}

export const getPost = async (id: string) => {
  const ref = doc(db, 'posts', id).withConverter(convertor)
  return getDoc(ref)
}
