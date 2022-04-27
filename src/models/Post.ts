import {
  FirestoreDataConverter,
  Timestamp,
  SetOptions,
  doc,
  collection, query, getDocs,
  deleteDoc,
  serverTimestamp,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  writeBatch
} from 'firebase/firestore'
import { db } from 'src/boot/firebase'
import { getUser, User } from './User'
import { firebaseUser } from 'src/composables/useAuth'
import { Content, converter as contentConverter, getContent } from './Content'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title: string,
    readonly sumary: string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date,
    public userSnapshot?: DocumentSnapshot<User> | undefined,
    public content?: string | undefined
  ) { }

  toJson () {
    return {
      title: this.title,
      sumary: this.sumary.substr(0, 10),
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp()
    }
  }

  // update post
  /* updatePost (id: string, content: string) {
    const ref = doc(db, 'posts', id).withConverter(convertor)
    return setDoc(ref, {
      content
    }, {
      merge: true
    })
  } */

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

const contentsToChunks = (str: string) => {
  return str.match(/.{1,10}/g) || []
}

// save post
export const setPost = async (title: string, content: string) => {
  if (!firebaseUser.value) throw Error('user not signed')
  const batch = writeBatch(db)
  const userRef = doc(db, 'user', firebaseUser.value.uid)
  const id = titleToId(title)
  const contents = contentsToChunks(content)
  const postRef = doc(db, 'posts', id).withConverter(convertor)
  const post = new Post(
    title,
    content,
    userRef
  )

  batch.set(postRef, post)

  contents.forEach((c, i) => {
    const ref = doc(collection(db, 'posts', id, 'contents')).withConverter(contentConverter)
    batch.set(ref, new Content(i, c))
  })

  return await batch.commit()
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
  const postSnapshot = await getDoc(ref)
  const post = postSnapshot.data()
  if (!post) throw Error('post not exsits')

  const contentSnapshot = await getContent(id)
  const contents = contentSnapshot.docs.map(d => d.data().content)
  post.content = contents.join('')

  return post
}
