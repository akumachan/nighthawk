import { firestore } from '../firebase/firebase'

export default class DeckBuilderDao {
// firebase.firestore().enablePersistence({synchronizeTabs : true});
  static firestore = firestore.enablePersistence({synchronizeTabs : true})
  static decksCollection = firestore.collection('decks');
  static cardsCollection = firestore.collection('cards');
  static getDeck = (id) => {
    this.decksCollection.doc(id).get({ source: "cache" }).then((querySnapshot) => {
      console.log(querySnapshot.data())
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
    });;
  }
}