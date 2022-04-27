import { FirestoreDataConverter, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from 'src/boot/firebase'

export class Content {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly no: number,
    readonly content: string
  ) { }

  toJson () {
    return {
      no: this.no,
      content: this.content
    }
  }
}

export const converter: FirestoreDataConverter<Content> = {
  toFirestore (model: Content) {
    return model.toJson()
  },
  fromFirestore (snapshot) {
    const data = snapshot.data()
    return new Content(
      data.no,
      data.content
    )
  }
}

export const getContent = async (id: string) => {
  const ref = collection(db, 'posts', id, 'contents').withConverter(converter)
  const q = query(ref, orderBy('no'))

  return await getDocs(q)
}
